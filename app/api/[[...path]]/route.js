import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { openai } from '@/lib/openai'
import { v4 as uuidv4 } from 'uuid'

// In-memory storage for demo (when Supabase is not configured)
const inMemoryStorage = {
  applications: new Map(),
  sessions: new Map()
}

// Helper function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Root route
export async function GET(request) {
  const { pathname } = new URL(request.url)
  
  if (pathname === '/api' || pathname === '/api/') {
    return NextResponse.json({ 
      message: 'IntelliOnboard API',
      status: 'running',
      supabaseConfigured: isSupabaseConfigured()
    })
  }

  // Get application by ID
  const match = pathname.match(/^\/api\/applications\/(.+)$/)
  if (match) {
    const applicationId = match[1]
    
    if (!inMemoryStorage.applications.has(applicationId)) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    const application = inMemoryStorage.applications.get(applicationId)
    
    return NextResponse.json({ 
      success: true,
      application
    })
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

// Main POST handler
export async function POST(request) {
  const { pathname } = new URL(request.url)

  try {
    // Auth routes
    if (pathname === '/api/auth/send-otp') {
      const { email, phone } = await request.json()
      
      if (!email || !phone) {
        return NextResponse.json({ error: 'Email and phone are required' }, { status: 400 })
      }

      // Generate OTP
      const otp = generateOTP()
      
      // Store OTP in memory (in production, use Redis or database)
      inMemoryStorage.sessions.set(email, {
        otp,
        phone,
        timestamp: Date.now(),
        expires: Date.now() + 10 * 60 * 1000 // 10 minutes
      })

      console.log(`OTP for ${email}: ${otp}`) // For demo purposes

      return NextResponse.json({ 
        success: true,
        message: 'OTP sent successfully',
        // For demo, return OTP (remove in production!)
        otp: otp
      })
    }

    if (pathname === '/api/auth/verify-otp') {
      const { email, otp } = await request.json()
      
      if (!email || !otp) {
        return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 })
      }

      const session = inMemoryStorage.sessions.get(email)
      
      if (!session) {
        return NextResponse.json({ error: 'No OTP found for this email' }, { status: 400 })
      }

      if (Date.now() > session.expires) {
        inMemoryStorage.sessions.delete(email)
        return NextResponse.json({ error: 'OTP expired' }, { status: 400 })
      }

      if (session.otp !== otp) {
        return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
      }

      // Check if user has existing application
      let applicationId = null
      let status = 'new'
      
      for (const [id, app] of inMemoryStorage.applications.entries()) {
        if (app.email === email) {
          applicationId = id
          status = app.status
          break
        }
      }

      return NextResponse.json({ 
        success: true,
        applicationId,
        status
      })
    }

    // Application routes
    if (pathname === '/api/applications/save') {
      const { applicationId, email, currentStep, data } = await request.json()
      
      let appId = applicationId || uuidv4()
      
      if (inMemoryStorage.applications.has(appId)) {
        // Update existing application
        const existing = inMemoryStorage.applications.get(appId)
        inMemoryStorage.applications.set(appId, {
          ...existing,
          ...data,
          current_step: currentStep + 1,
          updated_at: new Date().toISOString()
        })
      } else {
        // Create new application
        inMemoryStorage.applications.set(appId, {
          id: appId,
          email,
          ...data,
          current_step: currentStep + 1,
          status: 'draft',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      }

      return NextResponse.json({ 
        success: true,
        applicationId: appId
      })
    }

    if (pathname === '/api/applications/submit') {
      const { applicationId, email, data } = await request.json()
      
      if (!applicationId || !inMemoryStorage.applications.has(applicationId)) {
        return NextResponse.json({ error: 'Application not found' }, { status: 404 })
      }

      const application = inMemoryStorage.applications.get(applicationId)
      inMemoryStorage.applications.set(applicationId, {
        ...application,
        ...data,
        status: 'submitted',
        submitted_at: new Date().toISOString()
      })

      return NextResponse.json({ 
        success: true,
        applicationId
      })
    }

    // File upload route
    if (pathname === '/api/upload') {
      const formData = await request.formData()
      const file = formData.get('file')
      const type = formData.get('type')
      const applicationId = formData.get('applicationId')

      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 })
      }

      // In a real app, upload to Supabase Storage
      // For demo, simulate successful upload
      const mockUrl = `https://storage.example.com/${applicationId}/${type}/${file.name}`

      console.log(`File uploaded: ${file.name} (${file.size} bytes) for ${type}`)

      return NextResponse.json({ 
        success: true,
        url: mockUrl,
        fileName: file.name,
        fileSize: file.size
      })
    }

    // AI Assistant route
    if (pathname === '/api/ai-assistant') {
      const { message, history } = await request.json()
      
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a helpful banking assistant for IntelliOnboard, a digital bank account opening platform. 
              Be friendly, professional, and concise. Help users with questions about:
              - Account opening process
              - Required documents (government ID, address proof, photo)
              - Processing times (24-48 hours typically)
              - Security and data protection
              - Account types (savings vs current)
              - Banking services (debit card, net banking, mobile app)
              Always be reassuring and emphasize security and ease of use.`
            },
            ...history.slice(-6), // Last 6 messages for context
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 200
        })

        return NextResponse.json({ 
          response: completion.choices[0].message.content
        })
      } catch (error) {
        console.error('OpenAI error:', error)
        
        // Fallback responses
        const fallbackResponses = {
          'documents': 'You\'ll need: (1) Government-issued ID (passport/driver\'s license), (2) Proof of address (utility bill/bank statement within 3 months), and (3) A recent photograph.',
          'time': 'Most applications are reviewed within 24-48 hours. You\'ll receive email/SMS updates at each stage.',
          'secure': 'Absolutely! We use 256-bit encryption, comply with banking regulations, and never share your data without consent.',
          'account': 'You can open a Savings Account (with interest) or Current Account (for business). You can customize features during the application.'
        }

        const lowerMessage = message.toLowerCase()
        let response = 'I\'m here to help! You can ask me about required documents, processing times, security, or account types.'
        
        if (lowerMessage.includes('document')) response = fallbackResponses.documents
        else if (lowerMessage.includes('time') || lowerMessage.includes('long')) response = fallbackResponses.time
        else if (lowerMessage.includes('secure') || lowerMessage.includes('safe')) response = fallbackResponses.secure
        else if (lowerMessage.includes('account') || lowerMessage.includes('type')) response = fallbackResponses.account

        return NextResponse.json({ response })
      }
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error.message 
    }, { status: 500 })
  }
}

// PUT/PATCH/DELETE handlers can be added here if needed

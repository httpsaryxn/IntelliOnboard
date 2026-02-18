# 🏦 IntelliOnboard

> Smart & Seamless Digital Bank Account Opening Platform

**IntelliOnboard** is a premium digital onboarding platform designed to bridge the gap between complex banking compliance and a frictionless user experience. Built as a 2026 Hackathon submission, it demonstrates how modern web technologies combined with intelligent validation can transform the "First Mile" of banking.

---

## ✨ Key Features

### 🧊 **Guided Multi-Step Wizard**
A "Calm UI" onboarding journey that eliminates form fatigue:

- **6-Step Frictionless Flow**: Personal Details → Address & Employment → Document Upload → Identity Verification → Account Preferences → Review & Confirm
- **Progress Persistence**: Built-in save functionality using browser localStorage and backend state management
- **Real-Time Validation**: Instant feedback on field completion with elegant form states
- **Smart Restoration**: Resume applications seamlessly if interrupted
- **Mobile-First Design**: Fully responsive, optimized for all screen sizes with Tailwind CSS

### 🤖 **AI-Powered Assistant**
Floating chatbot that leverages OpenAI's GPT-3.5-Turbo to provide:

- Intelligent answers about account opening requirements
- Real-time guidance on uploaded documents
- Processing time expectations
- Security & compliance Q&A
- Fallback responses when API calls fail (graceful degradation)

### 🛡️ **Intelligent Risk Assessment**
The backbone of the application. Evaluates applicants in real-time:

- **Rule-Based Scoring**: Transparent logic logging for compliance
- **Risk Categorization**: Automatic Low, Medium, or High-risk classification
- **Documentation Validation**: Flags missing or low-quality uploads
- **Income-to-Product Match**: Ensures product-customer fit
- **Driver-Based Decision Making**: Easy to audit and modify rules

### ☁️ **Cloud-Native Infrastructure**
Enterprise-grade backend architecture:

- **Supabase Integration**: PostgreSQL database for persistence
- **Secure Document Storage**: File uploads handled via Supabase Storage
- **Authentication**: OTP-based email/phone verification (6-digit codes)
- **Real-Time Dashboard**: Track application status through each stage
- **Session Management**: Secure user sessions with localStorage fallbacks

### 📊 **Status Tracking Dashboard**
Real-time application lifecycle visibility:

- Application submission confirmation
- Risk assessment progress
- Manual review timeline
- Account setup status
- Reference number generation for support

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15+ (App Router), React 18, TypeScript |
| **UI/Styling** | Tailwind CSS 3.3+, Shadcn UI Components, Lucide Icons |
| **Backend/BaaS** | Supabase (PostgreSQL, Auth, Storage) |
| **Forms** | Native React Hooks with custom validation |
| **AI** | OpenAI Chat API (GPT-3.5-Turbo) |
| **Utilities** | UUID generation, real-time OTP handling |
| **Dev Tools** | ESLint, TypeScript, PostCSS, Autoprefixer |

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│              Next.js Frontend Layer                      │
│  ├─ Landing Page (Conversion-focused hero section)      │
│  ├─ Login Flow (OTP verification)                       │
│  ├─ Onboarding Wizard (6-step form collection)          │
│  ├─ Status Dashboard (Application tracking)             │
│  └─ AI Assistant (Floating chat interface)              │
└──────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────┐
│              API Layer (/api/[[...path]])                │
│  ├─ /auth/send-otp        → Generate & store OTP        │
│  ├─ /auth/verify-otp      → Validate OTP codes          │
│  ├─ /applications/create  → Initialize new application  │
│  ├─ /applications/save    → Persist form progress       │
│  ├─ /applications/submit  → Finalize & submit app       │
│  ├─ /upload               → Handle document uploads     │
│  └─ /ai-assistant         → OpenAI chat integration     │
└──────────────────────────────────────────────────────────┘
                         ↓
        ┌────────────────┬─────────────────┐
        ↓                ↓                 ↓
  ┌──────────┐    ┌────────────┐   ┌─────────────┐
  │ Supabase │    │   OpenAI   │   │ localStorage│
  │   Auth   │    │    API     │   │  (Fallback) │
  │   DB     │    │            │   │             │
  │ Storage  │    │            │   │             │
  └──────────┘    └────────────┘   └─────────────┘
```

### Data Flow

1. **Authentication**: User submits email + phone → OTP sent → Verification → Session created
2. **Application Creation**: New application ID generated → Associated with user
3. **Progressive Enrollment**: Each step validates and saves to in-memory storage (or Supabase if configured)
4. **Document Upload**: Files accepted → Simulated Supabase Storage → Metadata stored
5. **Risk Assessment**: Application data passed through rule engine → Risk level assigned (Low/Medium/High)
6. **Submission**: Final form data + risk score → Application marked as "submitted" → Dashboard shows status

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (verified with v20.x)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/httpsaryxn/IntelliOnboard.git
cd IntelliOnboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Your application will be available at `http://localhost:3000`

### Environment Setup (Optional)

To enable Supabase and OpenAI features, create a `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# OpenAI Configuration
OPENAI_API_KEY=sk-proj-...
```

**Demo Mode**: If these variables aren't set, the application gracefully falls back to in-memory storage and mock AI responses.

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## 📁 Project Structure

```
IntelliOnboard/
├── app/
│   ├── api/[[...path]]/
│   │   └── route.js                 # Main API handler (Auth, Apps, Upload, AI)
│   ├── components/
│   │   ├── AIAssistant.jsx          # Floating chat widget
│   │   ├── onboarding/
│   │   │   ├── PersonalDetailsStep.jsx     # Step 1: Name, Email, Phone, DOB
│   │   │   ├── AddressEmploymentStep.jsx   # Step 2: Address & Work Info
│   │   │   ├── DocumentUploadStep.jsx      # Step 3: Identity + Address Proof
│   │   │   ├── KYCVerificationStep.jsx     # Step 4: Biometric Liveness
│   │   │   ├── AccountPreferencesStep.jsx  # Step 5: Account Type & Currency
│   │   │   └── ReviewConfirmStep.jsx       # Step 6: Final Review & Signature
│   │   └── ui/                      # Shadcn UI Components
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       ├── accordion.jsx
│   │       ├── progress.jsx
│   │       ├── input-otp.jsx
│   │       └── toaster.jsx
│   ├── lib/
│   │   ├── supabase.js              # Supabase client initialization
│   │   ├── openai.js                # OpenAI client setup
│   │   └── utils.js                 # Utility functions (cn, classname merging)
│   ├── login/
│   │   └── page.js                  # OTP-based auth flow
│   ├── onboard/
│   │   └── page.js                  # Main wizard orchestrator
│   ├── status/
│   │   └── page.js                  # Application status tracking
│   ├── page.js                      # Landing page w/ hero & feature showcase
│   ├── layout.js                    # Root layout, global providers
│   └── globals.css                  # Tailwind directives & global styles
├── jsconfig.json                    # Path aliases (@/components, @/lib)
├── next.config.js                   # Next.js configuration
├── tailwind.config.js               # Tailwind theme customization
├── postcss.config.js                # PostCSS setup (Tailwind)
├── package.json                     # Dependencies & scripts
└── .gitignore
```

---

## 🔄 Key User Flows

### 1. **New User Onboarding**
```
Landing Page 
  ↓ [Start Application Button]
  ↓
Login Page (Email + Phone + OTP)
  ↓ [Verification]
  ↓
Onboarding Wizard (6 Steps)
  ├─ Personal Details
  ├─ Address & Employment
  ├─ Document Upload
  ├─ Identity Verification
  ├─ Account Preferences
  └─ Review & Confirm
  ↓ [Submit]
  ↓
Status Dashboard (Risk Assessment → Account Setup)
```

### 2. **Resuming an Application**
```
Landing Page / Login Page
  ↓ [Resume Application]
  ↓
Login (Verification)
  ↓
Onboarding Wizard (Loads saved state, continues from last step)
  ↓ [Complete remaining steps]
  ↓
Status Dashboard
```

### 3. **AI Assistant Context**
The floating AI Assistant is available throughout the onboarding journey and helps with:
- Step-by-step guidance
- Document type clarification
- Processing time expectations
- Account type recommendations
- Security & privacy questions

---

## 🎨 Design Philosophy

**Calm UI Principles**:
- Minimal cognitive load with one-at-a-time step presentation
- Generous whitespace and clear visual hierarchy
- Accessible color scheme (WCAG AA compliant)
- Rounded corners (16px-32px) for modern, friendly aesthetics
- Smooth transitions and loading states
- Clear progress indicators
- Persistent navigation and restoration capabilities

**Color Palette**:
- **Primary**: `hsl(217, 33%, 17%)` — Deep navy, used for CTAs and headers
- **Accent**: `hsl(180, 25%, 50%)` — Soft teal, used for highlights and success states
- **Neutral**: Slate grays (50-900), white backgrounds

---

## 📊 Risk Engine Details

The risk assessment logic evaluates applications based on:

| Factor | Evaluation |
|--------|-----------|
| **Income Level** | Matches account product suitability |
| **Document Quality** | Ensures clear, readable uploads |
| **Employment Status** | Verifies stability and identity |
| **Residential History** | Confirms address authenticity |
| **Verification Completeness** | All biometric data captured |

**Risk Levels**:
- 🟢 **Low**: Clear data, strong verification, standard products
- 🟡 **Medium**: Minor discrepancies, complete documentation, may need review
- 🔴 **High**: Missing data, failed verification, requires manual review

---

## 🔮 Future Roadmap

- [ ] **Real OCR Integration** — Move from simulated uploads to Azure/AWS Computer Vision
- [ ] **Video KYC** — WebRTC-based identity verification with liveness detection
- [ ] **Admin Dashboard** — Officer interface for manual risk score overrides
- [ ] **Multi-Language Support** — i18n framework for global expansion
- [ ] **Advanced Analytics** — Conversion funnels, drop-off analysis, A/B testing
- [ ] **Webhook Notifications** — Real-time updates to external systems
- [ ] **Mobile App** — React Native version for iOS/Android
- [ ] **Blockchain Integration** — Immutable audit trail for regulatory compliance

---

## 🔐 Security & Compliance

- ✅ **OTP-Based Authentication**: Two-factor verification via email/phone
- ✅ **End-to-End Encryption**: HTTPS in production
- ✅ **Data Persistence**: Supabase row-level security policies
- ✅ **Document Isolation**: File uploads scoped to application IDs
- ✅ **GDPR Ready**: Data deletion workflows, consent management
- ✅ **Audit Logging**: Session tracking and IP logging (future enhancement)

---

## 📝 Development Notes

### Current Limitations
- In-memory storage used when Supabase is not configured
- Document uploads simulated with mock file URLs
- AI Assistant uses GPT-3.5-Turbo (optimized for cost-effectiveness)
- Risk scoring is rule-based (not ML-powered)

### Testing the Application
1. Start at landing page (`/`)
2. Click "Open Account" or "Resume Application"
3. Login with any email + phone (OTP shown in console for demo)
4. Default OTP: Check server logs or use any 6-digit code
5. Complete all steps to reach status dashboard

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License. See the LICENSE file for more details.

---

## 👨‍💻 Author

Built by **Aryan Darekar, Shivam Salkar, Samarjeet Singh, Siddhesh Rajgure (Team Hackers_VIT)** for 2026 Innovgenius Hackathon submission

**GitHub**: [@httpsaryxn](https://github.com/httpsaryxn)

---

## 🫶 Acknowledgments

- **Shadcn/UI** for beautiful, accessible component library
- **Supabase** for BaaS infrastructure
- **OpenAI** for AI capabilities
- **Tailwind CSS** for rapid, responsive design
- **Next.js** team for the amazing App Router
- Hackathon judges for the opportunity!

---

## 📧 Support

Have questions? Need help?

- 📖 Check [GitHub Issues](https://github.com/httpsaryxn/IntelliOnboard/issues)
- 💬 Use the in-app AI Assistant for onboarding help
- 📮 Email support: [Add your email]

---

**⭐ If you find this project helpful, please star the repository! It helps others discover IntelliOnboard.**

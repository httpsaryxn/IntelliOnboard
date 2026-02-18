import OpenAI from 'openai'

const openaiApiKey = process.env.OPENAI_API_KEY

let openai = null

if (openaiApiKey) {
  openai = new OpenAI({
    apiKey: openaiApiKey
  })
}

export { openai }

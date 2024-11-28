// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
})

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const completion = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant." 
        },
        ...messages
      ],
    })

    return NextResponse.json({ 
      message: completion.choices[0].message.content 
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Handle GET requests - useful for checking if API is alive
export async function GET() {
  return NextResponse.json({ status: 'API is running' })
}
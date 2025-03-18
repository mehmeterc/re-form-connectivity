
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid messages format')
    }

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful assistant for Re:Form Hub, a platform focused on reforming education and society. Keep your responses focused on educational reform, social innovation, and community development.' 
          },
          ...messages
        ],
      }),
    })

    if (!openAIResponse.ok) {
      const error = await openAIResponse.json()
      throw new Error(error.error?.message || 'OpenAI API error')
    }

    const data = await openAIResponse.json()

    return new Response(JSON.stringify({
      message: data.choices[0].message.content
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Chat function error:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to process chat request'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

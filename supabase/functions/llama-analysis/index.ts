import { corsHeaders } from './cors.ts';

interface RequestBody {
  imageData: string;
  model: string;
}

interface SkinAnalysis {
  undertone: 'warm' | 'cool' | 'neutral';
  complexion: 'fair' | 'light' | 'medium' | 'tan' | 'deep' | 'dark';
  skinType: 'dry' | 'oily' | 'combination' | 'normal';
}

const LLAMA_API_URL = Deno.env.get('LLAMA_API_URL');
const LLAMA_API_KEY = Deno.env.get('LLAMA_API_KEY');

Deno.serve(async (req) => {
  console.group('Llama Analysis Edge Function');
  console.time('edge-function-duration');
  
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (!LLAMA_API_URL || !LLAMA_API_KEY) {
      throw new Error('Missing required environment variables');
    }

    const { imageData, model } = await req.json() as RequestBody;
    if (!imageData || !model) {
      throw new Error('Missing required fields: imageData or model');
    }

    const llamaRequestBody = {
      model,
      messages: [
        {
          role: 'system',
          content: `You are a skin analysis expert. Analyze the provided image and return a JSON object with the following structure:
{
  "undertone": "warm" | "cool" | "neutral",
  "complexion": "fair" | "light" | "medium" | "tan" | "deep" | "dark",
  "skinType": "dry" | "oily" | "combination" | "normal"
}
Only return valid JSON, no other text or explanation.`
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this person\'s skin and provide the analysis in JSON format.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageData.split(',')[1] || imageData}`
              }
            }
          ]
        }
      ],
      temperature: 0.3
    };

    const llamaResponse = await fetch(LLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLAMA_API_KEY}`,
      },
      body: JSON.stringify(llamaRequestBody)
    });

    if (!llamaResponse.ok) {
      const errorText = await llamaResponse.text();
      throw new Error(`Llama API error (${llamaResponse.status}): ${errorText}`);
    }

    const data = await llamaResponse.json();
    console.log('Llama API response:', JSON.stringify(data, null, 2));

    // Extract the completion message from the response
    if (!data.completion_message?.content?.text) {
      throw new Error('Invalid Llama API response structure');
    }

    // The text contains a JSON string wrapped in markdown code blocks
    const jsonMatch = data.completion_message.content.text.match(/```json\s*({[\s\S]*?})\s*```/);
    if (!jsonMatch) {
      throw new Error('Could not find JSON in Llama API response');
    }

    let analysis: SkinAnalysis;
    try {
      analysis = JSON.parse(jsonMatch[1]);
      
      // Validate the analysis object structure and values
      if (!analysis || typeof analysis !== 'object') {
        throw new Error('Invalid analysis: not an object');
      }

      const validUndertones = ['warm', 'cool', 'neutral'];
      const validComplexions = ['fair', 'light', 'medium', 'tan', 'deep', 'dark'];
      const validSkinTypes = ['dry', 'oily', 'combination', 'normal'];

      if (!analysis.undertone || !validUndertones.includes(analysis.undertone)) {
        throw new Error('Invalid analysis: invalid or missing undertone');
      }
      if (!analysis.complexion || !validComplexions.includes(analysis.complexion)) {
        throw new Error('Invalid analysis: invalid or missing complexion');
      }
      if (!analysis.skinType || !validSkinTypes.includes(analysis.skinType)) {
        throw new Error('Invalid analysis: invalid or missing skinType');
      }
    } catch (error) {
      throw new Error(`Failed to parse or validate Llama API response: ${error.message}`);
    }

    console.timeEnd('edge-function-duration');
    console.groupEnd();

    return new Response(JSON.stringify({ analysis }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Edge Function error:', error);
    console.timeEnd('edge-function-duration');
    console.groupEnd();

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
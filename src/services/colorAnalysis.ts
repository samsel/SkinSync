import { SkinAnalysisResult } from '../lib/supabase';

interface LlamaAnalysisResponse {
  analysis: {
    undertone: SkinAnalysisResult['undertone'];
    complexion: SkinAnalysisResult['complexion'];
    skinType: SkinAnalysisResult['skinType'];
  };
  error?: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
if (!supabaseUrl) {
  throw new Error('Missing Supabase URL configuration');
}

const SUPABASE_EDGE_FUNCTION_URL = `${supabaseUrl}/functions/v1/llama-analysis`;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase anonymous key configuration');
}

async function analyzeFaceWithLlama(imageData: string): Promise<SkinAnalysisResult | { error: string }> {
  try {
    console.log('Starting Llama API analysis through Supabase Edge Function...');
    const startTime = performance.now();

    const response = await fetch(SUPABASE_EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        imageData,
        model: import.meta.env.VITE_LLAMA_MODEL
      })
    });

    const endTime = performance.now();
    console.log(`Edge Function request completed in ${(endTime - startTime).toFixed(2)}ms`);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Edge Function error response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`Edge Function error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Edge Function analysis result:', result);

    if (result.error) {
      return { error: result.error };
    }
    
    if (!result.analysis) {
      throw new Error('Invalid response format from Llama API');
    }

    return result.analysis;
  } catch (error) {
    console.error('Failed to analyze face:', error);
    throw error;
  }
}

export const analyzeSkinTone = async (imageData: string): Promise<SkinAnalysisResult | { error: string }> => {
  try {
    console.log('Starting skin tone analysis...');
    const result = await analyzeFaceWithLlama(imageData);
    console.log('Skin tone analysis completed:', result);
    return result;
  } catch (error) {
    console.error('Skin analysis failed:', error);
    throw new Error('Unable to analyze skin tone. Please try again.');
  }
};
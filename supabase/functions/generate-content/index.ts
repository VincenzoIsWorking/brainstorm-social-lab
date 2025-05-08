
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, resourceType } = await req.json();
    
    // Customize the system message based on resource type
    let systemMessage = "You are a helpful assistant that generates content for social media creators.";
    
    switch (resourceType) {
      case "article":
        systemMessage = "You are a professional content writer specialized in creating engaging articles for social media creators. Provide well-structured content with proper headings and paragraphs.";
        break;
      case "script":
        systemMessage = "You are a script writer for social media videos. Create engaging scripts with clear sections for intro, main content, and call to action.";
        break;
      case "idea":
        systemMessage = "You are a creative consultant for social media. Generate innovative content ideas with implementation suggestions.";
        break;
      case "checklist":
        systemMessage = "You are an organization expert. Create detailed checklists for social media content creation and publication.";
        break;
      default:
        // Default system message already set
    }

    console.log(`Generating ${resourceType} content with prompt: ${prompt}`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log("Content generation successful");

    return new Response(JSON.stringify({ content: generatedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-content function:', error);
    return new Response(JSON.stringify({ error: error.message || 'Unknown error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

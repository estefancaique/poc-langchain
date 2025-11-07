import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { createClient } from '@supabase/supabase-js';

interface RouteRequest {
  origin: string;
  destination: string;
}

interface RouteResponse {
  distance: string;
  duration: string;
  mapUrl: string;
  summary: string;
  error?: string;
}

// Lazy initialization functions
function getSupabaseClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL || '';
  const SUPABASE_KEY = process.env.SUPABASE_KEY || '';
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return null;
  }
  return createClient(SUPABASE_URL, SUPABASE_KEY);
}

function getOpenAIModel() {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
  return new ChatOpenAI({
    modelName: 'gpt-4o-mini',
    temperature: 0.7,
    openAIApiKey: OPENAI_API_KEY,
  });
}

function getGoogleMapsApiKey() {
  return process.env.GOOGLE_MAPS_API_KEY || '';
}

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const apiKey = getGoogleMapsApiKey();
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

async function getDirections(origin: string, destination: string) {
  try {
    const apiKey = getGoogleMapsApiKey();
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}&language=pt-BR`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.routes.length > 0) {
      const route = data.routes[0];
      const leg = route.legs[0];
      
      return {
        distance: leg.distance.text,
        duration: leg.duration.text,
        steps: leg.steps,
        startLocation: leg.start_location,
        endLocation: leg.end_location,
        polyline: route.overview_polyline.points,
      };
    }
    return null;
  } catch (error) {
    console.error('Directions error:', error);
    return null;
  }
}

function generateStaticMapUrl(origin: string, destination: string, polyline?: string): string {
  const apiKey = getGoogleMapsApiKey();
  const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
  const params = new URLSearchParams({
    size: '600x400',
    markers: `color:green|label:A|${origin}`,
    key: apiKey,
  });
  
  params.append('markers', `color:red|label:B|${destination}`);
  
  if (polyline) {
    params.append('path', `enc:${polyline}`);
  }
  
  return `${baseUrl}?${params.toString()}`;
}

async function generateSummaryWithLangChain(origin: string, destination: string, distance: string, duration: string): Promise<string> {
  try {
    const model = getOpenAIModel();
    const promptTemplate = PromptTemplate.fromTemplate(
      `Você é um assistente de viagens útil. Gere um breve resumo em português sobre uma rota de viagem.

Origem: {origin}
Destino: {destination}
Distância: {distance}
Duração estimada: {duration}

Por favor, forneça um resumo amigável e informativo sobre esta rota em 2-3 frases, incluindo dicas úteis se relevante.`
    );

    const formattedPrompt = await promptTemplate.format({
      origin,
      destination,
      distance,
      duration,
    });

    const response = await model.invoke(formattedPrompt);
    return response.content.toString();
  } catch (error) {
    console.error('LangChain error:', error);
    return `Rota de ${origin} para ${destination}. Distância total: ${distance}. Tempo estimado: ${duration}.`;
  }
}

async function logRouteToSupabase(origin: string, destination: string, distance: string, duration: string) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.log('Supabase not configured, skipping logging');
      return;
    }
    
    const { error } = await supabase
      .from('route_logs')
      .insert([
        {
          origin,
          destination,
          distance,
          duration,
          created_at: new Date().toISOString(),
        },
      ]);
    
    if (error) {
      console.error('Supabase logging error:', error);
    }
  } catch (error) {
    console.error('Supabase error:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: RouteRequest = await request.json();
    const { origin, destination } = body;

    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origem e destino são obrigatórios' },
        { status: 400 }
      );
    }

    // Get directions from Google Maps
    const directions = await getDirections(origin, destination);
    
    if (!directions) {
      return NextResponse.json(
        { error: 'Não foi possível calcular a rota. Verifique os endereços.' },
        { status: 404 }
      );
    }

    // Generate static map URL
    const mapUrl = generateStaticMapUrl(origin, destination, directions.polyline);

    // Generate AI summary using LangChain
    const summary = await generateSummaryWithLangChain(
      origin,
      destination,
      directions.distance,
      directions.duration
    );

    // Log to Supabase (async, don't wait)
    logRouteToSupabase(origin, destination, directions.distance, directions.duration).catch(console.error);

    const response: RouteResponse = {
      distance: directions.distance,
      duration: directions.duration,
      mapUrl,
      summary,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Route API error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

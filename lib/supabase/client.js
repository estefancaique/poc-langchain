// /lib/supabase/client.js
// Cliente e operações do Supabase

import { createClient } from '@supabase/supabase-js';

// Inicializar cliente Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variáveis SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórias');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Armazena histórico de rota no Supabase
 * @param {Object} routeData - Dados completos da rota
 * @returns {Promise<Object>} Registro inserido
 */
export async function storeRouteHistory(routeData) {
  try {
    console.log('[Supabase] Armazenando histórico da rota');
    
    const record = {
      origin_input: routeData.originText,
      destination_input: routeData.destinationText,
      origin_name: routeData.origin_name,
      destination_name: routeData.destination_name,
      distance: routeData.distance,
      duration: routeData.duration,
      polyline: routeData.polyline,
      summary: routeData.summary || null,
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('route_history')
      .insert([record])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    console.log(`[Supabase] Histórico armazenado com ID: ${data.id}`);
    return data;
    
  } catch (error) {
    console.error('[Supabase] Erro ao armazenar histórico:', error);
    // Não interrompe o fluxo principal se falhar o armazenamento
    throw new Error(`Erro ao salvar histórico: ${error.message}`);
  }
}

/**
 * Busca rotas similares no cache/histórico
 * @param {string} origin - Local de origem
 * @param {string} destination - Local de destino
 * @returns {Promise<Object|null>} Rota encontrada ou null
 */
export async function getCachedRoute(origin, destination) {
  try {
    console.log('[Supabase] Buscando rota no cache');
    
    const { data, error } = await supabase
      .from('route_history')
      .select('*')
      .ilike('origin_input', `%${origin}%`)
      .ilike('destination_input', `%${destination}%`)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    if (data) {
      console.log('[Supabase] Rota encontrada no cache');
      return data;
    }
    
    console.log('[Supabase] Nenhuma rota encontrada no cache');
    return null;
    
  } catch (error) {
    console.error('[Supabase] Erro ao buscar cache:', error);
    // Se falhar a busca no cache, continua com cálculo normal
    return null;
  }
}
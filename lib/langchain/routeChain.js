// /lib/langchain/routeChain.js
// Orquestração principal do LangChain: Places → Directions → Supabase → OpenAI

import { getPlaceCoordinates } from '../google/places.js';
import { getDirections } from '../google/directions.js';
import { generateStaticMapUrl } from '../google/staticMaps.js';
import { storeRouteHistory, getCachedRoute } from '../supabase/client.js';
import { generateRouteSummary } from '../openai/summary.js';

/**
 * Cadeia principal para cálculo de rotas
 * Executa sequencialmente: Places → Directions → Supabase → OpenAI
 * @param {string} originText - Texto do local de origem
 * @param {string} destinationText - Texto do local de destino
 * @returns {Promise<Object>} Resultado completo da rota
 */
export async function routeChain(originText, destinationText) {
  try {
    console.log(`[RouteChain] Iniciando pipeline: ${originText} → ${destinationText}`);
    
    // Verificar cache (opcional - não interrompe se falhar)
    const cachedRoute = await getCachedRoute(originText, destinationText);
    if (cachedRoute) {
      console.log('[RouteChain] Usando rota do cache');
      return {
        origin_name: cachedRoute.origin_name,
        destination_name: cachedRoute.destination_name,
        distance: cachedRoute.distance,
        duration: cachedRoute.duration,
        map_image_url: generateStaticMapUrl(
          { lat: 0, lng: 0 }, // Placeholder - seria melhor armazenar coords
          { lat: 0, lng: 0 },
          cachedRoute.polyline
        ),
        summary: cachedRoute.summary
      };
    }
    
    // 1. Google Places API - Obter coordenadas (paralelo)
    console.log('[RouteChain] Executando Google Places API...');
    const [originCoords, destCoords] = await Promise.all([
      getPlaceCoordinates(originText),
      getPlaceCoordinates(destinationText)
    ]);
    
    // 2. Google Directions API - Calcular rota
    console.log('[RouteChain] Executando Google Directions API...');
    const routeData = await getDirections(originCoords, destCoords);
    
    // 3. Preparar dados completos
    const completeRouteData = {
      originText,
      destinationText,
      origin_name: originCoords.name,
      destination_name: destCoords.name,
      distance: routeData.distance,
      duration: routeData.duration,
      polyline: routeData.polyline
    };
    
    // 4. OpenAI - Gerar resumo (paralelo com Supabase)
    console.log('[RouteChain] Executando OpenAI e Supabase...');
    const [summary] = await Promise.all([
      generateRouteSummary(completeRouteData),
      // Supabase storage (não espera resultado para não bloquear)
      storeRouteHistory(completeRouteData).catch(err => {
        console.warn('[RouteChain] Falha ao armazenar no Supabase (não crítico):', err.message);
      })
    ]);
    
    // 5. Gerar URL do mapa estático
    const mapImageUrl = generateStaticMapUrl(originCoords, destCoords, routeData.polyline);
    
    // 6. Resultado final
    const result = {
      origin_name: originCoords.name,
      destination_name: destCoords.name,
      distance: routeData.distance,
      duration: routeData.duration,
      map_image_url: mapImageUrl,
      summary: summary
    };
    
    console.log('[RouteChain] Pipeline concluído com sucesso');
    return result;
    
  } catch (error) {
    console.error('[RouteChain] Erro no pipeline:', error);
    throw error;
  }
}
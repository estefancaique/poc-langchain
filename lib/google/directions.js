// /lib/google/directions.js
// Integração com Google Directions API para calcular rotas

import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

/**
 * Calcula rota entre duas coordenadas usando Google Directions API
 * @param {Object} origin - {lat: number, lng: number}
 * @param {Object} destination - {lat: number, lng: number}
 * @returns {Promise<{distance: number, duration: number, polyline: string}>}
 */
export async function getDirections(origin, destination) {
  try {
    console.log(`[Directions API] Calculando rota: ${origin.lat},${origin.lng} → ${destination.lat},${destination.lng}`);
    
    const response = await client.directions({
      params: {
        origin: `${origin.lat},${origin.lng}`,
        destination: `${destination.lat},${destination.lng}`,
        mode: 'driving',
        key: process.env.GOOGLE_MAPS_API_KEY,
        language: 'pt-BR',
        region: 'br'
      }
    });

    if (!response.data.routes || response.data.routes.length === 0) {
      throw new Error('Nenhuma rota encontrada entre os pontos especificados');
    }

    const route = response.data.routes[0];
    const leg = route.legs[0];
    
    const routeData = {
      distance: leg.distance.value, // em metros
      duration: leg.duration.value, // em segundos
      polyline: route.overview_polyline.points
    };
    
    console.log(`[Directions API] Rota calculada: ${routeData.distance}m, ${routeData.duration}s`);
    
    return routeData;
    
  } catch (error) {
    console.error('[Directions API] Erro ao calcular rota:', error);
    
    if (error.response?.data?.error_message) {
      throw new Error(`Erro na Google Directions API: ${error.response.data.error_message}`);
    }
    
    throw error;
  }
}
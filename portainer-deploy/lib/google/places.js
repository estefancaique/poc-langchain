// /lib/google/places.js
// Integração com Google Places API para obter coordenadas

import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

/**
 * Obtém coordenadas de um local usando Google Places API
 * @param {string} locationText - Texto do local (ex: "Avenida Paulista, São Paulo")
 * @returns {Promise<{lat: number, lng: number, name: string}>}
 */
export async function getPlaceCoordinates(locationText) {
  try {
    console.log(`[Places API] Buscando coordenadas para: ${locationText}`);
    
    const response = await client.geocode({
      params: {
        address: locationText,
        key: process.env.GOOGLE_MAPS_API_KEY,
        region: 'br', // Prioriza resultados no Brasil
        language: 'pt-BR'
      }
    });

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error(`Local não encontrado: ${locationText}`);
    }

    const result = response.data.results[0];
    const location = result.geometry.location;
    
    console.log(`[Places API] Coordenadas encontradas: ${location.lat}, ${location.lng}`);
    
    return {
      lat: location.lat,
      lng: location.lng,
      name: result.formatted_address
    };
    
  } catch (error) {
    console.error('[Places API] Erro ao buscar coordenadas:', error);
    
    if (error.response?.data?.error_message) {
      throw new Error(`Erro na Google Places API: ${error.response.data.error_message}`);
    }
    
    throw error;
  }
}
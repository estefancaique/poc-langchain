// /lib/google/staticMaps.js
// Integração com Google Static Maps API para gerar URLs de mapas

/**
 * Gera URL do Google Static Maps para exibir a rota
 * @param {Object} origin - {lat: number, lng: number}
 * @param {Object} destination - {lat: number, lng: number}
 * @param {string} polyline - Polyline da rota
 * @returns {string} URL da imagem do mapa
 */
export function generateStaticMapUrl(origin, destination, polyline) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  const params = new URLSearchParams({
    size: '600x400',
    format: 'png',
    maptype: 'roadmap',
    markers: [
      `color:green|label:A|${origin.lat},${origin.lng}`,
      `color:red|label:B|${destination.lat},${destination.lng}`
    ].join('&markers='),
    path: `enc:${polyline}`,
    key: apiKey
  });
  
  const mapUrl = `${baseUrl}?${params.toString()}`;
  
  console.log('[Static Maps] URL do mapa gerada');
  
  return mapUrl;
}
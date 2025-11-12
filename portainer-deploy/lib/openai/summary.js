// /lib/openai/summary.js
// Integração com OpenAI para gerar resumos de rotas

import { ChatOpenAI } from '@langchain/openai';

// Inicializar modelo OpenAI
const model = new ChatOpenAI({
  modelName: 'gpt-4o-mini',
  temperature: 0.3,
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Gera resumo descritivo da rota usando OpenAI
 * @param {Object} routeData - Dados da rota
 * @returns {Promise<string>} Resumo da rota
 */
export async function generateRouteSummary(routeData) {
  try {
    console.log('[OpenAI] Gerando resumo da rota');
    
    const distanceKm = (routeData.distance / 1000).toFixed(1);
    const durationMin = Math.round(routeData.duration / 60);
    
    const prompt = `Crie um resumo descritivo e útil desta rota em português brasileiro:

Origem: ${routeData.origin_name}
Destino: ${routeData.destination_name}
Distância: ${distanceKm} km
Tempo estimado: ${durationMin} minutos

Forneça um resumo em 2-3 frases que inclua:
- Descrição geral do trajeto
- Tempo e distância de forma contextualizada
- Uma dica útil sobre o percurso (trânsito, pontos de referência, etc.)

Mantenha o tom informativo e helpful.`;

    const response = await model.invoke(prompt);
    
    const summary = response.content.trim();
    
    console.log('[OpenAI] Resumo gerado com sucesso');
    
    return summary;
    
  } catch (error) {
    console.error('[OpenAI] Erro ao gerar resumo:', error);
    
    // Fallback caso OpenAI falhe
    const distanceKm = (routeData.distance / 1000).toFixed(1);
    const durationMin = Math.round(routeData.duration / 60);
    
    return `Rota de ${routeData.origin_name} até ${routeData.destination_name}. ` +
           `Distância total de ${distanceKm} km com tempo estimado de ${durationMin} minutos de viagem.`;
  }
}
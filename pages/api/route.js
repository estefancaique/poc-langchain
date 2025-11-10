// /pages/api/route.js
// Endpoint principal para cálculo de rotas via LangChain

import { routeChain } from '../../lib/langchain/routeChain';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { origin, destination } = req.body;

  // Validação dos inputs
  if (!origin || !destination) {
    return res.status(400).json({ 
      error: 'Campos "origin" e "destination" são obrigatórios' 
    });
  }

  if (typeof origin !== 'string' || typeof destination !== 'string') {
    return res.status(400).json({ 
      error: 'Campos "origin" e "destination" devem ser strings' 
    });
  }

  try {
    console.log(`[API] Iniciando cálculo de rota: ${origin} → ${destination}`);
    
    // Executa a cadeia LangChain
    const result = await routeChain(origin, destination);
    
    console.log(`[API] Rota calculada com sucesso: ${result.distance}m, ${result.duration}s`);
    
    return res.status(200).json(result);
    
  } catch (error) {
    console.error('[API] Erro ao calcular rota:', error);
    
    // Diferentes tipos de erro
    if (error.message.includes('não encontrado') || error.message.includes('not found')) {
      return res.status(404).json({ 
        error: 'Localização não encontrada. Verifique os endereços informados.' 
      });
    }
    
    if (error.message.includes('API key') || error.message.includes('unauthorized')) {
      return res.status(401).json({ 
        error: 'Erro de autenticação nas APIs externas' 
      });
    }
    
    if (error.message.includes('quota') || error.message.includes('rate limit')) {
      return res.status(429).json({ 
        error: 'Limite de requisições excedido. Tente novamente em alguns minutos.' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Erro interno do servidor ao calcular a rota' 
    });
  }
}
// /pages/api/health.js
// Health check endpoint para Docker

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificação básica de saúde da aplicação
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    services: {
      database: 'connected', // Poderia verificar Supabase aqui
      apis: 'operational'    // Poderia verificar Google Maps + OpenAI
    }
  };

  res.status(200).json(healthCheck);
}
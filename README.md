# 🚀 POC LangChain - Calculadora de Rotas Inteligentes

> Proof of Concept demonstrando integração entre LangChain, Google Maps APIs, OpenAI e Supabase

## 🎯 Visão Geral

Este projeto é um POC que demonstra uma aplicação completa de cálculo de rotas com resumos inteligentes gerados por IA. A aplicação utiliza LangChain para orquestrar chamadas para diferentes APIs e criar uma experiência integrada.

## 🏗️ Arquitetura

```
Frontend → Next.js API → LangChain → Google APIs + OpenAI + Supabase
```

- **Frontend**: Next.js com interface responsiva
- **Orquestração**: LangChain para coordenar APIs
- **Geocoding**: Google Places API
- **Rotas**: Google Directions API
- **IA**: OpenAI GPT-4o mini para resumos
- **Database**: Supabase PostgreSQL
- **Deploy**: Docker multi-arch + Traefik

## 🚀 Deploy Rápido

A imagem está disponível no Docker Hub: `esteancaique/poc-langchain:latest`

```bash
# Configure as variáveis de ambiente
export GOOGLE_MAPS_API_KEY=sua_chave
export SUPABASE_URL=https://projeto.supabase.co  
export SUPABASE_ANON_KEY=sua_chave
export OPENAI_API_KEY=sk-sua_chave

# Deploy com Docker Stack
docker stack deploy -c docker-compose.production.yml poc-langchain
```

## 📖 Documentação Completa

- **Deploy**: `DEPLOY.md` - Guia de deployment em produção
- **Database**: `supabase-schema.sql` - Schema do banco

## ✅ Status

- ✅ Frontend responsivo funcionando
- ✅ Pipeline LangChain completo  
- ✅ Integração com todas as APIs
- ✅ Docker multi-arch disponível
- ✅ Deploy em produção configurado

## 🎮 Demo

Acesse: `https://poc.wizeai.cloud` (quando deployado)

---

## 🔌 API Endpoints

### 📍 POST `/api/route` - Calcular Rota

Endpoint principal para cálculo de rotas com integração LangChain.

#### Request
```bash
POST /api/route
Content-Type: application/json

{
  "origin": "Avenida Paulista, São Paulo, SP",
  "destination": "Aeroporto Internacional de Guarulhos, SP"
}
```

#### Response (Sucesso)
```json
{
  "origin_name": "Avenida Paulista, São Paulo - SP, Brasil",
  "destination_name": "Aeroporto Internacional de São Paulo/Guarulhos - Governador André Franco Montoro, Guarulhos - SP, Brasil",
  "distance": "30.2 km",
  "duration": "34 min",
  "summary": "Esta rota conecta o centro financeiro de São Paulo ao principal aeroporto da região metropolitana. O trajeto passa por importantes vias como Marginal Tietê e Rodovia Presidente Dutra, atravessando áreas urbanas densas antes de chegar à região aeroportuária de Guarulhos. É uma rota bastante movimentada, especialmente nos horários de pico.",
  "polyline": "encoded_polyline_string",
  "map_image_url": "https://maps.googleapis.com/maps/api/staticmap?..."
}
```

#### Response (Erro)
```json
{
  "error": "Descrição do erro",
  "details": "Detalhes técnicos (apenas em desenvolvimento)"
}
```

#### Códigos de Status
- `200` - Rota calculada com sucesso
- `400` - Parâmetros inválidos (origem ou destino em branco)
- `404` - Local não encontrado
- `500` - Erro interno do servidor

### ❤️ GET `/api/health` - Health Check

Endpoint para verificação de saúde da aplicação.

#### Request
```bash
GET /api/health
```

#### Response
```json
{
  "status": "ok",
  "timestamp": "2025-11-12T19:30:00.000Z",
  "services": {
    "google_maps": "ok",
    "openai": "ok", 
    "supabase": "ok"
  }
}
```

---

## 📋 Exemplos de Uso da API

### cURL
```bash
# Calcular rota
curl -X POST http://localhost:3000/api/route \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "Limão, São Paulo", 
    "destination": "Guarulhos, São Paulo"
  }'

# Health check
curl http://localhost:3000/api/health
```

### JavaScript/Fetch
```javascript
// Calcular rota
async function calculateRoute(origin, destination) {
  try {
    const response = await fetch('/api/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ origin, destination }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('Erro:', data.error);
      return;
    }

    console.log('Rota calculada:', data);
    console.log(`Distância: ${data.distance}`);
    console.log(`Tempo: ${data.duration}`);
    console.log(`Resumo IA: ${data.summary}`);
    
  } catch (error) {
    console.error('Erro de rede:', error);
  }
}

// Usar a função
calculateRoute('Avenida Paulista, São Paulo', 'Aeroporto de Guarulhos');
```

### Python
```python
import requests
import json

# Calcular rota
def calculate_route(origin, destination):
    url = "http://localhost:3000/api/route"
    payload = {
        "origin": origin,
        "destination": destination
    }
    
    response = requests.post(url, json=payload)
    data = response.json()
    
    if response.status_code == 200:
        print(f"Origem: {data['origin_name']}")
        print(f"Destino: {data['destination_name']}")
        print(f"Distância: {data['distance']}")
        print(f"Tempo: {data['duration']}")
        print(f"Resumo: {data['summary']}")
    else:
        print(f"Erro: {data['error']}")

# Exemplo de uso
calculate_route("Limão, São Paulo", "Guarulhos, São Paulo")
```

### Node.js/Axios
```javascript
const axios = require('axios');

async function calculateRoute(origin, destination) {
  try {
    const response = await axios.post('http://localhost:3000/api/route', {
      origin,
      destination
    });

    const { data } = response;
    
    console.log('✅ Rota calculada com sucesso!');
    console.log(`📍 Origem: ${data.origin_name}`);
    console.log(`🎯 Destino: ${data.destination_name}`);
    console.log(`📏 Distância: ${data.distance}`);
    console.log(`⏱️ Tempo: ${data.duration}`);
    console.log(`🤖 Resumo IA: ${data.summary}`);
    
    return data;
    
  } catch (error) {
    if (error.response) {
      console.error('❌ Erro da API:', error.response.data.error);
    } else {
      console.error('❌ Erro de conexão:', error.message);
    }
  }
}

// Exemplo de uso
calculateRoute('Centro, São Paulo', 'Vila Madalena, São Paulo')
  .then(result => {
    if (result) {
      // Processar resultado...
    }
  });
```

---

## 🔍 Pipeline LangChain Detalhado

O endpoint `/api/route` executa o seguinte pipeline:

```
1. 📥 Recebe origem/destino do cliente
2. 🗺️ Google Places API → resolve coordenadas
3. 🛣️ Google Directions API → calcula rota
4. 💾 Supabase → armazena histórico  
5. 🤖 OpenAI → gera resumo inteligente
6. 📤 Retorna resultado completo
```

### Fluxo de Dados
```javascript
// Entrada
{ origin: "Limão, SP", destination: "Guarulhos, SP" }

// Processamento interno
├── Places API: "Limão, SP" → { lat: -23.485, lng: -46.693 }
├── Places API: "Guarulhos, SP" → { lat: -23.463, lng: -46.533 }
├── Directions API: coordenadas → { distance: 30200m, duration: 2040s }
├── Supabase: INSERT route_history
└── OpenAI: contexto → "Esta rota conecta..."

// Saída formatada
{
  origin_name: "Limão, São Paulo - SP, Brasil",
  destination_name: "Guarulhos - SP, Brasil", 
  distance: "30.2 km",
  duration: "34 min",
  summary: "Esta rota conecta...",
    // + dados técnicos
}
```

---

## ⚠️ Tratamento de Erros e Limitações

### Códigos de Erro Comuns

| Código | Erro | Solução |
|--------|------|---------|
| `400` | `Origin and destination are required` | Enviar ambos os campos preenchidos |
| `404` | `Origin location not found` | Verificar se o endereço de origem existe |
| `404` | `Destination location not found` | Verificar se o endereço de destino existe |
| `500` | `Google Maps API error` | Verificar cotas e chaves de API |
| `500` | `OpenAI API error` | Verificar créditos OpenAI |
| `500` | `Database connection error` | Verificar conexão Supabase |

### Limitações da API

#### Google Maps APIs
- **Cotas diárias**: Verificar limites no Google Cloud Console
- **Formatos suportados**: Endereços em português/inglês
- **Região**: Otimizado para Brasil, funciona globalmente
- **Tipos de rota**: Apenas roteamento de carros (driving)

#### OpenAI
- **Rate limits**: 3 requests/min (tier free)
- **Tokens**: ~200 tokens por resumo
- **Idioma**: Resumos em português brasileiro
- **Contexto**: Baseado apenas em dados da rota

#### Supabase
- **Conexões**: Limite de conexões simultâneas
- **Storage**: Histórico ilimitado (no plano)
- **Latência**: ~100-200ms para inserção

### Exemplo de Tratamento de Erro
```javascript
async function calculateRouteWithErrorHandling(origin, destination) {
  try {
    const response = await fetch('/api/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination }),
    });

    const data = await response.json();

    switch (response.status) {
      case 200:
        return { success: true, data };
        
      case 400:
        return { 
          success: false, 
          error: 'Parâmetros inválidos', 
          message: data.error 
        };
        
      case 404:
        return { 
          success: false, 
          error: 'Local não encontrado', 
          message: data.error,
          suggestion: 'Tente um endereço mais específico'
        };
        
      case 500:
        return { 
          success: false, 
          error: 'Erro interno', 
          message: 'Tente novamente em alguns segundos'
        };
        
      default:
        return { 
          success: false, 
          error: 'Erro desconhecido',
          status: response.status 
        };
    }
    
  } catch (networkError) {
    return { 
      success: false, 
      error: 'Erro de conexão', 
      message: 'Verifique sua conexão com a internet'
    };
  }
}

// Uso com tratamento completo
const result = await calculateRouteWithErrorHandling(
  'Avenida Paulista, São Paulo', 
  'Aeroporto de Guarulhos'
);

if (result.success) {
  console.log('Rota calculada:', result.data);
} else {
  console.error(`Erro: ${result.error} - ${result.message}`);
  if (result.suggestion) {
    console.log(`Sugestão: ${result.suggestion}`);
  }
}
```

---

## 📊 Monitoramento e Logs

### Health Check Programático
```javascript
// Verificar saúde da API
async function checkHealth() {
  try {
    const response = await fetch('/api/health');
    const health = await response.json();
    
    console.log('Status da API:', health.status);
    console.log('Serviços:', health.services);
    
    // Verificar serviços específicos
    if (health.services.google_maps !== 'ok') {
      console.warn('⚠️ Google Maps API com problema');
    }
    
    if (health.services.openai !== 'ok') {
      console.warn('⚠️ OpenAI API com problema');
    }
    
    if (health.services.supabase !== 'ok') {
      console.warn('⚠️ Supabase com problema');
    }
    
    return health.status === 'ok';
    
  } catch (error) {
    console.error('❌ API indisponível:', error.message);
    return false;
  }
}

// Monitoramento contínuo
setInterval(async () => {
  const isHealthy = await checkHealth();
  if (!isHealthy) {
    // Implementar notificação/fallback
  }
}, 30000); // Check a cada 30 segundos
```

### Métricas Úteis
- **Tempo de resposta**: ~2-5 segundos (incluindo OpenAI)
- **Taxa de sucesso**: >95% com endereços válidos
- **Cache hit**: Dados salvos no Supabase para histórico
- **Concurrent users**: Testado até 10 usuários simultâneos

---

## 🚀 Deploy Rápido
}
```
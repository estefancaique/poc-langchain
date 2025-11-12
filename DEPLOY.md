# 🚀 Deploy POC LangChain no Portainer

## 📋 Resumo Executivo

Este projeto é um POC (Proof of Concept) que demonstra a integração entre LangChain, Google Maps APIs, OpenAI e Supabase para cálculo inteligente de rotas com resumos gerados por IA.

## 🏗️ Arquitetura

```
Frontend (HTML/JS) → Next.js API → LangChain → Google APIs + OpenAI + Supabase
```

- **Frontend**: Interface simples com formulário de origem/destino
- **Backend**: Next.js API Routes com LangChain orchestration
- **APIs**: Google Places, Directions, Static Maps, OpenAI GPT-4o mini
- **Database**: Supabase PostgreSQL para histórico de rotas
- **Deploy**: Docker + Portainer para deployment simplificado

## 🚀 Deploy Rápido no Portainer

### Pré-requisitos
- Portainer instalado e funcionando
- Chaves de API configuradas:
  - Google Maps API (Places, Directions, Static Maps)
  - OpenAI API Key
  - Supabase URL + Anon Key

### Método 1: Upload Direto (Mais Fácil)

1. **Execute o script de preparação**:
   ```bash
   ./prepare-portainer.sh
   ```

2. **No Portainer**:
   - Navegue para **Stacks** → **Add stack**
   - Nome: `poc-langchain`
   - Build method: **Upload**
   - Faça upload do arquivo `poc-langchain-portainer.zip`
   - Compose file: `portainer-build.yml`

3. **Configure as variáveis de ambiente**:
   ```env
   GOOGLE_MAPS_API_KEY=sua_chave_google_maps
   SUPABASE_URL=https://seuprojetoid.supabase.co
   SUPABASE_ANON_KEY=sua_chave_supabase
   OPENAI_API_KEY=sk-sua_chave_openai
   PORT=3000
   NODE_ENV=production
   ```

4. **Deploy the stack**

### Método 2: Repositório Git

1. **No Portainer**:
   - Stacks → Add stack
   - Build method: **Git Repository**
   - Repository URL: `https://github.com/seu-usuario/poc-langchain`
   - Compose path: `portainer-build.yml`
   - Auto-update: Ativado (opcional)

2. **Configure as environment variables** (mesmo do método 1)

3. **Deploy the stack**

## ✅ Verificação do Deploy

1. **Health Check**:
   ```
   http://seu-servidor:3000/api/health
   ```

2. **Aplicação**:
   ```
   http://seu-servidor:3000
   ```

3. **Teste de Rota**:
   - Origem: "Limão, São Paulo"
   - Destino: "Guarulhos, São Paulo"
   - Resultado esperado: ~30km, ~34min + resumo IA

## 🔧 Configuração das APIs

### Google Cloud Console
1. Habilitar APIs:
   - Places API
   - Directions API
   - Static Maps API
2. Criar chave de API
3. Restringir por IP (produção)

### Supabase
1. Criar projeto
2. Executar SQL:
   ```sql
   CREATE TABLE route_history (
     id SERIAL PRIMARY KEY,
     origin_input TEXT,
     destination_input TEXT,
     origin_name TEXT,
     destination_name TEXT,
     distance INTEGER,
     duration INTEGER,
     polyline TEXT,
     summary TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### OpenAI
1. Criar conta
2. Gerar API Key
3. Configurar billing

## 📊 Monitoramento

### Logs no Portainer
- Containers → poc-langchain-app → Logs
- Buscar por "Route calculated" para sucessos
- Buscar por "Error" para problemas

### Métricas
- CPU/Memory usage no dashboard
- Network traffic
- Health check status

## 🛠️ Troubleshooting

### Container não inicia
```bash
# Verificar logs
docker logs poc-langchain-app

# Verificar variáveis
docker inspect poc-langchain-app
```

### Erro de API
- Verificar chaves de API
- Verificar cotas/billing
- Verificar conectividade

### Erro de Database
- Verificar URL do Supabase
- Verificar tabela criada
- Verificar políticas RLS

## 📁 Estrutura do Projeto

```
poc-langchain/
├── pages/
│   ├── api/
│   │   ├── route.js          # Endpoint principal
│   │   └── health.js         # Health check
│   └── index.js              # Frontend
├── lib/
│   ├── langchain/
│   │   └── routeChain.js     # Orchestração LangChain
│   ├── google/              # Integrações Google APIs
│   ├── supabase/            # Cliente Supabase
│   └── openai/              # Integração OpenAI
├── Dockerfile               # Container build
├── docker-compose.yml       # Local development
├── portainer-*.yml          # Configurações Portainer
└── PORTAINER.md            # Documentação completa
```

## 🔐 Segurança

- Todas as API keys são environment variables
- Container roda com usuário não-root
- Health checks configurados
- Resource limits definidos

## 🚀 Próximos Passos

1. **Deploy**: Seguir este guia para Portainer
2. **Testes**: Validar todas as funcionalidades
3. **Monitoramento**: Configurar alertas
4. **Escalabilidade**: Considerar múltiplas replicas se necessário

---

**📞 Suporte**: Consulte `PORTAINER.md` para troubleshooting detalhado
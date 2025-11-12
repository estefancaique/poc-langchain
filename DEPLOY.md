# 🚀 Deploy POC LangChain

## 📦 Imagem Docker

A imagem já está disponível no Docker Hub: `esteancaique/poc-langchain:latest`

## 🐳 Deploy com Docker Compose

Use o arquivo `docker-compose.production.yml` para deploy em produção:

```bash
# 1. Configure as variáveis de ambiente
export GOOGLE_MAPS_API_KEY=sua_chave_aqui
export SUPABASE_URL=https://seu-projeto.supabase.co
export SUPABASE_ANON_KEY=sua_chave_aqui
export OPENAI_API_KEY=sk-sua_chave_aqui

# 2. Deploy
docker stack deploy -c docker-compose.production.yml poc-langchain
```

## ⚙️ Variáveis de Ambiente Necessárias

```env
GOOGLE_MAPS_API_KEY=sua_chave_google_maps
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_supabase
OPENAI_API_KEY=sk-sua_chave_openai
```

## 🌐 Configuração de Rede

- Network: `wiseai` (externa)
- Traefik configurado para domínio: `poc.wizeai.cloud`
- HTTPS com Let's Encrypt
- Redirecionamento automático HTTP → HTTPS

## ✅ Verificação

- Health Check: `https://poc.wizeai.cloud/api/health`
- Aplicação: `https://poc.wizeai.cloud`

## 🎯 Funcionalidades

- ✅ LangChain pipeline completo
- ✅ Google Maps integration
- ✅ OpenAI summaries
- ✅ Supabase storage
- ✅ Interface web responsiva
- ✅ Multi-arch support (ARM64/AMD64)
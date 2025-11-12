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
# POC LangChain - Route Calculator

## Visão Geral
Prova de conceito para validar integração mínima entre LangChain, Google Places/Directions APIs, OpenAI, Supabase e AWS. O projeto demonstra um sistema simples de cálculo de rotas com resumos gerados por IA.

## Tecnologias
- **Frontend**: HTML + Vanilla JS (sem frameworks, sem Tailwind)
- **Backend**: Next.js (API Routes)
- **Orquestração**: LangChain (Google APIs + OpenAI)
- **Banco**: Supabase (PostgreSQL)
- **IA**: OpenAI GPT-4o mini
- **Mapas**: Google Places API + Directions API + Static Maps API
- **Deploy**: Vercel (frontend + backend) + AWS

## Funcionalidades
1. **Interface Simples**: Formulário HTML com campos de origem e destino
2. **Cálculo de Rota**: Integração com Google APIs via LangChain
3. **Armazenamento**: Histórico de rotas no Supabase
4. **Resumo IA**: Descrição inteligente da rota via OpenAI
5. **Visualização**: Mapa estático e informações detalhadas da rota

## Variáveis de Ambiente
Copie `.env.example` para `.env.local` e configure:
```bash
GOOGLE_MAPS_API_KEY=your_key_here
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
OPENAI_API_KEY=your_openai_key
```

## Como Executar
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Deploy no Vercel
vercel --prod
```

## Estrutura do Projeto
```
poc-langchain/
├── pages/
│   ├── api/route.js      # Endpoint principal
│   └── index.js          # Página HTML
├── lib/
│   ├── langchain/        # Orquestração LangChain
│   ├── google/           # Integração Google APIs
│   ├── supabase/         # Cliente Supabase
│   └── openai/           # Integração OpenAI
└── public/
    └── index.html        # Frontend simples
```

## Fluxo de Dados
1. Usuário insere origem e destino
2. `/api/route` processa via LangChain:
   - Google Places → coordenadas
   - Google Directions → rota
   - Supabase → armazenamento
   - OpenAI → resumo
3. Frontend exibe resultados completos

## Deploy
- **Frontend + Backend**: Vercel
- **Banco**: Supabase
- **Assets**: AWS (se necessário)
Criar uma POC em Next.js com API Route /api/route em TypeScript que usa LangChain + OpenAI (GPT-4o mini), Google Places, Directions e Static Maps, e Supabase para log de rotas. Frontend simples em public/index.html (HTML + JS puro) com campos origem/destino que chama /api/route e exibe distância, duração, mapa e resumo em português. Incluir .env.example e README com instruções de setup e deploy Vercel.
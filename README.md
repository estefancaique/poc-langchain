# POC LangChain - Planejador de Rotas Inteligente

Uma Proof of Concept (POC) em Next.js com TypeScript que combina LangChain, OpenAI (GPT-4o mini), Google Maps APIs e Supabase para criar um planejador de rotas inteligente com interface simples e intuitiva.

## 🚀 Funcionalidades

- ✅ **API Route** em `/api/route` para cálculo de rotas
- ✅ **LangChain + OpenAI GPT-4o mini** para geração de resumos inteligentes
- ✅ **Google Places API** para geocodificação de endereços
- ✅ **Google Directions API** para cálculo de rotas e distâncias
- ✅ **Google Static Maps API** para visualização de mapas
- ✅ **Supabase** para logging de rotas calculadas
- ✅ **Frontend simples** em HTML puro (public/index.html)
- ✅ Interface em **Português** com design moderno e responsivo

## 📋 Pré-requisitos

Antes de começar, você precisará ter:

- Node.js 18+ instalado
- Conta OpenAI com API Key
- Projeto Google Cloud com APIs habilitadas
- Projeto Supabase configurado

## 🔑 Configuração das APIs

### 1. OpenAI API Key

1. Acesse [platform.openai.com](https://platform.openai.com)
2. Crie uma API Key
3. Copie a key para usar nas configurações

### 2. Google Maps APIs

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Habilite as seguintes APIs:
   - **Geocoding API**
   - **Directions API**
   - **Maps Static API**
4. Crie uma API Key em "Credentials"
5. (Recomendado) Configure restrições de segurança para a API Key

### 3. Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em "Project Settings" → "API"
4. Copie a URL do projeto e a chave anônima (anon/public key)
5. Crie a tabela de logs executando o seguinte SQL no SQL Editor:

```sql
CREATE TABLE route_logs (
  id BIGSERIAL PRIMARY KEY,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  distance TEXT NOT NULL,
  duration TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para melhor performance
CREATE INDEX idx_route_logs_created_at ON route_logs(created_at DESC);
```

## 🛠️ Instalação e Configuração Local

1. **Clone o repositório:**
```bash
git clone https://github.com/estefancaique/poc-langchain.git
cd poc-langchain
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas chaves:
```env
OPENAI_API_KEY=sk-...
GOOGLE_MAPS_API_KEY=AIza...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJh...
```

4. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

5. **Acesse a aplicação:**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📦 Deploy na Vercel

### Deploy Rápido

1. **Instale a CLI da Vercel (opcional):**
```bash
npm i -g vercel
```

2. **Deploy via GitHub (Recomendado):**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe o repositório do GitHub
   - Configure as variáveis de ambiente:
     - `OPENAI_API_KEY`
     - `GOOGLE_MAPS_API_KEY`
     - `SUPABASE_URL`
     - `SUPABASE_KEY`
   - Clique em "Deploy"

3. **Deploy via CLI:**
```bash
vercel
```

Siga as instruções e adicione as variáveis de ambiente quando solicitado.

### Configuração de Variáveis de Ambiente na Vercel

1. Acesse seu projeto na Vercel
2. Vá em "Settings" → "Environment Variables"
3. Adicione cada variável:
   - `OPENAI_API_KEY`: Sua OpenAI API Key
   - `GOOGLE_MAPS_API_KEY`: Sua Google Maps API Key
   - `SUPABASE_URL`: URL do seu projeto Supabase
   - `SUPABASE_KEY`: Chave anônima do Supabase
4. Clique em "Save"
5. Faça um novo deploy para aplicar as mudanças

## 📁 Estrutura do Projeto

```
poc-langchain/
├── app/
│   └── api/
│       └── route/
│           └── route.ts          # API Route principal
├── public/
│   └── index.html                # Frontend em HTML puro
├── .env.example                  # Exemplo de variáveis de ambiente
├── .gitignore                    # Arquivos ignorados pelo Git
├── next.config.js                # Configuração do Next.js
├── package.json                  # Dependências do projeto
├── tsconfig.json                 # Configuração do TypeScript
└── README.md                     # Este arquivo
```

## 🔧 Tecnologias Utilizadas

- **Next.js 14** - Framework React com API Routes
- **TypeScript** - Tipagem estática
- **LangChain** - Framework para aplicações com LLMs
- **OpenAI GPT-4o mini** - Modelo de linguagem para resumos
- **Google Maps APIs** - Geocoding, Directions e Static Maps
- **Supabase** - Backend-as-a-Service para logging
- **HTML/CSS/JavaScript** - Frontend puro e simples

## 📝 Como Usar

1. Abra a aplicação no navegador
2. Digite o endereço de **origem** (ex: "São Paulo, SP")
3. Digite o endereço de **destino** (ex: "Rio de Janeiro, RJ")
4. Clique em "Calcular Rota"
5. Visualize:
   - Distância total da rota
   - Tempo estimado de viagem
   - Resumo inteligente gerado por IA
   - Mapa visual da rota

## 🐛 Solução de Problemas

### Erro "API Key inválida"
- Verifique se todas as variáveis de ambiente estão configuradas corretamente
- Confirme se as APIs do Google Cloud estão habilitadas
- Verifique se há créditos suficientes nas contas OpenAI e Google Cloud

### Erro "Não foi possível calcular a rota"
- Verifique se os endereços estão corretos e completos
- Confirme se a Google Directions API está habilitada
- Tente usar endereços mais específicos (incluindo cidade e estado)

### Erro de CORS
- Este projeto usa Next.js API Routes, que não tem problemas de CORS
- Se encontrar erros, verifique se está acessando via localhost:3000 ou domínio correto

## 📄 Licença

Este projeto é uma POC (Proof of Concept) para fins educacionais.

## 👤 Autor

Desenvolvido como POC de integração LangChain + Next.js

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

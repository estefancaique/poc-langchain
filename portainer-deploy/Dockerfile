# Dockerfile para POC LangChain
# Multi-stage build para otimizar o tamanho da imagem

# ==============================================================================
# Stage 1: Dependencies (Base)
# ==============================================================================
FROM node:18-alpine AS dependencies

# Instalar dependências do sistema necessárias
RUN apk add --no-cache libc6-compat

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências de produção e desenvolvimento
RUN npm ci --only=production --frozen-lockfile && npm cache clean --force

# ==============================================================================
# Stage 2: Builder
# ==============================================================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar dependências do stage anterior
COPY --from=dependencies /app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Instalar todas as dependências (incluindo devDependencies para build)
RUN npm ci --frozen-lockfile

# Build da aplicação Next.js
RUN npm run build

# ==============================================================================
# Stage 3: Runner (Imagem final de produção)
# ==============================================================================
FROM node:18-alpine AS runner

# Instalar dependências do sistema
RUN apk add --no-cache \
    curl \
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

WORKDIR /app

# Copiar arquivos de configuração
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copiar build da aplicação
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Configurar usuário não-root para segurança
USER nextjs

# Expor porta
EXPOSE 3000

# Variáveis de ambiente
ENV PORT=3000
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
# 🐳 POC LangChain - Deploy via Portainer

Este guia explica como fazer deploy do POC LangChain usando Portainer (interface web para Docker).

## 🎯 Pré-requisitos

- Portainer CE/EE instalado e funcionando
- Acesso admin ao Portainer
- Docker Swarm habilitado (opcional, mas recomendado)
- Mínimo 1GB RAM disponível

## 🚀 Deploy via Portainer - Método 1: Stack (Recomendado)

### 1. Preparar o Stack

No Portainer, vá para **Stacks → Add Stack**

**Nome do Stack:** `poc-langchain`

**Docker Compose:**
```yaml
version: '3.8'

services:
  poc-langchain:
    image: estefancaique/poc-langchain:latest  # Ou sua imagem Docker Hub
    container_name: poc-langchain-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
      - GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - poc-network
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M

networks:
  poc-network:
    driver: bridge
```

### 2. Configurar Variáveis de Ambiente

Na seção **Environment variables** do Portainer:

```
GOOGLE_MAPS_API_KEY=sua_chave_google_maps
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_supabase
OPENAI_API_KEY=sk-sua_chave_openai
```

### 3. Deploy do Stack

Clique em **Deploy the stack**

## 🏗️ Deploy via Portainer - Método 2: Container Manual

### 1. Criar Container

No Portainer, vá para **Containers → Add container**

### 2. Configurações Básicas

- **Name:** `poc-langchain-app`
- **Image:** `estefancaique/poc-langchain:latest`

### 3. Network & Ports

- **Network:** bridge (ou criar nova network)
- **Port mapping:**
  - Host: `3000`
  - Container: `3000`
  - Protocol: TCP

### 4. Advanced Settings → Env

```
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
GOOGLE_MAPS_API_KEY=sua_chave_aqui
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_aqui
OPENAI_API_KEY=sk-sua_chave_aqui
```

### 5. Advanced Settings → Restart Policy

- **Restart policy:** Unless stopped

### 6. Advanced Settings → Resources

- **Memory limit:** 512MB
- **Memory reservation:** 256MB

## 📋 Preparação da Imagem Docker

### Opção A: Build Local + Push para Registry

```bash
# 1. Build da imagem
docker build -t poc-langchain:latest .

# 2. Tag para registry (Docker Hub exemplo)
docker tag poc-langchain:latest seuusuario/poc-langchain:latest

# 3. Push para registry
docker push seuusuario/poc-langchain:latest
```

### Opção B: Registry Local (Portainer)

1. No Portainer: **Registries → Add registry**
2. Configure seu registry privado
3. Use a imagem do registry local

### Opção C: Build direto via Portainer

1. **Images → Build a new image**
2. Cole o conteúdo do Dockerfile
3. Build context: Upload .zip do projeto

## 🔧 Configuração com Nginx (Reverse Proxy)

### Stack com Nginx

```yaml
version: '3.8'

services:
  poc-langchain:
    image: estefancaique/poc-langchain:latest
    container_name: poc-langchain-app
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
      - GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    networks:
      - poc-network

  nginx:
    image: nginx:alpine
    container_name: poc-langchain-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - nginx-config:/etc/nginx/conf.d
    depends_on:
      - poc-langchain
    networks:
      - poc-network
    configs:
      - source: nginx_conf
        target: /etc/nginx/conf.d/default.conf

networks:
  poc-network:
    driver: bridge

volumes:
  nginx-config:

configs:
  nginx_conf:
    external: true
```

### Configuração Nginx (criar como Config no Portainer)

**Configs → Add config**
**Name:** `nginx_conf`

```nginx
upstream app {
    server poc-langchain:3000;
}

server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

## 📊 Monitoramento via Portainer

### 1. Logs do Container

- **Containers → poc-langchain-app → Logs**
- Configure auto-refresh para monitoramento real-time

### 2. Statistics

- **Containers → poc-langchain-app → Stats**
- Monitor CPU, Memory, Network usage

### 3. Health Check

- **Containers → poc-langchain-app → Details**
- Verifique status do health check

### 4. Console Access

- **Containers → poc-langchain-app → Console**
- Execute comandos dentro do container:

```bash
# Verificar health
wget -qO- http://localhost:3000/api/health

# Ver variáveis de ambiente
env | grep -E "(GOOGLE|SUPABASE|OPENAI)"

# Verificar logs da aplicação
tail -f /app/.next/server.log
```

## 🔄 Update da Aplicação

### Via Portainer UI

1. **Containers → poc-langchain-app → Duplicate/Edit**
2. Altere a tag da imagem (ex: `:latest` → `:v1.1.0`)
3. **Replace** o container

### Via Webhook (Automático)

1. **Stacks → poc-langchain → Webhooks**
2. Generate webhook URL
3. Configure no seu CI/CD:

```bash
# Trigger update via webhook
curl -X POST "sua-webhook-url"
```

## 🛡️ Segurança no Portainer

### 1. Secrets (Recomendado)

**Secrets → Add secret**

Crie secrets para cada variável sensível:
- `google_maps_api_key`
- `supabase_anon_key`
- `openai_api_key`

**Stack atualizado:**
```yaml
services:
  poc-langchain:
    image: estefancaique/poc-langchain:latest
    secrets:
      - google_maps_api_key
      - supabase_anon_key
      - openai_api_key
    environment:
      - GOOGLE_MAPS_API_KEY_FILE=/run/secrets/google_maps_api_key
      - SUPABASE_ANON_KEY_FILE=/run/secrets/supabase_anon_key
      - OPENAI_API_KEY_FILE=/run/secrets/openai_api_key

secrets:
  google_maps_api_key:
    external: true
  supabase_anon_key:
    external: true
  openai_api_key:
    external: true
```

### 2. Network Isolation

```yaml
networks:
  poc-internal:
    driver: bridge
    internal: true
  poc-external:
    driver: bridge

services:
  poc-langchain:
    networks:
      - poc-internal
  nginx:
    networks:
      - poc-internal
      - poc-external
```

## 🚨 Troubleshooting via Portainer

### Container não inicia

1. **Logs:** Verificar logs de startup
2. **Events:** Verificar eventos do container
3. **Inspect:** Verificar configurações

### Performance Issues

1. **Stats:** Monitor recursos
2. **Resize:** Aumentar limits de memória
3. **Scale:** Adicionar replicas (Docker Swarm)

### Network Issues

1. **Networks:** Verificar conectividade
2. **Port mapping:** Confirmar portas expostas
3. **Firewall:** Verificar regras do host

## 📱 Acesso Mobile via Portainer

Configure **Edge Agent** para gerenciar remotamente:

1. **Environments → Add environment**
2. **Edge Agent**
3. Configure no servidor remoto

## 🎯 Templates Prontos (Portainer)

### App Template

**App Templates → Add template**

```json
{
  "type": 1,
  "title": "POC LangChain",
  "description": "Calculadora de rotas com IA",
  "categories": ["ai", "maps", "webapp"],
  "platform": "linux",
  "logo": "https://raw.githubusercontent.com/estefancaique/poc-langchain/main/public/icon.png",
  "image": "estefancaique/poc-langchain:latest",
  "ports": [
    "3000/tcp"
  ],
  "env": [
    {
      "name": "NODE_ENV",
      "default": "production"
    },
    {
      "name": "GOOGLE_MAPS_API_KEY",
      "description": "Google Maps API Key"
    },
    {
      "name": "SUPABASE_URL",
      "description": "Supabase Project URL"
    },
    {
      "name": "SUPABASE_ANON_KEY",
      "description": "Supabase Anonymous Key"
    },
    {
      "name": "OPENAI_API_KEY",
      "description": "OpenAI API Key"
    }
  ]
}
```

---

## ✅ Checklist de Deploy

- [ ] Portainer funcionando
- [ ] Imagem disponível no registry
- [ ] Variáveis de ambiente configuradas
- [ ] Stack/Container criado
- [ ] Health check passando
- [ ] Aplicação acessível
- [ ] Logs sem erros
- [ ] Monitoramento configurado

**🎉 Sua aplicação POC LangChain está rodando no Portainer!**

Acesse: `http://seu-servidor:3000`
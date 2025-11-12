# 🚀 POC LangChain - Docker Deployment

Este guia explica como fazer deploy do POC LangChain usando Docker em seu servidor.

## 📋 Pré-requisitos

- Docker Engine 20.10+
- Docker Compose 2.0+
- Mínimo 1GB RAM
- Portas 3000 (ou 80/443 com Nginx) disponíveis

## ⚡ Deploy Rápido

### 1. Clone o repositório
```bash
git clone https://github.com/estefancaique/poc-langchain.git
cd poc-langchain
```

### 2. Configure as variáveis de ambiente
```bash
cp .env.production.example .env.production
nano .env.production  # Edite com suas chaves reais
```

### 3. Execute o deploy
```bash
# Opção 1: Script automático
./deploy.sh latest 3000

# Opção 2: Docker Compose
docker-compose up -d
```

## 🔧 Configuração Detalhada

### Variáveis de Ambiente Necessárias

```env
# Google Maps API
GOOGLE_MAPS_API_KEY=sua_chave_aqui

# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_aqui

# OpenAI
OPENAI_API_KEY=sk-sua_chave_aqui
```

### Build Manual da Imagem

```bash
# Build da imagem
docker build -t poc-langchain:latest .

# Run do container
docker run -d \
  --name poc-langchain-app \
  -p 3000:3000 \
  --env-file .env.production \
  --restart unless-stopped \
  poc-langchain:latest
```

## 🌐 Deploy com Nginx (Produção)

Para ambientes de produção, use o perfil com Nginx:

```bash
# Criar configuração do Nginx
mkdir -p nginx
cat > nginx/nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    upstream app {
        server poc-langchain:3000;
    }

    server {
        listen 80;
        server_name seu-dominio.com;

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
        }
    }
}
EOF

# Deploy com Nginx
docker-compose --profile production up -d
```

## 📊 Monitoramento

### Health Check
```bash
# Verificar saúde da aplicação
curl http://localhost:3000/api/health

# Ver logs
docker logs -f poc-langchain-app

# Status dos containers
docker-compose ps
```

### Métricas de Sistema
```bash
# Uso de recursos
docker stats poc-langchain-app

# Informações detalhadas
docker inspect poc-langchain-app
```

## 🔄 Comandos Úteis

```bash
# Parar aplicação
docker stop poc-langchain-app

# Restart aplicação
docker restart poc-langchain-app

# Ver logs em tempo real
docker logs -f poc-langchain-app

# Executar shell no container
docker exec -it poc-langchain-app sh

# Limpar imagens antigas
docker image prune -f

# Update da aplicação
git pull origin main
./deploy.sh latest 3000
```

## 🚨 Troubleshooting

### Container não inicia
```bash
# Verificar logs
docker logs poc-langchain-app

# Verificar configurações
docker inspect poc-langchain-app
```

### Erro de variáveis de ambiente
```bash
# Verificar se o arquivo existe
ls -la .env.production

# Testar variáveis
docker exec poc-langchain-app env | grep -E "(GOOGLE|SUPABASE|OPENAI)"
```

### Problemas de rede
```bash
# Verificar portas
netstat -tlnp | grep :3000

# Testar conectividade
curl -I http://localhost:3000
```

## 🔒 Segurança

### Recomendações de Produção

1. **Não exponha variáveis sensíveis**
   - Use Docker Secrets ou ferramenta de vault
   - Nunca committe `.env.production`

2. **Configure HTTPS**
   - Use Nginx com certificados SSL
   - Configure redirects HTTP → HTTPS

3. **Firewall**
   - Exponha apenas portas necessárias (80, 443)
   - Use reverse proxy (Nginx/Traefik)

4. **Updates regulares**
   - Mantenha imagens base atualizadas
   - Monitor dependências com vulnerabilidades

## 📈 Performance

### Otimizações

- **Multi-stage build**: Imagem final ~100MB
- **Node.js Alpine**: Base mínima
- **Standalone output**: Apenas arquivos necessários
- **Health checks**: Monitoramento automático

### Scaling (Opcional)

```yaml
# docker-compose.override.yml
services:
  poc-langchain:
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
```

## 🆘 Suporte

Em caso de problemas:

1. Verifique os logs: `docker logs poc-langchain-app`
2. Teste o health check: `curl http://localhost:3000/api/health`
3. Valide as variáveis de ambiente
4. Abra uma issue no repositório

---

**🎉 Sua aplicação POC LangChain está pronta para produção!**
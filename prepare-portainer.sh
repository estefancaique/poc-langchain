#!/bin/bash
# Script para preparar os arquivos para deploy no Portainer

echo "🐳 Preparando arquivos para deploy no Portainer..."

# Criar diretório para arquivos do Portainer
mkdir -p portainer-deploy

# Copiar arquivos necessários
cp Dockerfile portainer-deploy/
cp .dockerignore portainer-deploy/
cp package.json portainer-deploy/
cp package-lock.json portainer-deploy/
cp next.config.js portainer-deploy/
cp -r pages portainer-deploy/
cp -r lib portainer-deploy/
cp -r public portainer-deploy/

# Copiar arquivos de configuração do Portainer
cp portainer-stack.yml portainer-deploy/
cp portainer-build.yml portainer-deploy/
cp portainer-template.json portainer-deploy/

# Criar arquivo de instruções
cat > portainer-deploy/INSTRUCOES.md << 'EOF'
# 📋 Instruções para Deploy no Portainer

## 🚀 Método 1: Via Stack (Recomendado)

1. **Comprimir arquivos**:
   ```bash
   zip -r poc-langchain.zip .
   ```

2. **No Portainer**:
   - Stacks → Add stack
   - Build method: **Upload**
   - Upload o arquivo poc-langchain.zip
   - Compose file: portainer-build.yml

3. **Environment variables**:
   ```
   GOOGLE_MAPS_API_KEY=sua_chave_aqui
   SUPABASE_URL=https://seu-projeto.supabase.co
   SUPABASE_ANON_KEY=sua_chave_aqui
   OPENAI_API_KEY=sk-sua_chave_aqui
   PORT=3000
   ```

4. **Deploy the stack**

## 🔧 Método 2: Via Repositório Git

1. **No Portainer**:
   - Stacks → Add stack
   - Build method: **Git Repository**
   - Repository URL: https://github.com/estefancaique/poc-langchain
   - Compose path: portainer-build.yml

2. **Environment variables**: (mesmo do método 1)

3. **Deploy the stack**

## 🏗️ Método 3: Container Manual

1. **Images → Build a new image**:
   - Upload o Dockerfile
   - Name: poc-langchain:latest

2. **Containers → Add container**:
   - Name: poc-langchain-app
   - Image: poc-langchain:latest
   - Port mapping: 3000:3000
   - Environment variables: (mesmo do método 1)

## ✅ Verificações

1. Health check: http://localhost:3000/api/health
2. Aplicação: http://localhost:3000
3. Logs: Containers → poc-langchain-app → Logs

EOF

# Compactar tudo
cd portainer-deploy
zip -r ../poc-langchain-portainer.zip .
cd ..

echo "✅ Arquivos preparados!"
echo ""
echo "📦 Arquivo criado: poc-langchain-portainer.zip"
echo "📁 Diretório: portainer-deploy/"
echo ""
echo "🚀 Próximos passos:"
echo "1. Envie o arquivo .zip para seu servidor"
echo "2. No Portainer: Stacks → Add stack → Upload"
echo "3. Configure as variáveis de ambiente"
echo "4. Deploy!"
echo ""
echo "📖 Leia o arquivo INSTRUCOES.md para detalhes completos"
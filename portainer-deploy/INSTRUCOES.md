# 📋 Instruções para Deploy no Portainer

## ⚠️ IMPORTANTE: Escolha o arquivo correto!

### � Como identificar seu ambiente:
- **Standalone**: Dashboard mostra "Standalone Docker"
- **Swarm**: Dashboard mostra "Docker Swarm"

## �🚀 Método 1: Via Stack Upload

### **Para Portainer Standalone**
1. **No Portainer**:
   - Stacks → Add stack
   - Build method: **Upload**
   - Upload o arquivo poc-langchain-portainer.zip
   - Compose file: **portainer-standalone.yml** ← IMPORTANTE

### **Para Portainer Swarm**
1. **No Portainer**:
   - Stacks → Add stack
   - Build method: **Upload**
   - Upload o arquivo poc-langchain-portainer.zip
   - Compose file: **portainer-swarm.yml** ← IMPORTANTE

2. **Environment variables (ambos os casos)**:
   ```
   GOOGLE_MAPS_API_KEY=sua_chave_aqui
   SUPABASE_URL=https://seu-projeto.supabase.co
   SUPABASE_ANON_KEY=sua_chave_aqui
   OPENAI_API_KEY=sk-sua_chave_aqui
   PORT=3000
   NODE_ENV=production
   ```

3. **Deploy the stack**

## 🔧 Método 2: Via Repositório Git

1. **No Portainer**:
   - Stacks → Add stack
   - Build method: **Git Repository**
   - Repository URL: https://github.com/seu-usuario/poc-langchain
   - Compose path: 
     - **portainer-standalone.yml** (para standalone)
     - **portainer-swarm.yml** (para swarm)

2. **Environment variables**: (mesmo do método 1)

3. **Deploy the stack**

## ✅ Verificações

1. Health check: http://localhost:3000/api/health
2. Aplicação: http://localhost:3000
3. Logs: Containers → poc-langchain → Logs

## 🔧 Troubleshooting

### Erro de Network Swarm:
- Use **portainer-swarm.yml** se estiver em modo Swarm
- Use **portainer-standalone.yml** se estiver em modo Standalone


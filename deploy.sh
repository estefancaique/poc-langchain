#!/bin/bash
# deploy.sh - Script para build e deploy do POC LangChain

set -e

echo "🚀 POC LangChain - Deploy Script"
echo "================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
IMAGE_NAME="poc-langchain"
TAG="${1:-latest}"
CONTAINER_NAME="poc-langchain-app"
PORT="${2:-3000}"

echo -e "${BLUE}📦 Building Docker image...${NC}"
docker build -t ${IMAGE_NAME}:${TAG} .

echo -e "${GREEN}✅ Build completed successfully!${NC}"

echo -e "${YELLOW}🔍 Image details:${NC}"
docker images ${IMAGE_NAME}:${TAG}

echo -e "${BLUE}🛑 Stopping existing container (if any)...${NC}"
docker stop ${CONTAINER_NAME} 2>/dev/null || true
docker rm ${CONTAINER_NAME} 2>/dev/null || true

echo -e "${BLUE}🚀 Starting new container...${NC}"
docker run -d \
  --name ${CONTAINER_NAME} \
  -p ${PORT}:3000 \
  --env-file .env.production \
  --restart unless-stopped \
  --health-cmd="curl -f http://localhost:3000/api/health || exit 1" \
  --health-interval=30s \
  --health-timeout=3s \
  --health-start-period=5s \
  --health-retries=3 \
  ${IMAGE_NAME}:${TAG}

echo -e "${GREEN}🎉 Container started successfully!${NC}"

echo -e "${BLUE}📊 Container status:${NC}"
docker ps -f name=${CONTAINER_NAME}

echo -e "${BLUE}🔗 Application URLs:${NC}"
echo -e "  Local: ${GREEN}http://localhost:${PORT}${NC}"
echo -e "  Health: ${GREEN}http://localhost:${PORT}/api/health${NC}"

echo -e "${YELLOW}📝 Useful commands:${NC}"
echo -e "  View logs: ${BLUE}docker logs -f ${CONTAINER_NAME}${NC}"
echo -e "  Stop app:  ${BLUE}docker stop ${CONTAINER_NAME}${NC}"
echo -e "  Remove:    ${BLUE}docker rm ${CONTAINER_NAME}${NC}"

echo ""
echo -e "${GREEN}✅ Deploy completed! Application is running on port ${PORT}${NC}"
-- Script SQL para criar tabela no Supabase
-- Execute este script no SQL Editor do Supabase

CREATE TABLE IF NOT EXISTS route_history (
  id SERIAL PRIMARY KEY,
  origin_input TEXT NOT NULL,
  destination_input TEXT NOT NULL,
  origin_name TEXT,
  destination_name TEXT,
  distance INTEGER, -- em metros
  duration INTEGER, -- em segundos
  polyline TEXT,
  summary TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_route_history_created_at ON route_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_route_history_origin ON route_history(origin_input);
CREATE INDEX IF NOT EXISTS idx_route_history_destination ON route_history(destination_input);

-- Comentários para documentação
COMMENT ON TABLE route_history IS 'Histórico de rotas calculadas pela aplicação POC LangChain';
COMMENT ON COLUMN route_history.distance IS 'Distância da rota em metros';
COMMENT ON COLUMN route_history.duration IS 'Duração estimada da rota em segundos';
COMMENT ON COLUMN route_history.polyline IS 'Polyline codificada da rota do Google Maps';
-- Tabela de entidades elegíveis para consignação IRS
CREATE TABLE IF NOT EXISTS entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nif TEXT NOT NULL,
  name TEXT NOT NULL,
  district TEXT,
  county TEXT,
  type TEXT,
  year INTEGER NOT NULL,
  description TEXT,
  contacts JSONB DEFAULT '{}',
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(nif, year)
);

-- Índices para pesquisa e filtros
CREATE INDEX idx_entities_year ON entities(year);
CREATE INDEX idx_entities_county ON entities(county);
CREATE INDEX idx_entities_district ON entities(district);
CREATE INDEX idx_entities_type ON entities(type);
CREATE INDEX idx_entities_name ON entities USING gin(to_tsvector('portuguese', name));
CREATE INDEX idx_entities_location ON entities(latitude, longitude) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER entities_updated_at
  BEFORE UPDATE ON entities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Tabela de imports (auditoria)
CREATE TABLE IF NOT EXISTS imports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  filename TEXT,
  row_count INTEGER,
  imported_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: área pública pode ler entities
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "entities_public_read" ON entities
  FOR SELECT
  USING (true);

-- RLS: apenas utilizadores autenticados podem inserir/atualizar/eliminar
CREATE POLICY "entities_authenticated_all" ON entities
  FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS para imports (apenas autenticados)
ALTER TABLE imports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "imports_authenticated_all" ON imports
  FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

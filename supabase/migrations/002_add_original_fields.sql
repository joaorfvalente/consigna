-- Valores originais do CSV (NIPC, Nome, Localidade) - nunca apagados
ALTER TABLE entities ADD COLUMN IF NOT EXISTS original_name TEXT;
ALTER TABLE entities ADD COLUMN IF NOT EXISTS original_county TEXT;

-- Preencher para registos existentes
UPDATE entities SET original_name = name WHERE original_name IS NULL;
UPDATE entities SET original_county = county WHERE original_county IS NULL;

-- Trigger: ao inserir, guardar originais se ainda não existirem
CREATE OR REPLACE FUNCTION set_original_fields_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.original_name IS NULL THEN
    NEW.original_name = NEW.name;
  END IF;
  IF NEW.original_county IS NULL THEN
    NEW.original_county = NEW.county;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS entities_set_originals ON entities;
CREATE TRIGGER entities_set_originals
  BEFORE INSERT ON entities
  FOR EACH ROW
  EXECUTE FUNCTION set_original_fields_on_insert();

-- 002: Triggers

-- Uppdatera updated_at automatiskt
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = '';

DROP TRIGGER IF EXISTS signup_early_access_updated_at ON signup_early_access;

CREATE TRIGGER signup_early_access_updated_at
  BEFORE UPDATE ON signup_early_access
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create anon role for PostgREST
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN;
  END IF;
END
$$;

-- Grant usage
GRANT USAGE ON SCHEMA public TO anon;

-- Signup early access table
CREATE TABLE IF NOT EXISTS signup_early_access (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'landing_page',
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grant permissions to anon role (insert only for security)
GRANT SELECT, INSERT ON signup_early_access TO anon;
GRANT SELECT, INSERT ON feedback TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS idx_signup_email ON signup_early_access(email);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER signup_early_access_updated_at
  BEFORE UPDATE ON signup_early_access
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

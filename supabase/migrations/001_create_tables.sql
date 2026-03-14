-- 001: Skapa tabeller för landing page
-- Kör i Supabase SQL Editor

-- Tabell: Intresseanmälningar
CREATE TABLE IF NOT EXISTS signup_early_access (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'landing_page',
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabell: Feedback
CREATE TABLE IF NOT EXISTS feedback (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index för snabba e-postsökningar
CREATE INDEX IF NOT EXISTS idx_signup_email ON signup_early_access(email);

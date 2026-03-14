-- 003: Row Level Security

ALTER TABLE signup_early_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Drop befintliga policies om de finns
DROP POLICY IF EXISTS "Allow anon insert" ON signup_early_access;
DROP POLICY IF EXISTS "Allow anon insert" ON feedback;
DROP POLICY IF EXISTS "Allow anon select" ON signup_early_access;

-- Tillåt insert från anon-rollen (landing page)
CREATE POLICY "Allow anon insert" ON signup_early_access
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon insert" ON feedback
  FOR INSERT TO anon
  WITH CHECK (true);

-- Tillåt select på signup från anon (behövs för duplicate-check)
CREATE POLICY "Allow anon select" ON signup_early_access
  FOR SELECT TO anon
  USING (true);

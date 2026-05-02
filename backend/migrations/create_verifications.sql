CREATE TABLE IF NOT EXISTS verifications (
  id TEXT PRIMARY KEY,
  holder TEXT NOT NULL,
  certificate_title TEXT,
  issue_date DATE,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO verifications (id, holder, certificate_title, issue_date, verified) VALUES
  ('abc', 'John Doe', 'Bachelor of Science', '2023-05-15', false),
  ('def', 'Alice Smith', 'Master of Engineering', '2022-06-20', true)
ON CONFLICT (id) DO NOTHING;

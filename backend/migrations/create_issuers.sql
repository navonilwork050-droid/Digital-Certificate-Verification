CREATE TABLE IF NOT EXISTS issuers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  email TEXT UNIQUE,
  institution TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO issuers (name, email, institution) VALUES
  ('Issuer A', 'issuer-a@example.com', 'Institution A'),
  ('Issuer B', 'issuer-b@example.com', 'Institution B')
ON CONFLICT (name) DO NOTHING;

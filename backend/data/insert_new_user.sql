INSERT INTO users (id, email, password, name, role, target_company, experience_level, avatar_url, xp, streak, joined_date)
VALUES (
  'usr-mayuri-narkhede',
  'mayurinarkhede@mail.com',
  'Password123!',
  'Mayuri Narkhede',
  'Senior Java & Distributed Systems Architect',
  'FAANG / Tier-1 Enterprise',
  '3-5 Years',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  100,
  1,
  'September 2026'
)
ON CONFLICT (email) DO UPDATE 
SET name = EXCLUDED.name,
    role = EXCLUDED.role;

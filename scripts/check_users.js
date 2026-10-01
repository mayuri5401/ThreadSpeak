const { execSync } = require('child_process');
const psql = 'C:\\Program Files\\PostgreSQL\\18\\bin\\psql.exe';
process.env.PGPASSWORD = 'admin123';

try {
  const result = execSync(
    `"${psql}" -U postgres -h 127.0.0.1 -d threadspeak_db -c "SELECT id, name, email, role, target_company, experience_level, xp, streak, joined_date FROM users ORDER BY xp DESC;"`,
    { encoding: 'utf8' }
  );
  console.log('=== All Registered Users in PostgreSQL (threadspeak_db.users) ===\n');
  console.log(result);
} catch (e) {
  console.error('Error fetching users:', e.message);
}

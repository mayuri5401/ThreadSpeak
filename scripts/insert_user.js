const { execSync } = require('child_process');
const path = require('path');
const psql = 'C:\\Program Files\\PostgreSQL\\18\\bin\\psql.exe';
process.env.PGPASSWORD = 'admin123';

const sqlFilePath = path.join(__dirname, '../backend/data/insert_new_user.sql');

try {
  const output = execSync(`"${psql}" -U postgres -h 127.0.0.1 -d threadspeak_db -f "${sqlFilePath}"`, { encoding: 'utf8' });
  console.log('Execute output:', output);

  const query = execSync(`"${psql}" -U postgres -h 127.0.0.1 -d threadspeak_db -c "SELECT id, name, email, role, target_company, xp, joined_date FROM users ORDER BY created_at DESC;"`, { encoding: 'utf8' });
  console.log('=== All Users in PostgreSQL (pgAdmin threadspeak_db.users) ===\n' + query);
} catch (e) {
  console.error('Error:', e.message);
}

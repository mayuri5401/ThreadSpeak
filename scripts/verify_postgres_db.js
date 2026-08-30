const { execSync } = require('child_process');
const psql = 'C:\\Program Files\\PostgreSQL\\18\\bin\\psql.exe';
process.env.PGPASSWORD = 'admin123';

try {
  const tables = execSync(`"${psql}" -U postgres -h 127.0.0.1 -d threadspeak_db -c "\\dt"`, { encoding: 'utf8' });
  console.log('=== Tables in PostgreSQL threadspeak_db ===\n' + tables);

  const count = execSync(`"${psql}" -U postgres -h 127.0.0.1 -d threadspeak_db -c "SELECT count(*) AS total_topics_in_db FROM topics;"`, { encoding: 'utf8' });
  console.log('=== Topics Count in PostgreSQL ===\n' + count);
} catch (e) {
  console.error('Query error:', e.message);
}

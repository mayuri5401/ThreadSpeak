const { execSync } = require('child_process');
const psql = 'C:\\Program Files\\PostgreSQL\\18\\bin\\psql.exe';
process.env.PGPASSWORD = 'admin123';

try {
  console.log('--- Table Schema for users ---');
  console.log(execSync(`"${psql}" -U postgres -h 127.0.0.1 -d threadspeak_db -c "\\d users"`, { encoding: 'utf8' }));

  console.log('--- Current Users in DB ---');
  console.log(execSync(`"${psql}" -U postgres -h 127.0.0.1 -d threadspeak_db -c "SELECT id, email, name FROM users;"`, { encoding: 'utf8' }));
} catch (e) {
  console.error(e.message);
}

const fs = require('fs');
const { execSync } = require('child_process');

const psql17 = 'C:\\Program Files\\PostgreSQL\\17\\bin\\psql.exe';
const hba17 = 'C:\\Program Files\\PostgreSQL\\17\\data\\pg_hba.conf';

console.log('=== Checking PostgreSQL 17 ===');
if (fs.existsSync(hba17)) {
  const orig = fs.readFileSync(hba17, 'utf8');
  const trust = orig.replace(/scram-sha-256/g, 'trust').replace(/md5/g, 'trust');
  fs.writeFileSync(hba17, trust, 'utf8');
  console.log('Set PG 17 pg_hba.conf to trust');

  try {
    execSync('powershell -Command "Restart-Service postgresql*17*"', { stdio: 'inherit' });
  } catch (e) {
    console.warn('Service restart notice:', e.message);
  }

  try {
    execSync(`"${psql17}" -U postgres -h 127.0.0.1 -p 5433 -c "ALTER USER postgres WITH PASSWORD 'admin123';"`, { stdio: 'inherit' });
    console.log('Successfully set PostgreSQL 17 password to admin123!');
  } catch (e) {
    console.error('Error on port 5433:', e.message);
  }

  try {
    execSync(`"${psql17}" -U postgres -h 127.0.0.1 -p 5433 -c "CREATE DATABASE threadspeak_db;"`, { stdio: 'inherit' });
  } catch (e) {
    console.log('Database note:', e.message);
  }

  fs.writeFileSync(hba17, orig, 'utf8');
  console.log('Restored PG 17 pg_hba.conf');

  try {
    execSync('powershell -Command "Restart-Service postgresql*17*"', { stdio: 'inherit' });
  } catch (e) {
    console.warn('Service restart notice:', e.message);
  }
}

const fs = require('fs');
const { execSync } = require('child_process');

const psqlPath = 'C:\\Program Files\\PostgreSQL\\18\\bin\\psql.exe';
const hbaPath = 'C:\\Program Files\\PostgreSQL\\18\\data\\pg_hba.conf';

console.log('=== Step 1: Reading pg_hba.conf ===');
if (!fs.existsSync(hbaPath)) {
  console.error('Error: pg_hba.conf not found at', hbaPath);
  process.exit(1);
}

const originalContent = fs.readFileSync(hbaPath, 'utf8');

// Replace scram-sha-256 and md5 with trust
const trustContent = originalContent.replace(/scram-sha-256/g, 'trust').replace(/md5/g, 'trust');
fs.writeFileSync(hbaPath, trustContent, 'utf8');
console.log('Set pg_hba.conf to trust mode.');

console.log('\n=== Step 2: Restarting postgresql-x64-18 service ===');
try {
  execSync('powershell -Command "Restart-Service postgresql-x64-18"', { stdio: 'inherit' });
} catch (err) {
  console.warn('Service restart notice:', err.message);
}

console.log('\n=== Step 3: Setting password for user postgres to admin123 ===');
try {
  execSync(`"${psqlPath}" -U postgres -h 127.0.0.1 -p 5432 -c "ALTER USER postgres WITH PASSWORD 'admin123';"`, { stdio: 'inherit' });
  console.log('Successfully set postgres password to admin123!');
} catch (err) {
  console.error('Error setting password:', err.message);
}

console.log('\n=== Step 4: Creating threadspeak_db database ===');
try {
  execSync(`"${psqlPath}" -U postgres -h 127.0.0.1 -p 5432 -c "CREATE DATABASE threadspeak_db;"`, { stdio: 'inherit' });
  console.log('Successfully created threadspeak_db database!');
} catch (err) {
  console.log('Note (database might already exist):', err.message);
}

console.log('\n=== Step 5: Restoring pg_hba.conf to original secure authentication ===');
fs.writeFileSync(hbaPath, originalContent, 'utf8');
console.log('Restored original pg_hba.conf.');

console.log('\n=== Step 6: Restarting postgresql-x64-18 service ===');
try {
  execSync('powershell -Command "Restart-Service postgresql-x64-18"', { stdio: 'inherit' });
} catch (err) {
  console.warn('Service restart notice:', err.message);
}

console.log('\n=== Step 7: Verifying login with password admin123 ===');
try {
  process.env.PGPASSWORD = 'admin123';
  const out = execSync(`"${psqlPath}" -U postgres -h 127.0.0.1 -p 5432 -c "SELECT 'SUCCESS: Connected to PostgreSQL with password admin123!' AS status;"`, { encoding: 'utf8' });
  console.log(out);
} catch (err) {
  console.error('Verification error:', err.message);
}

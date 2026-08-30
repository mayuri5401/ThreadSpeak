const { execSync } = require('child_process');
const psql18 = 'C:\\Program Files\\PostgreSQL\\18\\bin\\psql.exe';

[5432, 5433, 5434].forEach(port => {
  try {
    const res = execSync(`"${psql18}" -U postgres -h 127.0.0.1 -p ${port} -c "SELECT version();"`, {
      encoding: 'utf8',
      env: { ...process.env, PGPASSWORD: 'admin123' },
      timeout: 3000
    });
    console.log(`Port ${port} connects to:`, res.split('\n')[2]);
  } catch (e) {
    console.log(`Port ${port}: not responding with admin123 or closed`);
  }
});

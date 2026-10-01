const { execSync } = require('child_process');
const psql = 'C:\\Program Files\\PostgreSQL\\18\\bin\\psql.exe';
process.env.PGPASSWORD = 'admin123';

function query(sql) {
  try {
    return execSync(`"${psql}" -U postgres -h 127.0.0.1 -d threadspeak_db -c "${sql}"`, { encoding: 'utf8' });
  } catch (e) {
    return `Error: ${e.message}`;
  }
}

console.log('====================================================');
console.log('   ThreadSpeak Production / PostgreSQL Data Report  ');
console.log('====================================================');

console.log('\n--- 1. TABLE ROW COUNTS ---');
const tables = ['tracks', 'topics', 'users', 'user_progress', 'quiz_questions'];
for (const t of tables) {
  console.log(query(`SELECT '${t}' AS table_name, count(*) AS total_rows FROM ${t};`));
}

console.log('\n--- 2. TRACKS CATALOG ---');
console.log(query(`SELECT id, title, total_topics, color FROM tracks ORDER BY id;`));

console.log('\n--- 3. TOPICS BY TRACK ---');
console.log(query(`SELECT track_id, count(*) AS topics_count FROM topics GROUP BY track_id ORDER BY topics_count DESC;`));

console.log('\n--- 4. USERS AND LEADERBOARD ---');
console.log(query(`SELECT id, name, email, role, target_company, xp, streak, joined_date FROM users ORDER BY xp DESC;`));

console.log('\n--- 5. SAMPLE TOPICS (FIRST 10) ---');
console.log(query(`SELECT id, track_id, category, title, difficulty, estimated_minutes FROM topics LIMIT 10;`));

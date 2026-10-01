const fs = require('fs');
const path = require('path');

const topicsCatalogPath = path.join(__dirname, '../frontend/src/shared/api/topicsCatalog.json');
const tracksCatalogPath = path.join(__dirname, '../frontend/src/shared/api/tracksCatalog.json');
const outputPath = path.join(__dirname, '../backend/data/seed_all_project_data.sql');

const topics = JSON.parse(fs.readFileSync(topicsCatalogPath, 'utf8'));
const tracks = JSON.parse(fs.readFileSync(tracksCatalogPath, 'utf8'));

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''").replace(/\\/g, '\\\\') + "'";
}

let sql = `-- ============================================================================
-- ThreadSpeak Complete Database Export (MySQL & PostgreSQL Compatible)
-- Tracks: ${tracks.length} | Topics: ${topics.length} | Users: 3 + Dynamic
-- ============================================================================

-- 1. Create and Select Database Schema
CREATE DATABASE IF NOT EXISTS threadspeak_db;
USE threadspeak_db;

-- 2. Drop existing tables if re-seeding
DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS tracks;
DROP TABLE IF EXISTS users;

-- 3. Create Users Table
CREATE TABLE users (
    id VARCHAR(100) PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(150),
    target_company VARCHAR(150),
    experience_level VARCHAR(100),
    avatar_url TEXT,
    xp INT DEFAULT 0,
    streak INT DEFAULT 1,
    joined_date VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Tracks Table
CREATE TABLE tracks (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(50),
    total_topics INT DEFAULT 0
);

-- 5. Create Topics Table (All 540 Lessons)
CREATE TABLE topics (
    id VARCHAR(150) PRIMARY KEY,
    track_id VARCHAR(50),
    category VARCHAR(120),
    title VARCHAR(255) NOT NULL,
    difficulty VARCHAR(50),
    estimated_minutes INT DEFAULT 15,
    summary TEXT,
    FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE SET NULL
);

-- 6. Create User Progress Table
CREATE TABLE user_progress (
    user_id VARCHAR(100) PRIMARY KEY,
    completed_topics_json LONGTEXT,
    bookmarked_topics_json LONGTEXT,
    quiz_scores_json LONGTEXT,
    total_xp INT DEFAULT 0,
    current_streak_days INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================================
-- INSERT SEED DATA
-- ============================================================================

-- Seed Users
INSERT INTO users (id, email, password, name, role, target_company, experience_level, avatar_url, xp, streak, joined_date)
VALUES 
('usr-mayuri-lead', 'mayuri@threadspeak.dev', 'Mayuri123!', 'Mayuri', 'Senior Software Engineer / System Architect', 'FAANG / Tier-1 Enterprise', 'Staff / Lead (8+ yrs)', '', 3450, 7, 'August 2026'),
('usr-alex-architect', 'alex@systems.dev', 'AlexDev2026!', 'Alex Rivera', 'Principal Distributed Systems Engineer', 'Netflix / Uber Core Infrastructure', 'Principal / Architect (10+ yrs)', '', 8920, 24, 'January 2026'),
('usr-rohan-student', 'rohan@student.dev', 'RohanLearns!', 'Rohan Verma', 'Junior Backend Engineer & DSA Aspirant', 'Amazon SDE-1 / Atlassian', 'Fresher / Student (0-1 yrs)', '', 1200, 3, 'September 2026');

-- Seed Tracks
`;

tracks.forEach(track => {
  const trackTopicsCount = topics.filter(t => t.trackId === track.id).length;
  sql += `INSERT INTO tracks (id, title, description, icon, color, total_topics) VALUES (${escapeSql(track.id)}, ${escapeSql(track.title)}, ${escapeSql(track.description)}, ${escapeSql(track.icon)}, ${escapeSql(track.color)}, ${trackTopicsCount});\n`;
});

sql += `\n-- Seed Topics (${topics.length} Lessons)\n`;

topics.forEach(t => {
  const summary = (t.summary || t.description || '').substring(0, 500);
  sql += `INSERT INTO topics (id, track_id, category, title, difficulty, estimated_minutes, summary) VALUES (${escapeSql(t.id)}, ${escapeSql(t.trackId)}, ${escapeSql(t.category)}, ${escapeSql(t.title)}, ${escapeSql(t.difficulty || 'Medium')}, ${parseInt(t.estimatedMinutes) || 15}, ${escapeSql(summary)});\n`;
});

sql += `\n-- ============================================================================
-- PRE-BUILT ANALYTICAL SQL QUERIES (RUN ANY TO EXPLORE)
-- ============================================================================

-- 1. Check Total Counts Summary
SELECT 'Total Tracks' AS Metric, COUNT(*) AS Total FROM tracks
UNION ALL
SELECT 'Total Lessons/Topics', COUNT(*) FROM topics
UNION ALL
SELECT 'Total Registered Users', COUNT(*) FROM users;

-- 2. View All Tracks and Topic Count
SELECT id, title, total_topics, color FROM tracks;

-- 3. Topics Breakdown by Track & Difficulty
SELECT track_id, difficulty, COUNT(*) AS total_lessons
FROM topics
GROUP BY track_id, difficulty
ORDER BY track_id, total_lessons DESC;

-- 4. View Top 15 Advanced Topics
SELECT id, track_id, category, title, difficulty, estimated_minutes 
FROM topics 
WHERE difficulty = 'Advanced' 
LIMIT 15;

-- 5. View All Registered Users & Leaderboard
SELECT name, email, role, target_company, experience_level, xp, streak, joined_date 
FROM users 
ORDER BY xp DESC;
`;

fs.writeFileSync(outputPath, sql, 'utf8');
console.log(`Generated ${outputPath} with ${tracks.length} tracks and ${topics.length} topics.`);

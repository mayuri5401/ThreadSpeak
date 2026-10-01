-- ============================================================================
-- ThreadSpeak PostgreSQL / SQL Database Schema & Seed Script
-- ============================================================================

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
    user_id VARCHAR(100) PRIMARY KEY,
    completed_topics_json TEXT,
    bookmarked_topics_json TEXT,
    quiz_scores_json TEXT,
    total_xp INT DEFAULT 0,
    current_streak_days INT DEFAULT 0
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Seed Default Demo Users
INSERT INTO users (id, email, password, name, role, target_company, experience_level, avatar_url, xp, streak, joined_date)
VALUES 
(
    'usr-mayuri-lead', 
    'mayuri@threadspeak.dev', 
    'Mayuri123!', 
    'Mayuri', 
    'Senior Software Engineer / System Architect', 
    'FAANG / Tier-1 Enterprise', 
    'Staff / Lead (8+ yrs)', 
    '', 
    3450, 
    7, 
    'August 2026'
),
(
    'usr-alex-architect', 
    'alex@systems.dev', 
    'AlexDev2026!', 
    'Alex Rivera', 
    'Principal Distributed Systems Engineer', 
    'Netflix / Uber Core Infrastructure', 
    'Principal / Architect (10+ yrs)', 
    '', 
    8920, 
    24, 
    'January 2026'
),
(
    'usr-rohan-student', 
    'rohan@student.dev', 
    'RohanLearns!', 
    'Rohan Verma', 
    'Junior Backend Engineer & DSA Aspirant', 
    'Amazon SDE-1 / Atlassian', 
    'Fresher / Student (0-1 yrs)', 
    '', 
    1200, 
    3, 
    'September 2026'
)
ON CONFLICT (id) DO NOTHING;

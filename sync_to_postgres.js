const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function syncTopics() {
    const jsonPath = path.join(__dirname, 'backend', 'src', 'main', 'resources', 'data', 'system_design_topics.json');
    if (!fs.existsSync(jsonPath)) {
        console.error('File not found:', jsonPath);
        return;
    }

    const topics = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    console.log(`Loaded ${topics.length} topics from JSON file.`);

    const client = new Client({
        host: process.env.AWS_RDS_HOST || 'threadspeak-db.cpe62gw2uwps.ap-southeast-1.rds.amazonaws.com',
        port: parseInt(process.env.AWS_RDS_PORT || '5432', 10),
        database: process.env.AWS_RDS_DB_NAME || 'threadspeak_db',
        user: process.env.AWS_RDS_USERNAME || 'postgres',
        password: process.env.AWS_RDS_PASSWORD || 'ThreadSpeak2026!',
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('Connecting to PostgreSQL database...');
        await client.connect();
        console.log('Connected to PostgreSQL successfully!');

        // 1. Ensure tracks table has system-design with all 56 categories
        const categories = Array.from(new Set(topics.map(t => t.category)));
        const trackCategoriesJson = JSON.stringify(categories);
        
        await client.query(`
            INSERT INTO tracks (id, title, short_title, description, icon, color, badge, total_topics, categories_json)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            ON CONFLICT (id) DO UPDATE SET
                title = EXCLUDED.title,
                short_title = EXCLUDED.short_title,
                description = EXCLUDED.description,
                icon = EXCLUDED.icon,
                color = EXCLUDED.color,
                badge = EXCLUDED.badge,
                total_topics = EXCLUDED.total_topics,
                categories_json = EXCLUDED.categories_json;
        `, [
            'system-design',
            'System Design (LLD & HLD)',
            'System Design',
            'Comprehensive architecture mastery: 445 lessons across OOP, SOLID, Gang of Four patterns, Machine Coding, Distributed Systems, High-Level Scalability, and Real-World FAANG Case Studies.',
            'Layers',
            'from-indigo-500 to-purple-600',
            'Architecture',
            topics.length,
            trackCategoriesJson
        ]);
        console.log('Updated system-design track in tracks table.');

        // 2. Insert or update all 445 topics
        console.log(`Inserting/Updating ${topics.length} topics in topics table...`);
        let count = 0;

        for (const t of topics) {
            const query = `
                INSERT INTO topics (
                    id, track_id, track_title, category, title, slug, summary, eli10,
                    mental_model, deep_dive, animation_type, difficulty, estimated_minutes,
                    interview_traps_json, code_snippet_json, tags_json, interactive_steps_json
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                ON CONFLICT (id) DO UPDATE SET
                    track_id = EXCLUDED.track_id,
                    track_title = EXCLUDED.track_title,
                    category = EXCLUDED.category,
                    title = EXCLUDED.title,
                    slug = EXCLUDED.slug,
                    summary = EXCLUDED.summary,
                    eli10 = EXCLUDED.eli10,
                    mental_model = EXCLUDED.mental_model,
                    deep_dive = EXCLUDED.deep_dive,
                    animation_type = EXCLUDED.animation_type,
                    difficulty = EXCLUDED.difficulty,
                    estimated_minutes = EXCLUDED.estimated_minutes,
                    interview_traps_json = EXCLUDED.interview_traps_json,
                    code_snippet_json = EXCLUDED.code_snippet_json,
                    tags_json = EXCLUDED.tags_json,
                    interactive_steps_json = EXCLUDED.interactive_steps_json;
            `;

            const values = [
                t.id,
                t.trackId,
                t.trackTitle,
                t.category,
                t.title,
                t.slug,
                t.summary,
                t.eli10,
                t.mentalModel,
                t.deepDive,
                t.animationType,
                t.difficulty,
                t.estimatedMinutes,
                JSON.stringify(t.interviewTraps || []),
                JSON.stringify(t.codeSnippet || null),
                JSON.stringify(t.tags || []),
                JSON.stringify(t.interactiveSteps || [])
            ];

            await client.query(query, values);
            count++;
            if (count % 50 === 0 || count === topics.length) {
                console.log(`Synced ${count}/${topics.length} topics...`);
            }
        }

        console.log(`Successfully synced all ${count} topics to PostgreSQL database!`);

        // Check total count
        const countRes = await client.query('SELECT COUNT(*) FROM topics');
        console.log(`Total topics now in database: ${countRes.rows[0].count}`);

    } catch (err) {
        console.error('Database Sync Error:', err);
    } finally {
        await client.end();
        console.log('Database connection closed.');
    }
}

syncTopics();

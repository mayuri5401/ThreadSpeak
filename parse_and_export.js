const fs = require('fs');
const path = require('path');

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

function cleanCategoryName(folderName) {
    // e.g. "06_SOLID_Principles" -> "SOLID Principles"
    // "08_Design_Patterns" -> "Design Patterns"
    // "10_Social_Media_Systems" -> "Social Media Systems"
    return folderName
        .replace(/^\d+[\._\s-]*/, '')
        .replace(/_/g, ' ')
        .trim();
}

function parseAlgoMasterHtml(filePath, rootFolder, mainCategoryPrefix) {
    const raw = fs.readFileSync(filePath, 'utf8');

    // 1. Gather all chunks
    const nextFRegex = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;
    let chunkMatch;
    const chunks = [];
    while ((chunkMatch = nextFRegex.exec(raw)) !== null) {
        let chunkStr = chunkMatch[1];
        try {
            chunkStr = JSON.parse('"' + chunkStr + '"');
        } catch (e) {}
        chunks.push(chunkStr);
    }

    // 2. Extract code blocks map: blockId -> [ { blockType, code }, ... ]
    const codeBlocksMap = {};
    for (const chunk of chunks) {
        if (!chunk.includes('"codeBlocks":')) continue;
        
        const cbFieldsRegex = /"fields":\{"id":"([^"]+)","blockName":"[^"]*","blockType":"codeBlock","codeBlocks":(\[[\s\S]*?\]),"executable"/g;
        let m;
        while ((m = cbFieldsRegex.exec(chunk)) !== null) {
            const blockId = m[1];
            try {
                const list = JSON.parse(m[2]);
                codeBlocksMap[blockId] = list;
            } catch(err) {}
        }
    }

    // 3. Extract main content payload
    let mainPayload = null;
    for (const chunk of chunks) {
        if (chunk.includes('"title":"') && chunk.includes('"content":"')) {
            const idx = chunk.indexOf('{"title":"');
            if (idx !== -1) {
                let braceCount = 0;
                let endIdx = -1;
                for (let i = idx; i < chunk.length; i++) {
                    if (chunk[i] === '{') braceCount++;
                    else if (chunk[i] === '}') {
                        braceCount--;
                        if (braceCount === 0) {
                            endIdx = i + 1;
                            break;
                        }
                    }
                }
                if (endIdx !== -1) {
                    try {
                        const parsed = JSON.parse(chunk.substring(idx, endIdx));
                        if (parsed.title && parsed.content) {
                            mainPayload = parsed;
                            break;
                        }
                    } catch(err) {}
                }
            }
        }
    }

    const filenameWithoutExt = path.basename(filePath, path.extname(filePath));
    const cleanFilenameTitle = filenameWithoutExt.replace(/^\d+[\._\s-]*/, '').replace(/_/g, ' ');

    let title = mainPayload?.title || cleanFilenameTitle;
    let description = mainPayload?.description || '';
    let markdown = mainPayload?.content || '';

    // If no next_f payload was found, fallback to parsing body text
    if (!markdown) {
        // Fallback: extract title and text from raw
        const titleMatch = raw.match(/<title>([^<]+)<\/title>/i);
        if (titleMatch) title = titleMatch[1];
        markdown = `Detailed notes and design patterns for **${title}**.`;
    }

    // 4. Replace <!-- payload:codeBlock:START {"id":"..."} --> ... <!-- payload:END -->
    const codeBlockPayloadRegex = /<!-- payload:codeBlock:START (\{[\s\S]*?\}) -->[\s\S]*?<!-- payload:END -->/g;
    let primaryCodeSnippet = null;

    markdown = markdown.replace(codeBlockPayloadRegex, (fullMatch, jsonStr) => {
        try {
            const meta = JSON.parse(jsonStr);
            const blockId = meta.id;
            const blocks = codeBlocksMap[blockId] || [];
            if (blocks.length === 0) return '';
            
            // Prefer Java snippet if available, else Python or first
            const javaBlock = blocks.find(b => b.blockType === 'java') || blocks.find(b => b.blockType === 'python') || blocks[0];
            
            if (!primaryCodeSnippet && javaBlock && javaBlock.code) {
                primaryCodeSnippet = {
                    language: javaBlock.blockType || 'java',
                    code: javaBlock.code,
                    explanation: `Production implementation for ${title}`,
                    lineHighlights: { "1": "Main logic definition" }
                };
            }

            let result = '```' + (javaBlock.blockType || 'java') + '\n' + javaBlock.code + '\n```\n';
            return result;
        } catch(e) {
            return '';
        }
    });

    // 5. Format callout and QA blocks
    markdown = markdown
        .replace(/<!-- payload:calloutBlock:START (\{[\s\S]*?\}) -->/g, '> 💡 **Key Insight:**\n')
        .replace(/<!-- payload:qaBlock:START (\{[\s\S]*?\}) -->/g, '> ❓ **Interview Q&A:**\n')
        .replace(/<!-- payload:END -->/g, '\n\n')
        .replace(/<!-- payload:[^>]+ -->/g, '');

    // 6. Clean special unicode artifacts (like \u003e, \u00a0, ?T, ?o, etc.)
    markdown = markdown
        .replace(/\?T/g, "'")
        .replace(/\?o/g, '"')
        .replace(/\?/g, '"')
        .replace(/&nbsp;/g, ' ')
        .replace(/\u00a0/g, ' ')
        .replace(/\n{3,}/g, '\n\n');

    // 7. Subfolder determination
    const relDir = path.relative(rootFolder, path.dirname(filePath));
    const subfolderName = relDir ? path.basename(relDir) : 'General';
    const subCategory = cleanCategoryName(subfolderName);
    const category = `${mainCategoryPrefix} - ${subCategory}`;

    // Summary extraction
    let summary = description || '';
    if (!summary && markdown) {
        const firstP = markdown.split('\n\n').find(p => p.trim() && !p.startsWith('#') && !p.startsWith('>'));
        if (firstP) {
            summary = firstP.replace(/[*_#`]/g, '').trim();
            if (summary.length > 250) summary = summary.substring(0, 247) + '...';
        }
    }
    if (!summary) summary = `In-depth architecture, design principles, and interview analysis for ${title}.`;

    // Unique ID
    const topicId = slugify(`${mainCategoryPrefix}-${subCategory}-${title}`);

    // Interactive Steps (2-3 steps based on title)
    const interactiveSteps = [
        { stepNumber: 1, title: 'Requirements & Clarification', description: `Understand functional and non-functional goals for ${title}.`, systemState: 'Analysis' },
        { stepNumber: 2, title: 'Architecture & Component Breakdown', description: `Design core entities, interfaces, and data flow for ${title}.`, systemState: 'Architecture' },
        { stepNumber: 3, title: 'Scalability & Tradeoffs', description: `Deep dive into bottlenecks, concurrency, resilience, and tradeoffs.`, systemState: 'Deep Dive' }
    ];

    // Interview traps
    const interviewTraps = [
        {
            trap: `What is the key architectural tradeoff or bottleneck in ${title}?`,
            whyWrong: `Treating ${title} as a generic solution without considering scale, consistency vs availability, or modular decoupling.`,
            solution: `Carefully evaluate requirements, apply Single Responsibility & SOLID/distributed patterns, and benchmark access patterns.`,
            example: `// Focus on clean boundaries, caching, and resilient error recovery.`
        }
    ];

    return {
        id: topicId,
        trackId: 'system-design',
        trackTitle: 'System Design (LLD & HLD)',
        category: category,
        title: title,
        slug: topicId,
        summary: summary,
        eli10: `Imagine ${title} as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos.`,
        mentalModel: `${title} Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache.`,
        deepDive: markdown,
        animationType: 'generic-flow',
        difficulty: title.toLowerCase().includes('design') || title.toLowerCase().includes('distributed') ? 'Advanced' : 'Intermediate',
        estimatedMinutes: 15,
        interviewTraps: interviewTraps,
        codeSnippet: primaryCodeSnippet,
        tags: [mainCategoryPrefix, subCategory, 'System Design', 'Architecture'],
        interactiveSteps: interactiveSteps
    };
}

// Walk and parse all 445 files
const baseDir = 'D:\\SystemDesign';
const folders = [
    { dir: path.join(baseDir, '01. LLD - AlgoMaster'), prefix: 'LLD' },
    { dir: path.join(baseDir, '02. System Design (HLD) - AlgoMaster'), prefix: 'HLD' },
    { dir: path.join(baseDir, '03. System Design (HLD) Interviews - AlgoMaster'), prefix: 'HLD Interviews' }
];

let allParsedTopics = [];
let errorCount = 0;

for (const f of folders) {
    if (!fs.existsSync(f.dir)) {
        console.error('Folder not found:', f.dir);
        continue;
    }

    function walk(currDir) {
        const list = fs.readdirSync(currDir);
        for (const item of list) {
            const full = path.join(currDir, item);
            const stat = fs.statSync(full);
            if (stat.isDirectory()) {
                walk(full);
            } else if (item.endsWith('.html') || item.endsWith('.htm')) {
                try {
                    const topic = parseAlgoMasterHtml(full, f.dir, f.prefix);
                    if (topic) {
                        allParsedTopics.push(topic);
                    }
                } catch(err) {
                    console.error('Error parsing:', full, err.message);
                    errorCount++;
                }
            }
        }
    }
    walk(f.dir);
}

console.log('====================================================');
console.log(`TOTAL PARSED TOPICS: ${allParsedTopics.length}`);
console.log(`ERRORS: ${errorCount}`);
console.log('====================================================');

// Group by category to see counts
const catCounts = {};
for (const t of allParsedTopics) {
    catCounts[t.category] = (catCounts[t.category] || 0) + 1;
}

console.log('Categories overview:');
console.table(Object.entries(catCounts).map(([cat, count]) => ({ Category: cat, Topics: count })));

// Write parsed topics to a master JSON file in backend resources
const outDir = path.join(__dirname, 'backend', 'src', 'main', 'resources', 'data');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const outFile = path.join(outDir, 'system_design_topics.json');
fs.writeFileSync(outFile, JSON.stringify(allParsedTopics, null, 2), 'utf8');
console.log(`Successfully saved ${allParsedTopics.length} topics to ${outFile}`);

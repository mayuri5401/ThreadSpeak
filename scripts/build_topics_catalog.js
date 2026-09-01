const fs = require('fs');
const path = require('path');

const curriculumDir = path.resolve(__dirname, '../frontend/public/curriculum');
const outputDir = path.resolve(__dirname, '../frontend/src/shared/api');

function getAllMdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.sort().forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMdFiles(fullPath));
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  return results;
}

function parseMarkdownFrontmatter(raw, fallbackId, relPath) {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!fmMatch) {
    return {
      id: fallbackId,
      title: fallbackId,
      filePath: '/' + relPath.replace(/\\/g, '/')
    };
  }

  const frontmatter = fmMatch[1];
  const body = fmMatch[2].trim();

  const get = (key) => {
    const m = frontmatter.match(new RegExp(`^${key}:\\s*"?([^"\\r\\n]+)"?`, 'm'));
    return m ? m[1].trim() : undefined;
  };

  const tagsMatch = frontmatter.match(/^tags:\s*\[([^\]]*)\]/m);
  const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')).filter(Boolean) : [];

  const estMin = parseInt(get('estimatedMinutes')) || 10;

  return {
    id: get('id') || fallbackId,
    trackId: get('trackId') || relPath.split(/[/\\]/)[0],
    trackTitle: get('trackTitle') || '',
    category: get('category') || 'General',
    title: get('title') || fallbackId,
    slug: get('slug') || fallbackId,
    level: get('difficulty') || get('level') || 'Intermediate',
    difficulty: get('difficulty') || 'Intermediate',
    estimatedMinutes: estMin,
    readTime: `${estMin} min`,
    summary: get('summary') || '',
    eli10: get('eli10') || '',
    mentalModel: get('mentalModel') || '',
    animationType: get('animationType') || 'generic-flow',
    tags,
    filePath: '/curriculum/' + relPath.replace(/\\/g, '/'),
    deepDive: body || ''
  };
}

const allFiles = getAllMdFiles(curriculumDir);
console.log(`Found ${allFiles.length} markdown curriculum files.`);

const topicsCatalog = [];
const curriculumIndex = {};
const trackMap = {};

allFiles.forEach(absPath => {
  const relPath = path.relative(curriculumDir, absPath);
  const raw = fs.readFileSync(absPath, 'utf8');
  const baseName = path.basename(absPath, '.md');
  const meta = parseMarkdownFrontmatter(raw, baseName, relPath);

  topicsCatalog.push(meta);
  curriculumIndex[meta.id] = meta.filePath;

  if (!trackMap[meta.trackId]) {
    trackMap[meta.trackId] = {
      categories: new Set(),
      count: 0
    };
  }
  trackMap[meta.trackId].categories.add(meta.category);
  trackMap[meta.trackId].count++;
});

// Build Tracks Catalog
const tracksCatalog = [
  {
    id: "core-java",
    title: "Core & Advanced Java",
    shortTitle: "Core Java",
    description: "Complete structured Java mastery from Introduction, OOPs, Memory, Strings, Multithreading to modern Java LTS.",
    icon: "Coffee",
    color: "from-amber-500 to-orange-600",
    badge: "Foundation",
    totalTopics: trackMap["core-java"] ? trackMap["core-java"].count : 137,
    categories: trackMap["core-java"] ? Array.from(trackMap["core-java"].categories) : []
  },
  {
    id: "system-design",
    title: "System Design (LLD & HLD)",
    shortTitle: "System Design",
    description: "Comprehensive architecture mastery: SOLID principles, Gang of Four patterns, Machine Coding (LRU, Rate Limiter), and High-Level Distributed Scalability.",
    icon: "Layers",
    color: "from-indigo-500 to-purple-600",
    badge: "Architecture",
    totalTopics: trackMap["system-design"] ? trackMap["system-design"].count : 379,
    categories: trackMap["system-design"] ? Array.from(trackMap["system-design"].categories) : []
  },
  {
    id: "spring-boot",
    title: "Spring Boot & Microservices",
    shortTitle: "Spring Boot",
    description: "Understand IoC/DI, Bean Lifecycle, DispatcherServlet Request Pipeline, JPA Persistence Context, Security 6 JWT, and Distributed Microservices.",
    icon: "Leaf",
    color: "from-emerald-500 to-teal-600",
    badge: "Enterprise",
    totalTopics: trackMap["spring-boot"] ? trackMap["spring-boot"].count : 7,
    categories: trackMap["spring-boot"] ? Array.from(trackMap["spring-boot"].categories) : []
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms in Java",
    shortTitle: "DSA",
    description: "Ace technical coding interviews: Two Pointers, Sliding Window, Fast/Slow Pointers, Binary Trees & BST, Graphs, and Dynamic Programming.",
    icon: "Code",
    color: "from-cyan-500 to-blue-600",
    badge: "Problem Solving",
    totalTopics: trackMap["dsa"] ? trackMap["dsa"].count : 17,
    categories: trackMap["dsa"] ? Array.from(trackMap["dsa"].categories) : []
  }
];

// Write outputs
fs.writeFileSync(path.join(outputDir, 'topicsCatalog.json'), JSON.stringify(topicsCatalog, null, 2), 'utf8');
fs.writeFileSync(path.join(outputDir, 'curriculumIndex.json'), JSON.stringify(curriculumIndex, null, 2), 'utf8');
fs.writeFileSync(path.join(outputDir, 'tracksCatalog.json'), JSON.stringify(tracksCatalog, null, 2), 'utf8');

console.log(`[Success] Generated:
- topicsCatalog.json (${topicsCatalog.length} topics)
- curriculumIndex.json (${Object.keys(curriculumIndex).length} index entries)
- tracksCatalog.json (${tracksCatalog.length} tracks)
`);

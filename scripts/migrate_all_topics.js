const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../backend/content-service/src/main/resources');
const dataDir = path.join(baseDir, 'data');
const curriculumDir = path.join(baseDir, 'curriculum');

const targets = [
  { file: 'spring_boot_topics.json', trackFolder: 'spring-boot' },
  { file: 'dsa_topics.json', trackFolder: 'dsa' }
];

targets.forEach(({ file, trackFolder }) => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) return;

  const topics = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const trackBase = path.join(curriculumDir, trackFolder);

  topics.forEach((topic, idx) => {
    const catFolder = (topic.category || 'general').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = (topic.slug || topic.id).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const dir = path.join(trackBase, catFolder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const num = String(idx + 1).padStart(2, '0');
    const mdPath = path.join(dir, `${num}-${slug}.md`);

    const escapeYaml = (str) => JSON.stringify(str || '');

    let yaml = '---\n';
    yaml += `id: ${escapeYaml(topic.id)}\n`;
    yaml += `trackId: ${escapeYaml(topic.trackId || trackFolder)}\n`;
    yaml += `trackTitle: ${escapeYaml(topic.trackTitle || '')}\n`;
    yaml += `category: ${escapeYaml(topic.category || '')}\n`;
    yaml += `title: ${escapeYaml(topic.title || '')}\n`;
    yaml += `slug: ${escapeYaml(topic.slug || topic.id)}\n`;
    yaml += `summary: ${escapeYaml(topic.summary || '')}\n`;
    if (topic.eli10) yaml += `eli10: ${escapeYaml(topic.eli10)}\n`;
    if (topic.mentalModel) yaml += `mentalModel: ${escapeYaml(topic.mentalModel)}\n`;
    yaml += `difficulty: ${escapeYaml(topic.difficulty || 'Intermediate')}\n`;
    yaml += `estimatedMinutes: ${topic.estimatedMinutes || 10}\n`;
    yaml += `tags: ${JSON.stringify(topic.tags || [])}\n`;
    yaml += `animationType: ${escapeYaml(topic.animationType || 'generic-flow')}\n`;
    if (topic.codeSnippet) {
      yaml += 'codeSnippet:\n';
      yaml += `  language: ${escapeYaml(topic.codeSnippet.language || 'java')}\n`;
      yaml += `  explanation: ${escapeYaml(topic.codeSnippet.explanation || '')}\n`;
      yaml += '  code: |\n';
      (topic.codeSnippet.code || '').split('\n').forEach(line => {
        yaml += `    ${line}\n`;
      });
    }
    yaml += '---\n\n';

    const fullContent = yaml + (topic.deepDive || '');
    fs.writeFileSync(mdPath, fullContent, 'utf8');
    console.log(`[Created] ${mdPath}`);
  });
});

console.log('Migration of Spring Boot and DSA topics complete!');

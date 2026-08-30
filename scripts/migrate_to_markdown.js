const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../backend/content-service/src/main/resources/data/core_java_topics.json');
const outBase = path.resolve(__dirname, '../backend/content-service/src/main/resources/curriculum/core-java');

const data = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

data.forEach((topic, idx) => {
  const catFolder = topic.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const slug = (topic.slug || topic.id).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const dir = path.join(outBase, catFolder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const num = String(idx + 1).padStart(2, '0');
  const filePath = path.join(dir, `${num}-${slug}.md`);

  const escapeYaml = (str) => JSON.stringify(str || '');

  let yaml = '---\n';
  yaml += `id: ${escapeYaml(topic.id)}\n`;
  yaml += `trackId: ${escapeYaml(topic.trackId || 'core-java')}\n`;
  yaml += `trackTitle: ${escapeYaml(topic.trackTitle || 'Core & Advanced Java')}\n`;
  yaml += `category: ${escapeYaml(topic.category)}\n`;
  yaml += `title: ${escapeYaml(topic.title)}\n`;
  yaml += `slug: ${escapeYaml(topic.slug || topic.id)}\n`;
  yaml += `summary: ${escapeYaml(topic.summary || '')}\n`;
  if (topic.eli10) yaml += `eli10: ${escapeYaml(topic.eli10)}\n`;
  if (topic.mentalModel) yaml += `mentalModel: ${escapeYaml(topic.mentalModel)}\n`;
  yaml += `difficulty: ${escapeYaml(topic.difficulty || 'Beginner')}\n`;
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
  fs.writeFileSync(filePath, fullContent, 'utf8');
  console.log(`[Created] ${filePath}`);
});

console.log(`\nSuccessfully created ${data.length} modular markdown files!`);

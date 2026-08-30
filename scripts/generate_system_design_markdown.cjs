const fs = require('fs');
const path = require('path');

const jsonPath = 'D:/ThreadSpeak/data/system_design_topics.json';
const targetDir = 'D:/ThreadSpeak/backend/content-service/src/main/resources/curriculum/system-design';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const rawData = fs.readFileSync(jsonPath, 'utf8');
const topics = JSON.parse(rawData);

console.log(`Loaded ${topics.length} topics from ${jsonPath}`);

// Map category to a clean folder name
const categoryOrder = [];
const categoryFolderMap = {};

topics.forEach(t => {
  const cat = t.category || 'General';
  if (!categoryOrder.includes(cat)) {
    categoryOrder.push(cat);
  }
});

categoryOrder.forEach((cat, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  const slug = cat
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  categoryFolderMap[cat] = `${num}-${slug}`;
});

let createdCount = 0;
const categoryTopicCounter = {};

topics.forEach(t => {
  const cat = t.category || 'General';
  const folderName = categoryFolderMap[cat];
  const catDir = path.join(targetDir, folderName);

  if (!fs.existsSync(catDir)) {
    fs.mkdirSync(catDir, { recursive: true });
  }

  categoryTopicCounter[cat] = (categoryTopicCounter[cat] || 0) + 1;
  const topicIdx = String(categoryTopicCounter[cat]).padStart(2, '0');

  const topicSlug = (t.slug || t.id || 'topic')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const fileName = `${topicIdx}-${topicSlug}.md`;
  const filePath = path.join(catDir, fileName);

  // Clean tags
  let tagsYaml = '[]';
  if (t.tags && Array.isArray(t.tags) && t.tags.length > 0) {
    tagsYaml = JSON.stringify(t.tags);
  }

  const escapeYaml = (str) => {
    if (!str) return '""';
    return JSON.stringify(str);
  };

  const frontmatter = `---
id: ${escapeYaml(t.id)}
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: ${escapeYaml(t.category || 'System Design')}
subSection: ${escapeYaml(t.subSection || '')}
title: ${escapeYaml(t.title)}
slug: ${escapeYaml(t.slug || t.id)}
summary: ${escapeYaml(t.summary || '')}
eli10: ${escapeYaml(t.eli10 || '')}
mentalModel: ${escapeYaml(t.mentalModel || '')}
difficulty: ${escapeYaml(t.difficulty || 'Intermediate')}
estimatedMinutes: ${t.estimatedMinutes || 15}
tags: ${tagsYaml}
${t.codeSnippet?.code ? `codeSnippet:
  language: ${escapeYaml(t.codeSnippet.language || 'java')}
  explanation: ${escapeYaml(t.codeSnippet.explanation || '')}
  code: |
${t.codeSnippet.code.split('\n').map(line => '    ' + line).join('\n')}` : ''}
---

${t.deepDive || `# ${t.title}\n\n${t.summary || ''}`}
`;

  fs.writeFileSync(filePath, frontmatter, 'utf8');
  createdCount++;
});

console.log(`Successfully generated ${createdCount} modular markdown files in ${categoryOrder.length} categories under ${targetDir}!`);

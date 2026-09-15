const fs = require('fs');
const path = require('path');

const dirs = [
  path.resolve(__dirname, '../frontend/public/curriculum'),
  path.resolve(__dirname, '../backend/content-service/src/main/resources/curriculum')
];

// Regex for common decorative emojis used in headings and bullets
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2300}-\u{23FF}\u{2B50}\u{200D}\u{FE0F}]/gu;

function cleanMarkdown(content) {
  const lines = content.split('\n');
  const cleanedLines = lines.map(line => {
    // Clean headers: # 🔤 Heading -> # Heading
    if (/^#+\s+/.test(line)) {
      let cleaned = line.replace(emojiRegex, '').replace(/\s{2,}/g, ' ');
      // Also clean 1️⃣ 2️⃣ 3️⃣
      cleaned = cleaned.replace(/[0-9]️⃣/g, '');
      return cleaned.trimEnd();
    }
    // Clean bullet points starting with emojis: - 💡 Point -> - Point
    if (/^\s*[-*+]\s+/.test(line)) {
      let cleaned = line.replace(emojiRegex, '').replace(/\s{2,}/g, ' ');
      cleaned = cleaned.replace(/[0-9]️⃣/g, '');
      return cleaned.trimEnd();
    }
    return line;
  });
  return cleanedLines.join('\n');
}

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (item.endsWith('.md')) {
      const raw = fs.readFileSync(fullPath, 'utf8');
      const cleaned = cleanMarkdown(raw);
      if (raw !== cleaned) {
        fs.writeFileSync(fullPath, cleaned, 'utf8');
      }
    }
  }
}

for (const d of dirs) {
  processDir(d);
}

console.log('Finished removing unnecessary emojis from curriculum markdown files.');

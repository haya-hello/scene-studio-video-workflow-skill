import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] || new URL('..', import.meta.url).pathname);
const findings = [];
const blockedNames = /(^|\.)env$|\.pem$|\.key$|\.p12$|\.db$|\.sqlite$|(^|[-_.])(token|secret|credential|password)([-_.]|$)/i;
const secretPatterns = [
  /(?:sk|ghp|github_pat)_[A-Za-z0-9_\-]{20,}/,
  /Bearer\s+[A-Za-z0-9._\-]{20,}/i,
  /https:\/\/[^\s/]+:[^\s/@]+@/i,
  /[A-Za-z]:\\Users\\[^\s`'"<>]+/i,
  /D:\\codex[^\s`'"<>]*/i
];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else {
      if (blockedNames.test(entry.name)) findings.push(`${path.relative(root, full)}: blocked filename`);
      const bytes = await readFile(full);
      if (bytes.includes(0)) continue;
      const text = bytes.toString('utf8');
      for (const pattern of secretPatterns) if (pattern.test(text)) findings.push(`${path.relative(root, full)}: ${pattern}`);
    }
  }
}

await stat(root);
await walk(root);
if (findings.length) {
  console.error('Public package check failed / 公开包检查失败');
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}
console.log('Public package check passed / 公开包检查通过');

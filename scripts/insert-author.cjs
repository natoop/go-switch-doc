const fs = require('fs');
const path = require('path');

const root = process.cwd();
const modified = [];

function walk(dir){
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for(const e of entries){
    const full = path.join(dir, e.name);
    if(e.isDirectory()){
      if(e.name === 'node_modules' || e.name === '.git') continue;
      walk(full);
    } else if(e.isFile() && full.toLowerCase().endsWith('.md')){
      processFile(full);
    }
  }
}

function processFile(filePath){
  let s = fs.readFileSync(filePath, 'utf8');
  const lines = s.split(/\r?\n/);
  const updatedRegex = /^Updated:\s*/i;
  for(let i=0;i<lines.length;i++){
    if(updatedRegex.test(lines[i])){
      // check previous non-empty line for existing 作者 goswitcher
      const prev = lines[i-1] || '';
      if(/^[\s]*作者\s+goswitcher\s*$/i.test(prev) || /^[\s]*<!--\s*作者\s+goswitcher\s*-->\s*$/i.test(prev)){
        return; // already has author directly above
      }
      // insert author line above
      lines.splice(i, 0, '作者 goswitcher');
      fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
      modified.push(filePath);
      return;
    }
  }
}

walk(root);
console.log('Modified', modified.length, 'files');
for(const m of modified) console.log(m);

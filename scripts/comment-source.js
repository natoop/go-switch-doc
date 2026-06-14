const fs = require('fs');
const path = require('path');

const root = process.cwd();
const matches = [];

function walk(dir){
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for(const e of entries){
    const full = path.join(dir, e.name);
    if(e.isDirectory()){
      // skip node_modules, .git
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
  const regex = /^\s*Source:\s*https:\/\/docs\.goswitch\.online(\/.*)?\s*$/i;
  for(let i=0;i<lines.length;i++){
    const line = lines[i];
    if(/<!--\s*Source:\s*https:\/\/docs\.goswitch\.online/.test(line)){
      // already commented, consider as present but skip
      return;
    }
    if(regex.test(line)){
      lines[i] = '<!-- ' + line + ' -->';
      fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
      matches.push(filePath);
      return;
    }
  }
}

walk(root);
console.log('Modified', matches.length, 'files');
for(const m of matches) console.log(m);

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

function hasYamlAuthor(lines){
  if(lines[0] && lines[0].trim() === '---'){
    for(let i=1;i<lines.length;i++){
      if(lines[i].trim() === '---') break;
      if(/^\s*author\s*:/i.test(lines[i])) return true;
    }
  }
  return false;
}

function processFile(filePath){
  let s = fs.readFileSync(filePath, 'utf8');
  const lines = s.split(/\r?\n/);
  if(hasYamlAuthor(lines)) return;

  const updatedRegex = /^\s*Updated:\s*/i;
  let updatedIndex = -1;
  for(let i=0;i<lines.length;i++){
    if(updatedRegex.test(lines[i])){ updatedIndex = i; break; }
  }
  if(updatedIndex === -1) return;

  // find previous non-empty line index (could be commented Source)
  let j = updatedIndex - 1;
  while(j >= 0 && lines[j].trim() === '') j--;

  const authorLine = 'Author: goswitcher';
  const zhAuthorRegex = /^\s*作者\s+goswitcher\s*$/i;
  const enAuthorRegex = /^\s*Author\s*:\s*goswitcher\s*$/i;

  if(j >= 0 && enAuthorRegex.test(lines[j])){
    // ensure there is exactly one blank line between author and Updated
    if(j + 1 !== updatedIndex - 1){
      // remove any lines between j and updatedIndex
      const newLines = [];
      newLines.push(...lines.slice(0, j+1));
      newLines.push('');
      newLines.push(...lines.slice(updatedIndex));
      fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
      modified.push(filePath);
    }
    return;
  }

  if(j >= 0 && zhAuthorRegex.test(lines[j])){
    // replace Chinese author with English and ensure blank line
    lines[j] = authorLine;
    // remove lines between j and updatedIndex
    const newLines = [];
    newLines.push(...lines.slice(0, j+1));
    newLines.push('');
    newLines.push(...lines.slice(updatedIndex));
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    modified.push(filePath);
    return;
  }

  // otherwise insert author and a blank line before Updated
  const newLines = [];
  newLines.push(...lines.slice(0, updatedIndex));
  newLines.push(authorLine);
  newLines.push('');
  newLines.push(...lines.slice(updatedIndex));
  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  modified.push(filePath);
}

walk(root);
console.log('Modified', modified.length, 'files');
for(const m of modified) console.log(m);

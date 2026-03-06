const fs = require('fs');
const path = 'c:/Users/Admin/Desktop/metro-test-master/public/questions.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const map = {};
data.questions.forEach((q,i)=>{
  const text = q.question.trim();
  if(!map[text]) map[text]=[];
  map[text].push(i+1);
});
let found = false;
for(const [q, idxs] of Object.entries(map)){
  if(idxs.length>1){
    found = true;
    console.log(`Duplicate question (${idxs.length}): indexes ${idxs.join(', ')} -> ${q}`);
  }
}
if(!found) console.log('No duplicates detected.');

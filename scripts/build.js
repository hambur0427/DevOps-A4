const fs = require('node:fs');
fs.mkdirSync('dist', {recursive:true});
const readme = fs.readFileSync('README.md','utf8');
fs.writeFileSync('dist/activity-log.txt', 'Activity Log Build\n\n'+readme);
console.log('Created dist/activity-log.txt');

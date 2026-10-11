const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
test('README identifies the project', () => assert.match(fs.readFileSync('README.md','utf8'), /DevOps-A4/));

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const artifact = path.join(__dirname, '..', 'dist', 'activity-log.txt');

test('downloaded build artifact exists', () => {
  assert.ok(fs.existsSync(artifact), 'Build artifact is missing');
});

test('artifact has the expected heading', () => {
  assert.match(fs.readFileSync(artifact, 'utf8'), /^Activity Log Build/);
});

test('artifact embeds repository README contents', () => {
  const readme = fs.readFileSync(path.join(__dirname, '..', 'README.md'), 'utf8');
  assert.ok(fs.readFileSync(artifact, 'utf8').includes(readme));
});

test('test environment is staging', () => {
  assert.equal(process.env.TEST_ENV, 'staging');
});

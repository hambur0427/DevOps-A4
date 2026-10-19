const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('build script exists', () => {
  assert.ok(fs.existsSync(path.join(__dirname, '..', 'scripts', 'build.js')));
});

test('package.json provides a build command', () => {
  const pkg = require('../package.json');
  assert.equal(pkg.scripts.build, 'node scripts/build.js');
});

test('README identifies the project', () => {
  const readme = fs.readFileSync(path.join(__dirname, '..', 'README.md'), 'utf8');
  assert.match(readme, /DevOps-A4/);
});

// Intentional failure only on a5-failure-demo for testing the deployment gate.
test('failure demo: deployment must be blocked', () => {
  assert.equal(1 + 1, 3, 'Intentional failure to demonstrate the testing gate');
});

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('annotations example is a minimal authoring app with an opt-in scenario harness', async () => {
  const html = await readFile(new URL('../examples/annotations/index.html', import.meta.url), 'utf8');
  const moduleSource = html.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1] || '';
  const parseableSource = moduleSource.replace(/^\s*import .*;\s*$/m, '');
  assert.doesNotThrow(() => new Function(`return async () => {${parseableSource}};`));
  assert.match(html, /mode:\s*'author'/);
  assert.match(html, /id="harness" hidden/);
  assert.match(html, /has\('debug'\)/);
  assert.match(html, /Right-click the model to add/);
  assert.match(html, /Long-press the model to add/);
  for (const scenario of ['Rapid switch', 'Remote update', 'Malformed JSON', 'Reset fixture']) {
    assert.match(html, new RegExp(scenario));
  }
  assert.match(html, /viewer\.annotations\.download\(\)/);
  assert.doesNotMatch(html, /showExport:\s*true/);
});

test('rapid-switch fixtures identify an unambiguous winning document', async () => {
  const [first, second] = await Promise.all([
    readFile(new URL('../examples/annotations/rapid-a.annotations.json', import.meta.url), 'utf8'),
    readFile(new URL('../examples/annotations/rapid-b.annotations.json', import.meta.url), 'utf8')
  ]);
  assert.equal(JSON.parse(first).annotations[0].title, 'Stale A');
  assert.equal(JSON.parse(second).annotations[0].title, 'Current B');
});

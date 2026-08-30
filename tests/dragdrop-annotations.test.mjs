import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('drag-and-drop example supports model-local annotation authoring and JSON round trips', async () => {
  const html = await readFile(new URL('../examples/dragdrop/index.html', import.meta.url), 'utf8');
  const moduleSource = html.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1] || '';
  const parseableSource = moduleSource.replace(/^\s*import .*;\s*$/m, '');

  assert.doesNotThrow(() => new Function(`return async () => {${parseableSource}};`));
  assert.match(html, /accept="\.glb,\.json,application\/json" multiple/);
  assert.match(html, /id="startAnnotations"/);
  assert.match(html, /id="downloadAnnotations"/);
  assert.match(html, /annotations:\s*\{[\s\S]*?enabled:\s*true/);
  assert.match(html, /await viewer\.loadModel\(DROPPED_MODEL_KEY\)/);
  assert.doesNotMatch(html, /await viewer\.belowViewer\.loadModel\(url/);
  assert.match(html, /await viewer\.annotations\.load\(blankAnnotationDocument\(\)\)/);
  assert.match(html, /await viewer\.annotations\.load\(documentValue\)/);
  assert.match(html, /viewer\.annotations\?\.download\(annotationFilename\)/);
  assert.match(
    html,
    /if \(modelFile\) await loadModelFile\(modelFile\);\s*if \(annotationFile\) await loadAnnotationFile\(annotationFile\);/
  );
});

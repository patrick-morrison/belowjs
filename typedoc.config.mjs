export default {
  entryPoints: ['src/index.js'],
  out: 'docs/api',
  plugin: ['typedoc-plugin-markdown'],
  readme: 'README.md',
  includeVersion: true,
  tsconfig: './tsconfig.json',
  name: 'BelowJS API'
};


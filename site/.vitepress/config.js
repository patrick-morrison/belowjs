import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'BelowJS',
  description: 'View underwater photogrammetry models in VR',
  lang: 'en-US',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['meta', { name: 'theme-color', content: '#0d3b66' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'BelowJS - View underwater photogrammetry models in VR' }],
    ['meta', { property: 'og:description', content: 'A Three.js library for maritime archaeology and underwater heritage' }],
  ],
  // Temporarily disable vite config that might interfere with VitePress hydration
  // vite: {
  //   resolve: {
  //     alias: {
  //       'belowjs': '/dist/belowjs.js'
  //     }
  //   },
  //   optimizeDeps: {
  //     exclude: ['belowjs']
  //   }
  // },
  appearance: false,
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: 'Installation', link: '/installation' },
      { text: 'Examples', link: '/examples/' },
      { text: 'API', link: '/api/' },
      { text: 'Guides', link: '/guides' },
      { text: 'Implementations', link: '/implementations' }
    ],
    sidebar: {
      '/examples/': [
        { text: 'Examples', link: '/examples/' },
        { text: 'Basic Viewer', link: '/examples/basic' },
        { text: 'Embedded Viewer', link: '/examples/embedded' }
      ],
      '/api/': [
        { text: 'API Reference', link: '/api/' },
        { text: 'Classes', link: '/api/classes/' },
        { text: 'Variables', link: '/api/variables/' }
      ],
      '/implementations/': [
        { text: 'Implementations', link: '/implementations' }
      ],
      '/guides/': [
        { text: 'Guides', link: '/guides' },
        { text: 'VR Headsets', link: '/guides/vr-headsets' },
        { text: 'Metashape Workflow', link: '/guides/metashape-workflow' },
        { text: 'Model Optimization', link: '/guides/optimization' },
        { text: 'Model Setup', link: '/guides/model-setup' }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/patrick-morrison/belowjs' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/belowjs' }
    ],
    footer: {
      message: 'GPL-3.0 Licensed',
      copyright: 'Created by <a href="https://padmorrison.com">Patrick Morrison</a>'
    }
  }
});


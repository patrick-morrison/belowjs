import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'BelowJS',
  description: 'Dive Shipwrecks in Virtual Reality',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Installation', link: '/installation' },
      { text: 'Examples', link: '/examples' },
      { text: 'API', link: '/api/' },
      { text: 'Implementations', link: '/implementations' },
      { text: 'Guides', link: '/guides' }
    ],
    sidebar: {
      '/installation': [{ text: 'Installation', link: '/installation' }],
      '/examples': [{ text: 'Examples', link: '/examples' }],
      '/implementations': [{ text: 'Implementations', link: '/implementations' }],
      '/guides': [{ text: 'Guides & Tools', link: '/guides' }],
      '/api': [{ text: 'API', link: '/api/' }]
    }
  }
});


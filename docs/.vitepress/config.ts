import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'linzhe-blog',
  description: 'linzhe的个人笔记汇总',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/promise/readme' },
    ],

    sidebar: [
      {
        // text: 'javascript',
        items: [{ text: 'promise/A+', link: '/promise/readme' }],
      },
      {
        text: 'docker',
        items: [
          { text: 'docker常用命令', link: '/docker/readme' },
          { text: 'nginx-app', link: '/docker/nginx-app/readme' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/linzhe141' }],
  },
})

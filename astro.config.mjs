// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://secper.github.io',
	integrations: [
		starlight({
			title: 'My Docs',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' }
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/secper/secper.github.io' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: '数据库',
					autogenerate: { directory: 'db' },
				},
        {
          label: '前端',
          autogenerate: { directory: 'frontend' },
        },
        {
          label: '工具',
          autogenerate: { directory: 'tools' },
        },
			],
		}),
	],
});

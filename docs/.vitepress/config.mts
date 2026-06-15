import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

type SidebarItem = {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

const configDir = dirname(fileURLToPath(import.meta.url))
const siteRoot = resolve(configDir, '..')

function shouldMapPath(file: string) {
  return relative(siteRoot, file)
    .split(sep)
    .every((part) => !part.startsWith('_'))
}

const sectionMetaEn: Record<string, { text: string, order: number }> = {
  register: { text: 'Getting Started', order: 10 },
  //token: { text: 'Models & Token Groups', order: 20 },
  ccswitch: { text: 'CC-Switch Quick Setup', order: 30 },
   cli: { text: 'CLI Manual Setup', order: 40 },
  // paint: { text: 'Image Models', order: 50 },
  // advanced: { text: 'Third-party Integration', order: 60 },
   faq: { text: 'FAQ', order: 70 },
  // tos: { text: 'Terms & Policies', order: 80 }
}

const sectionMetaZh: Record<string, { text: string, order: number }> = {
  register: { text: '入门与账号配置', order: 10 },
  // token: { text: '模型与令牌分组', order: 20 },
  ccswitch: { text: 'CC-Switch 一键配置', order: 30 },
  cli: { text: 'CLI 手动配置', order: 40 },
  // paint: { text: '绘图模型使用', order: 50 },
  // advanced: { text: '第三方工具接入', order: 60 },
   faq: { text: '常见问题排查', order: 70 },
  // tos: { text: '条款与政策说明', order: 80 }
}

function markdownTitle(file: string) {
  const raw = readFileSync(file, 'utf8')
  const match = raw.match(/^#\s+(.+)$/m)
  return match?.[1]
    .replace(/\s+\{#.+\}$/, '')
    .replace(/[`*_~]/g, '')
    .trim()
}

function titleFromName(name: string) {
  return name
    .replace(/\.md$/i, '')
    .replace(/^(README|index)$/i, 'Overview')
    .replace(/^\d+[-_]/, '')
    .replace(/[-_]/g, ' ')
}

function titleFromNameZh(name: string) {
  return name
    .replace(/\.md$/i, '')
    .replace(/^(README|index)$/i, '概览')
    .replace(/^\d+[-_]/, '')
    .replace(/[-_]/g, ' ')
}

function compareEntries(a: string, b: string) {
  if (/^(README|index)\.md$/i.test(a))
    return -1
  if (/^(README|index)\.md$/i.test(b))
    return 1

  const aNum = Number(a.match(/^(\d+)/)?.[1] ?? Number.NaN)
  const bNum = Number(b.match(/^(\d+)/)?.[1] ?? Number.NaN)
  if (!Number.isNaN(aNum) && !Number.isNaN(bNum) && aNum !== bNum)
    return aNum - bNum

  return a.localeCompare(b, 'en', { numeric: true })
}

function routeFor(file: string, siteRoot: string) {
  const normalized = relative(siteRoot, file).split(sep).join('/')
  return '/' + normalized
    .replace(/\/?(README|index)\.md$/i, '/')
    .replace(/\.md$/i, '')
}

function fileItem(file: string, siteRoot: string, titleFn: (name: string) => string): SidebarItem {
  return {
    text: markdownTitle(file) ?? titleFn(file.split(sep).at(-1) ?? file),
    link: routeFor(file, siteRoot)
  }
}

function sectionItem(dir: string, siteRoot: string, sectionMeta: Record<string, { text: string, order: number }>, titleFn: (name: string) => string): SidebarItem {
  const entries = readdirSync(dir)
    .filter((entry) => {
      const file = join(dir, entry)
      return shouldMapPath(file) && entry.endsWith('.md')
    })
    .sort(compareEntries)

  const dirName = basename(dir)
  const readme = existsSync(join(dir, 'index.md'))
    ? join(dir, 'index.md')
    : join(dir, 'README.md')
  const sectionTitle = sectionMeta[dirName]?.text ?? (existsSync(readme)
    ? (markdownTitle(readme) ?? titleFn(dir.split(sep).at(-1) ?? dir))
    : titleFn(dir.split(sep).at(-1) ?? dir))

  return {
    text: sectionTitle,
    collapsed: false,
    items: entries.map((entry) => fileItem(join(dir, entry), siteRoot, titleFn))
  }
}

function buildSidebar(locale: 'en' | 'zh'): SidebarItem[] {
  const sectionMeta = locale === 'zh' ? sectionMetaZh : sectionMetaEn
  const titleFn = locale === 'zh' ? titleFromNameZh : titleFromName
  const contentRoot = locale === 'zh'
    ? join(siteRoot, 'zh', 'docs')
    : join(siteRoot, 'docs')

  const overviewTitle = locale === 'zh' ? '概览' : 'Overview'
  const homeTitle = locale === 'zh' ? '首页' : 'Home'
  const homeLink = locale === 'zh' ? '/zh/' : '/'

  const sidebar: SidebarItem[] = [
    {
      text: overviewTitle,
      items: [
        { text: homeTitle, link: homeLink }
      ]
    }
  ]

  if (!existsSync(contentRoot))
    return sidebar

  const topLevelFiles = readdirSync(contentRoot)
    .map((entry) => join(contentRoot, entry))
    .filter((entry) => shouldMapPath(entry) && entry.endsWith('.md'))
    .sort((a, b) => compareEntries(basename(a), basename(b)))

  if (topLevelFiles.length > 0) {
    sidebar[0].items?.push(...topLevelFiles.map((f) => fileItem(f, siteRoot, titleFn)))
  }

  const sections = readdirSync(contentRoot)
    .map((entry) => join(contentRoot, entry))
    .filter((entry) => shouldMapPath(entry) && statSync(entry).isDirectory())
    .sort((a, b) => {
      const aMeta = sectionMeta[basename(a)]
      const bMeta = sectionMeta[basename(b)]

      if (aMeta && bMeta)
        return aMeta.order - bMeta.order
      if (aMeta)
        return -1
      if (bMeta)
        return 1

      return a.localeCompare(b, locale === 'zh' ? 'zh-CN' : 'en', { numeric: true })
    })
    .map((s) => sectionItem(s, siteRoot, sectionMeta, titleFn))

  sidebar.push(...sections)
  return sidebar
}

export default defineConfig({
  title: 'GoSwitch',
  description: 'GoSwitch documentation',
  cleanUrls: true,
  ignoreDeadLinks: true,
  srcExclude: [
    '**/_*/**',
    '**/_*.md'
  ],
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#2563eb' }]
  ],
  themeConfig: {
    logo: { src: '/logo.svg', alt: 'GoSwitch logo' },
    siteTitle: 'GoSwitch',
    search: {
      provider: 'local'
    }
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [],
        sidebar: buildSidebar('en'),
        outline: {
          level: [2, 4],
          label: 'On this page'
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next'
        },
        lastUpdated: {
          text: 'Last updated'
        },
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        footer: {
          message: 'GoSwitch documentation site.',
          copyright: 'Copyright © 2026 GoSwitch'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [],
        sidebar: buildSidebar('zh'),
        outline: {
          level: [2, 4],
          label: '本页目录'
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        lastUpdated: {
          text: '最后更新'
        },
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        footer: {
          message: 'GoSwitch documentation site.',
          copyright: 'Copyright © 2026 GoSwitch'
        }
      }
    }
  }
})

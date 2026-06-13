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
const contentRoot = join(siteRoot, 'docs')

const sectionMeta: Record<string, { text: string, order: number }> = {
  register: { text: '入门与账号配置', order: 10 },
  token: { text: '模型与令牌分组', order: 20 },
  ccswitch: { text: 'CC-Switch 一键配置', order: 30 },
  cli: { text: 'CLI 手动配置', order: 40 },
  paint: { text: '绘图模型使用', order: 50 },
  advanced: { text: '第三方工具接入', order: 60 },
  faq: { text: '常见问题排查', order: 70 },
  tos: { text: '条款与政策说明', order: 80 }
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

  return a.localeCompare(b, 'zh-CN', { numeric: true })
}

function routeFor(file: string) {
  const normalized = relative(siteRoot, file).split(sep).join('/')
  return `/${normalized}`
    .replace(/\/(README|index)\.md$/i, '/')
    .replace(/\.md$/i, '')
}

function fileItem(file: string): SidebarItem {
  return {
    text: markdownTitle(file) ?? titleFromName(file.split(sep).at(-1) ?? file),
    link: routeFor(file)
  }
}

function sectionItem(dir: string): SidebarItem {
  const entries = readdirSync(dir)
    .filter((entry) => entry.endsWith('.md'))
    .sort(compareEntries)

  const dirName = basename(dir)
  const readme = existsSync(join(dir, 'index.md'))
    ? join(dir, 'index.md')
    : join(dir, 'README.md')
  const sectionTitle = sectionMeta[dirName]?.text ?? (existsSync(readme)
    ? (markdownTitle(readme) ?? titleFromName(dir.split(sep).at(-1) ?? dir))
    : titleFromName(dir.split(sep).at(-1) ?? dir))

  return {
    text: sectionTitle,
    collapsed: false,
    items: entries.map((entry) => fileItem(join(dir, entry)))
  }
}

function buildSidebar(): SidebarItem[] {
  const sidebar: SidebarItem[] = [
    {
      text: '总览',
      items: [
        { text: '首页', link: '/' }
      ]
    }
  ]

  if (!existsSync(contentRoot))
    return sidebar

  const topLevelFiles = readdirSync(contentRoot)
    .filter((entry) => entry.endsWith('.md'))
    .sort(compareEntries)
    .map((entry) => join(contentRoot, entry))

  if (topLevelFiles.length > 0) {
    sidebar[0].items?.push(...topLevelFiles.map(fileItem))
  }

  const sections = readdirSync(contentRoot)
    .map((entry) => join(contentRoot, entry))
    .filter((entry) => statSync(entry).isDirectory())
    .sort((a, b) => {
      const aMeta = sectionMeta[basename(a)]
      const bMeta = sectionMeta[basename(b)]

      if (aMeta && bMeta)
        return aMeta.order - bMeta.order
      if (aMeta)
        return -1
      if (bMeta)
        return 1

      return a.localeCompare(b, 'zh-CN', { numeric: true })
    })
    .map(sectionItem)

  sidebar.push(...sections)
  return sidebar
}

export default defineConfig({
  title: 'GoSwtich',
  description: 'GoSwtich documentation',
  lang: 'zh-CN',
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#2563eb' }]
  ],
  themeConfig: {
    logo: { src: '/logo.svg', alt: 'GoSwtich logo' },
    siteTitle: 'GoSwtich',
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/docs/register/' },
      { text: 'CLI', link: '/docs/cli/' },
      { text: 'FAQ', link: '/docs/faq/' },
      { text: '条款', link: '/docs/tos/' },
      { text: 'PackyAPI 官网', link: 'https://www.packyapi.com' },
      { text: 'Packy服务监控', link: 'https://check.linux.do/group/Packy' }
    ],
    sidebar: buildSidebar(),
    search: {
      provider: 'local'
    },
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
      message: 'GoSwtich documentation site.',
      copyright: 'Copyright © 2026 GoSwtich'
    }
  }
})

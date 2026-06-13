import { nextTick } from 'vue'

let installed = false

const layoutClasses = [
  'doc-layout-faq',
  'doc-layout-index',
  'doc-layout-legal',
  'doc-layout-project',
  'doc-layout-tutorial'
]

const projectRoutes = new Set([
  '/docs/advanced/AionUI',
  '/docs/advanced/Hermes',
  '/docs/advanced/OpenCode',
  '/docs/ccswitch',
  '/docs/ccswitch/1-common',
  '/docs/ccswitch/5-ccs_cli',
  '/docs/cli/5-cache-fix'
])

function currentPath() {
  const path = decodeURI(window.location.pathname)
    .replace(/\.html$/, '')
    .replace(/\/$/, '')

  return path === '' ? '/' : path
}

function classifyDocument(doc: HTMLElement) {
  const path = currentPath()
  const imageCount = doc.querySelectorAll('img').length
  const orderedItems = doc.querySelectorAll('ol > li').length
  const headingCount = doc.querySelectorAll('h2, h3').length

  if (path.startsWith('/docs/tos'))
    return 'legal'

  if (path.startsWith('/docs/faq'))
    return 'faq'

  if (projectRoutes.has(path))
    return 'project'

  if (imageCount >= 3 || orderedItems >= 4)
    return 'tutorial'

  if (headingCount === 0 || path === '/' || path.endsWith('/'))
    return 'index'

  return 'tutorial'
}

function applyLayoutClass(doc: HTMLElement, shell: HTMLElement, layout: string) {
  const className = `doc-layout-${layout}`

  doc.classList.remove(...layoutClasses)
  shell.classList.remove(...layoutClasses)
  doc.classList.add(className)
  shell.classList.add(className)
}

function normalizeScrapedMeta(doc: HTMLElement) {
  const paragraphs = Array.from(doc.querySelectorAll<HTMLParagraphElement>(':scope > p'))
  const source = paragraphs.find((paragraph) => /^Source:\s*/.test(paragraph.textContent?.trim() ?? ''))
  const updated = paragraphs.find((paragraph) => /^Updated:\s*/.test(paragraph.textContent?.trim() ?? ''))

  if (!source && !updated)
    return

  let meta = doc.querySelector<HTMLDivElement>(':scope > .doc-meta')

  if (!meta) {
    meta = document.createElement('div')
    meta.className = 'doc-meta'
    const firstHeading = doc.querySelector(':scope > h1')
    firstHeading?.insertAdjacentElement('afterend', meta)
  }

  meta.innerHTML = ''

  if (source) {
    const text = source.textContent?.trim().replace(/^Source:\s*/, '') ?? ''
    const item = document.createElement('span')
    item.className = 'doc-meta-item doc-meta-source'
    item.textContent = `来源：${text}`
    meta.appendChild(item)
    source.remove()
  }

  if (updated) {
    const text = updated.textContent?.trim().replace(/^Updated:\s*/, '') ?? ''
    const dateMatch = text.match(/^(\d{4}-\d{2}-\d{2}T[^\s]+Z?)(.*)$/)
    const dateText = dateMatch?.[1] ?? text
    const restoredText = dateMatch?.[2]?.trim()
    const item = document.createElement('span')
    item.className = 'doc-meta-item doc-meta-updated'
    item.textContent = `更新：${formatDate(dateText)}`
    meta.appendChild(item)

    if (restoredText) {
      const restored = document.createElement('p')
      restored.className = 'doc-restored-leading'
      restored.textContent = restoredText
      meta.insertAdjacentElement('afterend', restored)
    }

    updated.remove()
  }
}

function formatDate(raw: string) {
  const date = new Date(raw)

  if (Number.isNaN(date.getTime()))
    return raw

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

function enhanceMediaBlocks(doc: HTMLElement) {
  const imageParagraphs = Array.from(doc.querySelectorAll<HTMLParagraphElement>('p'))
    .filter((paragraph) => paragraph.querySelector('img'))

  imageParagraphs.forEach((paragraph) => {
    paragraph.classList.add('doc-media')

    const images = Array.from(paragraph.querySelectorAll<HTMLImageElement>('img'))
    const onlyExternalBadges = images.length > 0 && images.every((image) =>
      image.src.includes('/assets/external/')
      || image.src.includes('img.shields.io')
      || image.src.includes('trendshift.io')
    )

    if (onlyExternalBadges) {
      paragraph.classList.add('doc-badges')

      const links = Array.from(paragraph.querySelectorAll('a'))
      if (paragraph.textContent?.includes('下载') || (links.length === 1 && /releases\/latest/.test(links[0].href)))
        paragraph.classList.add('doc-actions')
    }

    images.forEach((image) => {
      image.loading = 'lazy'
      image.decoding = 'async'
    })

    const text = paragraph.textContent?.trim() ?? ''
    if (text && text.length < 80 && paragraph.querySelector('em'))
      paragraph.classList.add('doc-media-with-caption')
  })
}

function headingText(element: Element) {
  return element.textContent?.replace('​', '').trim() ?? ''
}

function isProjectStopHeading(element: Element, movedCount: number) {
  if (!/^H[1-4]$/.test(element.tagName))
    return false

  const text = headingText(element)

  if (movedCount === 0)
    return false

  return /^(软件下载|安装|安装与初始化|环境配置|配置|配置 PackyApi 渠道|配置 PackyAPI|验证配置|浏览器访问|常见问题|Claude Code配置|Codex配置|Gemini配置|CC-Switch CLI 是什么|为什么需要它)/.test(text)
}

function enhanceProjectIntro(doc: HTMLElement) {
  const directChildren = Array.from(doc.children) as HTMLElement[]
  const firstHeading = doc.querySelector<HTMLElement>(':scope > h1')

  if (!firstHeading)
    return

  let node = firstHeading.nextElementSibling as HTMLElement | null
  let movedCount = 0

  while (node && movedCount < 28) {
    const next = node.nextElementSibling as HTMLElement | null

    if (isProjectStopHeading(node, movedCount))
      break

    node.classList.add('doc-project-intro-item')

    if (node.matches('p.doc-media:not(.doc-badges)'))
      node.classList.add('doc-project-intro-media')

    if (node.matches('h1, h2, h3')) {
      const text = headingText(node)
      if (!/^(通用步骤|项目介绍|AionUi 介绍|CC-Switch介绍)$/.test(text))
        node.classList.add('doc-project-center')
    }

    if (node.matches('p')) {
      const text = node.textContent?.trim() ?? ''
      const shouldCenter = node.classList.contains('doc-badges')
        || node.classList.contains('doc-actions')
        || /^更新日志\s*\|/.test(text)
        || /^(🚀|从供应商|统一管理|Claude Code、Codex、Gemini|任何用户友好)/.test(text)

      if (shouldCenter)
        node.classList.add('doc-project-center')
    }

    if (node.matches('ul') && (node.textContent?.includes('✅') || node.textContent?.includes('项目定位') || node.textContent?.includes('核心特色')))
      node.classList.add('doc-project-feature-list')

    movedCount += 1
    node = next
  }

  enhanceProjectActionButtons(doc)

  directChildren
    .filter((element) => element.classList.contains('doc-project-hero'))
    .forEach((hero) => {
      while (hero.firstChild)
        doc.insertBefore(hero.firstChild, hero)
      hero.remove()
    })
}

function actionIcon(text: string) {
  if (/下载|版本/.test(text))
    return '⬇'

  if (/日志|更新/.test(text))
    return '↻'

  return '↗'
}

function actionLabel(text: string) {
  if (/下载/.test(text))
    return '立即下载'

  return text
}

function decorateActionLink(link: HTMLAnchorElement) {
  if (link.classList.contains('doc-project-action-button'))
    return

  const text = link.textContent?.trim() || '打开链接'
  const isGithub = /github\.com/.test(link.href)
  const isDownload = /下载|releases\/latest/.test(text) || /releases\/latest/.test(link.href)
  const isChangelog = /日志|更新|CHANGELOG/i.test(text) || /CHANGELOG/i.test(link.href)

  link.className = 'doc-project-action-button'
  link.classList.toggle('doc-action-github', isGithub)
  link.classList.toggle('doc-action-download', isDownload)
  link.classList.toggle('doc-action-changelog', isChangelog)
  link.innerHTML = ''

  if (isGithub) {
    const github = document.createElement('span')
    github.className = 'action-github-icon'
    github.setAttribute('aria-hidden', 'true')
    link.appendChild(github)
  }

  const icon = document.createElement('span')
  icon.className = 'action-icon'
  icon.textContent = actionIcon(text)

  const label = document.createElement('span')
  label.className = 'action-label'
  label.textContent = actionLabel(text)

  const arrow = document.createElement('span')
  arrow.className = 'action-arrow'
  arrow.textContent = '↗'

  link.append(icon, label, arrow)
}

function enhanceProjectActionButtons(doc: HTMLElement) {
  const centeredParagraphs = Array.from(doc.querySelectorAll<HTMLParagraphElement>('p.doc-project-center'))

  centeredParagraphs.forEach((paragraph) => {
    const text = paragraph.textContent?.trim() ?? ''
    const links = Array.from(paragraph.querySelectorAll<HTMLAnchorElement>('a'))

    if (links.length === 0)
      return

    if (/^更新日志\s*\|/.test(text) || links.some((link) => /下载|日志|更新/.test(link.textContent?.trim() ?? ''))) {
      paragraph.classList.add('doc-project-action-row')
      links.forEach(decorateActionLink)

      Array.from(paragraph.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && /^\s*\|\s*$/.test(node.textContent ?? ''))
          node.textContent = ''
      })
    }
  })
}

function enhanceLinkLists(doc: HTMLElement) {
  const lists = Array.from(doc.querySelectorAll<HTMLUListElement>('ul'))

  lists.forEach((list) => {
    if (list.parentElement !== doc)
      return

    const items = Array.from(list.children)
    const hasOnlyLinkItems = items.length >= 2 && items.every((item) => {
      const links = item.querySelectorAll('a')
      return links.length === 1 && item.textContent?.trim() === links[0].textContent?.trim()
    })

    if (hasOnlyLinkItems)
      list.classList.add('doc-link-grid')
  })
}

function enhanceDocument() {
  const shell = document.querySelector<HTMLElement>('.vp-doc')
  const doc = document.querySelector<HTMLElement>('.vp-doc > div') ?? shell

  if (!doc || !shell)
    return

  normalizeScrapedMeta(doc)
  enhanceMediaBlocks(doc)
  enhanceLinkLists(doc)

  const layout = classifyDocument(doc)
  applyLayoutClass(doc, shell, layout)

  if (layout === 'project')
    enhanceProjectIntro(doc)
}

function scheduleEnhance() {
  window.requestAnimationFrame(enhanceDocument)
}

export function installContentEnhancements() {
  if (typeof window === 'undefined')
    return

  if (installed) {
    nextTick(scheduleEnhance)
    return
  }

  installed = true
  nextTick(scheduleEnhance)
  window.addEventListener('load', scheduleEnhance, { once: true })

  const observer = new MutationObserver(scheduleEnhance)
  observer.observe(document.body, { childList: true, subtree: true })
}

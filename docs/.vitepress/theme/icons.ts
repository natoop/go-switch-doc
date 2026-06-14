import { nextTick } from 'vue'

const iconByPath: Record<string, string> = {
  '/': '/icons/fa6-solid-house.svg',
  '/zh': '/icons/fa6-solid-house.svg',
  '/docs/Monitor': '/icons/material-symbols-monitoring-rounded.svg',
  '/docs/advanced': '/icons/mdi-application-braces-outline.svg',
  '/docs/advanced/AionUI': '/icons/akar-icons-paper-airplane.svg',
  '/docs/advanced/ChatGPTClaudeCode': '/icons/hugeicons-chat-gpt.svg',
  '/docs/advanced/ClaudeDesktop': '/icons/material-icon-theme-claude.svg',
  '/docs/advanced/DeepSeekClaudeCode': '/icons/simple-icons-deepseek.svg',
  '/docs/advanced/Hermes': '/icons/game-icons-caduceus.svg',
  '/docs/advanced/OpenClaw': '/icons/noto-lobster.svg',
  '/docs/advanced/OpenCode': '/icons/mynaui-code-hexagon-solid.svg',
  '/docs/ccswitch': '/icons/cc-switch-app-icon.png',
  '/docs/ccswitch/1-common': '/icons/cc-switch-app-icon.png',
  '/docs/ccswitch/2-claude': '/icons/material-icon-theme-claude.svg',
  '/docs/ccswitch/3-codex': '/icons/hugeicons-chat-gpt.svg',
  '/docs/ccswitch/4-gemini': '/icons/vscode-icons-file-type-gemini.svg',
  '/docs/ccswitch/5-ccs_cli': '/icons/cc-switch-app-icon.png',
  '/docs/cli': '/icons/mdi-console.svg',
  '/docs/cli/1-env': '/icons/mdi-tools.svg',
  '/docs/cli/2-claude': '/icons/material-icon-theme-claude.svg',
  '/docs/cli/3-codex': '/icons/hugeicons-chat-gpt.svg',
  '/docs/cli/4-gemini': '/icons/vscode-icons-file-type-gemini.svg',
  '/docs/cli/5-cache-fix': '/icons/material-symbols-cached.svg',
  '/docs/faq': '/icons/material-symbols-help-outline.svg',
  '/docs/faq/CC': '/icons/material-icon-theme-claude.svg',
  '/docs/faq/Codex': '/icons/hugeicons-chat-gpt.svg',
  '/docs/faq/Gemini': '/icons/vscode-icons-file-type-gemini.svg',
  '/docs/paint': '/icons/mdi-palette-outline.svg',
  '/docs/paint/Banana': '/icons/emojione-monotone-banana.svg',
  '/docs/paint/GPTImage': '/icons/material-symbols-image-outline.svg',
  '/docs/register': '/icons/fa6-solid-rocket.svg',
  '/docs/register/1-register': '/icons/material-symbols-person-add.svg',
  '/docs/register/2-login': '/icons/material-symbols-login.svg',
  '/docs/register/3-quota': '/icons/mdi-credit-card-outline.svg',
  '/docs/register/4-token': '/icons/mdi-key-variant.svg',
  '/docs/register/5-env': '/icons/mdi-tools.svg',
  '/docs/register/6-cli': '/icons/mdi-console.svg',
  '/docs/token': '/icons/uis-layer-group.svg',
  '/docs/token/1-intro': '/icons/material-symbols-view-in-ar-outline.svg',
  '/docs/token/2-group': '/icons/ic-baseline-generating-tokens.svg',
  '/docs/tos': '/icons/mdi-file-document-multiple-outline.svg',
  '/docs/tos/aup': '/icons/material-symbols-policy.svg',
  '/docs/tos/service-specific-terms': '/icons/mdi-clipboard-text-outline.svg',
  '/docs/tos/TOS': '/icons/mdi-file-document-outline.svg',
  '/docs/tos/use': '/icons/mdi-earth.svg',
  '/export-index': '/icons/mdi-file-document-outline.svg',
  // Chinese locale paths
  '/zh/docs/Monitor': '/icons/material-symbols-monitoring-rounded.svg',
  '/zh/docs/advanced': '/icons/mdi-application-braces-outline.svg',
  '/zh/docs/advanced/AionUI': '/icons/akar-icons-paper-airplane.svg',
  '/zh/docs/advanced/ChatGPTClaudeCode': '/icons/hugeicons-chat-gpt.svg',
  '/zh/docs/advanced/ClaudeDesktop': '/icons/material-icon-theme-claude.svg',
  '/zh/docs/advanced/DeepSeekClaudeCode': '/icons/simple-icons-deepseek.svg',
  '/zh/docs/advanced/Hermes': '/icons/game-icons-caduceus.svg',
  '/zh/docs/advanced/OpenClaw': '/icons/noto-lobster.svg',
  '/zh/docs/advanced/OpenCode': '/icons/mynaui-code-hexagon-solid.svg',
  '/zh/docs/ccswitch': '/icons/cc-switch-app-icon.png',
  '/zh/docs/ccswitch/1-common': '/icons/cc-switch-app-icon.png',
  '/zh/docs/ccswitch/2-claude': '/icons/material-icon-theme-claude.svg',
  '/zh/docs/ccswitch/3-codex': '/icons/hugeicons-chat-gpt.svg',
  '/zh/docs/ccswitch/4-gemini': '/icons/vscode-icons-file-type-gemini.svg',
  '/zh/docs/ccswitch/5-ccs_cli': '/icons/cc-switch-app-icon.png',
  '/zh/docs/cli': '/icons/mdi-console.svg',
  '/zh/docs/cli/1-env': '/icons/mdi-tools.svg',
  '/zh/docs/cli/2-claude': '/icons/material-icon-theme-claude.svg',
  '/zh/docs/cli/3-codex': '/icons/hugeicons-chat-gpt.svg',
  '/zh/docs/cli/4-gemini': '/icons/vscode-icons-file-type-gemini.svg',
  '/zh/docs/cli/5-cache-fix': '/icons/material-symbols-cached.svg',
  '/zh/docs/faq': '/icons/material-symbols-help-outline.svg',
  '/zh/docs/faq/CC': '/icons/material-icon-theme-claude.svg',
  '/zh/docs/faq/Codex': '/icons/hugeicons-chat-gpt.svg',
  '/zh/docs/faq/Gemini': '/icons/vscode-icons-file-type-gemini.svg',
  '/zh/docs/paint': '/icons/mdi-palette-outline.svg',
  '/zh/docs/paint/Banana': '/icons/emojione-monotone-banana.svg',
  '/zh/docs/paint/GPTImage': '/icons/material-symbols-image-outline.svg',
  '/zh/docs/register': '/icons/fa6-solid-rocket.svg',
  '/zh/docs/register/1-register': '/icons/material-symbols-person-add.svg',
  '/zh/docs/register/2-login': '/icons/material-symbols-login.svg',
  '/zh/docs/register/3-quota': '/icons/mdi-credit-card-outline.svg',
  '/zh/docs/register/4-token': '/icons/mdi-key-variant.svg',
  '/zh/docs/register/5-env': '/icons/mdi-tools.svg',
  '/zh/docs/register/6-cli': '/icons/mdi-console.svg',
  '/zh/docs/token': '/icons/uis-layer-group.svg',
  '/zh/docs/token/1-intro': '/icons/material-symbols-view-in-ar-outline.svg',
  '/zh/docs/token/2-group': '/icons/ic-baseline-generating-tokens.svg',
  '/zh/docs/tos': '/icons/mdi-file-document-multiple-outline.svg',
  '/zh/docs/tos/aup': '/icons/material-symbols-policy.svg',
  '/zh/docs/tos/service-specific-terms': '/icons/mdi-clipboard-text-outline.svg',
  '/zh/docs/tos/TOS': '/icons/mdi-file-document-outline.svg',
  '/zh/docs/tos/use': '/icons/mdi-earth.svg',
  'https://www.packyapi.com/': '/icons/fa6-solid-link.svg',
  'https://check.linux.do/group/Packy': '/icons/material-symbols-monitoring-rounded.svg'
}

let installed = false

function normalizePath(rawHref: string) {
  const url = new URL(rawHref, window.location.origin)
  if (url.origin !== window.location.origin)
    return url.href

  let path = decodeURI(url.pathname)
  path = path.replace(/\.html$/, '')
  path = path.replace(/\/$/, '')

  return path === '' ? '/' : path
}

function decorateIconLinks() {
  const links = document.querySelectorAll<HTMLAnchorElement>(
    '.VPNavBarMenu a[href], .VPNavScreen a[href], .VPSidebar a[href]'
  )

  links.forEach((link) => {
    const icon = iconByPath[normalizePath(link.getAttribute('href') ?? '')]
    const existing = link.querySelector<HTMLImageElement>(':scope > img.vp-local-icon')

    if (!icon) {
      existing?.remove()
      link.classList.remove('has-local-icon')
      return
    }

    link.classList.add('has-local-icon')

    if (existing) {
      existing.src = icon
      return
    }

    const img = document.createElement('img')
    img.className = 'vp-local-icon'
    img.src = icon
    img.alt = ''
    img.setAttribute('aria-hidden', 'true')
    img.decoding = 'async'
    link.insertBefore(img, link.firstChild)
  })
}

function scheduleDecorate() {
  window.requestAnimationFrame(() => {
    decorateIconLinks()
  })
}

export function installIconEnhancements() {
  if (typeof window === 'undefined')
    return

  if (installed) {
    nextTick(scheduleDecorate)
    return
  }

  installed = true
  nextTick(scheduleDecorate)
  window.addEventListener('load', scheduleDecorate, { once: true })
  window.addEventListener('resize', scheduleDecorate)

  const observer = new MutationObserver(scheduleDecorate)
  observer.observe(document.body, { childList: true, subtree: true })
}

import { inBrowser } from 'vitepress'
import type { Router } from 'vitepress'

type Locale = 'en' | 'zh'

const localeStorageKey = 'goswitcher-doc:locale'
const localeSwitcherSelector = '.VPNavBarTranslations, .VPNavScreenTranslations'
let isApplyingPreferredLocale = false

function normalizePath(pathname: string) {
  const normalized = decodeURI(pathname)
    .replace(/\.html$/, '')
    .replace(/\/$/, '')

  return normalized === '' ? '/' : normalized
}

function localeFromPath(pathname: string): Locale {
  return normalizePath(pathname).startsWith('/zh') ? 'zh' : 'en'
}

function localeFromBrowser(): Locale {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]

  for (const language of languages) {
    const normalized = language.toLowerCase()

    if (normalized === 'zh' || normalized.startsWith('zh-'))
      return 'zh'

    if (normalized === 'en' || normalized.startsWith('en-'))
      return 'en'
  }

  return 'en'
}

function storedLocale(): Locale | undefined {
  const value = window.localStorage.getItem(localeStorageKey)
  return value === 'zh' || value === 'en' ? value : undefined
}

function setStoredLocale(locale: Locale) {
  window.localStorage.setItem(localeStorageKey, locale)
}

function preferredLocale() {
  return storedLocale() ?? localeFromBrowser()
}

function pathForLocale(pathname: string, locale: Locale) {
  const path = normalizePath(pathname)

  if (locale === 'zh') {
    if (path === '/' || path === '/zh')
      return '/zh/'

    return path.startsWith('/zh') ? path : `/zh${path}`
  }

  if (path === '/zh')
    return '/'

  return path.startsWith('/zh/') ? path.slice(3) || '/' : path
}

function currentLocationForLocale(locale: Locale) {
  const path = pathForLocale(window.location.pathname, locale)
  return `${path}${window.location.search}${window.location.hash}`
}

function shouldStoreClick(event: MouseEvent) {
  const target = event.target

  if (!(target instanceof Element))
    return

  const anchor = target.closest<HTMLAnchorElement>('a[href]')

  if (!anchor || !anchor.closest(localeSwitcherSelector))
    return

  const url = new URL(anchor.href, window.location.href)

  if (url.origin !== window.location.origin)
    return

  const targetLocale = localeFromPath(url.pathname)

  if (targetLocale !== localeFromPath(window.location.pathname))
    setStoredLocale(targetLocale)
}

function syncPreferredLocale(router?: Router) {
  if (!inBrowser)
    return

  const preferred = preferredLocale()

  if (localeFromPath(window.location.pathname) === preferred)
    return

  const target = currentLocationForLocale(preferred)
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (target === current)
    return

  if (router?.route.path) {
    isApplyingPreferredLocale = true
    router.go(target, { replace: true })
      .finally(() => {
        isApplyingPreferredLocale = false
      })
    return
  }

  window.location.replace(target)
}

export function installLocalePreference(router?: Router) {
  if (!inBrowser)
    return () => {}

  document.addEventListener('click', shouldStoreClick, true)

  if (router) {
    const onBeforeRouteChange = router.onBeforeRouteChange

    router.onBeforeRouteChange = async (to) => {
      const result = await onBeforeRouteChange?.(to)

      if (result === false)
        return false

      const targetLocale = localeFromPath(new URL(to, window.location.href).pathname)

      if (!isApplyingPreferredLocale && targetLocale !== localeFromPath(window.location.pathname))
        setStoredLocale(targetLocale)

      return result
    }
  }

  queueMicrotask(() => syncPreferredLocale(router))

  return () => syncPreferredLocale(router)
}

import DefaultTheme from 'vitepress/theme'
import DocTabs from './components/DocTabs.vue'
import { installContentEnhancements } from './content'
import { installIconEnhancements } from './icons'
import { installLocalePreference } from './locale'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('DocTabs', DocTabs)

    const enhanceContent = () => {
      installContentEnhancements()
      installIconEnhancements()
    }

    enhanceContent()
    const syncPreferredLocale = installLocalePreference(ctx.router)
    const onAfterRouteChange = ctx.router.onAfterRouteChange

    ctx.router.onAfterRouteChange = async (to) => {
      await onAfterRouteChange?.(to)
      enhanceContent()
      syncPreferredLocale()
    }
  }
}

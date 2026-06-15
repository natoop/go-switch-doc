import DefaultTheme from 'vitepress/theme'
import DocTabs from './components/DocTabs.vue'
import { installContentEnhancements } from './content'
import { installIconEnhancements } from './icons'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('DocTabs', DocTabs)
    installContentEnhancements()
    installIconEnhancements()
    ctx.router.onAfterRouteChanged = () => {
      installContentEnhancements()
      installIconEnhancements()
    }
  }
}

import DefaultTheme from 'vitepress/theme'
import { installContentEnhancements } from './content'
import { installIconEnhancements } from './icons'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    installContentEnhancements()
    installIconEnhancements()
    ctx.router.onAfterRouteChanged = () => {
      installContentEnhancements()
      installIconEnhancements()
    }
  }
}

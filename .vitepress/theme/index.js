import DefaultTheme from 'vitepress/theme'
import './main.css'
import Team from './component/Team.vue'

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: Team
}
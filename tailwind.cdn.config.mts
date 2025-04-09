import { type Config } from 'tailwindcss'
import config from './tailwind.config'
// 暂时全部使用整个项目的样式
// TODO 按需css
const cdnConfig: Config = {
  ...config,
  // darkMode: ['class'],
  // content: ['./prose.html'],
  // prefix: '',
}
export default cdnConfig

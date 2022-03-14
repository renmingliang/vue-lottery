import * as elementIcons from '@element-plus/icons-vue'

const icons = Object.keys(elementIcons)
export default app => {
  icons.forEach(icon => {
    app.component(icon, elementIcons[icon])
  })
}

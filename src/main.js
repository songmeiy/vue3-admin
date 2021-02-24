import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/utils/i18n'
import '@/utils/permission'
import '@/style'
import loadLayout from '@/layout'
import installComponents from '@/components'
import Highlight from '@/components/ElementHighlight'
const app = createApp(App)
loadLayout(app)
installComponents(app)
app.use(store).use(router).use(i18n).use(Highlight).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '../static/reset.css'

createApp(App).use(router).mount('#app')

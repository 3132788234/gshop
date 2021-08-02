import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css';

import './mock/mockServer.js'
// import './fiters/index.js' 搞了半天你废弃了

import '../static/reset.css'

createApp(App).use(store).use(router).use(Vant).mount('#app')

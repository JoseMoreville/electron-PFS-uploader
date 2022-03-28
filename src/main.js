import { createApp } from 'vue'
import App from './App.vue'
import '../public/index.css'
import VueIpfs from './plugins/vue-ipfs'
createApp(App).use(VueIpfs).mount('#app')

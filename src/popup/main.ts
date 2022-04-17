import { runtime } from 'webextension-polyfill'
import { createApp } from 'vue'

import App from './App.vue'
import i18n from '~/i18n'

const baseElem = document.createElement('base')
baseElem.href = __DEV__ ? 'http://localhost:3303' : runtime.getURL('/')
document.head.appendChild(baseElem)

const app = createApp(App)

app.use(i18n)
app.mount('#app')

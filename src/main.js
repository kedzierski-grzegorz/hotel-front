import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import setupInterceptors from "./services/setupInterceptors";

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

setupInterceptors();
loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .component('Datepicker', Datepicker)
  .mount('#app')

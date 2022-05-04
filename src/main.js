import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import setupInterceptors from "./services/setupInterceptors";

setupInterceptors();
loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')

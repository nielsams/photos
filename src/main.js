import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import emitter from 'tiny-emitter/instance'

import App from './App.vue'
import components from "@/components"

import OnedriveService from './services/onedrive-service'

const app = createApp(App);
app.config.globalProperties.$OnedriveService = new OnedriveService();


// global event bus to send events across components
// migrated to emitter based on https://v3.vuejs.org/guide/migration/events-api.html#event-bus
export const EventBus = {
   $on: (...args) => emitter.on(...args),
   $once: (...args) => emitter.once(...args),
   $off: (...args) => emitter.off(...args),
   $emit: (...args) => emitter.emit(...args)
}

const router = createRouter({
   history: createWebHashHistory(),
   routes: [
   {
      path: "/",
      name: "mainPage",
      component: components.MainPage
   },
   {
      path: "/album/:albumId",
      name: "albumById",
      component: components.AlbumPage
   },
   {
      path: "/album/:albumId/image/:imageId",
      name: "albumAndImageById",
      component: components.AlbumPage
   }
  ]
});

app.use(router).mount("#app");
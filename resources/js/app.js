import { createApp, provide, h } from 'vue'
import store from './store'
import router from './router'
import {
  apolloProvider,
  apolloClient,
  defaultApolloClient,
  vueApolloComponents,
} from './apollo.config'
import './bootstrap'

// window.Vue = require('vue').default

// //Vue.component('Board', require('./views/Board.vue').default)
// console.log("APP IS RUNNING");
const app = createApp({
  setup() {
    provide(defaultApolloClient, apolloClient)
  },
})
  .use(store)
  .use(router)
  .use(apolloProvider)
  .use(vueApolloComponents)
  .mount('#app')

// const app = new Vue({
//     el: '#app'
// });

// const app = createApp({})
// app.component('board', Board).mount('#app')

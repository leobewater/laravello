import { createApp, provide, h } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'


createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})
  .use(store)
  .use(router)
  .use(apolloProvider)
  .use(VueApolloComponents)
  .mount('#app')

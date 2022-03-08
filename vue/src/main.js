import { createApp, provide, h } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'

import './index.css'

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'

import { createApolloProvider } from '@vue/apollo-option'
import { DefaultApolloClient } from '@vue/apollo-composable'
import VueApolloComponents from '@vue/apollo-components'

function getHeaders() {
  const headers = {}
  const token = localStorage.getItem('apollo-token')
  if (token) {
    headers.authorization = `Bearer ${token}`
  }

  return headers
}

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'https://laravello.test/graphql',
  headers: getHeaders(),
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
  defaultOptions: {
    $query: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

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

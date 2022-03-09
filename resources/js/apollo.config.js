import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import VueApolloComponents from '@vue/apollo-components'
import { DefaultApolloClient } from '@vue/apollo-composable'

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
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
  defaultOptions: {
    $query: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

export const defaultApolloClient = DefaultApolloClient


// Vue.use(VueApollo);

// const apolloClient = new ApolloClient({
//   uri: 'https://laravello.test/graphql',
//   headers: {
//     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
//   },
//   credentials: 'include',
//   onError: (err) => {
//     try {
//       gqlErrors(err);
//     } catch (err) {
//       if (err instanceof AuthError) {
//         store.dispatch("logout");
//       }
//     }
//   }
// });

// export default new VueApollo({
//   defaultClient: apolloClient
// });

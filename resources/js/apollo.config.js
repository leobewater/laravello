import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { createApolloProvider } from '@vue/apollo-option'
import VueApolloComponents from '@vue/apollo-components'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { logErrorMessages } from '@vue/apollo-util'

// Handle errors
// const errorLink = onError((error) => {
//   if (process.env.NODE_ENV !== 'production') {
//     console.log("global error", error)
//     logErrorMessages(error)
//   }
// })

// function getHeaders() {
//   const headers = {}
//   const token = localStorage.getItem('apollo-token')
//   if (token) {
//     headers.authorization = `Bearer ${token}`
//   }

//   return headers
// }

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
    // if (graphQLErrors instanceof AuthError) {
    //   store.dispatch('logout')
    // }
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'https://laravello.test/graphql',
  // headers: getHeaders(),
  headers: {
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
  },
  credentials: 'include',
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
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
export const vueApolloComponents = VueApolloComponents

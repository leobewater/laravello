<template>
  <div class="h-full flex flex-col items-stretch bg-purple-500">
    <div
      class="header text-white flex justify-between items-center mb-2 bg-purple-600"
    >
      <div class="ml-2 w-1/3">x</div>
      <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">
        Laravello
      </div>
      <div class="mr-2 w-1/3 flex justify-end">x</div>
    </div>

    <div class="h-full flex flex-1 flex-col items-stretch">
      <div class="mx-4 mb-2 text-white font-bold text-lg">
        <span v-if="loading">Loading</span>
        <span v-else>{{ result.board.title }}</span>
      </div>
      <div class="flex flex-1 items-start overflow-x-auto mx-2" v-if="result">
        <List v-for="list in result.board.lists" :key="list.id" :list="list" />
      </div>
    </div>
  </div>
</template>

<script setup>
import List from '../components/List.vue'
// import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import BoardQuery from '../graphql/BoardWithListsAndCards.gql'

// const BOARD_QUERY = gql`
// query BoardWithListsAndCards($id: ID!) {
//   board(id: $id) {
//     title
//     color
//     lists {
//       id
//       title
//       cards {
//         id
//         title
//         order
//       }
//     }
//   }
// }
// `
const { result, loading, error } = useQuery(BoardQuery, { id: 1 })
</script>

<style scoped>
.header {
  height: 40px;
}
</style>

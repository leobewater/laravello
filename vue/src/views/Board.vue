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
        <List
          v-for="list in result.board.lists"
          :key="list.id"
          :list="list"
          @cardadded="updateQueryCache($event, result)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import List from '../components/List.vue'
import { useQuery } from '@vue/apollo-composable'
import BoardQuery from '../gql/queries/BoardWithListsAndCards.gql'
import produce from 'immer'

const { result, loading, error } = useQuery(BoardQuery, { id: 1 })

function updateQueryCache(event, result) {
  // read the cached query
  const data = event.cache.readQuery({
    query: BoardQuery,
    variables: { id: parseInt(result.board.id) },
  })

  event.cache.writeQuery({
    query: BoardQuery,
    data: produce(data, (x) => {
      // push new card to the list
      x.board.lists
        .find((itemList) => itemList.id === event.listId)
        .cards.push(event.data)
    }),
  })
}
</script>

<style scoped>
.header {
  height: 40px;
}
</style>

<template>
  <div class="h-full flex flex-col items-stretch bg-purple-500">
    <div
      class="header text-white flex justify-between items-center mb-2 bg-purple-600"
    >
      <div class="ml-2 w-1/3">x</div>
      <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">
        Laravello
      </div>
      <div class="mr-2 w-1/3 flex justify-end">{{ isLoggedIn ? 'Logged In' : 'Not logged In'}}</div>
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
          @card-added="updateQueryCache($event, result)"
          @card-updated="updateQueryCache($event, result)"
          @card-deleted="updateQueryCache($event, result)"
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
import {
  EVENT_CARD_ADDED,
  EVENT_CARD_DELETED,
  EVENT_CARD_UPDATED,
} from '../constants.js'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const { result, loading, error } = useQuery(BoardQuery, { id: 1 })

const isLoggedIn = computed(() => store.state.isLoggedIn)

function updateQueryCache(event, result) {
  // read the cached query
  const data = event.cache.readQuery({
    query: BoardQuery,
    variables: { id: parseInt(result.board.id) },
  })

  let updatedData = data

  // console.log(event.data)

  switch (event.type) {
    case EVENT_CARD_ADDED:
      // push new card to the list
      updatedData = produce(data, (x) => {
        x.board.lists
          .find((itemList) => itemList.id === event.listId)
          .cards.push(event.data)
      })
      break

    case EVENT_CARD_DELETED:
      // remove card from the list
      updatedData = produce(data, (x) => {
        // get cards from selcted list
        const listById = x.board.lists.find(
          (itemList) => itemList.id === event.listId
        ).cards

        // find card index from the cards array
        const cardIdx = listById.findIndex((card) => card.id === event.data.id)
        listById.splice(cardIdx, 1)
      })
      break

    case EVENT_CARD_UPDATED:
      // update card from the list
      updatedData = produce(data, (x) => {
        const card = (x.board.lists
          .find((itemList) => itemList.id === event.listId)
          .cards.filter((card) => card.id === event.data.id).title =
          event.data.title)
      })
      break
  }

  event.cache.writeQuery({
    query: BoardQuery,
    data: updatedData,
  })
}
</script>

<style scoped>
.header {
  height: 40px;
}
</style>

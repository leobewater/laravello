<template>
  <div
    @click="$emit('click')"
    class="rounded-sm p-2 text-gray-600 cursor-pointer hover:bg-gray-400 hover:text-gray-800 text-sm"
  >
    Add new card
  </div>
</template>

<script setup>
import CreateCard from '../gql/mutations/CreateCard.gql'
import BoardQuery from '../gql/queries/BoardWithListsAndCards.gql'
import { useMutation } from '@vue/apollo-composable'
import produce from 'immer'

const { mutate: createCard } = useMutation(CreateCard, {
  variables: {
    listId: 1,
    title: 'Test from code',
    order: 1,
    owner_id: 1,
  },
  // refetchQueries: [{ query: BoardQuery, variables: { id: 1 } }],
  // Or
  // add new card to the cached query
  update(cache, { data: { createCard } }) {
    // read the cached query
    const data = cache.readQuery({
      query: BoardQuery,
      variables: { id: 1 },
    })

    cache.writeQuery({
      query: BoardQuery,
      data: produce(data, (x) => {
        // push new card to the list
        x.board.lists.find((list) => list.id === '1').cards.push(createCard)
      }),
    })
  },
})

function addCard() {
  // createCard()
  this.$emit('click')
}
</script>

<style scoped></style>

<template>
  <div
    @click="addCard"
    class="rounded-sm p-2 text-gray-600 cursor-pointer hover:bg-gray-400 hover:text-gray-800 text-sm"
  >
    Add new card
  </div>
</template>

<script setup>
import CreateCard from '../gql/mutations/CreateCard.gql'
import { useMutation } from '@vue/apollo-composable'

const { mutate: createCard } = useMutation(CreateCard, {
  variables: {
    listId: 1,
    title: 'Test from code',
    order: 1,
    owner_id: 1,
  },
})

function addCard() {
  createCard()
}
</script>

<style scoped></style>

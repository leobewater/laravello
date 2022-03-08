<template>
  <div>
    <textarea
      class="rounded-md shadow-card py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
      placeholder="Enter a title for this card..."
      ref="title"
      @keyup.esc="closed"
      @keyup.enter="addCard"
    ></textarea>
    <div class="flex">
      <button
        @click="addCard"
        class="rounded-sm py-1 px-3 bg-indigo-700 text-white cursor-pointer hover:bg-indigo-600 outline-none"
      >
        Add Card
      </button>
      <button
        @click="closed"
        class="py-1 px-3 ml-1 rounded-md hover:bg-gray-400 cursor-pointer text-gray-500"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import CreateCard from '../gql/mutations/CreateCard.gql'
import BoardQuery from '../gql/queries/BoardWithListsAndCards.gql'
import { useMutation } from '@vue/apollo-composable'
import produce from 'immer'

const emit = defineEmits(['closed'])

const title = ref(null)

onMounted(() => {
  title.value.focus()
})

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
  createCard()
  closed()
}

function closed() {
  emit('closed')
}
</script>

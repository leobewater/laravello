<template>
  <CardEditor v-model="title" @closed="closed" @saved="addCard" />
</template>

<script setup>
import { ref } from 'vue'
import CreateCard from '../gql/mutations/CreateCard.gql'
import { useMutation } from '@vue/apollo-composable'
import { EVENT_CARD_ADDED } from '../constants.js'
import CardEditor from './CardEditor.vue'

const emit = defineEmits(['closed', 'added'])
const props = defineProps({
  list: Object,
})

const title = ref('')

const { mutate: createCard } = useMutation(CreateCard, () => ({
  variables: {
    listId: props.list.id,
    title: title.value,
    order: props.list.cards.length + 1,
    owner_id: 1,
  },
  // refetchQueries: [
  //   { query: BoardQuery, variables: { id: props.list.board_id } },
  // ],
  // Or
  // add new card to the cached query without making extra api call
  update: (cache, { data: { createCard } }) => {
    emit('added', { cache, data: createCard, type: EVENT_CARD_ADDED })
    closed()
  },
}))

function addCard() {
  createCard()
}

function closed() {
  emit('closed')
}
</script>

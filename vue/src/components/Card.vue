<template>
  <div
    v-if="!editing"
    class="group bg-white shadow-card rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 flex justify-between"
  >
    <div>{{ props.card.title }}</div>

    <div
      class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500"
    >
      <div
        class="text-gray-400 pr-2 hover:text-yellow-700"
        @click="editing = true"
      >
        e
      </div>
      <div class="text-gray-400 hover:text-yellow-700" @click="cardDelete">
        d
      </div>
    </div>
  </div>
  <CardEditor
    v-else
    class="mb-2"
    v-model="title"
    label="Save Card"
    @closed="editing = false"
    @saved="updateCard"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import DeleteCard from '../gql/mutations/DeleteCard.gql'
import UpdateCard from '../gql/mutations/UpdateCard.gql'
import { EVENT_CARD_DELETED, EVENT_CARD_UPDATED } from '../constants.js'
import CardEditor from './CardEditor.vue'

const emit = defineEmits(['deleted'])
const props = defineProps({
  card: Object,
})

const title = ref(props.card.title)
const editing = ref(false)

const { mutate: deleteCard } = useMutation(DeleteCard, () => ({
  variables: {
    id: props.card.id,
  },
  update: (cache, { data: { deleteCard } }) => {
    emit('deleted', { cache, data: deleteCard, type: EVENT_CARD_DELETED })
  },
}))

const { mutate: updateCard } = useMutation(UpdateCard, () => ({
  variables: {
    id: props.card.id,
    title: title.value,
  },
  update: (cache, { data: { updateCard } }) => {
    emit('updated', { cache, data: updateCard, type: EVENT_CARD_UPDATED })
    editing.value = false
  },
}))

function cardDelete() {
  deleteCard()
}
</script>

<template>
  <div
    class="group bg-white shadow-card rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 flex justify-between"
  >
    <div>{{ props.card.title }}</div>

    <div
      class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500"
    >
      <div class="text-gray-400 pr-2 hover:text-yellow-700">e</div>
      <div class="text-gray-400 hover:text-yellow-700" @click="cardDelete">
        d
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMutation } from '@vue/apollo-composable'
import DeleteCard from '../gql/mutations/DeleteCard.gql'

const props = defineProps({
  card: Object,
})

const { mutate: deleteCard } = useMutation(DeleteCard, () => ({
  variables: {
    id: props.card.id,
  },
}))

function cardDelete() {
  // console.log(props.card.id)
  deleteCard()
}
</script>

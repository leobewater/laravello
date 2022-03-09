<template>
  <div class="bg-gray-300 rounded-sm p-2 mr-2 list">
    <div class="flex justify-between">
      <div class="text-gray-800 pl-2 pb-2 font-bold">{{ list.title }}</div>
    </div>

    <Card
      v-for="card in props.list.cards"
      :key="card.id"
      :card="card"
      @deleted="deletedCard($event)"
    />

    <CardAddEditor
      v-if="editing"
      @closed="editing = false"
      :list="props.list"
      @added="addedCard($event)"
    />
    <CardAddButton v-else @click="editing = true" />
  </div>
</template>

<script setup>
import Card from '../components/Card.vue'
import CardAddButton from '../components/CardAddButton.vue'
import CardAddEditor from '../components/CardAddEditor.vue'
import { ref } from 'vue'

const emit = defineEmits(['card-added', 'card-deleted'])
const props = defineProps({
  list: Object,
})

const editing = ref(false)

function addedCard(ev) {
  emit('card-added', { ...ev, listId: props.list.id })
}

function deletedCard(ev) {
  emit('card-deleted', { ...ev, listId: props.list.id })
}
</script>

<style scoped>
.list {
  width: 250px;
  min-width: 250px;
}
</style>

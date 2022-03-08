<template>
  <div class="bg-gray-300 rounded-sm p-2 mr-2 list">
    <div class="flex justify-between">
      <div class="text-gray-800 pl-2 pb-2 font-bold">{{ list.title }}</div>
    </div>

    <Card v-for="card in list.cards" :key="card.id" :card="card" />
    <CardEditor v-if="editing" @closed="editing = false" />
    <CardAddButton v-else @click="editing = true" />
  </div>
</template>

<script setup>
import Card from '../components/Card.vue'
import CardAddButton from '../components/CardAddButton.vue'
import CardEditor from '../components/CardEditor.vue'
import { ref } from 'vue'

defineProps({
  list: Object,
})

const editing = ref(false)
</script>

<style scoped>
.list {
  width: 250px;
  min-width: 250px;
}
</style>

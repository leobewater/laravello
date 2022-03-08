<template>
  <div
    class="group bg-white shadow-card rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 flex justify-between"
  >
    <div>{{ card.title }}</div>

    <div class="flex font-bold opacity-0 group-hover:opacity-100">
      <div class="">e</div>
      <div class="">d</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  card: Object,
})
</script>

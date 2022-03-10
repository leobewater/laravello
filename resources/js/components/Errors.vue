<template>
  <div
    v-if="props.errors"
    class="p-2 bg-red-600 text-gray-100 rounded-sm mb-6 text-sm text-center"
  >
    {{ props.errors }}
  </div>
</template>

<script setup>
const props = defineProps({
  errors: String
})
</script>

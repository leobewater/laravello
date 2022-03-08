<template>
  <div>
    <textarea
      class="rounded-md shadow-card py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
      placeholder="Enter a title for this card..."
      ref="title"
      @keyup.esc="$emit('closed')"
      @keyup.enter="$emit('closed')"
    ></textarea>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const title = ref(null)

onMounted(() => {
  title.value.focus()
})
</script>

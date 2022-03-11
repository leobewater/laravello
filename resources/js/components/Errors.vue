<template>
  <div
    v-if="props.errors"
    class="p-2 bg-red-600 text-gray-100 rounded-sm mb-6 text-sm text-center"
  >
    <div v-for="(error, index) in gqlErrors(props.errors)" :key="index">
      {{ error.message }}
    </div>
  </div>
</template>

<script setup>
import { gqlErrors } from '../utils'

const props = defineProps({
  errors: Object,
})
</script>

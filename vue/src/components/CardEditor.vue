<template>
  <div>
    <textarea
      class="rounded-md shadow-card py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
      placeholder="Enter a title for this card..."
      :value="modelValue"
      ref="card"
      @keyup.esc="closed"
      @keyup.enter="saved"
      @input="emit('update:modelValue', $event.target.value)"
    ></textarea>

    <div class="flex">
      <button
        @click="saved"
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
import { onMounted, ref } from 'vue'

const emit = defineEmits(['closed', 'saved', 'update:modelValue'])
const card = ref('')
// has to use "modelValue" when doing two-way binding with parent component/sending input value back to parent component
const props = defineProps({
  modelValue: String,
})

onMounted(() => {
  // adding ref="title" to the textarea doesn't work with v-model.
  card.value.focus()
})

function saved() {
  emit('saved')
  //closed()
}

function closed() {
  emit('closed')
}
</script>

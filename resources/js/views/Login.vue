<template>
  <div class="bg-white sm:bg-gray-100 h-full flex justify-center">
    <div class="container mt-2 sm:mt-10 flex flex-col items-center">
      <div class="text-3xl text-blue-700 font-bold mb-10">
        <span>Laravello</span>
      </div>

      <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm:px-12">
        
        <div
          v-if="errors"
          class="p-2 bg-red-600 text-gray-100 rounded-sm mb-6 text-sm text-center"
        >
          {{ errors }}
        </div>

        <div class="w-full text-center text-gray-600 font-bold mb-8">
          Sign in to Laravello
        </div>

        <form @submit.prevent="authenticate">
          <div class="w-full mb-4">
            <input
              type="text"
              class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm"
              placeholder="Enter email"
              v-model="email"
            />
          </div>

          <div class="w-full mb-4">
            <input
              type="password"
              class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm"
              placeholder="Enter password"
              v-model="password"
            />
          </div>

          <div class="w-full mb-6">
            <button
              type="submit"
              class="rounded-sm px-4 py-2 text-sam bg-green-500 font-bold outline-none focus:outline-none hover:bg-opacity-75 w-full text-white disabled:opacity-25"
            >
              Sign In
            </button>
          </div>
        </form>

        <div class="bg-gray-400 h-px w-full mb-6"></div>

        <div class="text-center text-sm">
          <router-link
            :to="{ name: 'register' }"
            class="text-blue-600 hover:underline"
            >Sign up for an account</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import Login from '../gql/mutations/Login.gql'
import { gqlErrors } from '../utils'

const email = ref('')
const password = ref('')

const {
  loading: loading,
  error: errors,
  mutate: login,
} = useMutation(Login, () => ({
  variables: {
    email: email.value,
    password: password.value,
  },
}))

const authenticate = function (event) {
  login()
}
</script>

<style scoped>
.container {
  width: 300px;
  max-width: 300px;
}

@media (min-width: 640px) {
  .container {
    width: 400px;
    max-width: 400px;
  }
}
</style>

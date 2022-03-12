<template>
  <div class="bg-white sm:bg-gray-100 h-full flex justify-center">
    <div class="container mt-2 sm:mt-10 flex flex-col items-center">
      <div class="text-3xl text-blue-700 font-bold mb-10">
        <span>Laravello</span>
      </div>

      <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm:px-12">
        <Errors :errors="error" />

        <div class="w-full text-center text-gray-600 font-bold mb-8">
          Sign up an account
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
              type="text"
              class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm"
              placeholder="Enter full name"
              v-model="fullname"
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
              Sign Up
            </button>
          </div>
        </form>

        <div class="bg-gray-400 h-px w-full mb-6"></div>

        <div class="text-center text-sm">
          <router-link
            :to="{ name: 'login' }"
            class="text-blue-600 hover:underline"
            >Already have an account? Sign in</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import Register from '../gql/mutations/Register.gql'
import Errors from '../components/Errors.vue'
import { useStore } from 'vuex'

const router = useRouter()
const email = ref('')
const fullname = ref('')
const password = ref('')
const store = useStore()

const {
  loading,
  error,
  mutate: register,
  onDone,
} = useMutation(Register, () => ({
  variables: {
    email: email.value,
    password: password.value,
    name: fullname.value,
  },
}))

onDone((result) => {
  store.commit('setIsLogged', true)
  router.push({ name: 'board' })
})

const authenticate = function (event) {
  register()
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

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('register success')
      alert('register success')
    })
    .catch((error) => {
      console.log('register error', error.code)
      alert(error.message)
    })
}
</script>

<template>
  <div
    class="h-screen flex flex-col gap-10 items-center justify-center text-white bg-zinc-900"
  >
    <a class="pointer text-2xxl" href="/"> ◀️ Back Home </a>
    <h1 class="text-4xl">Register Dashboards</h1>
    <form @submit.prevent="" class="flex flex-col gap-4">
      <input
        v-model="email"
        class="p-2 w-72 sm:w-96 border-b-[0.01em] border-orange-500 bg-transparent focus:outline-none"
        type="text"
        placeholder="Insert for create your email"
      />

      <input
        v-model="password"
        class="p-2 w-72 sm:w-96 border-b-[0.01em] border-orange-500 bg-transparent focus:outline-none"
        type="password"
        placeholder="Insert for create your  password"
      />
      <button
        @click="register"
        type="submit"
        id="btnCreate"
        class="p-2 font-bold bg-orange-500 text-black pointer hover:bg-orange-600"
      >
        Create Account
      </button>
    </form>
    <p class="">v1.0</p>
  </div>
</template>
<style scoped>
input,
::placeholder {
  color: black;
}
</style>

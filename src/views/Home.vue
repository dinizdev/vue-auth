<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errMsg = ref('')
const router = useRouter()

const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log('register error', error.code)
      switch (error.code) {
        case 'auth/missing-password':
          errMsg.value = 'Senha inválida'
          break
        case 'auth/user-not-found':
          errMsg.value = 'Usuário não encontrado'
          break
        case 'auth/invalid-email':
          errMsg.value = 'E-mail inválido'
          break
        case 'auth/too-many-requests':
          errMsg.value = 'Muitas tentativas... aguarde 1 minuto'
          break // Adicionei esse break que estava faltando
        default:
          errMsg.value = 'Ocorreu um erro ao fazer login'
          break // Adicionei esse break que estava faltando
      }
    })
}

const sslAuth = () => {
  router.push('/auth/ssl')
}
</script>

<template>
  <div
    class="h-screen flex flex-col gap-10 items-center justify-center text-white bg-zinc-900 sm:p-10"
  >
    <h1 class="text-4xl">Vue Auth Dashboards</h1>
    <form @submit.prevent="" class="flex flex-col gap-8 sm:w-auto">
      <input
        v-model="email"
        class="p-2 w-72 sm:w-96 border-b-[0.01em] border-orange-500 bg-transparent focus:outline-none"
        type="text"
        placeholder="Email"
      />
      <input
        class="p-2 w-72 sm:w-96 border-b-[0.01em] border-orange-500 bg-transparent focus:outline-none"
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <p v-if="errMsg" class="text-red-500">{{ errMsg }}</p>
      <div class="flex flex-col gap-3">
        <button
          type="submit"
          @click="register"
          class="p-2 font-bold uppercase bg-orange-500 text-black pointer hover:bg-orange-600"
        >
          Login
        </button>
        <button
          type="submit"
          @click="sslAuth"
          class="p-2 font-bold uppercase bg-orange-500 text-black pointer hover:bg-orange-600"
        >
          Login WITH SSL
        </button>
      </div>
      <router-link to="/register" class="text-center">
        <a class="text-white pointer underline">Sign Up - Register Here</a>
      </router-link>
    </form>
    <p class="">version 1.0</p>
  </div>
</template>

<style scoped>
input,
::placeholder {
  color: black;
}
</style>

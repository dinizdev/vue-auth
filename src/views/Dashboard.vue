<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
let auth
onMounted(() => {
  auth = getAuth()
  const userId = auth.currentUser
  const email = userId.email
  console.log(email)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    alert('you sign out')
    router.push('/')
  })
}

const test = () => {
  alert('test')
}
</script>

<template>
  <div
    class="h-screen flex flex-col gap-10 items-center justify-center text-white bg-zinc-900"
  >
    <h1 class="text-4xl text-green-500">Wellcome to Dashboard v.1</h1>
    <p>Seja bem vindo(a): {{ email }}</p>
    <nav>
      <button
        v-on:click="handleSignOut"
        v-if="isLoggedIn"
        class="bg-green-500 p-2 text-black font-bold pointer"
      >
        Logout
      </button>
    </nav>
    <p class="">version 1.0</p>
  </div>
</template>
<style scoped>
input,
::placeholder {
  color: black;
}
</style>

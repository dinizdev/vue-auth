<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const errMsg = ref()
const router = useRouter()

const register = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            router.push('/dashboard')
        })
        .catch((error) => {
            console.log('register error', error.code)
            switch (error.code) {
                case "auth/missing-password":
                    errMsg.value = "wrong password"
                    break
                case "auth/user-not-found":
                    errMsg.value = "user not found"
                    break
                case "auth/invalid-email":
                    errMsg.value = "invalid email"
                    break
                case "auth/too-many-requests":
                    errMsg.value = "too many requests"
                default:
            }
        })
}
</script>

<template>
    <div class="h-screen flex flex-col gap-10 items-center justify-center text-white bg-zinc-900">
        <h1 class="text-4xl">Vue Auth Dashboards</h1>
        <form @submit.prevent="" class="flex flex-col gap-8 ">
            <input v-model="email" class="p-2" type="text" placeholder="Email">
            <input class="p-2 w-96" v-model="password" type="password" placeholder="Password">
            <p v-if="errMsg" class="text-red-500"> {{ errMsg }}</p>
            <button type="submit" @click="register"
                class="p-2 font-bold uppercase bg-green-500 text-black pointer hover:bg-green-600">Login</button>
            <a href="/register" class="text-green-300 text-center pointer underline">Sign Up - Register Here</a>
        </form>
        <p class=""> version 1.0</p>
    </div>
</template>
<style scoped>
input,
::placeholder {
    color: black;
}
</style>
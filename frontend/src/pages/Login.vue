<template>
    <GuestLayout>
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>

        <div v-if="errorMessage === []" class="mt-4 py-2 p-3 rounded text-white bg-red-400">
            {{ errorMessage[0] }}
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="submit">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            v-model="data.email"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input
                            v-model="data.password"
                            type="password"
                            name="password"
                            id="password"
                            autocomplete="current-password"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?
                {{ ' ' }}
                <RouterLink :to="{name: 'SignUp'}" class="font-semibold text-indigo-600 hover:text-indigo-500"
                    >Sign Up</RouterLink
                >
            </p>
        </div>
    </GuestLayout>
</template>

<script setup>
import {ref} from 'vue'
import axiosClient from '../axios'
import GuestLayout from '../components/GuestLayout.vue'
import router from '../router'

const data = ref({
    email: '',
    password: '',
})

const errorMessage = ref('')

function submit() {
    axiosClient.get('/sanctum/csrf-cookie').then(() => {
        axiosClient
            .post('/login', data.value)
            .then(() => {
                router.push({name: 'Home'})
            })
            .catch((error) => {
                console.log(error.response.data)
                errorMessage.value = error.response.data.message
            })
    })
}
</script>

<style lang="scss" scoped></style>

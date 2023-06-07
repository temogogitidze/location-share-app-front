<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Enter your phone number</h1>
    <form action="#" @submit.prevent="handleLogin()">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <input
              type="text"
              v-maska
              data-maska="+ (###) ###-##-##-##"
              name="phone"
              id="phone"
              v-model="credentials.phone"
              placeholder="+ (995) 94-32-99"
              class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none"
            />
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            @submit.prevent="handleLogin()"
            class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { vMaska } from 'maska'
import defaultInstance from '@/plugins/axios/axios'

const credentials = reactive({
  phone: null
})

const handleLogin = () => {
  defaultInstance
    .post('/login', credentials)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
      alert(err.response.data.message)
    })
  console.log(credentials.phone)
}
</script>

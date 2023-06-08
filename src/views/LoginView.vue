<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Enter your {{ authenticationText }}</h1>
    <form
      v-if="!userStore.waitingForVerification"
      action="#"
      @submit.prevent="userStore.handleLogin(formattedCredentials)"
    >
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
            @submit.prevent="userStore.handleLogin(formattedCredentials)"
            class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
    <form v-else action="#" @submit.prevent="userStore.handleVerification(formattedCredentials)">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <input
              type="text"
              v-maska
              data-maska="######"
              name="phone"
              id="phone"
              v-model="credentials.login_code"
              placeholder="+ (995) 94-32-99"
              class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none"
            />
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            @submit.prevent="userStore.handleVerification(formattedCredentials)"
            class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
          >
            Verify
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { vMaska } from 'maska'
import { useUserStore } from '@/stores/useUserStore'
import { reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const credentials = reactive({
  phone: null,
  login_code: null
})

const formattedCredentials = computed(() => {
  return {
    phone: credentials.phone
      .replaceAll(' ', '')
      .replace('(', '')
      .replace(')', '')
      .replaceAll('-', ''),
    login_code: credentials.login_code
  }
})

const authenticationText = computed(() => {
  return !userStore.waitingForVerification ? 'phone number' : 'verification code'
})

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push({ name: 'landing' })
  }
})
</script>

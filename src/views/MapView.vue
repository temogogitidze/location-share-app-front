<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Here's your trip</h1>
    <div>
      <div class="overflow-hidden shadow sm:rounded-md max-w-xl mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <GMapMap
              v-if="locationStore.destination.name !== ''"
              :zoom="12"
              :center="locationStore.destination.geometry"
              ref="gMap"
              style="width: 100%; height: 356px"
            >
            </GMapMap>
          </div>
          <div class="mt-2">
            <p class="text-xl">
              Going to <strong>{{ locationStore.destination.name }}</strong>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            @click="handleConfirmTrip"
            class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
          >
            Let's Go!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLocationStore } from '@/stores/location'
import { useRouter } from 'vue-router'

const router = useRouter()
const locationStore = useLocationStore()

onMounted(() => {
  if (locationStore.destination.name === '') router.push({ name: 'location' })

  // Get user's current location
  locationStore.updateCurrentLocation()
})
</script>

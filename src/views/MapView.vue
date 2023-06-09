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
            @click="handleConfirmTrip(locationStore)"
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
import { onMounted, ref } from 'vue'
import { useLocationStore } from '@/stores/location'
import { useLocation } from '@/composables/location'
import { useRouter } from 'vue-router'

const router = useRouter()
const locationStore = useLocationStore()

const gMap = ref(null)

const { handleConfirmTrip } = useLocation()

onMounted(async () => {
  if (locationStore.destination.name === '') router.push({ name: 'location' })

  // Get user's current location
  await locationStore.updateCurrentLocation()

  gMap.value.$mapPromise.then((mapObject) => {
    let currentPoint = new google.maps.LatLng(locationStore.current.geometry),
      destinationPoint = new google.maps.LatLng(locationStore.destination.geometry),
      directionsService = new google.maps.DirectionsService(),
      directionsDisplay = new google.maps.DirectionsRenderer({
        map: mapObject
      })

    directionsService.route(
      {
        origin: currentPoint,
        destination: destinationPoint,
        avoidTolls: false,
        avoidHighways: false,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (res, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(res)
        } else {
          console.error(status)
        }
      }
    )
  })
})
</script>

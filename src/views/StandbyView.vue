<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">{{ title }}</h1>
    <div v-if="!tripStore.id" class="mt-8 flex justify-center">
      <LoaderItem />
    </div>
    <div v-else>
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <GMapMap
              :zoom="14"
              :center="tripStore.destination"
              ref="gMap"
              style="width: 100%; height: 256px"
            ></GMapMap>
          </div>
          <div class="mt-2">
            <p class="text-xl">
              Going to <strong>{{ tripStore.destination_name }}</strong>
            </p>
          </div>
        </div>
        <div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            @click="handleDeclineTrip()"
            class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
          >
            Decline
          </button>
          <button
            @click="handleAcceptTrip()"
            class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import LoaderItem from '@/components/LoaderItem.vue'
import Echo from 'laravel-echo'
import { useTripStore } from '@/stores/trip'
import Pusher from 'pusher-js'

const gMap = ref(null)
const tripStore = useTripStore()

const title = ref('Waiting for ride request...')

const handleAcceptTrip = () => {
  tripStore.acceptTrip(tripStore.id)
}

const handleDeclineTrip = () => {
  tripStore.reset()
  
  title.value = 'Waiting for ride request...'
}

onMounted(() => {
  let echo = new Echo({
    broadcaster: 'pusher',
    key: 'mykey',
    cluster: 'mt1',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss']
  })

  echo.channel('drivers').listen('TripCreated', (e) => {
    // this fills all attributes which are matching for two objects
    title.value = 'Ride requested:'

    tripStore.$patch(e.trip)
    console.log('TripCreated', e)

    setTimeout(initMapDirections, 2000)
  })
})

const initMapDirections = () => {
  gMap.value.$mapPromise.then((mapObject) => {
    let originPoint = new google.maps.LatLng(tripStore.origin),
      destinationPoint = new google.maps.LatLng(tripStore.destination),
      directionsService = new google.maps.DirectionsService(),
      directionsDisplay = new google.maps.DirectionsRenderer({
        map: mapObject
      })

    directionsService.route(
      {
        origin: originPoint,
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
}
</script>

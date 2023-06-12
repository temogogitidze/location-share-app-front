<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">{{ title }}</h1>
    <div>
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <!-- <GMapMap
              :zoom="14"
              :center="location.current.geometry"
              ref="gMap"
              style="width: 100%; height: 256px"
            > -->
            <!-- <GMapMarker :position="location.current.geometry" :icon="currentIcon" />
              <GMapMarker :position="trip.driver_location" :icon="driverIcon" /> -->
            <!-- </GMapMap> -->
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <span>{{ message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>

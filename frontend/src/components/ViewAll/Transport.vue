<template>
  <div class="flex flex-col border w-full  p-5 gap-3">
    <div class="flex justify-center text-center ">
      <p class="answer-style text-sm">Ruang phurh leh Motor Chungchang</p>
    </div>
    <!--    STARTING-->
    <p class=" text-sm">Ruang phurh tanna</p>
    <!--    DISTRICT-->
    <div class="flex flex-col px-4 gap-2">
      <div class="flex flex-col text-sm">
        <p class="answer-style">District</p>
        <p>{{ trackStore.applicationData[0].transport.source_district.name }}</p>
      </div>
      <!--    VENG-->
      <div class="flex flex-col text-sm">
        <p class="answer-style">Veng/Khua</p>
        <p>{{ trackStore.applicationData[0].transport.source_locality }}</p>
      </div>
    </div>
    <!--    DESTINATION-->
    <p class=" text-sm">Ruang dahna tur tanna</p>
    <!--    DISTRICT-->
    <div class="flex flex-col px-4 gap-2">
      <div class="flex flex-col text-sm">
        <p class="answer-style">District</p>
        <p>{{ trackStore.applicationData[0].transport.destination_district.name }}</p>
      </div>
      <!--    VENG-->
      <div class="flex flex-col text-sm">
        <p class="answer-style">Veng/Khua</p>
        <p>{{ trackStore.applicationData[0].transport.destination_locality }}</p>
      </div>
      <!--    KILOMETER-->
      <div class="flex flex-col text-sm">
        <p class="answer-style">Kilometer</p>
        <p>{{ trackStore.applicationData[0].transport.distance }}</p>
      </div>
    </div>
    <p class=" text-sm">Ruang phurhna motor</p>
    <!--    MOTOR REGISTRATION-->
    <div class="flex flex-col px-4 gap-2">
      <div class="flex flex-col text-sm">
        <p class="answer-style">Motor Registration Number</p>
        <p>{{ trackStore.applicationData[0].transport.vehicle_number }}</p>
      </div>
      <div class="flex flex-col text-sm">
        <p class="answer-style">Motor Neitu/Khalhtu Hming</p>
        <p>{{ trackStore.applicationData[0].transport.driver_name }}</p>
      </div>
      <div class="flex flex-col text-sm">
        <p class="answer-style">Motor Neitu/Khalhtu Phone Number</p>
        <p>{{ trackStore.applicationData[0].transport.driver_phone }}</p>
      </div>
      <div class="flex flex-col text-sm">
        <p class="answer-style">Motor hman man (Rs) </p>
        <p>{{ trackStore.applicationData[0].transport.transport_cost }}</p>
      </div>
    </div>

  </div>
</template>
<script setup>
import {useTrackStore} from "@/stores/trackingStore.js";

const trackStore = useTrackStore();
</script>

<style scoped>

</style>
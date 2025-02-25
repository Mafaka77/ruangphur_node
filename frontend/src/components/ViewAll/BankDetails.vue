<template>
  <div class="flex flex-col border w-full justify-center p-5 gap-3">
    <div class="flex justify-center text-center">
      <p class="answer-style text-sm">Bank Details</p>
    </div>
    <!--    HMING-->
    <div class="flex flex-col text-sm">
      <p class="answer-style">Hming</p>
      <p>{{ trackStore.applicationData[0].applicant.name }}</p>
    </div>

    <!--    DISTRICT-->
    <div class="flex flex-col text-sm">
      <p class="answer-style">District</p>
      <p>{{ trackStore.applicationData[0].applicant.name }}</p>
    </div>
    <!--    VENG-->
    <div class="flex flex-col text-sm">
      <p class="answer-style">Veng/Khua</p>
      <p>{{ trackStore.applicationData[0].applicant.district.name }}</p>
    </div>
    <!--    PHONE-->
    <div class="flex flex-col text-sm">
      <p class="answer-style">Phone Number</p>
      <p>{{ trackStore.applicationData[0].applicant.mobile }}</p>
    </div>
  </div>
</template>
<script setup>
import {useTrackStore} from "@/stores/trackingStore.js";

const trackStore = useTrackStore();
</script>

<style scoped>

</style>
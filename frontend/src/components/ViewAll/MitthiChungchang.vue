<template>
  <div class="flex flex-col border w-full justify-center p-5 gap-3">
    <div class="flex justify-center text-center">
      <p class="answer-style text-sm">Mitthi Chungchang</p>
    </div>

    <!--        DOB-->
    <div class="flex flex-col text-sm">
      <p>Mitthi pianni leh thla</p>
      <p class="answer-style">{{ formatDate(trackStore.applicationData[0].deceased.dob) }}</p>
    </div>
    <!--        GENDER-->
    <div class="flex flex-col text-sm">
      <p>Gender</p>
      <p class="answer-style">{{ trackStore.applicationData[0].deceased.gender }}</p>
    </div>
    <!--        THIHNI LEH DARKAR-->
    <div class="flex flex-col text-sm">
      <p>Thihni leh Darkar</p>
      <p class="answer-style">{{
          formatDateTime(trackStore.applicationData[0].deceased.time_of_death)
        }}</p>
    </div>
    <!--        THIHNA HMUN-->
    <div class="flex flex-col text-sm">
      <p>Thihna hmun</p>
      <p class="answer-style">{{ trackStore.applicationData[0].deceased.place_of_death }}</p>
    </div>
    <!--        DISTRICT-->
    <div class="flex flex-col text-sm">
      <p>District</p>
      <p class="answer-style">{{ trackStore.applicationData[0].deceased.district.name }}</p>
    </div>
    <!--        VENG-->
    <div class="flex flex-col text-sm">
      <p>Veng/Khua</p>
      <p class="answer-style">{{ trackStore.applicationData[0].deceased.locality }}</p>
    </div>
    <!--        CONSTITUENCY-->
    <div class="flex flex-col text-sm">
      <p>Assembly Constituency</p>
      <p class="answer-style">{{ trackStore.applicationData[0].deceased.constituency.name }}</p>
    </div>
  </div>
</template>
<script setup>
import {useTrackStore} from "@/stores/trackingStore.js";
import {onMounted} from "vue";

const trackStore = useTrackStore();
const date = '2025-02-14T10:21';

function formatDateTime(date) {
  const newDate = new Date(date);
  if (isNaN(newDate.getTime())) return "Invalid Date"; // Handle invalid inputs

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(newDate).replace(",", "");
}

function formatDate(date) {

  const newDate = new Date(date);
  if (isNaN(newDate.getTime())) return "Invalid Date"; // Handle invalid inputs
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(newDate).replace(",", ",");
}


onMounted(() => {
  formatDateTime();
  formatDate()
})
</script>
<style scoped>

</style>
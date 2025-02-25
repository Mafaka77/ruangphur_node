<template>
  <div class="flex flex-col md:px-120 py-2 px-2 md:py-10">
    <div class="bg-white flex flex-col justify-center p-6 rounded gap-3">
      <h1 class="text-center answer-style">Ruang phurh leh chungchang</h1>
      <div>
        <p class="text-sm answer-style">Ruang phurh tanna</p>
        <div class="flex flex-col text-sm p-6 gap-2">
          <div>
            <p>District</p>
            <p class="answer-style">{{ formStore.second_step.source_district_name }}</p>
          </div>
          <div>
            <p>Address</p>
            <p class="answer-style">{{ formStore.second_step.source_locality }}</p>
          </div>
        </div>
      </div>
      <!--      BORDER-->
      <div class="border-t border-gray-300"></div>

      <div>
        <p class="text-sm answer-style">Ruang dahna tur hmun</p>
        <div class="flex flex-col text-sm p-6 gap-2">
          <div>
            <p>District</p>
            <p class="answer-style">{{ formStore.second_step.destination_district_name }}</p>
          </div>
          <div>
            <p>Address</p>
            <p class="answer-style">{{ formStore.second_step.destination_locality }}</p>
          </div>
        </div>
      </div>
      <!--      BORDER-->
      <div class="border-t border-gray-300"></div>

      <div class="flex flex-row text-center">
        <div class="w-full flex flex-col">
          <h1 class="text-2xl answer-style">
            {{ formStore.second_step.distance }}
          </h1>
          <div>
            Kilometer
          </div>
        </div>
        <div class="w-full flex flex-col">
          <h1 class="text-2xl answer-style">
            {{ formStore.second_step.transport_cost }}
          </h1>
          <div>
            Motor hman man
          </div>
        </div>
      </div>

      <div class="border-t border-gray-300"></div>

      <div>
        <p class="text-sm answer-style">Ruang phurhna motor</p>
        <div class="flex flex-col text-sm p-6 gap-2">
          <div>
            <p>Motor registration number</p>
            <p class="answer-style">{{ formStore.second_step.vehicle_no }}</p>
          </div>
          <div>
            <p>Motor neitu/khalhtu hming</p>
            <p class="answer-style">{{ formStore.second_step.driver_name }}</p>
          </div>
          <div>
            <p>Motor neitu/khalhtu phone number</p>
            <p class="answer-style">{{ formStore.second_step.driver_phone }}</p>
          </div>
        </div>
      </div>


      <!--      BUTTON-->
      <div class="flex flex-row space-x-4 gap-4 pt-6">
        <!-- Back Button (Outline) -->
        <button
            class="px-4 py-2 border border-black text-black rounded-md hover:bg-gray-100 transition md:w-42 w-full"
            @click="clickEdit"
        >
          EDIT
        </button>

        <!-- Next Button (Filled Black) -->
        <button
            class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition w-full "
            @click="clickNext"
        >
          APPROVE & NEXT
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useFormStore} from "@/stores/formStore.js";
import {onMounted} from "vue";

const formStore = useFormStore();

const death_time = new Date(formStore.first_step.death_time);
const dob = new Date(formStore.first_step.dob)

const clickEdit = () => {
  formStore.currentStep = 2;
}
const clickNext = () => {
  formStore.currentStep = 4;
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date).replace(",", ",");
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date).replace(",", ",");
}


onMounted(() => {
  formatDateTime();
  formatDate()
})
</script>

<style scoped>

</style>
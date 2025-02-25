<template>
  <div class="flex flex-col md:px-120 py-2 px-2 md:py-10">
    <div class="bg-white flex flex-col justify-center p-6 rounded gap-3">
      <h1 class="text-center answer-style">Mitthi chungchang</h1>
      <div class="flex pb-2 justify-center text-center">
        <img alt="Logo" class="w-10 h-10" src="/kuang.png"/>
      </div>
      <h1 class="text-center font-600 answer-style text-2xl">{{ formStore.first_step.name }}</h1>
      <h1 class="text-center">{{ formStore.first_step.relation }} {{ formStore.first_step.relative_name }}</h1>
      <div class="border-t border-gray-300"></div>
      <div class="flex flex-col gap-4 text-sm">
        <div>
          <p class="text-sm">Mitthi pianni leh thla</p>
          <h1 class="answer-style">{{ formatDate(dob) }}</h1>
        </div>
        <div>
          <p class="text-sm">Gender</p>
          <h1 class="answer-style">{{ formStore.first_step.gender }}</h1>
        </div>
        <div>
          <p class="text-sm">Thih ni leh darkar</p>
          <h1 class="answer-style">{{ formatDateTime(death_time) }}</h1>
        </div>
        <div>
          <p class="text-sm">Thihna Hmun</p>
          <h1 class="answer-style">{{ formStore.first_step.place_of_death }}</h1>
        </div>
        <div>
          <p class="text-sm">Thihna Hmun</p>
          <h1 class="answer-style">{{ formStore.first_step.place_of_death }}</h1>
        </div>
        <div>
          <p class="text-sm">District</p>
          <h1 class="answer-style">{{ formStore.first_step.district }}</h1>
        </div>
        <div>
          <p class="text-sm">Constituency</p>
          <h1 class="answer-style">{{ formStore.first_step.constituency }}</h1>
        </div>
        <div>
          <p class="text-sm">Veng/Khua</p>
          <h1 class="answer-style">{{ formStore.first_step.locality }}</h1>
        </div>
      </div>


      <!--      BUTTON-->
      <div class="flex flex-row space-x-4 gap-4">
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
  formStore.currentStep = 0;
}
const clickNext = () => {
  formStore.currentStep = 2;
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
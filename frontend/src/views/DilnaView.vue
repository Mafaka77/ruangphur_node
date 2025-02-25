<template>
  <div v-if="formStore.currentStep===0">
    <First_step/>
  </div>
  <div v-else-if="formStore.currentStep===1">
    <First_step_preview/>
  </div>
  <div v-else-if="formStore.currentStep===2">
    <Second_step/>
  </div>
  <div v-else-if="formStore.currentStep===3">
    <Second_step_preview/>
  </div>
  <div v-else-if="formStore.currentStep===4">
    <Third_step/>
  </div>
  <div v-else-if="formStore.currentStep===5">
    <Third_step_preview/>
  </div>
  <div v-else-if="formStore.currentStep===6">
    <Otp_step/>
  </div>
</template>


<script setup>

import {useFormStore} from "@/stores/formStore.js";
import First_step from "@/views/first_step.vue";
import Second_step from "@/views/second_step.vue";
import First_step_preview from "@/views/first_step_preview.vue";
import Second_step_preview from "@/views/second_step_preview.vue";
import Third_step from "@/views/third_step.vue";
import Third_step_preview from "@/views/third_step_preview.vue";
import Otp_step from "@/views/otp_step.vue";

const formStore = useFormStore();
</script>

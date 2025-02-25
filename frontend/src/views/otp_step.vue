<template>
  <div class="flex flex-col md:px-120 py-2 px-2 md:py-10">
    <div class="bg-white flex flex-col justify-center p-6 rounded gap-8 h-full">
      <div>
        <button
            class="flex items-center px-4 py-2 text-white bg-black rounded-md hover:bg-gray-300 focus:outline-none"
            @click="clickBack"
        >
          <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M15 19l-7-7 7-7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            ></path>
          </svg>
          Back
        </button>
      </div>
      <h1 class="text-2xl answer-style">Enter OTP to verify</h1>
      <p class="text-sm">An OTP has been sent to {{ formStore.third_step.mobile }}</p>
      <div class="items-center">
        <MyOTP v-model="formStore.otp"/>
      </div>
      <div class="flex flex-row gap-2">
        <!--        <div>-->
        <!--          <p class="text-sm">Did not get the OTP?</p>-->
        <!--          <button class="text-sm text-green" @click="resend">-->
        <!--            Resend-->
        <!--          </button>-->
        <!--        </div>-->
        <TimerComponent @resend-otp="sendOtpAgain"/>
      </div>
      <button
          :disabled="formStore.isVerifyLoading"
          class="w-full bg-black  text-white px-4 py-2 hover:bg-gray-500 rounded
                flex items-center justify-center
                 disabled:bg-blue-300"
          @click="verifyOtp"
      >
          <span v-if="formStore.isVerifyLoading" class="flex items-center">
          <svg
              class="animate-spin h-5 w-5 mr-2 text-black"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8h4z" fill="currentColor"></path>
          </svg>
          </span>
        <span v-else>VERIFY</span>
      </button>
      <!--      <button-->
      <!--          class="flex justify-center px-4 py-2 text-white bg-black rounded-md hover:bg-gray-500 focus:outline-none"-->
      <!--          @click="verifyOtp"-->
      <!--      >-->
      <!--        VERIFY-->
      <!--      </button>-->
    </div>
  </div>
</template>
<script setup>
import {useFormStore} from "@/stores/formStore.js";
import MyOTP from "@/components/reusables/MyOTP.vue";
import TimerComponent from "@/components/TimerComponent.vue";
import {useSnackbar} from "vue3-snackbar";
import router from "@/router/index.js";

const snackbar = useSnackbar();
const formStore = useFormStore();

const clickBack = () => {
  formStore.currentStep = 4;
}
const sendOtpAgain = () => {
  formStore.sendOtp(formStore.third_step.mobile, () => {
  }, (message) => {
    snackbar.add({
      text: message,
      type: 'success'
    })

  }, (message) => {
    snackbar.add({
      text: message,
      type: 'warning'
    })
  });
}
const verifyOtp = () => {
  formStore.verifyOtp(formStore.third_step.mobile, formStore.otp, () => {
    formStore.isVerifyLoading = true;
  }, (message) => {
    snackbar.add({
      text: message,
      type: 'success'
    })
    formStore.submitForm(() => {
    }, (message) => {
      formStore.isVerifyLoading = false;
      snackbar.add({
        text: message,
        type: 'success'
      })
      formStore.currentStep = 0;
      router.replace({name: 'success'});
    }, (message) => {
      formStore.isVerifyLoading = false;
      snackbar.add({
        text: message,
        type: 'warning'
      })
    });
  }, (message) => {
    formStore.isVerifyLoading = true;
    snackbar.add({
      text: message,
      type: 'warning'
    })
  })
}

</script>

<style scoped>

</style>
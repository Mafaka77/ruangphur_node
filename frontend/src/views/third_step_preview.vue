<template>
  <div class="flex flex-col md:px-120 py-2 px-2 md:py-10">
    <div class="bg-white flex flex-col justify-center p-6 rounded gap-3">
      <h1 class="text-center answer-style">Ruang Phurh Diltu leh a man Chungchang</h1>
      <div>
        <p class="text-sm answer-style">Diltu</p>
        <div class="flex flex-col text-sm p-6 gap-2">
          <div>
            <p>Hming</p>
            <p class="answer-style">{{ formStore.third_step.name }}</p>
          </div>
          <div>
            <p>District</p>
            <p class="answer-style">{{ formStore.third_step.districts }}</p>
          </div>
          <div>
            <p>Veng/Khua</p>
            <p class="answer-style">{{ formStore.third_step.locality }}</p>
          </div>
          <div>
            <p>Phone Number</p>
            <p class="answer-style">{{ formStore.third_step.mobile }}</p>
          </div>
        </div>
      </div>
      <!--      BORDER-->
      <div class="border-t border-gray-300"></div>

      <div>
        <p class="text-sm answer-style">Bank Details</p>
        <div class="flex flex-col text-sm p-6 gap-2">
          <div>
            <p>Bank Hming</p>
            <p class="answer-style">{{ formStore.third_step.bank_name }}</p>
          </div>
          <div>
            <p>Account Number</p>
            <p class="answer-style">{{ formStore.third_step.account_no }}</p>
          </div>
          <div>
            <p>IFSC Code</p>
            <p class="answer-style">{{ formStore.third_step.ifsc_code }}</p>
          </div>
        </div>
      </div>
      <!--      BORDER-->
      <div class="border-t border-gray-300"></div>
      <!--      REQUIRED DOCUMENTS-->
      <div class="flex flex-col">
        <div class="flex flex-row justify-between">
          <p class="text-sm answer-style">Document thil tel te</p>
          <p class="text-sm answer-style">5/5</p>
        </div>
        <div class="flex flex-col text-sm p-6 gap-2">
          <div class="flex flex-row gap-2 items-center">
            <img alt="Logo" class="w-3 h-3" src="/tick.png"/>
            <p class="text-sm">Mitthi Aadhar card/Voter ID</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <img alt="Logo" class="w-3 h-3" src="/tick.png"/>
            <p class="text-sm">Motor hman man Voucher/Receipt </p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <img alt="Logo" class="w-3 h-3" src="/tick.png"/>
            <p class="text-sm">Death Certificate</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <img alt="Logo" class="w-3 h-3" src="/tick.png"/>
            <p class="text-sm">Diltu Aadhar card/voter ID</p>
          </div>
        </div>
      </div>
      <div class="flex flex-row items-start gap-4">
        <MyCheckbox id="app" v-model="formStore.acknowledge" class="pt-2" label=""/>
        <p>Kei {{ formStore.third_step.name }} hian heng dilna leh
          document upload-te hi thu diktak a ni tih
          ka nemnghet e, diklo emaw felhlel a awm anih
          chuan a tul angin mawh ka phur ang.</p>
      </div>
      <!--      END-->
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
            :disabled="formStore.isOtpLoading"
            class="w-full bg-black  text-white px-4 py-2 hover:bg-gray-500 rounded
                flex items-center justify-center
                 disabled:bg-blue-300"
            @click="clickNext"
        >
          <span v-if="formStore.isOtpLoading" class="flex items-center">
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
          <span v-else>SEND OTP</span>
        </button>
        <!--        <button-->
        <!--            class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition w-full "-->
        <!--            @click="clickNext"-->
        <!--        >-->
        <!--          SEND OTP-->
        <!--        </button>-->
      </div>
    </div>
  </div>
</template>


<script setup>
import {useFormStore} from "@/stores/formStore.js";
import MyCheckbox from "@/components/reusables/MyCheckbox.vue";
import {useSnackbar} from "vue3-snackbar";

const snackbar = useSnackbar();
const formStore = useFormStore();
const clickEdit = () => {
  formStore.currentStep = 4;
}
const clickNext = () => {
  if (formStore.acknowledge === false) {
    snackbar.add(
        {
          text: 'Please check the acknowledgement',
          type: 'warning'
        }
    );
  } else {
    formStore.sendOtp(formStore.third_step.mobile, () => {
      formStore.isOtpLoading = true;
    }, (message) => {
      formStore.isOtpLoading = false;
      snackbar.add({
        text: message,
        type: 'success'
      })
      formStore.currentStep = 6;
    }, (message) => {
      formStore.isOtpLoading = false;
      snackbar.add({
        text: message,
        type: 'warning'
      })
    });

  }

}
</script>

<style scoped>

</style>
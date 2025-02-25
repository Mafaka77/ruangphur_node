<template>
  <div class="flex flex-col md:px-120 py-2 px-2 md:py-10">
    <div class="flex-1 pb-2">
      <img alt="Logo" class="w-full h-full" src="/step_3.png"/>
    </div>
    <div class="bg-white flex flex-col justify-center p-6 rounded gap-3">
      <div class="flex flex-row items-center gap-2">
        <VerticalLine/>
        <h1 class="answer-style text-sm">Ruang phurhna man diltu chungchang</h1>
      </div>
      <div class="flex flex-col space-y-2 ">
        <MyTextField
            v-model="formStore.third_step.name"
            label="Diltu hming"
            placeholder="Diltu hmingpum"
            required
            type="text"
        />
        <MyTextField
            v-model="formStore.third_step.mobile"
            label="Diltu mobile for OTP"
            placeholder="Diltu valid mobile"
            required
            type="text"
        />
        <MySelect v-model="formStore.third_step.district_id" :options="formStore.district" label="Diltu awmna District"
                  placeholder="District thlang rawh"
                  required
                  @onChange="onDistrictChange"/>
        <MyTextField
            v-model="formStore.third_step.locality"
            label="Diltu awmna Veng/Khua"
            placeholder="Diltu awmna Veng/Khua"
            required
            type="text"
        />
        <MyTextField
            v-model="formStore.third_step.bank_name"
            label="Diltu Bank hming"
            placeholder="Bank hming"
            required
            type="text"
        />
        <MyTextField
            v-model="formStore.third_step.account_no"
            label="Diltu Account Number"
            placeholder="Account Number"
            required
            type="text"
        />
        <MyTextField
            v-model="formStore.third_step.ifsc_code"
            label="Diltu Bank IFSC CODE"
            placeholder="IFSC CODE"
            required
            type="text"
        />
        <div class="py-4">
          <h1 class="text-sm">Document Upload</h1>
        </div>
        <MyFileUpload
            id="mitthi-document"
            :model-value="formStore.third_step.id_proof"
            accept=".png, .jpg, .jpeg, .pdf"
            label="Upload Document"
            required
            uploadUrl="userApi.post('/upload-file')"
            @update:modelValue="uploadMitthiDocument"
        />
        <MyFileUpload
            id="motor-receipt"
            :model-value="formStore.third_step.receipt"
            accept=".png, .jpg, .jpeg, .pdf"
            label="Upload Document"
            required
            uploadUrl="userApi.post('/upload-file')"
            @update:modelValue="uploadMotorReceipt"
        />
        <MyFileUpload
            id="death-certificate"
            :model-value="formStore.third_step.death_certificate"
            accept=".png, .jpg, .jpeg, .pdf"
            label="Upload Document"
            required
            uploadUrl="userApi.post('/upload-file')"
            @update:modelValue="uploadDeathCertificate"
        />
        <MyFileUpload
            id="diltu-document"
            :model-value="formStore.third_step.additional_document"
            accept=".png, .jpg, .jpeg, .pdf"
            label="Upload Document"
            required
            uploadUrl="userApi.post('/upload-file')"
            @update:modelValue="uploadDiltuDocument"
        />
      </div>
      <!--      BUTTON-->
      <div class="flex flex-row  space-x-4 gap-4 pt-4">
        <!-- Back Button (Outline) -->
        <button
            class="px-4 py-2 border border-black text-black rounded-md hover:bg-gray-100 transition md:w-42 w-full"
            @click="backStep"
        >
          BACK
        </button>

        <!-- Next Button (Filled Black) -->
        <button
            class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition w-full "
            @click="nextStep"
        >
          PREVIEW
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

import VerticalLine from "@/components/VerticalLine.vue";
import MyTextField from "@/components/reusables/MyTextField.vue";
import {useFormStore} from "@/stores/formStore.js";
import MySelect from "@/components/reusables/MySelect.vue";
import MyFileUpload from "@/components/reusables/MyFileUpload.vue";
import {useSnackbar} from "vue3-snackbar";

const snackbar = useSnackbar();
const formStore = useFormStore();

const onDistrictChange = (data) => {
  formStore.third_step.districts = data.name;
}
const uploadMitthiDocument = (file) => {
  formStore.third_step.id_proof = file;
}
const uploadMotorReceipt = (file) => {
  formStore.third_step.receipt = file;
}
const uploadDeathCertificate = (file) => {
  formStore.third_step.death_certificate = file;
}
const uploadDiltuDocument = (file) => {
  formStore.third_step.additional_document = file;
}
const backStep = () => {
  formStore.currentStep = 3;
}
const nextStep = () => {
  const isFormValid = Object.values(formStore.third_step).every(value => value !== '' && value !== 0 && value !== null);
  if (!isFormValid) {
    snackbar.add({
      text: 'Enter all required fields',
      type: 'warning',
    });
  } else {
    formStore.currentStep = 5;
  }

}
</script>

<style scoped>

</style>
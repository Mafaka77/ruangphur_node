<template>
  <div class="flex flex-col md:px-120 py-2 px-2 md:py-10">
    <div class="flex-1 pb-2">
      <img alt="Logo" class="w-full h-full" src="/step_2.png"/>
    </div>
    <div class="bg-white flex flex-col justify-center p-6 rounded gap-3">
      <div class="flex flex-row items-center gap-2">
        <VerticalLine/>
        <h1 class="answer-style">Ruang phurna hmun</h1>
      </div>

      <div class="flex flex-col space-y-2 gap-3">
        <MySelect v-model="formStore.second_step.source_district" :options="formStore.district"
                  label="Ruang phurh tanna district"
                  placeholder="Select" required
                  @onChange="changeSourceDistrict"/>
        <SourceLocationInput label="Ruang chhuahna Veng/Khua"/>
        <MySelect v-model="formStore.second_step.destination_district" :options="formStore.district"
                  label="Ruang phurh dahna district"
                  placeholder="Select" required
                  @onChange="changeDestinationDistrict"/>
        <DestinationLocationInput/>
      </div>
      <div class="flex flex-row items-center gap-2">
        <VerticalLine/>
        <h1 class="answer-style">Motor chungchang</h1>
      </div>
      <div class="flex flex-col space-y-2 gap-3">
        <!--        <p class="block text-sm font-bold text-black-700">Ruang phurhna motor</p>-->
        <MyTextField
            v-model="formStore.second_step.vehicle_no"
            label="Motor registration number"
            placeholder="Motor registration number"
            required
            type="text"
        />
        <MyTextField
            v-model="formStore.second_step.driver_name"
            label="Motor neitu/khalhtu hming"
            placeholder="Ruang chhuahna Veng/Khua"
            required
            type="text"
        />
        <MyTextField
            v-model="formStore.second_step.driver_phone"
            label="Motor neitu/khalhtu phone number"
            placeholder="Motor neitu/khalhtu phone number"
            required
            type="text"
        />
      </div>
      <!--      BUTTON-->
      <div class="flex flex-row space-x-4 gap-4 pt-6">
        <!-- Back Button (Outline) -->
        <button
            class="px-4 py-2 border border-black text-black rounded-md hover:bg-gray-100 transition md:w-42 w-full"
            @click="clickBack"
        >
          BACK
        </button>

        <!-- Next Button (Filled Black) -->
        <button
            class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition w-full "
            @click="clickPreview"
        >
          PREVIEW
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useFormStore} from "@/stores/formStore.js";
import MySelect from "@/components/reusables/MySelect.vue";
import SourceLocationInput from "@/components/SourceLocationInput.vue";
import DestinationLocationInput from "@/components/DestinationLocationInput.vue";
import MyTextField from "@/components/reusables/MyTextField.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import {useSnackbar} from "vue3-snackbar";
import {onMounted} from "vue";

const snackbar = useSnackbar();

const formStore = useFormStore();
const changeSourceDistrict = (data) => {
  formStore.second_step.source_district_name = data.name;
}
const changeDestinationDistrict = (data) => {
  formStore.second_step.destination_district_name = data.name;
}
const clickBack = () => {
  formStore.currentStep = 0;
}
const clickPreview = () => {
  const isFormValid = Object.values(formStore.second_step).every(value => value !== '' && value !== 0 && value !== null);
  if (formStore.second_step.source_lat === '' || formStore.second_step.destination_lat === '') {
    snackbar.add({
      text: 'Enter Source or Destination address',
      type: 'warning',
    });
    return '';
  }
  if (!isFormValid) {
    snackbar.add({
      text: 'Enter all required fields',
      type: 'warning',
    });
  } else {
    formStore.currentStep = 3;
  }

}
onMounted(() => {
})

</script>

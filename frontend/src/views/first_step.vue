<template>
  <div class="flex flex-col md:px-120 py-2 px-2 md:py-10">
    <div class="flex-1 pb-2">
      <img alt="Logo" class="w-full h-full" src="/step_1.png"/>
    </div>
    <div class="bg-white flex flex-col justify-center p-6 rounded gap-3">
      <form @submit.prevent="validateForm">
        <div class="flex flex-row items-center gap-2">
          <VerticalLine/>
          <h1 class="answer-style">Mitthi Chungchang</h1>
        </div>


        <div class="flex flex-col space-y-2 ">
          <MyTextField
              v-model="formStore.first_step.name"
              label="Mitthi hming"
              placeholder="Mitthi hming chhu rawh"
              required
              type="text"
          />
        </div>
        <div class="flex flex-col md:flex-row gap-2">
          <MySelect v-model="formStore.first_step.relation_id" :options="formStore.relation"
                    label="Inlaichin na"
                    required
                    @onChange="relationChange"
          />
          <MyTextField
              v-model="formStore.first_step.relative_name"
              :error="error"
              label="Mitthi chhungte hming"
              placeholder="Mitthi chhungte hming chhu rawh"
              required
              type="text"
          />
        </div>
        <div class="flex flex-col gap-2">
          <MyDatePicker v-model="formStore.first_step.dob" label="DOB" placeholder="Pianni leh thla" required
                        type="date"/>
          <MySelect v-model="formStore.first_step.gender_id" :options="gender" label="Gender"
                    placeholder="Select Gender"
                    required
                    @onChange="onGenderChange"/>
          <MySelect v-model="formStore.first_step.district_id" :options="formStore.district" label="District"
                    placeholder="Select District"
                    required
                    @onChange="onDistrictChange"/>
          <MySelect v-model="formStore.first_step.constituency_id" :options="formStore.constituency"
                    label="Assembly Constituency"
                    placeholder="Select Constituency"
                    required @onChange="onConstituencyChange"/>
          <MyTextField v-model="formStore.first_step.locality" label="Mitthi Veng/Khua"
                       placeholder="Veng/Khua chhu rawh"
                       required/>
          <MyDateTimePicker v-model="formStore.first_step.death_time" label="Thih ni leh darkar" required
                            type="datetime-local"/>
          <MyTextField v-model="formStore.first_step.place_of_death" label="Thihna hmun" placeholder="Thihna hmun"
                       required/>
        </div>


        <!--      BUTTON-->
        <div class="flex flex-row  space-x-4 gap-4 pt-4">
          <!-- Back Button (Outline) -->
          <button
              class="px-4 py-2 border border-black text-black rounded-md hover:bg-gray-100 transition md:w-42 w-full"
          >
            BACK
          </button>

          <!-- Next Button (Filled Black) -->
          <button
              class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition w-full "
              @click="nextStep"
          >
            NEXT
          </button>
        </div>
      </form>
    </div>
  </div>

</template>
<script setup>
import MyTextField from "@/components/reusables/MyTextField.vue";
import MySelect from "@/components/reusables/MySelect.vue";
import {useFormStore} from '@/stores/formStore.js'
import {onMounted, ref} from "vue";
import MyDateTimePicker from "@/components/reusables/MyDateTimePicker.vue";
import MyDatePicker from "@/components/reusables/MyDatePicker.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import {useSnackbar} from "vue3-snackbar";

const snackbar = useSnackbar();
const error = ref('');
const formStore = useFormStore();
const gender = [{_id: '1', name: 'Male'}, {_id: '2', name: 'Female'}];
onMounted(() => {
  formStore.getAllRelation();
  formStore.getAllDistrict();
})
const onGenderChange = (data) => {
  formStore.first_step.gender = data.name;
}
const onDistrictChange = (data) => {
  formStore.first_step.district = data.name;
  formStore.getConstituencyById(data._id);
}
const onConstituencyChange = (data) => {
  formStore.first_step.constituency = data.name;
}
const relationChange = (data) => {
  formStore.first_step.relation = data.name;
}
const nextStep = () => {
  const isFormValid = Object.values(formStore.first_step).every(value => value !== '' && value !== 0 && value !== null);
  if (!isFormValid) {
    snackbar.add({
      text: 'Enter all required fields',
      type: 'warning',
    });
  } else {
    formStore.currentStep = 1;
  }


}
</script>

<style scoped>

</style>
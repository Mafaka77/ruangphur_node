<template>
  <div v-if="trackStore.currentIndex===0">
    <div class="flex flex-col md:px-120 py-2 px-2 md:py-10">
      <div class="">
        <div class="bg-blue-100 flex flex-col justify-center p-6 rounded gap-4 ">
          <h1 class="text-center answer-style text-2xl pt-10">Ruang phurh dil chhuina/tracking</h1>
          <div class="flex pb-2 justify-center">
            <p class="text-sm">
              I ruang phurh dilna a thlen chin zawnna a ni. Mipui ten zawldawh takin min lo ngaichang zel dawn nia.
            </p>
          </div>
          <MyTextField v-model="trackStore.form.trackingID" label="Tracking ID chhu lut rawh le"
                       placeholder="I dilna thlen chin zawnna"/>
          <div class="flex flex-row gap-2 py-10">
            <button
                :disabled="trackStore.isLoading"
                class="w-40 rounded p-2 flex items-center justify-center bg-white text-black hover:bg-gray-600 disabled:bg-blue-300"
                @click="viewApplication"
            >
          <span v-if="trackStore.isLoading" class="flex items-center">
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
              <span v-else>View</span>
            </button>
            <button
                :disabled="trackStore.isTrackLoading"
                class="w-full bg-black  text-white p-2 hover:bg-gray-500 rounded
                flex items-center justify-center
                 disabled:bg-blue-300"
                @click="trackNow"
            >
          <span v-if="trackStore.isTrackLoading" class="flex items-center">
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
              <span v-else>Track Now</span>
            </button>
          </div>
        </div>

        <Track_step/>
      </div>
    </div>
  </div>
  <div v-else>
    <All_form/>
  </div>

</template>
<script setup>
import MyTextField from "@/components/reusables/MyTextField.vue";
import {useTrackStore} from "@/stores/trackingStore.js";
import {useSnackbar} from "vue3-snackbar";
import Track_step from "@/views/track_step.vue";
import All_form from "@/views/all_form.vue";


const snackbar = useSnackbar();
const trackStore = useTrackStore();


const viewApplication = () => {
  if (trackStore.form.trackingID !== '') {
    trackStore.getApplications(trackStore.form.trackingID, () => {
      trackStore.isLoading = true;
    }, (message) => {
      trackStore.isLoading = false;
    }, (message) => {
      trackStore.isLoading = false;
      snackbar.add({
        text: message,
        type: 'warning'
      })
    });

  } else {
    snackbar.add({
      text: 'Please enter Tracking ID',
      type: 'warning'
    })
  }

}
const trackNow = () => {
  if (trackStore.form.trackingID !== '') {
    trackStore.trackApplication(trackStore.form.trackingID, () => {
      trackStore.isTrackLoading = true;
    }, (message) => {
      trackStore.isTrackLoading = false;
      snackbar.add({
        text: message,
        type: 'success'
      })
    }, (message) => {
      trackStore.isTrackLoading = false;
      snackbar.add({
        text: message,
        type: 'warning'
      })
    });
  } else {
    snackbar.add({
      text: 'Please enter Tracking ID',
      type: 'warning'
    })
  }
}
</script>

<style scoped>

</style>
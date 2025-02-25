<template>
  <div class="flex flex-col px-3 md:px-64 pt-5">
    <div class="flex flex-col text-start justify-start items-start pb-2">
      <Button class="bg-black text-white p-2" @click="clickBack">Back to Track</Button>
    </div>

    <div class="bg-blue-100 flex flex-col justify-center p-6 rounded gap-4 ">
      <div class="flex pb-2 justify-center text-center">
        <img alt="Logo" class="w-10 h-10" src="/kuang.png"/>
      </div>
      <div class="justify-center text-center">
        <p class="text-2xl answer-style">{{ trackStore.applicationData[0].deceased.name }}</p>
        <p class="text-sm">{{ trackStore.applicationData[0].deceased.relation.name }} {{
            trackStore.applicationData[0].deceased.relative_name
          }}</p>
      </div>
      <!--      SECOND-->
      <div class="flex flex-row  justify-center text-center gap-10">
        <div class="flex-row text-sm">
          <p class="answer-style text-2xl">164</p>
          <p>Kilometer</p>
        </div>
        <div class="flex-row text-sm">
          <p class="answer-style text-2xl">MZ-01-AB-1234</p>
          <p>Motor Reg.</p>
        </div>
        <div class="flex-row text-sm">
          <p class="answer-style text-2xl">76123</p>
          <p>Amount (Rs)</p>
        </div>
      </div>
    </div>

    <!--    THIRD ROW-->
    <div class="flex flex-col md:flex-row gap-2 pt-5">
      <MitthiChungchang/>
      <div class="flex flex-col w-full gap-2">
        <Applicant/>
        <BankDetails/>
      </div>
    </div>
    <!--    FOURTH ROW-->
    <div class="flex flex-col md:flex-row gap-2 pt-5 ">
      <Transport/>
      <div class="flex flex-col w-full gap-2">
        <Documents/>
        <TrackStep/>
      </div>
    </div>
    <div>

    </div>

  </div>
</template>
<script setup>
import {useTrackStore} from "@/stores/trackingStore.js";
import MitthiChungchang from "@/components/ViewAll/MitthiChungchang.vue";
import Applicant from "@/components/ViewAll/Applicant.vue";
import BankDetails from "@/components/ViewAll/BankDetails.vue";
import Transport from "@/components/ViewAll/Transport.vue";
import Documents from "@/components/ViewAll/Documents.vue";
import TrackStep from "@/components/ViewAll/TrackStep.vue";

const trackStore = useTrackStore();
const clickBack = () => {
  trackStore.currentIndex = 0;
}

</script>


<style scoped>

</style>
<template>
  <!--    STEPS-->
  <div v-if="trackStore.isTrackVisible===true" class="flex flex-col p-10 text-sm border border-gray:50 gap-2">
    <div class="flex flex-row gap-2 ">
      <p>Status:</p>
      <div v-if="trackStore.applicationData[0].status==='Pending'">
        <p class="answer-style">Form Submitted, sending for Verification</p>
      </div>
      <div v-else-if="trackStore.applicationData[0].status==='Verified'">
        <p class="answer-style">Verified, form verified by District Officials</p>
      </div>
      <div v-else-if="trackStore.applicationData[0].status==='Approved'">
        <p class="answer-style">Approved,form approved by Department Officials</p>
      </div>
      <div v-else-if="trackStore.applicationData[0].status==='Processing'">
        <p class="answer-style">Bill in process by partner Bank</p>
      </div>
    </div>
    <div class="flex flex-row gap-2 ">
      <p>Applied Date:</p>
      <p class="answer-style">{{ trackStore.applicationData[0].createdAt }}</p>
    </div>
    <div class="flex flex-row gap-2 ">
      <p>Dilna ID:</p>
      <p class="answer-style">{{ trackStore.applicationData[0].application_no }}</p>
    </div>
    <!--    step 1 -->
    <div class="flex flex-row gap-4">
      <img alt="Logo" class="w-7 h-25" src="/step1.png"/>
      <div class="flex flex-col">
        <p class="answer-style">Form Submitted</p>
        <p class="text-sm">I ruang phurh dilna chu thehluh fel a ni tawh e, District lama thuneitu ten verify turin a
          thang mek</p>
        <p class="text-green answer-style">2024-11-25 | 13:05</p>
      </div>
    </div>
    <!--    step_1-->
    <!--    Step 2-->
    <div class="flex flex-row gap-4">
      <div v-if="trackStore.applicationData[0].status==='Pending'">
        <img alt="Logo" class="w-10 h-25" src="/step2.png"/>
      </div>
      <div v-else>
        <img alt="Logo" class="w-10 h-25" src="/step1.png"/>
      </div>
      <div class="flex flex-col">
        <p class="answer-style">Verified</p>
        <p class="text-sm">District thuneitu te atangin verify a ni a, Directorate lamah thawn a ni</p>
        <p class="text-green answer-style">2024-11-25 | 13:05</p>
      </div>
    </div>
    <!--    Step 2 End-->
    <!--    Step 3 -->
    <div class="flex flex-row gap-4">
      <div v-if="trackStore.applicationData[0].status==='Pending'||trackStore.applicationData[0].status==='Verified'">
        <img alt="Logo" class="w-10 h-25" src="/step2.png"/>
      </div>
      <div v-else>
        <img alt="Logo" class="w-10 h-25" src="/step1.png"/>
      </div>
      <!--      <img alt="Logo" class="w-7 h-25" src="/step2.png"/>-->
      <div class="flex flex-col">
        <p class="answer-style">Application under process</p>
        <p class="text-sm">Directorate kutah a awm mek a, bank lama deposit turin file tih kal a ni</p>
        <p class="text-green answer-style">2024-11-25 | 13:05</p>
      </div>
    </div>
    <!--    Step 3 End-->
    <!--    Step 4-->
    <div class="flex flex-row gap-4">
      <div
          v-if="trackStore.applicationData[0].status==='Pending'||trackStore.applicationData[0].status==='Verified'||trackStore.applicationData[0].status==='Approved'">
        <img alt="Logo" class="w-7 h-7" src="/step3.png"/>

      </div>
      <div v-else-if="trackStore.applicationData[0].status==='Processing'">
        <img alt="Logo" class="w-7 h-7" src="/step4.png"/>
      </div>
      <!--      <img alt="Logo" class="w-7 h-7" src="/step3.png"/>-->
      <div class="flex flex-col">
        <p class="answer-style">Bill Process</p>
        <p class="text-sm">I ruang phurh dilna chu bank lamah process mek a ni</p>
      </div>
    </div>
    <!--    Step 4 end-->
  </div>
  <div v-else></div>
  <!--    STEPS END-->
</template>
<script setup>
import {useTrackStore} from "@/stores/trackingStore.js";

const trackStore = useTrackStore();
</script>

<style scoped>

</style>
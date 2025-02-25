<template>
  <div class="flex flex-col justify-center items-center bg-white p-4 gap-5">
    <div class="flex flex-col text-center items-center justify-center">
      <img alt="Logo" class="w-32 h-12" src="/logo.png"/>
      <h1>An initiative of</h1>
      <h1>Department of Social Welfare & Tribal Affairs and WCD, Government of Mizoram</h1>
    </div>
    <div class="border-t border-gray-300 w-full md:w-150"></div>
    <div class="flex flex-col justify-center">
      <div class="flex flex-row gap-5 md:gap-20 pb-10 justify-center text-center">
        <button class="text-sm">About Us</button>
        <button class="text-sm">Contact Us</button>
        <button class="text-sm hover:bg-primary-100 " @click="router.push({name:'login'})">Login for Officials</button>
      </div>
      <div class="flex text-center">
        <p>Crafted with care by Mizoram State e-Governance Society (MSeGS)</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import router from "@/router/index.js";
</script>

<style scoped>

</style>
<template>
  <div class="flex flex-col md:px-120 py-2 px-2 md:py-10 h-full">
    <div class="bg-white flex flex-col justify-center p-6 rounded gap-3">
      <div class="flex pb-2 justify-center pt-20">
        <img alt="Logo" class="w-10 h-10" src="/success.png"/>
      </div>
      <div class="px-20 text-center">
        <p class="text-sm">I ruang phurh dilna hlawhtling
          taka thehluh a ni e</p>
      </div>
      <div class="text-center">
        <p class="text-sm">
          Dilna ID
        </p>
        <h1 class="answer-style">
          {{ formStore.application_no }}
        </h1>
        <div class="py-10">
          <button class="bg-black text-white p-3 px-20" @click="gotoHome">HOME</button>
        </div>

      </div>

    </div>
  </div>
</template>
<script setup>
import {useFormStore} from "@/stores/formStore.js";
import router from "@/router/index.js";

const formStore = useFormStore();

const gotoHome = () => {
  router.replace({name: 'home'})
}
</script>

<style scoped>

</style>
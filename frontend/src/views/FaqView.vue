<template>
  <div class="flex flex-col md:px-120 py-2 px-2 md:py-10 gap-4">
    <div class="bg-blue-100 flex flex-col justify-center p-6 rounded gap-3">
      <h1 class="answer-style">Frequently Asked Questions</h1>
      <p class="text-sm">Ruangphurh chungchuang a zawhna leh chhanna tlanglawn i tan chawpchhuah a ni e</p>
    </div>
    <div class="flex flex-col border border-gray:50 p-6 ">
      <div class="flex flex-col justify-center text-center">
        <h1 class=" answer-style">Ruang Phurh chungchang a zawhna leh chhana tlanglawn</h1>
      </div>
      <p class="pb-5">FAQs</p>
      <div v-for="(item, index) in faqStore.faqList" :key="index" class="border-b border-gray-200 ">
        <button
            class="w-full text-left flex justify-between items-center p-3 bg-white hover:bg-gray-200"
            @click="toggle(index)"
        >
          <span class="font-semibold">{{ item.question }}</span>
          <span :class="openIndex === index ? 'rotate-180' : 'rotate-0'" class="transition-transform">
          +
                </span>
        </button>
        <div v-show="openIndex === index" class="p-4 bg-white ">
          {{ item.answer }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useFaqStore} from "@/stores/faqStore.js";
import {onMounted, ref} from "vue";

const faqStore = useFaqStore();
const openIndex = ref(null);
const toggle = (index) => {
  console.log(index)
  openIndex.value = openIndex.value === index ? null : index;
};
onMounted(() => {
  faqStore.getFaq();
})
</script>

<style scoped>

</style>
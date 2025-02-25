<template>
  <div>
    <!--    FIRST SECTION-->
    <div class="flex flex-col gap-4 p-2  md:px-64 bg-blue-100">
      <div class="flex flex-col py-4 md:flex-row rounded-lg ">
        <div class="flex-1 items-start  text-black flex flex-col  gap-4 px-2 py-4">
          <h1 class="text-2xl">Chibai! In chhiattawh naah Mizoram Sorkar a awm e.</h1>
          <p>Mitthi ruang chu i duhna hmun taka phur thleng turin dilna document dik tak upload turin ngen leh hriattir
            i ni e.</p>
          <button class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
            Download Circular
          </button>
        </div>
        <div class="flex-1  text-white flex  justify-center md:justify-end py-4">
          <div class="flex gap-4">
            <img alt="Logo" class="w-42 md:w-52 h-42 md:h-52" src="/dilna.png" @click="$router.push('/dilna')"/>
            <img alt="Logo" class="w-42 md:w-52 h-42 md:h-52" src="/chhuina.png"/>
          </div>
        </div>
      </div>
    </div>
    <!--    SECOND SECTION-->
    <div class="flex flex-col md:flex-row rounded-lg md:px-64 pt-3 gap-4 md:py-10">
      <div class="flex-1 flex items-center justify-center ">
        <img alt="Logo" class="w-full md:w-full h-full md:h-full" src="/rate.png"/>
      </div>
      <div class="flex-1 bg-white text-black flex  justify-center md:text-center p-6">
        <div class="flex flex-col">
          <h1 class="text-2xl md:text-2xl md:font-bold px-16">Ruang Phurh chungchang a
            zawhna leh chhana tlanglawn</h1>
          <h1 class="text-start md:text-1xl font-bold">FAQs</h1>
          <div v-if="isLoading">Loading..</div>
          <div v-else class="max-w-lg mx-auto ">
            <div v-for="(item, index) in faq" :key="index" class="border-b border-gray-200">
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
      </div>
    </div>
  </div>


</template>
<script setup>
import {onMounted, ref} from "vue";
import {userApi} from "@/base_service.js";

const faq = ref([]);
const isLoading = ref(false);

const getFaq = async () => {
  isLoading.value = true;
  const limit = 5;
  try {
    const response = await userApi.get(`/get-faq/${limit}`);

    if (response.status === 200) {
      if (response.data.status === 200) {
        faq.value = response.data.data;
        isLoading.value = false;
      } else if (response.data.status === 404) {
        isLoading.value = false;
        console.log(response.data.message);
      }
    }
    console.log(faq.value);
  } catch (e) {
    console.log(e.response?.data?.message || "Failed to fetch faq");
  }
};
const openIndex = ref(null);
const toggle = (index) => {
  console.log(index)
  openIndex.value = openIndex.value === index ? null : index;
};

onMounted(getFaq)
</script>

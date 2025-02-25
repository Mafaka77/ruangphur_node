<template>
  <div>
    <Header/> <!-- User header -->
    <main class="mx-auto bg-white h-full ">
      <router-view/>
    </main>
    <footer>
      <Footer/>

    </footer>

  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from "@/components/Footer.vue";
</script>

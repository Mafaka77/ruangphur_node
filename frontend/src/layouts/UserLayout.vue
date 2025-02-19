<template>
  <div>
    <Header/> <!-- User header -->
    <main class=" mx-auto px-4 py-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import AdminHeader from "@/components/AdminHeader.vue";
</script>

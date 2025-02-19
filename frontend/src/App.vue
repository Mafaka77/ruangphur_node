<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { Vue3Snackbar } from "vue3-snackbar";
</script>
<template>
  <RouterView />
  <vue3-snackbar bottom center :duration="4000"></vue3-snackbar>
</template>

<style scoped>
</style>

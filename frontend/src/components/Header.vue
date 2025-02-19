<template>
  <header class="bg-white">
    <nav class="w-full mx-auto px-2 py-3 flex justify-between items-center">
      <!-- Logo -->

      <img class="w-12 h-16" src="../assets/logo.svg" alt=""/>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex gap-x-6">
        <li><a href="#" class="text-gray-700 hover:text-blue-600">Home</a></li>
        <li><a href="#" class="text-gray-700 hover:text-blue-600">About</a></li>
        <li><a href="#" class="text-gray-700 hover:text-blue-600">Services</a></li>
        <li><a href="#" class="text-gray-700 hover:text-blue-600">Contact</a></li>
      </ul>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white border-t">
      <ul class="space-y-2 py-3 px-4">
        <li><a href="#" class="block text-gray-700 hover:text-blue-600">Home</a></li>
        <li><a href="#" class="block text-gray-700 hover:text-blue-600">About</a></li>
        <li><a href="#" class="block text-gray-700 hover:text-blue-600">Services</a></li>
        <li><a href="#" class="block text-gray-700 hover:text-blue-600">Contact</a></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

// Reactive state for mobile menu
const isMenuOpen = ref(false);

// Function to toggle menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>


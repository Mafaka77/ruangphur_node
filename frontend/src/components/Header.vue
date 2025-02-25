<template>
  <header class="bg-blue-100">
    <nav class="w-full mx-auto p-2 md:px-64 flex justify-between items-center">
      <!-- Logo -->

      <img alt="" class="w-32 h-12" src="/logo.png"/>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex gap-x-3">
        <li>
          <router-link
              active-class="text-red-700 border-red-700 font-semibold"
              class="px-3 py-2 border-b-2 border-transparent text-gray-700 hover:text-red-700 transition"
              exact-active-class="text-red-700 border-red-700 font-semibold"
              to="/"
          >
            Home
          </router-link>
        </li>
        <li>
          <router-link
              active-class="text-red-700 border-red-700 font-semibold"
              class="px-3 py-2 border-b-2 border-transparent text-gray-700 hover:text-red-700 transition"
              to="/dilna"
          >
            Dilna Form
          </router-link>
        </li>
        <li>
          <router-link
              active-class="text-red-700 border-red-700 font-semibold"
              class="px-3 py-2 border-b-2 border-transparent text-gray-700 hover:text-red-700 transition"
              to="/chhuina"
          >
            Bill Chhuina
          </router-link>
        </li>
        <li>
          <router-link
              active-class="text-red-700 border-red-700 font-semibold"
              class="px-3 py-2 border-b-2 border-transparent text-gray-700 hover:text-red-700 transition"
              to="/faq"
          >
            FAQs
          </router-link>
        </li>
        <li>
          <router-link
              active-class="text-red-700 border-red-700 font-semibold"
              class="px-3 py-2 border-b-2 border-transparent text-gray-700 hover:text-red-700 transition"
              to="/downloads"
          >
            Downloads
          </router-link>
        </li>
      </ul>


      <!-- Mobile Menu Button -->
      <button class="md:hidden text-gray-700" @click="toggleMenu">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16M4 12h16m-7 6h7" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"/>
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white border-t">
      <ul class="space-y-2 py-3 px-4">
        <li><a class="block text-gray-700 hover:text-blue-600" href="#">Home</a></li>
        <li><a class="block text-gray-700 hover:text-blue-600" href="#">About</a></li>
        <li><a class="block text-gray-700 hover:text-blue-600" href="#">Services</a></li>
        <li><a class="block text-gray-700 hover:text-blue-600" href="#">Contact</a></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import {ref} from 'vue';

// Reactive state for mobile menu
const isMenuOpen = ref(false);

// Function to toggle menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>


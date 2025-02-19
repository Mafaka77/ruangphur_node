<template>
  <div class="min-h-screen flex items-center justify-center ">
    <div class="bg-white dark:bg-gray-800 p-9 rounded-sm shadow-lg w-full max-w-lg">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <h2 class="text-2xl font-bold text-gray-700 dark:text-white">Welcome Back</h2>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <div class="pb-3">
          <label class="block text-gray-600 dark:text-gray-300 text-sm font-semibold mb-2">Email</label>
          <input v-model="email" type="email" placeholder="Enter your email"
                 class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                 required>
        </div>

        <div class="pb-4">
          <label class="block text-gray-600 dark:text-gray-300 text-sm font-semibold mb-2">Password</label>
          <input v-model="password" type="password" placeholder="Enter your password"
                 class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                 required>
        </div>

        <!-- Error Message -->
        <p v-if="error" class="text-red-500 text-sm mb-3">{{ error }}</p>

        <button
          type="submit"
          class="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          :disabled="useAuthStore().isLoading">
          <span v-if="useAuthStore().isLoading" class="flex items-center">
          <svg class="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full"></svg>
        </span>
          <span v-if="!useAuthStore().isLoading">Login</span>
          <span v-else>Logging in...</span>
        </button>
      </form>

      <!-- Extra Links -->
      <div class="pt-4 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Don't have an account? <a href="#" class="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";
import {useAuthStore} from "@/stores/authStore.js";
import { useRouter } from "vue-router";

import { useSnackbar } from "vue3-snackbar";
const snackbar = useSnackbar();
const router=useRouter();
const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = () => {
  if (!email.value.includes("@") || password.value.length < 6) {
    error.value = "Invalid email or password!";
  } else {
    error.value = "";
    useAuthStore().login({email:email.value, password:password.value},()=>{
      console.log("Loading");
    },(message)=>{
        snackbar.add(
          {
            text: message,
            type: "success",
          }
        );

    },(message)=>{
      snackbar.add(
        {
          text: message,
          type: "warning",
        }
      )
    });
  }
};

</script>

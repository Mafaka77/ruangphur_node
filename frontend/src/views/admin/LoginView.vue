<template>
  <div class="min-h-screen flex items-center justify-center text-black p-2">
    <div class="border dark:border-gray-300 p-9 rounded-sm  w-full max-w-lg">
      <!-- Logo -->
      <div class="flex flex-col mb-6">
        <h1 class="text-2xl font-bold ">Login</h1>
        <p>Enter your credentials to Login</p>
      </div>

      <!-- Login Pending -->
      <form @submit.prevent="handleLogin">
        <div class="py-5">
          <label class="block text-sm font-semibold mb-2">Email</label>
          <input v-model="email"
                 class="w-full px-4 py-2 border rounded-lg  dark:border-gray-600"
                 placeholder="Enter your email"
                 required
                 type="email">
        </div>

        <div class="pb-4">
          <label class="block  text-sm font-semibold mb-2">Password</label>
          <input v-model="password"
                 class="w-full px-4 py-2 border rounded-lg  dark:border-gray-600"
                 placeholder="Enter your password"
                 required
                 type="password">
        </div>

        <!-- Error Message -->
        <p v-if="error" class="text-red-500 text-sm mb-3">{{ error }}</p>

        <button
            :disabled="useAuthStore().isLoading"
            class="w-full flex items-center justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-600 disabled:bg-blue-300"
            type="submit">
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
          Don't have an account? <a class="text-blue-500 hover:underline" href="#">Sign Up</a>
        </p>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";
import {useAuthStore} from "@/stores/authStore.js";
import {useSnackbar} from "vue3-snackbar";
import router from "@/router/index.js";

const snackbar = useSnackbar();

const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = () => {
  if (!email.value.includes("@") || password.value.length < 6) {
    error.value = "Invalid email or password!";
  } else {
    error.value = "";
    useAuthStore().login({email: email.value, password: password.value}, () => {
      console.log("Loading");
    }, (message) => {

      router.replace({name: 'dashboard'});
    }, (message) => {
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

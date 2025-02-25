<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div
        v-if="adminStore.isOpen"
        ref="sidebar"
        class="bg-white shadow-lg transition-transform duration-300 ease-in-out min-h-full"
        @click.stop
    >
      <div class="flex flex-col p-2 w-72">
        <img alt="" class="w-full " src="/logo.png"/>
        <div class="pt-5"></div>
        <div class="flex flex-col justify-center items-center">
          <ul class="pt-2 w-full">
            <li class="py-2 px-2">
              <router-link
                  class="flex items-center w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded gap-2"
                  exact-active-class="bg-gray-300 text-black"
                  to="/dashboard"
              >
                <img alt="" class="w-10 h-10" src="/home.png"/>
                Dashboard
              </router-link>
            </li>
          </ul>
        </div>
        <!--        FORM-->
        <p class="text-sm">Form</p>
        <div class="flex flex-col justify-center items-center">
          <ul class="pt-2 w-full">
            <li class="py-2 px-2">
              <router-link
                  class="flex items-center w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded gap-2"
                  exact-active-class="bg-gray-300 text-black"
                  to="/pending"
              >
                <img alt="" class="w-10 h-10" src="/form.png"/>
                Incoming
              </router-link>
            </li>
            <li v-if="adminStore.getRole.includes('Manager')" class="py-2 px-2">
              <router-link
                  class="flex items-center w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded gap-2"
                  exact-active-class="bg-gray-300 text-black"
                  to="/history"
              >
                <img alt="" class="w-10 h-10" src="/form.png"/>
                My History
              </router-link>
            </li>
            <li v-if="adminStore.getRole.includes('Admin')" class="py-2 px-2">
              <router-link
                  class="flex items-center w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded gap-2"
                  exact-active-class="bg-gray-300 text-black"
                  to="/form"
              >
                <img alt="" class="w-10 h-10" src="/form.png"/>
                Verified
              </router-link>
            </li>
            <li v-if="adminStore.getRole.includes('Admin')" class="py-2 px-2">
              <router-link
                  class="flex items-center w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded gap-2"
                  exact-active-class="bg-gray-300 text-black"
                  to="/bill"
              >
                <img alt="" class="w-10 h-10" src="/bill.png"/>
                Bill pek tur
              </router-link>
            </li>
            <li v-if="adminStore.getRole.includes('Admin')" class="py-2 px-2">
              <router-link
                  class="flex items-center w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded gap-2"
                  exact-active-class="bg-gray-300 text-black"
                  to="/bill"
              >
                <img alt="" class="w-10 h-10" src="/bill.png"/>
                Deposit to Bank
              </router-link>
            </li>
            <li v-if="adminStore.getRole.includes('Admin')" class="py-2 px-2">
              <router-link
                  class="flex items-center w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded gap-2"
                  exact-active-class="bg-gray-300 text-black"
                  to="/bill"
              >
                <img alt="" class="w-10 h-10" src="/form.png"/>
                Rejected
              </router-link>
            </li>
          </ul>
        </div>
        <!--        Settings-->
        <div v-if="adminStore.getRole.includes('Admin')" class="border-t p-2"></div>
        <p v-if="adminStore.getRole.includes('Admin')">Settings</p>
        <div v-if="adminStore.getRole.includes('Admin')" class="flex flex-col justify-center items-center">
          <ul class="pt-2 w-full">
            <li class="py-2 px-2">
              <router-link
                  class="flex items-center w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded gap-2"
                  exact-active-class="bg-gray-300 text-black"
                  to="/dashboard"
              >
                <img alt="" class="w-10 h-10" src="/home.png"/>
                Post Infomation
              </router-link>
            </li>
            <li class="py-2 px-2">
              <router-link
                  class="flex items-center w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded gap-2"
                  exact-active-class="bg-gray-300 text-black"
                  to="/user"
              >
                <img alt="" class="w-10 h-10" src="/form.png"/>
                Users
              </router-link>
            </li>
            <li class="py-2 px-2">
              <router-link
                  class="flex items-center w-full  text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded gap-2"
                  exact-active-class="bg-gray-300 text-black"
                  to="/bill"
              >
                <img alt="" class="w-10 h-10" src="/bill.png"/>
                Bill pek tur
              </router-link>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-4">
      <header class="flex items-center justify-between bg-white shadow p-4">
        <button class="text-gray-600 focus:outline-none" @click="toggleSidebar">
          <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6h16M4 12h16m-7 6h7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          </svg>
        </button>
        <div class="flex items-center">
          <!--          <img alt="Logo" class="h-8 mr-2" src="logo.png"/>-->
          <button class="text-black px-4 py-2 rounded">Welcome, {{ adminStore.user.full_name }}</button>
        </div>
      </header>

      <main class="mt-4">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script setup>
import {useAdminStore} from "@/stores/adminStore.js";
import {onMounted, onUnmounted, ref} from "vue";

const adminStore = useAdminStore();
const sidebar = ref(null);

onMounted(() => {
  document.addEventListener("click", handleBodyClick);
  adminStore.getAuthUser();
});
// onBeforeMount(() => adminStore.getAuthUser())
onUnmounted(() => {
  document.removeEventListener("click", handleBodyClick);
});

const toggleSidebar = () => {
  event.stopPropagation(); // Prevent event from bubbling up
  adminStore.isOpen = !adminStore.isOpen;
};
const handleBodyClick = (event) => {
  if (adminStore.isOpen && sidebar.value && !sidebar.value.contains(event.target)) {
    adminStore.isOpen = false;
  }
};
// const handleBodyClick = (event) => {
//   if (this.isOpen && !this.$refs.sidebar.contains(event.target)) {
//     this.isOpen = false;
//   }
// };
</script>

<style scoped>
/* Add any additional styles here */
</style>

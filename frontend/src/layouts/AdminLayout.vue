<template>
  <div class="flex h-screen bg-gray-100" @click="handleBodyClick">
    <!-- Sidebar -->
    <div
      v-if="isOpen"
      ref="sidebar"
      class="bg-white shadow-lg transition-transform duration-300 ease-in-out"
      @click.stop
    >
      <div class="p-2 w-64">
        <h2 class="text-xl font-bold">Sidebar</h2>
        <ul class="pt-6">
          <li class="py-2">
            <router-link
              to="/dashboard"
              class="block w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded"
            >
             Dashboard
            </router-link>
          </li>
          <li class="py-2">
            <router-link
              to="/form/index"
              class="block w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded"
            >
              Category
            </router-link>
          </li>
          <li class="py-2">
            <router-link
              to="/link3"
              class="block w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-200 rounded"
            >
              Link 3
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-4">
      <header class="flex items-center justify-between bg-white shadow p-4">
        <button @click="toggleSidebar()"  class="text-gray-600 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <div class="flex items-center">
          <!--          <img src="logo.png" alt="Logo" class="h-8 mr-2" />-->
          <button class="bg-blue-500 text-white px-4 py-2 rounded">User </button>
        </div>
      </header>

      <main class="mt-4">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import Dashboard from "@/views/admin/Dashboard.vue";

export default {
  components: {Dashboard},
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    // handleBodyClick(event) {
    //   if (this.isOpen && !this.$refs.sidebar.contains(event.target)) {
    //     this.isOpen = false;
    //   }
    // },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>

<template>
  <div class="flex h-screen bg-gray-100" @click="handleBodyClick">
    <!-- Sidebar -->
    <div
      :class="{'translate-x-0': isOpen, '-translate-x-full': !isOpen}"
      class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50"
      @click.stop
    >
      <div class="p-4">
        <h2 class="text-xl font-bold">Sidebar</h2>
        <ul>
          <li class="py-2"><a href="#">Link 1</a></li>
          <li class="py-2"><a href="#">Link 2</a></li>
          <li class="py-2"><a href="#">Link 3</a></li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-4">
      <header class="flex items-center justify-between bg-white shadow p-4">
        <button  class="text-gray-600 focus:outline-none">
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
        <h1 class="text-2xl font-bold">Main Content Area</h1>
        <p>This is where your main content goes.</p>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    handleBodyClick(event) {
      // Check if the sidebar is open and the click is outside of it
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>

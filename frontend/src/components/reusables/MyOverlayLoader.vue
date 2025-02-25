<template>
  <div
      v-if="isLoading"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-400 z-50"
  >
    <div class="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
  </div>
</template>

<script setup>
defineProps({
  isLoading: {type: Boolean, required: true}, // Control visibility
});
</script>

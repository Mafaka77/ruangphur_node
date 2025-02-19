<template>
  <transition name="slide">
    <div
      v-if="visible"
      :class="[
        'fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white flex items-center',
        typeClasses[type]
      ]"
    >
      <span class="mr-2">{{ message }}</span>
      <button @click="closeSnackbar" class="ml-4 text-white font-bold">&times;</button>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  message: String,
  type: { type: String, default: "info" }, // success, error, warning, info
  duration: { type: Number, default: 3000 }, // Auto-close time (ms)
});

const visible = ref(false);

const typeClasses = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
};

// Show Snackbar when message changes
watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      visible.value = true;
      setTimeout(() => {
        visible.value = false;
      }, props.duration);
    }
  }
);

const closeSnackbar = () => {
  visible.value = false;
};
</script>

<style>
/* Slide-in animation */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s;
}
.slide-enter-from {
  transform: translateY(50px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
</style>

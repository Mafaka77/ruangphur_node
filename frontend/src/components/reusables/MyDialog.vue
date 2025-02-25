<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div
        v-if="modelValue"
        class="fixed inset-0  bg-opacity-200 flex justify-center items-center z-50 "
        @click.self="closeModal"
    >
      <!-- Dialog Box -->
      <transition name="fade">
        <div v-if="modelValue"
             :class="dialogSize"
             class="bg-black rounded-lg shadow-lg p-6 w-full h-40 max-w-lg text-white"
        >
          <!-- Header -->
          <div v-if="title" class="text-lg font-semibold mb-4">{{ title }}</div>

          <!-- Content -->
          <slot/>

          <!-- Footer Buttons -->
          <div v-if="!hideFooter" class="mt-4 flex justify-end space-x-2 gap-4">
            <button
                v-if="cancelText"
                class="px-4 py-2 border rounded text-white hover:bg-gray-100 transition"
                @click="closeModal"
            >
              {{ cancelText }}
            </button>
            <button
                v-if="confirmText"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                @click="confirmAction"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script setup>
import {defineEmits, defineProps} from 'vue';

const props = defineProps({
  modelValue: Boolean, // v-model for modal visibility
  title: String, // Modal title
  confirmText: String, // Confirm button text
  cancelText: String, // Cancel button text
  hideFooter: Boolean, // Hide footer buttons
  size: {type: String, default: 'md'} // Dialog size (sm, md, lg)
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const confirmAction = () => {
  emit("confirm");
  closeModal();
};

// Tailwind width classes based on size prop
const dialogSize = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
}[props.size];
</script>

<style scoped>
/* Fade Animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

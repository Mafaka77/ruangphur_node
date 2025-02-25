<template>
  <div>
    <!-- Overlay -->
    <div
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
        @click="close"
    ></div>

    <!-- Bottom Sheet -->
    <transition name="slide-up">
      <div
          v-if="isOpen"
          class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg z-50 p-4 max-h-[80vh] overflow-y-auto h-full w-full md:w-200"
      >
        <button
            class="absolute top-2 right-4 text-gray-500 hover:text-black"
            @click="close"
        >
          ✕
        </button>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Boolean, // Two-way binding
  },
  computed: {
    isOpen: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    close() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
/* Slide-up animation */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>

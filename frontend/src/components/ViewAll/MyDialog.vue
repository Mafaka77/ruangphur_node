<template>
  <Teleport to="body">
    <div
        v-if="isOpen"
        class="fixed inset-0 flex items-center p-6 justify-center bg-gray-900 bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <!-- Modal Header -->
        <div class="flex justify-between items-center border-b pb-2">
          <h2 class="text-xl font-semibold">{{ title }}</h2>
          <button @click="closeModal">
            <font-awesome-icon :icon="['fas', 'times']" class="text-gray-600 hover:text-gray-800"/>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="py-4">
          <slot></slot>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end gap-2 border-t pt-2">
          <button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" @click="closeModal">
            Cancel
          </button>
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" @click="confirmAction">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {defineEmits, defineProps} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

defineProps({
  isOpen: Boolean,
  title: String,
});

const emit = defineEmits(["close", "confirm"]);

const closeModal = () => emit("close");
const confirmAction = () => emit("confirm");
</script>

<style scoped>
/* Additional styles if needed */
</style>

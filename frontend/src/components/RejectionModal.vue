<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>

      <!-- Input Field -->
      <textarea
          v-model="inputValue"
          class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 h-50"
          placeholder="Enter something..."
          rows="4"
      />

      <!-- Buttons -->
      <div class="flex justify-end mt-4 gap-2">
        <button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" @click="closeModal">
          Back
        </button>
        <button class="px-4 py-2 pt-5 bg-blue-500 text-white rounded hover:bg-blue-600" @click="confirm">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineEmits, defineProps, ref} from "vue";

const props = defineProps({
  isOpen: Boolean, // Control modal visibility
  title: String,   // Modal title
});

const emit = defineEmits(["close", "confirm"]);

const inputValue = ref(""); // Store input value

const closeModal = () => {
  emit("close");
};

const confirm = () => {
  emit("confirm", inputValue.value);
};
</script>

<template>
  <div class="relative w-full">
    <!-- Label -->
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Hidden File Input -->
    <input
        :id="id"
        ref="fileInput"
        :accept="accept"
        class="hidden"
        type="file"
        @change="handleFileUpload"
    />

    <!-- Clickable File Upload Box -->
    <div
        class="mt-1 flex items-center border border-gray-300 rounded-md px-3 py-2 relative cursor-pointer"
        @click="triggerFileInput"
    >
      <input
          :id="id"
          v-model="inputValue"
          :class="{ 'border-red-500': error }"
          class="mt-1 block w-full border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          @input="$emit('update:inputValue', $event.target.value)"
      />
      <button
          class="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          type="button"
      >
        📁
      </button>
    </div>

    <!-- Validation Message -->
    <p v-if="errorMessage" class="text-red-500 text-sm mt-1">
      {{ errorMessage }}
    </p>
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useSnackbar} from "vue3-snackbar";

const snackbar = useSnackbar();
const props = defineProps({
  modelValue: String,
  id: {
    type: String,
    required: true,
  },
  label: String,
  accept: {
    type: String,
    default: "image/*", // Accept only images by default
  },
  required: {
    type: Boolean,
    default: false,
  },
  uploadUrl: {
    type: String,
    required: true, // The API endpoint for file upload
  },
});

const emit = defineEmits(["update:modelValue"]);
const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value)
});
const fileInput = ref(null);
const fileUrl = ref("");
const errorMessage = ref("");

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  if (props.required && !file) {
    errorMessage.value = "This field is required.";
    return;
  }

  if (file) {
    errorMessage.value = "";
    await uploadFile(file);
  }
};

const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch('http://localhost:5001/api/upload-file', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      snackbar.add({
        text: 'File upload failed',
        type: 'warning',
      });
      throw new Error("File upload failed");
    }

    const data = await response.json();
    fileUrl.value = data.url; // Assuming the server responds with { url: "uploaded_file_url" }
    snackbar.add({
      text: 'File uploaded successfully',
      type: 'success',
    });
    emit("update:modelValue", fileUrl.value);
  } catch (error) {
    errorMessage.value = "Upload failed. Please try again.";
  }
};
const error = computed(() => {
  if (props.required && !props.modelValue) {
    return "This field is required.";
  }
  return "";
});
</script>

<style scoped>
/* Optional: Additional styling */
</style>

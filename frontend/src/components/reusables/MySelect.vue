<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Select Dropdown -->
    <select
        :id="id"
        v-model="selectedValue"
        :class="{ 'border-red-500': error }"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        @change="handleChange"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option._id" :value="option._id">
        {{ option.name }}
      </option>
    </select>

    <!-- Error Message -->
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import {computed, defineEmits, defineProps} from "vue";

// Props
const props = defineProps({
  modelValue: [String, Object], // Supports both string (ID) and object
  label: String,
  placeholder: {type: String, default: "Select an option"},
  options: {type: Array, required: true}, // Expected format: [{ _id: '1', name: 'Role 1' }]
  error: String,
  id: String,
  required: {type: Boolean, default: false},
});

// Emits
const emit = defineEmits(["update:modelValue", "onChange"]);

// Computed Property for Two-Way Binding
const selectedValue = computed({
  get: () => (typeof props.modelValue === "object" ? props.modelValue?._id : props.modelValue),
  set: (value) => {
    const selectedOption = props.options.find(option => option._id === value);
    emit("update:modelValue", selectedOption ? selectedOption : value);
  },
});

// Handle Select Change
const handleChange = (event) => {
  const newValue = event.target.value;
  const selectedOption = props.options.find(option => option._id === newValue);
  emit("update:modelValue", selectedOption); // Emit full object
  emit("onChange", selectedOption); // Custom event for additional actions
};

// Validation Error Handling
const error = computed(() => {
  if (props.required && !props.modelValue) {
    return "This field is required.";
  }
  return "";
});
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Input Field -->
    <input
        :id="id"
        v-model="inputValue"
        :class="{ 'border-red-500': error }"
        :placeholder="placeholder"
        :type="type"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        @input="$emit('update:inputValue', $event.target.value)"
    />

    <!-- Error Message -->
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import {computed, defineEmits, defineProps} from "vue";

// Props
const props = defineProps({
  modelValue: String,
  label: String,
  type: {type: String, default: "text"},
  placeholder: String,
  error: String,
  id: String,
  required: {type: Boolean, default: false},
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Computed Property for Two-Way Binding
const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value)
});
const error = computed(() => {
  if (props.required && !props.modelValue) {
    return "This field is required.";
  }
  return "";
});
</script>

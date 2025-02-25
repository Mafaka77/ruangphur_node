<template>
  <div class="relative w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
        :id="id"
        v-model="dateValue"
        :class="error ? 'border-red-500' : 'border-gray-300'"
        :max="maxDate"
        :placeholder="placeholder"
        class="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        type="date"
        @blur="validate"
        @input="updateValue"
    />
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    modelValue: String, // Expected format: "YYYY-MM-DD"
    placeholder: {
      type: String,
      default: "Select a date..."
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      maxDate: this.getCurrentDate(),
      error: ""
    };
  },
  computed: {
    dateValue: {
      get() {
        return this.modelValue || "";
      },
      set(value) {
        this.$emit("update:modelValue", value);
        this.validate(); // Validate on input change
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
      this.validate();
    },
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    validate() {
      if (this.required && !this.modelValue) {
        this.error = "This field is required.";
      } else {
        this.error = "";
      }
    }
  }
};
</script>

<style scoped>
/* Optional: Add styling */
</style>

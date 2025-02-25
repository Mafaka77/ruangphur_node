<template>
  <div class="relative w-full">
    <!-- Label -->
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Date/Time Input -->
    <input
        :id="id"
        v-model="dateTimeValue"
        :class="error ? 'border-red-500' : 'border-gray-300'"
        :max="maxDateTime"
        :placeholder="placeholder"
        :type="type || 'datetime-local'"
        class="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        @blur="validate"
        @input="updateValue"
    />

    <!-- Error Message -->
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "dateTimeInput",
    },
    type: {
      type: String,
      default: "datetime-local", // Can be "date", "time", or "datetime-local"
    },
    label: String,
    modelValue: String, // Format: "YYYY-MM-DDTHH:MM"
    placeholder: {
      type: String,
      default: "Select date and time...",
    },
    required: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      maxDateTime: this.getCurrentDateTime(),
      error: "",
    };
  },
  computed: {
    dateTimeValue: {
      get() {
        return this.modelValue || "";
      },
      set(value) {
        this.$emit("update:modelValue", value);
        this.validate();
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
      this.validate();
    },
    getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
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
/* Optional: Customize styling */
</style>

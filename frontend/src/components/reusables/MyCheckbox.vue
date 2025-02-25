<template>
  <div class="flex items-center">
    <input
        :id="id"
        v-model="checkboxValue"
        :required="required"
        class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        type="checkbox"
    />
    <label :for="id" class="ml-2 text-sm text-gray-700">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checkboxValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    }
  }
};
</script>

<style scoped>
/* Optional: Additional Styling */
</style>

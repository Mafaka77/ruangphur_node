<template>
  <div
      class="flex flex-row items-center bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm font-medium">
    <span>{{ label }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {type: String, required: true},
    removable: {type: Boolean, default: false}
  }
};
</script>

<style scoped>
/* Optional custom styles */
</style>

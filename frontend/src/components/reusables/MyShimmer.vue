<template>
  <div class="animate-pulse space-y-3">
    <div
        v-for="i in count"
        :key="i"
        :class="shapeClass"
        class="bg-gray-300 rounded-md w-full"
    ></div>
  </div>
</template>

<script setup>
import {computed} from "vue";

// Props to control size, shape, and count
const props = defineProps({
  count: {type: Number, default: 3}, // Number of shimmer items
  width: {type: String, default: "w-full"}, // Width class
  height: {type: String, default: "h-4"}, // Height class
  rounded: {type: String, default: "rounded-md"}, // Border radius
});

// Computed class for shape customization
const shapeClass = computed(() => `${props.width} ${props.height} ${props.rounded} bg-gray-300`);
</script>

<style scoped>
/* Tailwind's animate-pulse handles animation */
</style>

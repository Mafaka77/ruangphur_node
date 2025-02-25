<template>
  <button
      class="flex items-center gap-2 px-4 py-2  hover:bg-gray-300 text-gray-800 font-semibold transition duration-200 ease-in-out"
      @click="handleClick"
  >
    <img v-if="iconSrc" :src="iconSrc" alt="icon" class="w-5 h-5"/>
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  label: {type: String, default: 'Back'}, // Custom button label
  iconSrc: {type: String, required: true}, // Dynamic icon image source
  onClick: {type: Function, required: true} // Dynamic click function
});

const handleClick = () => {
  if (props.onClick) props.onClick();
};
</script>

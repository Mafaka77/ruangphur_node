<template>
  <button
      :class="[
      'relative flex items-center justify-center px-6 py-2 rounded font-medium transition-all',
      loading ? 'bg-gray-400 cursor-not-allowed' : bgColor,
      loading ? 'hover:bg-gray-400' : hoverColor,
      textColor,
    ]"
      :disabled="loading"
      :type="type"
      @click="handleClick"
  >
    <!-- Button Text (Hidden when loading) -->
    <span v-if="!loading">{{ label }}</span>

    <!-- Circular Loader -->
    <svg
        v-if="loading"
        class="absolute w-6 h-6 animate-spin text-white"
        fill="none"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
    >
      <circle
          class="opacity-25"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          stroke-width="5"
      />
      <path
          class="opacity-75"
          d="M25 5a20 20 0 00-20 20h5a15 15 0 0115-15V5z"
          fill="currentColor"
      />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Submit",
    },
    loading: {
      type: Boolean,
      required: true,
    },
    bgColor: {
      type: String,
      default: "bg-blue-500",
    },
    hoverColor: {
      type: String,
      default: "hover:bg-blue-600",
    },
    textColor: {
      type: String,
      default: "text-white",
    },
    type: {
      type: String,
    }
  },
  methods: {
    handleClick() {
      if (!this.loading) {
        this.$emit("click");
      }
    },
  },
};
</script>

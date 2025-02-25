<template>
  <div class="relative w-full">
    <input
        v-model="search"
        :placeholder="placeholder"
        class="w-full p-2 border rounded-md"
        type="text"
        @blur="hideDropdown"
        @focus="showDropdown = true"
    />
    <ul v-if="showDropdown" class="absolute w-full border bg-white shadow-lg max-h-48 overflow-y-auto mt-1">
      <li
          v-for="option in filteredOptions"
          :key="option.name"
          class="p-2 hover:bg-gray-200 cursor-pointer"
          @mousedown.prevent="selectOption(option)"
      >
        {{ option._id }}
      </li>
      <li v-if="filteredOptions.length === 0" class="p-2 text-gray-500">
        No results found
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: [String, Number],
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: "Select an option..."
    }
  },
  data() {
    return {
      search: "",
      showDropdown: false
    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter((option) =>
          option.label.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    selectOption(option) {
      this.$emit("update:modelValue", option.value);
      this.search = option.label; // Show selected option in input
      this.showDropdown = false;
    },
    hideDropdown() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 200); // Delay to allow click event to register
    }
  }
};
</script>

<style scoped>
/* Optional: Add styling as needed */
</style>

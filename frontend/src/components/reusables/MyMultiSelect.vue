<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>

    <!-- Select Box -->
    <!-- Select Box -->
    <div
        :class="{'border-red-500': error}"
        class="w-full border rounded-lg px-3 py-2 flex items-center bg-transparent cursor-pointer min-h-[40px] justify-between"
        @click="toggleDropdown"
    >
      <!-- Left Side (Selected Items / Placeholder) -->
      <div class="flex flex-wrap gap-1 flex-grow">
        <template v-if="selectedOptions.length > 0">
          <div
              v-for="option in selectedOptions"
              :key="option._id"
              class="flex items-center bg-blue-500 text-white px-2 py-1 rounded-full text-sm"
          >
            {{ option.name }}
            <button class="ml-2 text-white" @click.stop="removeOption(option)">
              ❌
            </button>
          </div>
        </template>

        <!-- Placeholder (Only Shows if No Items Selected) -->
        <span v-else class="text-gray-500">{{ placeholder }}</span>
      </div>

      <!-- Right Side (Dropdown Arrow - Stays Fixed) -->
      <div class="ml-auto">
        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </div>
    </div>


    <!-- Dropdown -->
    <div v-if="isOpen" class="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
      <ul class="max-h-40 overflow-auto">
        <li
            v-for="option in options"
            :key="option._id"
            class="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            @click="toggleSelection(option)"
        >
          <input v-if="multiple" :checked="isSelected(option)" class="h-4 w-4 text-blue-600 border-gray-300 rounded"
                 type="checkbox"/>
          <span>{{ option.name }}</span>
        </li>
      </ul>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
  </div>
</template>

<script>
import {ref, watch} from "vue";

export default {
  props: {
    modelValue: [Array, Object, String],
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  setup(props, {emit}) {
    const isOpen = ref(false);
    const selectedOptions = ref([]);

    // **Watch for changes in `modelValue`**
    watch(
        () => props.modelValue,
        (newValue) => {
          if (props.multiple) {
            selectedOptions.value = Array.isArray(newValue)
                ? props.options.filter(opt => newValue.some(v => v._id === opt._id))
                : [];
          } else {
            selectedOptions.value = Array.isArray(newValue)
                ? props.options.filter(opt => newValue.some(v => v._id === opt._id))
                : [];
          }
        },
        {immediate: true}
    );

    // **Toggle dropdown**
    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    // **Select/Deselect options**
    const toggleSelection = (option) => {
      if (props.multiple) {
        if (isSelected(option)) {
          selectedOptions.value = selectedOptions.value.filter(o => o._id !== option._id);
        } else {
          selectedOptions.value.push(option);
        }
      } else {
        selectedOptions.value = [option];
        isOpen.value = false;
      }

      emit("update:modelValue", props.multiple ? selectedOptions.value : selectedOptions.value[0]?._id);
    };

    // **Remove Selected Option**
    const removeOption = (option) => {
      selectedOptions.value = selectedOptions.value.filter(o => o._id !== option._id);
      emit("update:modelValue", props.multiple ? selectedOptions.value : null);
    };

    // **Check if option is selected**
    const isSelected = (option) => {
      return selectedOptions.value.some(o => o._id === option._id);
    };

    return {
      isOpen,
      selectedOptions,
      toggleDropdown,
      toggleSelection,
      removeOption,
      isSelected
    };
  }
};
</script>

<style scoped>
/* Custom Scrollbar */
.max-h-40::-webkit-scrollbar {
  width: 5px;
}

.max-h-40::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 5px;
}

.max-h-40::-webkit-scrollbar-track {
  background: #f1f5f9;
}
</style>

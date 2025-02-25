<template>
  <div class="flex space-x-2 gap-4 justify-center">
    <input
        v-for="(digit, index) in otp"
        :key="index"
        ref="otpFields"
        v-model="otp[index]"
        class="w-12 h-12 text-center border rounded-md text-lg focus:ring-indigo-500 focus:border-indigo-500"
        maxlength="1"
        type="text"
        @input="handleInput($event, index)"
        @keydown.delete="handleDelete(index)"
    />
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  emits: ["update:modelValue", "complete"],
  setup(_, {emit}) {
    const otp = ref(["", "", "", ""]);
    const otpFields = ref([]);

    const handleInput = (event, index) => {
      const value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
      otp.value[index] = value;

      if (value && index < 3) {
        otpFields.value[index + 1].focus(); // Move to the next input
      }

      if (otp.value.join("").length === 4) {
        emit("complete", otp.value.join("")); // Emit OTP when completed
      }

      emit("update:modelValue", otp.value.join(""));
    };

    const handleDelete = (index) => {
      if (!otp.value[index] && index > 0) {
        otpFields.value[index - 1].focus(); // Move focus back
      }
    };

    return {
      otp,
      otpFields,
      handleInput,
      handleDelete,
    };
  },
};
</script>

<style scoped>
input {
  font-size: 1.5rem;
  text-align: center;
}
</style>

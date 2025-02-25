<template>
  <div class="flex items-center space-x-2">
    <span v-if="timeLeft > 0" class="text-gray-700 font-semibold">
      Resend OTP in: <span class="text-blue-500">{{ formattedTime }}</span>
    </span>
    <button
        v-else
        class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        @click="restartTimer"
    >
      Resend OTP
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeLeft: 300, // 5 minutes (300 seconds)
      timer: null,
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
  },
  methods: {
    startCountdown() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    restartTimer() {
      this.timeLeft = 300;
      this.startCountdown();
      // Emit an event to trigger OTP resend
      this.$emit("resend-otp");
    },
  },
  mounted() {
    this.startCountdown();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

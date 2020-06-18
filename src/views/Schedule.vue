<template>
  <div class="schedule-wrap">
    <code class="message"
      >This feature <code class="feature-item">{{ name }}</code> is under
      development. Coming soon!</code
    >
    <GearSpinner class="spinner"></GearSpinner>
  </div>
</template>
<script>
  import GearSpinner from '@/components/globals/GearSpinner'
  export default {
    props: {
      name: {
        type: String,
      },
    },
    components: {
      GearSpinner,
    },
  }
</script>
<style scoped>
  .schedule-wrap {
    @apply pt-32 text-center;
    .feature-item {
      @apply rounded p-2 text-gray-700 gradient-btn;
      font-size: 12px;
      color: #24292e;
    }
    .message {
      @apply block mt-4 leading-8 color-primary;
    }
  }
</style>

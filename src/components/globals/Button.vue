<template>
  <button :class="isImportant ? 'important' : 'normal'">
    {{ text }}
  </button>
</template>

<script>
  export default {
    props: {
      btnType: {
        type: String,
      },
      isImportant: {
        type: Boolean,
      },
      text: {
        type: String,
        required: true,
      },
    },
  }
</script>
<style scoped>
  button {
    @apply rounded py-2 px-4;
  }
  .normal {
    @apply bg-gray-300 text-gray-600;
  }
  .important {
    @apply text-white px-6 bg-primary;
    &:hover {
      @apply bg-primary-light;
    }
    &:active {
      @apply bg-primary-dark;
    }
  }
</style>

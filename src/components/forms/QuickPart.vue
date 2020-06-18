<template>
  <div class="quick-part" :class="isSelected ? 'selected' : 'idle'">
    <icon :icon="icon" />
    <span>{{ label }}</span>
  </div>
</template>
<script>
  export default {
    computed: {
      isSelected: function() {
        return this.selected
      },
    },
    props: {
      icon: {
        required: true,
        type: Array,
      },
      label: {
        required: true,
        type: String,
      },
      selected: {
        type: Boolean,
      },
    },
  }
</script>
<style scoped>
  .quick-part {
    @apply cursor-pointer rounded-md p-2 mr-2 mb-2;
    line-height: 20px;
    font-size: 18px;

    span {
      margin-left: 5px;
      font-size: 15px;
    }
  }
  .idle {
    @apply bg-gray-300;
  }
  .selected {
    @apply text-white bg-teal;
  }
</style>

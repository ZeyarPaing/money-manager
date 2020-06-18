<template>
  <li
    :class="itemInfo.isActive ? 'active' : 'idle'"
    :id="itemInfo.priority ? 'priority' : ''"
    @click="navigateTo(`${itemInfo.link}`)"
  >
    <icon class="size-big" :icon="itemInfo.icon" /><br />{{ itemInfo.name }}
  </li>
</template>
<script>
  export default {
    props: {
      itemInfo: {
        type: Object,
        required: true,
      },
    },
    methods: {
      navigateTo: function(link) {
        this.$router.history.current.path === link
          ? null
          : this.$router.push(link)
      },
    },
  }
</script>
<style scoped>
  #priority {
    @apply text-white bg-primary;

    &:hover {
      @apply bg-primary-light;
    }
    &:active {
      @apply bg-primary-dark;
    }
  }

  li {
    @apply text-gray-500;
    text-align: center;
    display: inline;
    cursor: pointer;
    font-size: 10px;
    padding: 13px 4.1% !important;

    .size-big {
      font-size: 25px;
      margin-bottom: 0px;
    }
  }
  .active {
    @apply color-primary;
  }
</style>

<template>
  <label :for="label">
    {{ label }}
    <input v-bind="$attrs" :value="value" v-on="listeners" />
  </label>
</template>

<script>
  export default {
    name: 'BaseInput',
    inheritAttrs: false,
    props: {
      value: { required: true },
      label: {
        type: String,
        default: '',
      },
    },
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: event => this.$emit('input', event.target.value),
        }
      },
    },
  }
</script>

<style scoped>
  label {
    @apply text-sm;
  }

  input {
    @apply outline-none ml-2 px-4 py-2 border rounded;

    &:focus {
      @apply border-2 border-teal-300;
    }
  }
</style>

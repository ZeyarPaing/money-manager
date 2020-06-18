<template>
  <div>
    <p>{{ name }}</p>
    <BaseInput
      label="Your Name"
      placeholder="eg.Greg Anderson"
      v-model.lazy="name"
    />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name: 'NormalComponent',
    computed: {
      name: {
        get() {
          return this.$store.state.auth.name
        },
        set(newName) {
          this.changeName(newName)
        },
      },
    },
    methods: {
      ...mapMutations({
        changeName: 'auth/SET_NAME',
      }),
    },
  }
</script>

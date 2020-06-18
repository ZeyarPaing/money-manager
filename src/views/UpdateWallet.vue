<template>
  <WalletForm :edit_wallet_props="currentInfo"></WalletForm>
</template>

<script>
  import WalletForm from '@/components/forms/WalletForm'
  export default {
    data() {
      return {
        //currentInfo: null,
      }
    },
    props: {
      currentInfo: {
        type: Object,
      },
    },
    components: {
      WalletForm,
    },
  }
</script>

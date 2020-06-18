<template>
  <section
    class="history-wrap grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
  >
    <LoadSpinner v-if="loading"> </LoadSpinner>
    <div
      v-if="histories && histories.length <= 0"
      class="text-center text-gray-600"
    >
      No history yet.
    </div>
    <History
      v-for="history in histories"
      :key="history._id"
      :history="history"
    ></History>
  </section>
</template>

<script>
  import History from '@/components/transation/History.vue'
  import LoadSpinner from '@/components/globals/LoadSpinner'
  export default {
    data() {
      return {
        histories: null,
        loading: false,
      }
    },
    created() {
      this.loading = true
      this.$store
        .dispatch('auth/getHistory')
        .then(res => {
          //console.log(res.data)
          this.loading = false
          this.histories = res.data
          let reversedHistories = []
          for (let i = this.histories.length - 1; i >= 0; i--) {
            reversedHistories.push(this.histories[i])
          }
          this.histories = reversedHistories
          console.log('created -> reversedHistories', reversedHistories)
        })
        .catch(err => console.error(err))
    },
    components: {
      History,
      LoadSpinner,
    },
  }
</script>

<style scoped>
  .history-wrap {
    @apply py-16;

    .loading-spinner {
      @apply text-center;
      .lds-ripple {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }
      .lds-ripple div {
        position: absolute;
        border: 4px solid rgb(30, 110, 201);
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      }
      .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
      }
      @keyframes lds-ripple {
        0% {
          top: 36px;
          left: 36px;
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          top: 0px;
          left: 0px;
          width: 72px;
          height: 72px;
          opacity: 0;
        }
      }
    }
  }
  @media (min-width: 768px) {
    .history-wrap {
      @apply py-16;
    }
  }
</style>

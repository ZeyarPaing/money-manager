<template>
  <section class="wallet" :style="{ backgroundColor: `#${walletInfo.color}` }">
    <header>
      {{ walletInfo.name }}
    </header>
    <div class="type">
      {{ walletInfo.type }}
    </div>
    <div class="amount">
      {{ walletInfo.amount }} <u>{{ currencyUnit }}</u>
    </div>
    <div class="owners" v-if="isExpanded">
      <p class="description">{{ walletInfo.description }}</p>
      <div v-if="walletInfo.type.toLowerCase() === 'shared'">
        <h3>Shared users</h3>
        <div class="user-group">
          <div
            class="shared-user"
            v-for="(user, index) in walletInfo.owners"
            :key="index"
          >
            {{ user.name }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      walletInfo: {
        required: true,
        type: Object,
      },
      isExpanded: {
        type: Boolean,
        required: true,
      },
      currencyUnit: {
        type: String,
      },
    },
    methods: {},
  }
</script>
<style scoped>
  .wallet {
    @apply text-white rounded py-2 px-4 cursor-pointer shadow-md;
    overflow: auto;
    clear: both;
    header {
      @apply font-bold mb-1;
      font-size: 25px;
    }
    .type {
      @apply rounded w-16 text-center;
      background-color: rgba(255, 255, 255, 0.3);
    }
    .amount {
      @apply font-bold;
      font-size: 25px;

      u {
        text-decoration: none;
        font-size: 15px;
        font-weight: normal;
      }
    }
    .owners {
      h3 {
        @apply font-bold;
        font-size: 18px;
      }
      .user-group {
        div {
          @apply float-left;
          background-color: rgba(0, 0, 0, 0.137);

          margin: 3px 3px 0px 0px;
          padding: 2px 8px;
          border-radius: 5px;
        }
      }
    }
  }
  @media (max-width: 768px) {
    .wallet {
      margin: 0.5rem 0;
    }
  }
  @media (min-width: 768px) {
    .wallet {
      margin: 0.5rem;
    }
  }
</style>

<template>
  <div class="wrapp">
    <div
      v-if="history.type === 'income' || history.type === 'expense'"
      class="history"
    >
      <div class="viral" :class="`${history.type}`">
        <p class="type">{{ history.type }}</p>
        <p class="amount">{{ Math.abs(history.amount) }}</p>
      </div>
      <table class="data-table">
        <tr>
          <td><span class="type-icon">By</span></td>
          <td>{{ history.creator && history.creator.name }}</td>
        </tr>
        <tr>
          <td><span class="type-icon">Wallet</span></td>
          <td>
            {{ history.wallet && history.wallet.name
            }}<span class="type-icon">({{ history.wallet.type }})</span>
          </td>
        </tr>

        <tr>
          <td><span class="type-icon">Time</span></td>
          <td>
            {{ createdDate.toLocaleString('en-GB') }} ({{
              createdDate.toLocaleString('en-us', { weekday: 'long' })
            }})
          </td>
        </tr>
        <tr>
          <td>
            <p class="issue-part" v-if="history.issueParts">
              <span class="type-icon" v-if="history.type === 'expense'"
                >For</span
              >
              <span class="type-icon" v-else>From</span>
            </p>
          </td>
          <td>{{ history.issueParts.join(', ') }}</td>
        </tr>
        <tr v-if="history.notes">
          <td><span class="type-icon">Notes</span></td>
          <td>{{ history.notes }}</td>
        </tr>
      </table>

      <!-- <p class="wallet">
        <span class="info">Wallet</span>{{ history.wallet.name
        }}<span class="type-icon">({{ history.wallet.type }})</span>
      </p>
      <p class="creator">
        <span class="info">By</span>{{ history.creator.name }}
      </p>
      <p class="time">
        <span class="info">Time</span>
        {{ createdDate.toLocaleString('en-GB') }}
        ({{ createdDate.toLocaleString('en-us', { weekday: 'long' }) }})
      </p>
      <p class="issue-part" v-if="history.issueParts">
        <span class="info" v-if="history.type === 'expense'">For</span>
        <span class="info" v-else>From</span>
        {{ history.issueParts.join(', ') }}
      </p>
      <p class="notes" v-if="history.notes">
        <span class="info">Notes</span>
        {{ history.notes }}
      </p> -->
    </div>
    <div v-else class="util history">
      <p class="creator">
        {{ renderUserName(history.creator && history.creator.name)
        }}<span class="info" :class="`${history.type}`">
          {{ history.type }}d</span
        >
        <span v-if="history.type === 'delete'">
          {{ history.deletedWallet && history.deletedWallet.name }}
          <span class="type-icon">({{ history.deletedWallet.type }})</span>
        </span>
        <span v-else>
          {{ history.wallet && history.wallet.name
          }}<span class="type-icon">({{ history.wallet.type }})</span>
        </span>
      </p>
      <p class="time">
        <span class="info">At</span>
        {{ createdDate.toLocaleString('en-GB') }}
        ({{ createdDate.toLocaleString('en-us', { weekday: 'long' }) }})
      </p>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        createdDate: new Date(this.$props.history.time),
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/authUser',
      }),
    },
    props: {
      history: {
        type: Object,
        required: true,
      },
    },
    methods: {
      renderUserName: function(historyCreator) {
        if (this.user.name === historyCreator) {
          return 'You'
        }
        return historyCreator
      },
    },
  }
</script>
<style scoped>
  .expense,
  .delete {
    color: rgb(235, 69, 69);
  }
  .income,
  .create {
    color: rgb(0, 167, 117);
  }
  .update {
    color: rgb(216, 154, 22);
  }
  .history {
    @apply bg-white text-gray-400 rounded p-4 shadow-md my-1;
    /* box-shadow: 0px 2px 10px rgba(170, 170, 170, 0.5); */
    color: #333 !important;

    .data-table {
      font-weight: bold;
      margin: 0 auto;

      tr {
        td {
          @apply px-2 py-1;
        }
      }
    }

    .viral {
      @apply text-center;
      .amount {
        @apply font-bold;
        font-size: 1.6rem;
      }
    }
    .type-icon {
      @apply font-light;
      font-size: 14px;
      margin-bottom: -2px;
    }
    .info {
      font-weight: 700;
    }
    p {
      @apply my-1;
      font-weight: 500;
      font-size: 14px;
    }
  }
  @media (min-width: 768px) {
    .history {
      @apply text-white rounded py-2 px-4 shadow-md m-2;
    }
  }
</style>

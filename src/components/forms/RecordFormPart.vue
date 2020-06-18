<template>
  <form class="form-body" @keydown.enter.prevent="">
    <div class="amount">
      <h2>Amount</h2>
      <input
        v-model="models[`${type}Amount`]"
        type="number"
        placeholder="eg. 5000"
        min="0"
      />
    </div>
    <div class="wallet-select">
      <h2>From</h2>
      <select name="wallet" id="wallet" v-model="models.targetWallet">
        <option disabled selected>Select a wallet</option>
        <option
          v-for="wallet in wallets"
          :key="wallet.name"
          :value="wallet.name"
          >{{ wallet.name }}</option
        >
      </select>
    </div>
    <h2>{{ causeTitle }}</h2>
    <div class="quick-parts">
      <QuickPart
        class="part idle"
        v-for="part in issueParts[`${type}`]"
        :selected="part.selected"
        :key="part.label"
        @click.native="addToList(part)"
        :icon="part.icon"
        :label="part.label"
      ></QuickPart>
      <QuickPart
        class="part"
        :class="otherPartInput ? 'selected' : 'idle'"
        :icon="['fas', 'home']"
        :label="'Other'"
        :selected="otherPartInput"
        @click.native="otherPartInput = !otherPartInput"
      ></QuickPart>
    </div>
    <div class="other-part">
      <input
        type="text"
        v-if="otherPartInput"
        v-model="models.otherPart"
        placeholder="Other"
      />
    </div>
    <div class="summary" v-if="models[`${type}List`].length > 0">
      <p>
        {{ summarize(`${type}`) }}
      </p>
    </div>
    <div class="additional">
      <h2>Additional Notes</h2>
      <textarea
        type="text"
        v-model="models.notes"
        placeholder="Add additional notes ..."
      />
    </div>
    <div class="submit">
      <button type="button" class="cancel" @click="$router.go(-1)">
        Cancel
      </button>
      <button type="submit" class="ok" @click.prevent="log()">
        Make Record
      </button>
    </div>
  </form>
</template>

<script>
  import QuickPart from '@/components/forms/QuickPart'
  //import data from '@/common/mock.data'
  import axios from 'axios'
  export default {
    props: {
      type: {
        required: true,
      },
      models: {
        type: Object,
        required: true,
      },
      wallets: {
        required: true,
      },
      causeTitle: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        otherPartInput: true,
        issueParts: { expense: [], income: [] },
      }
    },
    components: {
      QuickPart,
    },
    created: function() {
      axios.get('/api/v1/issue/expense').then(res => {
        this.issueParts.expense = res.data
      })
      axios.get('/api/v1/issue/income').then(res => {
        this.issueParts.income = res.data
      })
      this.$store
        .dispatch('auth/getUserWallets')
        .then(res => {
          //('Responed wallets', res.data)
          this.wallets = res.data
        })
        .catch(err => console.error(err))
    },
    mounted: function() {
      let parts = this.$children
      for (let i = 0, len = parts.length; i < len; i++) {
        if (parts[i].selected && parts[i].label !== 'Other') {
          this.expenseList.push(parts[i].label)
        }
      }
    },
    methods: {
      log: function() {},
      detectParts: function() {
        let parts = this.$children
        for (let i = 0, len = parts.length; i < len; i++) {
          //USE -2 to exclude Other Part
          if (
            parts[i].selected &&
            this.incomeList.indexOf(parts[i].label) === -1 &&
            parts[i].label !== 'Other'
          ) {
            this.incomeList.push(parts[i].label)
          }
        }
      },
      addToList: function(part) {
        let targetList = ''
        if (this.isExpense) {
          targetList = 'expenseList'
        } else {
          targetList = 'incomeList'
        }
        if (part.selected) {
          this[targetList].splice(this.expenseList.indexOf(part.label), 1)
        } else {
          this[targetList].push(part.label)
        }
        part.selected = !part.selected
      },
      summarize: function(type) {
        let wallet = this.data.wallets[this.targetWallet] || ''
        let amount = this[type + 'Amount']
        let items = this[type + 'List'] ? this[type + 'List'].join(', ') : ' '
        if (this.otherPart) {
          items += ', ' + this.otherPart
        }
        if (type === 'expense') {
          if (wallet) {
            return `Expense ${amount} for ${items} from ${wallet.name}.`
          }
          return `Expense ${amount} for ${items}.`
        } else {
          if (wallet) {
            return `Income ${amount} from ${items} to ${wallet.name}.`
          }
          return `Income ${amount} from ${items}.`
        }
      },
    },
  }
</script>

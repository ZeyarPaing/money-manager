<template>
  <div class="record-form" :style="{ height: `${formHeight}` }" ref="recForm">
    <div class="header grid grid-cols-2">
      <div :class="isExpense ? 'active' : 'disable'" @click="setExpense(true)">
        Expense
      </div>
      <div :class="isExpense ? 'disable' : 'active'" @click="setExpense(false)">
        Income
      </div>
    </div>
    <transition name="slide-fade">
      <form class="form-body" v-if="isExpense" @keydown.enter.prevent="log()">
        <div class="amount">
          <h2>Amount</h2>
          <input
            v-model="expenseAmount"
            type="number"
            placeholder="eg. 5000"
            min="0"
          />
        </div>
        <div class="wallet-select">
          <h2>From</h2>
          <select
            name="wallet"
            id="wallet"
            v-model="targetWallet"
            @change="log()"
          >
            <option disabled selected>Select a wallet</option>
            <option
              v-for="wallet in wallets"
              :key="wallet._id"
              :value="wallet"
              >{{ wallet.name }}</option
            >
          </select>
        </div>
        <h2>Expense for</h2>
        <div class="quick-parts">
          <QuickPart
            class="part idle"
            v-for="part in issueParts.expense"
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
            v-model="otherPart"
            placeholder="Other"
          />
        </div>
        <div class="summary" v-if="expenseList.length > 0">
          <p>
            {{ summarize('expense') }}
          </p>
        </div>
        <div class="additional">
          <h2>Additional Notes</h2>
          <textarea
            type="text"
            v-model="notes"
            placeholder="Add additional notes ..."
          />
        </div>
        <div class="submit">
          <Button
            :type="'submit'"
            :text="'Make Record'"
            :isImportant="true"
            @click.prevent.native="makeRecord('expense')"
          >
          </Button>
        </div>
      </form>

      <div class="form-body" v-else>
        <div class="amount">
          <h2>Amount</h2>
          <input v-model="incomeAmount" type="number" placeholder="eg. 5000" />
        </div>
        <div class="wallet-select">
          <h2>To</h2>
          <select
            name="wallet"
            id="wallet"
            v-model="targetWallet"
            @change="log()"
          >
            <option disabled selected>Select a wallet</option>
            <option
              v-for="wallet in wallets"
              :key="wallet._id"
              :value="wallet"
              >{{ wallet.name }}</option
            >
          </select>
        </div>
        <h2>Income from</h2>
        <div class="quick-parts">
          <QuickPart
            class="part idle"
            v-for="part in issueParts.income"
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
            v-model="otherPart"
            placeholder="Other"
          />
        </div>
        <div class="summary" v-if="incomeList.length > 0">
          <p>
            {{ summarize('income') }}
          </p>
        </div>
        <div class="additional">
          <h2>Additional Notes</h2>
          <textarea
            type="text"
            v-model="notes"
            placeholder="Add additional notes ..."
          />
        </div>
        <div class="submit">
          <Button
            :type="'submit'"
            :text="'Make Record'"
            :isImportant="true"
            @click.prevent.native="makeRecord('income')"
          >
          </Button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import QuickPart from '@/components/forms/QuickPart'
  //import data from '@/common/mock.data'
  import axios from 'axios'
  import Button from '@/components/globals/Button'
  export default {
    data() {
      return {
        isExpense: true,
        otherPartInput: true,
        formHeight: 'auto',
        wallets: [],
        issueParts: { expense: [], income: [] },
        expenseAmount: 0,
        incomeAmount: 0,
        targetWallet: 'Select a wallet',
        notes: '',
        expenseList: [],
        incomeList: [],
        otherPart: '',
      }
    },
    computed: {
      getIssueParts() {
        return this.$store.dispatch('auth/getIssueParts')
      },
    },
    // created() {
    //   let parts = this.getIssueParts
    //   let incomeParts = []
    //   let expenseParts = []
    //   for (let i = 0, len = parts.length; i < len; i++) {
    //     if (parts[i]['type'] === 'expense') {
    //       expenseParts.push(parts[i])
    //     } else {
    //       incomeParts.push(parts[i])
    //     }
    //   }
    //   this.issueParts = { expense: expenseParts, income: incomeParts }
    // },
    components: {
      QuickPart,
      Button,
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
          //console.log('Responed wallets', res.data)
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
      setExpense: function(value) {
        this.setFixedHeight()
        this.isExpense = value
        if (!value) {
          setTimeout(this.detectParts, 600)
        }
      },
      setFixedHeight: function() {
        this.formHeight = this.$refs.recForm.clientHeight + 'px'
        setTimeout(() => {
          this.formHeight = 'auto'
        }, 200)
      },
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
        let wallet = this.targetWallet.name || ''
        let amount = this[type + 'Amount']
        let items = this[type + 'List'] ? this[type + 'List'].join(', ') : ' '
        if (this.otherPart) {
          items += ', ' + this.otherPart
        }
        if (type === 'expense') {
          if (wallet) {
            return `Expense ${amount} for ${items} from ${wallet}.`
          }
          return `Expense ${amount} for ${items}.`
        } else {
          if (wallet) {
            return `Income ${amount} from ${items} to ${wallet}.`
          }
          return `Income ${amount} from ${items}.`
        }
      },
      validate: function(form) {
        if (
          form &&
          form.type &&
          form.amount &&
          form.wallet &&
          form.wallet !== 'Select a wallet'
        ) {
          //console.log('form.wallet', form.wallet)
          return true
        }
        return false
      },
      makeRecord: function(type) {
        //debugger
        //walletOwners = []
        //console.log('Target wallet', this.targetWallet)

        let form = {
          type: type,
          amount: this[`${type}Amount`],
          issueParts: this[`${type}List`],
          wallet: this.targetWallet._id,
          notifyTo: [],
          notes: this.notes,
        }
        this.otherPart && form.issueParts.push(this.otherPart)
        if (!this.validate(form)) {
          this.$toasted.error('Validation failed! Please try again.', {
            position: 'top-center',
            duration: 2000,
          })
          return
        }
        this.targetWallet.owners.forEach(owner => {
          form.notifyTo.push(owner._id)
        })
        this.$store
          .dispatch('auth/makeRecord', form)
          .then(() => {
            this.$toasted.show('Record added successfully', {
              position: 'top-center',
              duration: 2000,
            })
            this.$router.push('/')
          })
          .catch(err => {
            this.$toasted.error(err, {
              position: 'top-center',
              duration: 2000,
            })
          })
      },
    },
  }
</script>
<style scoped>
  .slide-fade-enter-active {
    transition: all 0.9s ease-in-out;
  }
  /* .slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
  } */
  .slide-fade-enter
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .active {
    @apply text-white bg-teal;
  }
  .disable {
    @apply bg-white text-gray-700;
  }

  .record-form {
    @apply bg-white w-full;
    .header {
      font-size: 1.2rem;
      @apply bg-gray-300;
      div {
        @apply cursor-pointer px-4 py-2 text-center;
      }
    }

    .form-body {
      @apply px-2 text-left;

      h2 {
        @apply font-bold mt-4 mb-1;
        font-size: 1.3rem;
        clear: both;
      }

      .quick-parts {
        .part {
          float: left;
        }
      }
      .other-part {
        input {
          @apply py-1 px-2 border-2 border-gray-500 rounded;
        }
      }
      .summary {
        @apply mt-4;
        font-size: 17px;
        clear: both;
      }
      .amount {
        clear: both;
        input {
          @apply py-1 px-2 border-2 border-gray-500 rounded font-bold;
          font-size: 1.3rem;
        }
      }
      .wallet-select {
        select {
          @apply rounded p-2 border-2 border-gray-500;
        }
      }
      .additional {
        textarea {
          @apply py-1 px-2 border-2 border-gray-500 rounded;
          width: 100%;
        }
      }
      .submit {
        @apply mt-8 mb-4 text-right;
        * {
          @apply ml-2;
        }
      }
    }
  }
</style>

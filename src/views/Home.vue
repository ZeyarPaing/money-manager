<template>
  <div class="wrapper">
    <section class="wallets">
      <h1>Wallets</h1>
      <LoadSpinner v-if="loading"> </LoadSpinner>
      <div
        v-if="!expandedWallet"
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
      >
        <div v-if="wallets.length <= 0" class="text-center text-gray-600 py-6">
          No wallets yet. Create one.
        </div>
        <Wallet
          v-for="wallet in wallets"
          :key="wallet._id"
          :walletInfo="wallet"
          :isExpanded="false"
          :currencyUnit="user.currencyUnit"
          @click.native="expandWallet(wallet)"
        ></Wallet>
        <div class="create-wallet" @click="toCreateWallet()">
          <icon class="size-big" :icon="['fas', 'plus']" />
          <p>Create a wallet</p>
        </div>
      </div>
      <div class="expand-wallet" v-if="expandedWallet">
        <div class="close-btn" @click="collapseWallet()">
          <img class="cross" :src="closeIcon" />
        </div>
        <Wallet
          :currencyUnit="user.currencyUnit"
          :walletInfo="expandedWallet"
          :isExpanded="true"
        ></Wallet>
        <Button
          :btnType="'button'"
          :isImportant="false"
          :text="'Delete'"
          class="delete-btn"
          @click.native="deleteConfirmBox = true"
        ></Button>
        <Button
          :btnType="'button'"
          :isImportant="true"
          :text="'Edit'"
          class="edit-btn"
          @click.native="editWallet(expandedWallet)"
        ></Button>
        <section v-if="deleteConfirmBox" class="delete-overlay">
          <section class="confirm-delete">
            <p>Are you sure to delete this wallet?</p>
            <div class="delete-button">
              <Button
                :btnType="'button'"
                :isImportant="false"
                :text="'Cancel'"
                @click.native="deleteConfirmBox = false"
              ></Button>
              <Button
                :btnType="'submit'"
                :isImportant="true"
                :text="'Delete'"
                @click.native="deleteWallet(expandedWallet)"
              ></Button>
            </div>
          </section>
        </section>
      </div>
      <!-- <router-link class="add-record" to="/addrecord">
        <div class="record-tooltip">
          Make a record!
        </div>
        <icon :icon="['fas', 'plus']" />
      </router-link> -->
    </section>
  </div>
</template>

<script>
  // SECTION libs
  // SECTION modules
  //import data from '@/common/mock.data'
  import windowResizeMixin from '@/mixins/windowResize.mixin'
  // SECTION components
  import Wallet from '@/components/wallet/Wallet'
  import Button from '@/components/globals/Button'
  import LoadSpinner from '@/components/globals/LoadSpinner'
  // SECTION assets
  import closeIcon from '@/assets/imgs/cross-red.svg'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Views.Home',
    mixins: [windowResizeMixin],
    components: {
      Wallet,
      Button,
      LoadSpinner,
    },
    computed: {
      ...mapGetters({
        user: 'auth/authUser',
      }),
    },
    data() {
      return {
        //data,
        closeIcon,
        wallets: [],
        loading: true,
        expandedWallet: null,
        deleteConfirmBox: false,
      }
    },
    // beforeMount: function() {
    //   this.loading = true
    // },
    mounted: function() {
      this.fretchWallets()
    },
    methods: {
      fretchWallets: async function() {
        this.loading = true
        setTimeout(() => {
          this.$store
            .dispatch('auth/getUserWallets')
            .then(res => {
              //console.log('Responed wallets', res.data)
              this.wallets = res.data
              this.loading = false
            })
            .catch(err => console.error(err))
        }, 0)
      },
      toCreateWallet: function() {
        this.$router.push('/createwallet')
      },
      expandWallet: function(walletInfo) {
        this.expandedWallet = walletInfo
        //console.log('Wallet expand', walletInfo)
      },
      collapseWallet: function() {
        this.expandedWallet = null
      },
      deleteWallet: async function(wallet) {
        await this.$store
          .dispatch('auth/deleteWallet', wallet)
          .then(() => {
            // console.log('Response is ', res)
            this.expandedWallet = null
            this.$toasted.show('Deleted successfully', {
              duration: 500,
              position: 'top-center',
            })
          })
          .catch(err =>
            this.$toasted.error('Something went wrong!' + err, {
              duration: 500,
              position: 'top-center',
            }),
          )
        this.fretchWallets()
      },
      editWallet: function(wallet) {
        let owners = []
        //NOTE TO edit this from server side
        for (let owner of wallet.owners) {
          owners.push(owner._id)
        }
        let currentInfo = {
          name: wallet.name,
          amount: wallet.amount,
          type: wallet.type,
          _id: wallet._id,
          color: wallet.color,
          owners: owners,
          description: wallet.description,
        }
        //console.log('Current info')

        this.$router.push({
          name: 'UpdateWallet',
          params: {
            currentInfo: {
              ...currentInfo,
            },
          },
        })
      },
    },
  }
</script>
<style scoped>
  .wrapper {
    @apply py-16;

    .wallets {
      h1 {
        font-size: 1.5rem;
        @apply color-primary font-bold;
      }

      @media (min-width: 768px) {
        h1 {
          margin-left: 0.5rem;
        }
        .create-wallet {
          margin: 8px;
        }
      }
      .expand-wallet {
        @apply fixed w-full h-full p-4;
        background-color: #ffffffcc;
        backdrop-filter: blur(20px) saturate(100%);
        left: 0;
        top: 0;
        z-index: 52;
        .close-btn {
          float: right;
          @apply mb-2 bg-white shadow-md p-2;
          border-radius: 50%;

          .cross {
            width: 10px;
            cursor: pointer;
          }
        }
        @media (min-width: 768px) {
          .close-btn {
            margin-right: 0.5rem;
          }
        }

        .delete-btn,
        .edit-btn {
          width: 49%;
        }
        .delete-btn {
          @apply mr-1;
        }
        .delete-overlay {
          @apply fixed w-full h-full p-4;
          padding-top: 16rem;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.6);

          .confirm-delete {
            @apply bg-white rounded-md shadow-md w-full py-6 px-8;

            p {
              @apply font-semibold;
              font-size: 17px;
            }
            .delete-button {
              @apply text-right mt-4;

              * {
                @apply ml-2;
              }
            }
          }
        }
      }

      .create-wallet {
        @apply rounded-md text-center text-gray-600 cursor-pointer py-8 mt-2;
        border: 1px dashed #999;
        vertical-align: middle;
        &:hover {
          @apply bg-gray-200;
        }
        .size-big {
          font-size: 25px;
          margin-bottom: -2px;
        }
      }
      /* .add-record {
        @apply block fixed text-white shadow-lg cursor-pointer;
        right: 16px;
        bottom: 100px;
        padding: 0.7rem 1.2rem;
        font-size: 1.5rem;
        border-radius: 50px;
        background: rgb(5, 129, 180);
        background: linear-gradient(
          257deg,
          rgba(5, 129, 180, 1) 0%,
          rgba(58, 33, 154, 1) 100%
        );

        .record-tooltip {
          @apply hidden bg-gray-600 p-2 rounded-lg text-center shadow-md;
          font-size: 13px;
          width: 120px;
          left: -130px;
        }
        @-webkit-keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        &:hover {
          background: rgb(5, 129, 180);
          background: linear-gradient(
            213deg,
            rgba(5, 129, 180, 1) 0%,
            rgba(58, 33, 154, 1) 100%
          );
        }

        &:hover > .record-tooltip {
          @apply absolute block;
          -webkit-animation: fadeIn 0.5s;
          animation: fadeIn 0.5s;
        }
        &:active {
          @apply bg-blue-700;
        }
      } */
    }
  }
</style>

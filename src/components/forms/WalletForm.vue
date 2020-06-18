<template>
  <section class="create-wallet-wrap">
    <h1 v-if="isUpdate">Update wallet</h1>
    <h1 v-else>Create a wallet</h1>
    <form @keydown.enter.prevent="">
      <div>
        <label class="header-label" for="wname">Name</label>
        <input
          v-model="form.name"
          type="text"
          name="wname"
          id="wname"
          required="true"
        />
      </div>
      <div>
        <label class="header-label" for="type">Type</label>
        <select
          name="type"
          id="type"
          v-model="form.type"
          @change="getPublicUserData()"
        >
          <option value="Private">Private</option>
          <option value="Shared">Shared</option>
        </select>
        <div v-if="form.type.toLowerCase() === 'shared'" class="shared-owners">
          <label class="header-label" for="member-input">Add members</label>
          <input
            v-model="addMemberInput"
            type="text"
            list="users"
            id="member-input"
            autocomplete="ture"
          /><button type="button" class="add-member" @click="addMember()">
            <icon :icon="['fas', 'plus']"></icon>
          </button>
          <datalist id="users">
            <option v-for="user in users" :key="user._id" :value="user._id">{{
              user.email
            }}</option>
          </datalist>
          <div v-if="addedUsers.length > 0">
            <h3>Shared Members</h3>
            <div
              class="added-user-info"
              v-for="addedUser in addedUsers"
              :key="addedUser"
            >
              <div class="close-icon" @click="removeAddedUser(addedUser)">
                <img :src="closeIcon" />
              </div>
              <div class="added-user-name">
                <p class="id">
                  {{ users[`${addedUser}`] && users[`${addedUser}`]._id }}
                </p>
                <p class="name">
                  {{ users[`${addedUser}`] && users[`${addedUser}`].name }}
                </p>
                <p class="email">
                  {{ users[`${addedUser}`] && users[`${addedUser}`].email }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label class="header-label" for="amount">Initial amount</label>
        <input v-model="form.amount" type="number" name="amount" id="amount" />
      </div>
      <div>
        <label class="header-label" for="description">Description</label>
        <input
          v-model="form.description"
          type="text"
          name="description"
          id="description"
        />
      </div>
      <div class="color-wrap">
        <label class="header-label" for="color">Color</label>
        <div
          v-for="color in Object.keys(colorList)"
          :key="color"
          :style="{ backgroundColor: `#${color}` }"
          @click="select(`${color}`)"
          :class="colorList[color] ? 'selected' : 'idle'"
        >
          <span>●</span>
        </div>
      </div>
      <div class="submit">
        <Button
          :type="'button'"
          :text="'Cancel'"
          :isImportant="false"
          @click.prevent.native="$router.push('/')"
        >
        </Button>
        <Button
          v-if="isUpdate"
          :type="'submit'"
          :text="'Update'"
          :isImportant="true"
          @click.prevent.native="updateWallet()"
        >
        </Button>
        <Button
          v-else
          :type="'submit'"
          :text="'Create'"
          :isImportant="true"
          @click.prevent.native="createWallet()"
        >
        </Button>
      </div>
    </form>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import closeIcon from '@/assets/imgs/cross.svg'
  import Button from '@/components/globals/Button'
  export default {
    data() {
      return {
        closeIcon,
        colorList: {
          dd4b4b: false,
          '1fa56d': false,
          '4c5cb3': false,
          '2b9fc3': false,
          e7b108: false,
          f02299: false,
        },
        form: {
          name: null,
          type: 'Private',
          amount: 0,
          owners: [],
          color: '4c5cb3',
          description: null,
          creator: null,
        },
        users: {},
        addMemberInput: null,
        addedUsers: [],
        isUpdate: false,
      }
    },
    computed: {
      ...mapGetters({
        currentUser: 'auth/authUser',
      }),
    },
    components: {
      Button,
    },
    methods: {
      select(color) {
        this.form.color && (this.colorList[this.form.color] = false)
        this.colorList[color] = true
        this.form.color = color
      },
      isValidWallet() {
        if (!this.form.name) {
          this.$toasted.error('A wallet should have a name.', {
            position: 'top-center',
            duration: 2000,
          })
          return false
        }
        if (this.form.type === 'Shared') {
          this.form.owners = this.addedUsers
          if (
            !this.isUpdate &&
            this.form.owners.indexOf(this.currentUser._id) === -1
          ) {
            this.form.owners.push(this.currentUser._id)
          }
          if (this.form.owners.length > 1) {
            return true
          } else {
            this.$toasted.error(
              'Shared wallet should be owned by 2 or more users.',
              {
                position: 'top-center',
                duration: 2000,
              },
            )
            return false
          }
        } else {
          this.form.owners = [this.currentUser._id]
          return true
        }
      },
      updateWallet() {
        // for (let i = 0, len = this.addedUsers.length; i < len; i++) {
        //   this.addedUsers[i] = this.users[this.addedUsers[i]]['_id']
        // }
        if (!this.isValidWallet()) {
          this.$toasted.error('Validation failed, try again.', {
            position: 'top-center',
            duration: 2000,
          })
          return
        }
        this.form.creator = this.currentUser
        this.$store.dispatch('auth/updateWallet', this.form).then(() => {
          this.$toasted.show('Updated successfully!', {
            duration: 5000,
            position: 'top-center',
          })
          this.$router.push('/')
        })
      },
      createWallet() {
        // for (let i = 0, len = this.addedUsers.length; i < len; i++) {
        //   this.addedUsers[i] = this.users[this.addedUsers[i]]['_id']
        // }
        if (!this.isValidWallet()) {
          this.$toasted.error('Validation failed, try again.', {
            position: 'top-center',
            duration: 2000,
          })
          return
        }
        this.form.creator = this.currentUser
        this.$store.dispatch('auth/createWallet', this.form).then(() => {
          this.$toasted.show('Created successfully!', {
            duration: 5000,
            position: 'top-center',
          })
          this.$router.push('/')
        })
      },
      getPublicUserData() {
        if (this.form.type === 'Shared') {
          this.$store
            .dispatch('auth/getPublicUserData')
            .then(res => (this.users = res.data))
        }
      },
      isSelf(userID) {
        if (userID === this.currentUser._id) {
          return true
        }
        return false
      },
      addMember() {
        let toAddUser = this.addMemberInput
        if (toAddUser in this.users) {
          if (toAddUser !== this.currentUser._id || this.isUpdate) {
            if (this.addedUsers.indexOf(toAddUser) === -1) {
              this.addedUsers.push(toAddUser)
              this.addMemberInput = ''
            } else {
              this.$toasted.error('This member is already added!', {
                position: 'top-center',
                duration: 2000,
              })
            }
          } else {
            this.$toasted.error('You will added as a member automatically!', {
              position: 'top-center',
              duration: 2000,
            })
          }
        } else {
          this.$toasted.error('User does not exist!', {
            position: 'top-center',
            duration: 2000,
          })
        }
      },
      removeAddedUser(addedUser) {
        if (this.isSelf(addedUser)) {
          this.$toasted.show('You removed yourself.', {
            position: 'top-center',
            duration: 2000,
          })
        }
        this.addedUsers.splice(this.addedUsers.indexOf(addedUser), 1)
        //console.log('Added users', this.addedUsers)
      },
    },
    props: {
      edit_wallet_props: {
        type: Object,
        required: false,
        default: null,
      },
    },
    created: function() {
      if (this.$props.edit_wallet_props) {
        this.form.name = this.$props.edit_wallet_props.name || ''
        this.form.type = this.$props.edit_wallet_props.type || ''
        this.form.amount = this.$props.edit_wallet_props.amount || 0
        this.addedUsers = this.$props.edit_wallet_props.owners || []
        this.form.color = this.$props.edit_wallet_props.color || ''
        this.form.description = this.$props.edit_wallet_props.description || ''
        this.form._id = this.$props.edit_wallet_props._id || ''
      }
      if (this.$props.edit_wallet_props !== null) {
        this.isUpdate = true
      }
      //console.log('is update', this.$props.edit_wallet_props)
      this.getPublicUserData()
    },
  }
</script>

<style scoped>
  input,
  select,
  textarea {
    @apply py-1 px-2 border-2 border-gray-500 rounded;
    font-size: 1.3rem;
  }
  input,
  textarea {
    @apply w-full;
  }
  .create-wallet-wrap {
    @apply py-16 px-2;

    h1 {
      @apply font-bold mb-1;
      font-size: 1.4rem;
    }

    form {
      div {
        .header-label {
          @apply block mt-4 mb-1;
          font-size: 1.2rem;
          /* background-color: #1f7fa5; */
        }
      }
      .shared-owners {
        input {
          width: 80%;
        }
        .add-member {
          @apply text-blue-500 ml-2 bg-white shadow;
          padding: 0.6rem 1rem;
          border-radius: 50%;
          font-size: 20px;
          &:active {
            @apply bg-gray-300;
          }
          &:focus {
            outline: none;
          }
        }
      }
      .added-user-info {
        @apply bg-white shadow-md rounded-md py-2 px-4 mb-2;

        .close-icon {
          @apply mt-2 ml-16 float-right cursor-pointer;
          img {
            width: 15px;
          }
        }

        .added-user-name {
          @apply text-gray-700;
          .id {
            font-size: 11px;
          }
          .name {
            @apply text-black font-bold;
          }
          .email {
            font-size: 14px;
          }
        }
      }
      .color-wrap {
        div {
          @apply float-left cursor-pointer px-4 mr-4 mt-1 mb-4 text-white;
        }
        span {
          font-size: 1.7rem;
        }
        .idle {
          span {
            visibility: hidden;
          }
        }
        .selected {
          span {
            visibility: visible;
          }
        }
      }
      .submit {
        @apply pt-12 mb-4 text-right;
        clear: both;
        * {
          @apply ml-2;
        }
      }
    }
  }
</style>

<template>
  <section class="wrapper">
    <!-- <div class="logo">
      <img :src="walletIllu" />
    </div> -->
    <h1>Money Manager</h1>
    <p class="motto">Manage, Save and Build Success.</p>
    <form @keydown.enter.prevent="">
      <h2>Sign Up</h2>
      <div class="form-body">
        <div>
          <label for="email">Name</label>
          <input
            v-model="form.name"
            type="text"
            name="name"
            id="name"
            required
            placeholder="Your name"
          />
        </div>
        <div>
          <label for="email">Email</label>
          <input
            v-model="form.email"
            type="email"
            name="email"
            id="email"
            required
            placeholder="example@company.com"
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            v-model="form.password"
            type="password"
            name="password"
            id="password"
            required
            placeholder="Your Password"
          />
        </div>
        <div>
          <label for="password-confirm">Comfirm Password</label>
          <input
            v-model="form.passwordConfirm"
            type="password"
            name="passwordConfirm"
            id="password-confirm"
            required
            placeholder="Repeat your password"
          />
        </div>
        <div class="currency">
          <label for="currency-unit">Currency Unit</label>
          <select v-model="form.currencyUnit" type="password">
            <option
              v-for="key in Object.keys(currencyList)"
              :key="key"
              :value="key"
              >{{ currencyList[key] }}</option
            >
          </select>
        </div>
        <button type="submit" @click.prevent="register()">
          Sign Up
        </button>
      </div>
      <p>
        Already have an account ?
        <router-link class="link" to="/login">Login</router-link>
      </p>
    </form>
  </section>
</template>

<script>
  //import floralImg from '@/assets/imgs/floralw.jpg'
  //import walletIllu from '@/assets/imgs/login.svg'
  //import { required, email } from 'vuelidate/lib/validators'
  export default {
    data() {
      return {
        //floralImg,
        //walletIllu,
        currencyList: {
          MMK: 'Myanmar Kyat',
          USD: 'US Dollar',
          THB: 'Thai Bath',
          JPY: 'Japanese Yen',
          CNY: 'Chinese Yuan Renminbi',
          INR: 'Indian rupee',
          SGD: 'Singapore Dollar',
          KRW: 'South Korean won',
        },

        form: {
          name: null,
          email: null,
          password: null,
          passwordConfirm: null,
          currencyUnit: 'MMK',
        },
      }
    },
    methods: {
      validate: function(form) {
        if (
          !form.name ||
          !form.email ||
          !form.password ||
          !form.passwordConfirm
        ) {
          this.$toasted.error(
            'Incomplete data! Please fill your information.',
            {
              duration: 2000,
              position: 'top-center',
            },
          )
          return false
        }
        if (!form.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
          this.$toasted.error('Invalid email!', {
            duration: 2000,
            position: 'top-center',
          })
          return false
        }
        if (
          form.password &&
          form.passwordConfirm &&
          form.password !== form.passwordConfirm
        ) {
          this.$toasted.error("Password confirmation doesn't match.", {
            duration: 2000,
            position: 'top-center',
          })
          return false
        }
        if (form.password.length < 4) {
          this.$toasted.error(
            'Password is too short. Please make a password that contain at least 4 characters.',
            {
              duration: 2000,
              position: 'top-center',
            },
          )
          return false
        }
        return true
      },
      register: function() {
        if (!this.validate(this.form)) {
          return
        }
        this.$store
          .dispatch('auth/registerUser', this.form)
          .then(() => {
            this.$toasted.show('Registered successfully!', {
              duration: 5000,
              position: 'top-center',
            })
            this.$router.push('/login')
          })
          .catch(errMessage => {
            this.$toasted.error(
              'Something went wrong. Please try again.' + errMessage,
              {
                duration: 5000,
                position: 'top-center',
              },
            )
          })
      },
    },
  }
</script>

<style scoped>
  .wrapper {
    @apply absolute bg-primary text-center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-x: hidden;
    z-index: 60;

    h1 {
      @apply text-white font-bold mt-16;
      font-size: 1.8rem;
    }
    .motto {
      @apply text-gray-200 mb-8;
      font-size: 14px;
    }
    /* .logo {
      @apply text-center mt-12 mb-0;

      img {
        width: 8rem;
        margin: auto;
      }
    } */

    form {
      @apply rounded-lg py-4 px-8;
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px) saturate(100%);
      width: 85%;
      margin: 0 auto 30px auto;
      box-shadow: 0 0px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);

      h2 {
        @apply color-primary font-bold;
        font-size: 25px;
      }

      .form-body {
        label {
          @apply block text-left mb-1 mt-4;
        }
        input {
          @apply w-full p-2 pl-4 rounded;
          background: inherit;
          border: 0.7px solid rgb(180, 180, 180);
        }
        .currency {
          @apply text-left;
          select {
            @apply p-2 rounded;
          }
        }
        button {
          @apply bg-primary text-white font-bold py-2 px-4 w-full rounded my-4 cursor-pointer;
        }
      }
      p {
        .link {
          @apply text-blue-600;
        }
      }
    }
    @media screen and (min-width: 500px) {
      form {
        width: 27rem;
        padding: 2rem 3rem;
      }
      .logo {
        display: none;
      }
    }
  }
</style>

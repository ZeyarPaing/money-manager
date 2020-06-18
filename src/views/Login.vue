<template>
  <section class="wrapper">
    <!-- <div class="logo" /// :style="{ backgroundImage: `url(${floralImg})` }"///>
      <img :src="walletIllu" />
    </div> -->
    <h1>Money Manager</h1>
    <p class="motto">Manage, Save and Build Success.</p>
    <form @keydown.enter.prevent="">
      <h2>Login</h2>
      <div class="form-body">
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
        <button @click.prevent="login()">Login</button>
      </div>
      <p>
        New user ? <router-link class="link" to="/signup">Sign up</router-link>
      </p>
      <p v-if="error">
        { error }
      </p>
    </form>
  </section>
</template>

<script>
  // import floralImg from '@/assets/imgs/background.jpg'
  //import walletIllu from '@/assets/imgs/login.svg'
  export default {
    data() {
      return {
        //walletIllu,
        form: {
          email: null,
          password: null,
        },
        error: null,
      }
    },
    methods: {
      login: function() {
        this.$store
          .dispatch('auth/loginWithEmailAndPassword', this.form)
          .catch(errMessage => {
            this.$toasted.error(errMessage, {
              duration: 5000,
              position: 'top-center',
            })
          })
        // .then(() => this.$router.push('/'))
        // .catch(err => console.log(err))
      },
    },
  }
</script>

<style scoped>
  .wrapper {
    @apply absolute bg-primary text-center;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    overflow-x: hidden;
    z-index: 60;
    /* background-repeat: no-repeat;
    background-size: cover;
    background-position: center; */

    h1 {
      @apply font-bold mt-20 text-white;
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
      margin: auto;
      box-shadow: 0 0px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);

      h2 {
        @apply font-bold color-primary;
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
        button {
          @apply bg-primary text-white font-bold py-2 px-4 w-full rounded my-4 cursor-pointer;
        }
      }
      p {
        .link {
          @apply text-blue-600 cursor-pointer;
        }
      }
    }
    @media screen and (min-width: 500px) {
      form {
        width: 27rem;
        padding: 2rem 3rem;
      }
    }
  }
</style>

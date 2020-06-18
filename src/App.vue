<template>
  <div id="app">
    <div id="topnav">
      <h1>Money Manager</h1>
      <span class="more" @click="showMore()"
        ><icon v-if="!navDisplayed" :icon="['fas', 'bars']"/><img
          v-else
          :src="cross"
          class="cross"
      /></span>
      <transition name="slide-fade">
        <div class="nav-items" v-if="navDisplayed" @click="deactivate()">
          <div class="separator">
            <hr />
          </div>

          <section v-if="user" class="account">
            <img :src="userIcon" class="user-avater" />
            <div class="user-info">
              <p class="user-name">{{ user.name }}</p>
              <p class="user-email">
                {{ user.email || 'using as a guest user' }}
              </p>
            </div>
          </section>
          <section class="item">
            <router-link to="/setting"
              ><icon
                class="nav-icon"
                :icon="['fas', 'tools']"
              />Setting</router-link
            >
          </section>
          <section class="item">
            <router-link to="/about"
              ><icon class="nav-icon" :icon="['fas', 'info-circle']" />About
              us</router-link
            >
          </section>
          <section class="item">
            <span v-if="user" @click.prevent="logout()"
              ><icon class="nav-icon" :icon="['fas', 'sign-out-alt']" />Log
              out</span
            >
          </section>
        </div>
      </transition>
    </div>
    <main>
      <transition name="fade" mode="out-in">
        <router-view :key="$router.fullPath" />
      </transition>
    </main>
    <div id="menu">
      <ul>
        <Navitem
          v-for="navItem in navItems"
          :key="navItem.name"
          :itemInfo="navItem"
          :priority="navItem.priority"
        ></Navitem>
      </ul>
    </div>
    <div class="update-dialog" v-if="prompt">
      <div class="update-dialog__content">
        A new version is found. Refresh to load it?
      </div>
      <div class="update-dialog__actions">
        <button
          class="update-dialog__button update-dialog__button--confirm"
          @click="update"
        >
          Update
        </button>
        <button
          class="update-dialog__button update-dialog__button--cancel"
          @click="prompt = false"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Navitem from '@/components/navigation/Navitem'
  import userIcon from '@/assets/imgs/user.svg'
  import cross from '@/assets/imgs/cross-white.svg'
  import { mapGetters } from 'vuex'
  export default {
    name: 'App',
    components: {
      Navitem,
    },

    methods: {
      async update() {
        this.prompt = false
        await this.$workbox.messageSW({ type: 'SKIP_WAITING' })
      },
      showMore: function() {
        this.navDisplayed = !this.navDisplayed
      },
      deactivate: function() {
        if (this.navDisplayed) {
          this.navDisplayed = false
        }
      },
      logout: function() {
        this.$store
          .dispatch('auth/logout')
          .then(() => {
            this.$toasted.show('Logged out successfully!', {
              duration: 1000,
              position: 'top-center',
            })
            this.$router.push('/login')
          })
          .catch(err => console.error(err))
      },
      active: function(path) {
        this.navItems[this.activatedItem] &&
          (this.navItems[this.activatedItem].isActive = false)
        this.navItems[path] && (this.navItems[path].isActive = true)
        this.activatedItem = path
      },
    },
    computed: {
      ...mapGetters({
        user: 'auth/authUser',
      }),
    },
    data() {
      return {
        prompt: false,
        cross,
        userIcon,
        navDisplayed: false,
        navItems: {
          '/': {
            name: 'Home',
            link: '/',
            icon: ['fas', 'home'],
            isActive: true,
            priority: false,
          },
          '/schedule': {
            name: 'Schedule',
            link: '/schedule',
            icon: ['fas', 'user-clock'],
            isActive: false,
            priority: false,
          },
          '/planner': {
            name: 'Planner',
            link: '/planner',
            icon: ['fas', 'seedling'],
            isActive: false,
            priority: false,
          },
          '/history': {
            name: 'History',
            link: '/history',
            icon: ['fas', 'history'],
            isActive: false,
            priority: false,
          },
          '/addrecord': {
            name: 'AddRecord',
            link: '/addrecord',
            icon: ['fas', 'plus'],
            isActive: false,
            priority: true,
          },
        },

        activatedItem: '/',
      }
    },

    created() {
      if (this.$workbox) {
        this.$workbox.addEventListener('waiting', () => {
          this.prompt = true
        })
      }
    },
    updated: function() {
      this.active(this.$router.history.current.path)
    },
  }
</script>

<style lang="scss">
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .update-dialog {
    position: fixed;
    left: 50%;
    bottom: 64px;
    transform: translateX(-50%);
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    padding: 12px;
    max-width: 576px;
    color: white;
    background-color: #2c3e50;
    text-align: left;

    &__actions {
      display: flex;
      margin-top: 8px;
    }

    &__button {
      margin-right: 8px;

      &--confirm {
        margin-left: auto;
      }
    }
  }
</style>
<style scoped>
  #app {
    overflow-x: hidden;
    overflow-y: auto;
    @apply bg-gray-100;
    height: 100vh;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .slide-fade-enter-active {
    transition: all 0.6s ease-in-out;
  }
  /* .slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
} */
  .slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  main {
    @apply p-4;
  }
  #topnav {
    @apply text-white p-4 fixed w-full bg-primary;
    z-index: 50;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
    h1 {
      @apply font-bold text-lg float-left;
    }
    .more {
      @apply cursor-pointer text-lg float-right;
    }
    .cross {
      width: 17px;
      @apply mt-1;
    }
    @media (min-width: 768px) {
      h1 {
        margin-left: 0.5rem;
      }
      .more {
        margin-right: 0.5rem;
      }
      .nav-items {
        margin: 1rem 0.5rem;
      }
    }
    .nav-items {
      @apply clear-both;

      .separator {
        @apply mt-10 mb-2;
      }
      .account {
        .user-avater {
          @apply bg-white float-left mr-2;
          margin-top: 3px;
          padding: 0.3px;
          font-size: 30px;
          border-radius: 50%;
          width: 45px;
        }
        .user-info {
          .user-name {
            font-weight: 550;
            font-size: 18px;
            padding-top: 3px;
          }
          .user-email {
            @apply mb-4;
            font-size: 12px;
            font-weight: lighter;
          }
        }
      }

      .item {
        @apply block mt-2;
        width: 100%;
        font-size: 17.5px;
        * {
          @apply cursor-pointer;
          .nav-icon {
            @apply mr-2;
            font-size: 20px;
          }
          &:hover {
            @apply text-gray-300;
          }
        }
      }
    }
  }
  #menu {
    @apply fixed w-full text-center bg-white;
    bottom: 0;
    left: 0;
    box-shadow: -1px -1px 5px rgba(0, 0, 0, 0.2);

    ul {
      justify-content: center;
      display: flex;
    }
  }
</style>

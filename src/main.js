import Vue from 'vue'
import App from './App.vue'
import wb from './registerServiceWorker'
import router from './router'
import store from './store'
import vuelidate from 'vuelidate'
import './mixins/globals/index'
import './components/_globals'
import Toasted from 'vue-toasted'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

Vue.prototype.$workbox = wb

import {
  faHome,
  faUserClock,
  faSeedling,
  faHistory,
  faPlus,
  faBars,
  faUser,
  faTools,
  faInfoCircle,
  faSignOutAlt,
  faArrowUp,
  faHamburger,
  faMoneyBill,
  faMoneyBillAlt,
  faMoneyBillWave,
  faMoneyBillWaveAlt,
  faMoneyCheck,
  faMoneyCheckAlt,
  faCar,
  faTshirt,
  faGamepad,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons'

// SECTION stylesheets imports
import './assets/css/main.css'
Vue.config.productionTip = false

library.add(
  faHome,
  faUserClock,
  faSeedling,
  faHistory,
  faPlus,
  faBars,
  faUser,
  faTools,
  faInfoCircle,
  faSignOutAlt,
  faArrowUp,
  faHamburger,
  faMoneyBill,
  faMoneyBillAlt,
  faMoneyBillWave,
  faMoneyBillWaveAlt,
  faMoneyCheck,
  faMoneyCheckAlt,
  faCar,
  faTshirt,
  faGamepad,
  faWindowClose,
)
Vue.component('icon', FontAwesomeIcon)
Vue.use(vuelidate)
Vue.use(Toasted)

new Vue({
  router,
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app')

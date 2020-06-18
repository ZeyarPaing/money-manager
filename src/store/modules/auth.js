import axios from 'axios'
import router from '@/router'
import jwt from 'jsonwebtoken'
import axiosInstance from '@/services/axiosinstance'
import { rejectError } from '@/helpers'

function checkTokenValidity(token) {
  if (token) {
    const decodedToken = jwt.decode(token)
    return decodedToken && decodedToken.exp * 1000 > new Date().getTime()
  }
  return false
}

export default {
  namespaced: true,
  state: {
    user: null,
    loginError: null,
    signupError: null,
    wallets: null,
  },
  getters: {
    authUser(state) {
      return state.user
    },
    isAuthenticated(state) {
      return !!state.user
    },
    getLoginError(state) {
      return state.loginError
    },
    getSignUpError(state) {
      return state.signupError
    },
    getWallets(state) {
      return state.wallets
    },
  },
  actions: {
    loginWithEmailAndPassword({ commit }, userData) {
      return axios
        .post('/api/v1/users/login', userData)
        .then(res => {
          const user = res.data
          localStorage.setItem('money-manager-jwt', user.token)
          commit('setAuthUser', user)
          router.push('/')
        })
        .catch(err => rejectError(err))
    },
    registerUser(context, userData) {
      return axios
        .post('/api/v1/users/signup', userData)
        .catch(err => rejectError(err))
    },
    getAuthUser({ commit, getters }) {
      const authUser = getters['authUser']
      const token = localStorage.getItem('money-manager-jwt')
      const isTokenValid = checkTokenValidity(token)

      if (authUser && isTokenValid) {
        return Promise.resolve(authUser)
      }
      const config = {
        headers: {
          'Cache-Control': 'no-cache',
        },
      }

      return axiosInstance
        .get('/api/v1/users/me', config)
        .then(res => {
          const user = res.data
          localStorage.setItem('money-manager-jwt', user.token)
          commit('setAuthUser', user)
          if (!user) {
            router.push(`/login`)
          }
          return user
        })
        .catch(err => {
          commit('setAuthUser', null)
          return err
        })
    },
    logout({ commit }) {
      // Only for session authentication
      // return axios
      //   .post('/api/v1/users/logout')
      //   .then(() => {
      //     commit('setAuthUser', null)
      //     return true
      //   })
      //   .catch(err => {
      //     return err
      //   })
      return new Promise((resolve, reject) => {
        localStorage.removeItem('money-manager-jwt')
        commit('setAuthUser', null)
        console.log(reject)
        resolve(true)
      })
    },
    //Get wallets
    getUserWallets({ getters }) {
      const authUser = getters['authUser']
      const token = localStorage.getItem('money-manager-jwt')
      const isTokenValid = checkTokenValidity(token)
      if (authUser && isTokenValid) {
        const config = {
          headers: {
            'Cache-Control': 'no-cache',
          },
        }

        return axiosInstance
          .get('/api/v1/wallets/', config)
          .catch(err => console.error(err))
      }
    },
    createWallet({ getters }, walletData) {
      const isAuthenticated = getters['isAuthenticated']
      if (!isAuthenticated) {
        return Promise.reject('Not authenticated!')
      }
      //const authUser = getters['authUser']
      //walletData.owners.push(authUser._id)
      //console.log('Added owners ', walletData)
      axios
        .post('/api/v1/wallets/create', walletData)
        .catch(err => rejectError(err))
    },
    updateWallet({ getters }, walletData) {
      const isAuthenticated = getters['isAuthenticated']
      if (!isAuthenticated) {
        return Promise.reject('Not authenticated!')
      }
      //const authUser = getters['authUser']
      //walletData.owners.push(authUser._id)
      //console.log('Added owners ', walletData.owners)
      //console.log('Wallet Data ', walletData)

      axiosInstance
        .post('/api/v1/wallets/update', walletData)
        .catch(err => rejectError(err))
    },
    deleteWallet({ getters }, wallet) {
      const isAuthenticated = getters['isAuthenticated']
      const authUser = getters['authUser']
      if (!isAuthenticated || !authUser) {
        return Promise.reject('Not authenticated!')
      }
      //console.log('Wallet id is ', wallet)
      return axiosInstance.post('/api/v1/wallets/delete', {
        ...wallet,
        creator: authUser,
      })
    },
    getPublicUserData() {
      return axios.get('/api/v1/users/')
    },
    getIssueParts() {
      axios
        .get('/api/v1/issue/')
        .then(res => {
          return res.data
        })
        .catch(err => {
          return err
        })
    },
    makeRecord({ getters }, formData) {
      const isAuthenticated = getters['isAuthenticated']
      if (!isAuthenticated) {
        return 'error'
      }
      const authUser = getters['authUser']
      formData['creator'] = authUser._id
      //console.log('Make record data', formData)
      axios.post('/api/v1/history/makerecord/', formData)
    },
    getHistory({ getters }) {
      const authUser = getters['authUser']
      const token = localStorage.getItem('money-manager-jwt')
      const isTokenValid = checkTokenValidity(token)
      if (authUser && isTokenValid) {
        const config = {
          headers: {
            'Cache-Control': 'no-cache',
          },
        }

        return axiosInstance
          .get('/api/v1/history/', config)
          .catch(err => console.error(err))
      }
    },
  },
  mutations: {
    setAuthUser(state, user) {
      return (state.user = user)
    },
    addUserWallets(state, wallets) {
      return (state.wallets = wallets)
    },
  },
}

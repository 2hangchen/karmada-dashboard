import {
  setToken,
  getToken,
  removeToken,
  setUserInfo,
  removeUserInfo
} from '@/utils/auth'
import { jLogin } from '@/api/user'
// import Cookies from 'js-cookie';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username } = userInfo
    return Promise.all([jLogin(userInfo)])
      .then(response => {
        if (response[0].code === 200) {
          commit('SET_TOKEN', response[0].data.token)
          commit('SET_NAME', username)
          setUserInfo(username)
          setToken(response[0].data.token)
          return Promise.resolve()
        }
        return Promise.reject('用户名或密码不正确')
      })
      .catch(error => {
        return Promise.reject(new Error(error || 'Error'))
      })
  },

  logout({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_NAME', null)
      removeToken()
      removeUserInfo()

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

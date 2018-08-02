import Cookies from 'js-cookie'

const state = {
  accessToken: '',
  userLoginMsg: '',
  account: '',
  uid: '',    // uid
  name: '',   // 用户名
  role: '',   // 角色分组
  online: '',   // 在线状态
  mobile: '',  // 手机号
  oauthId: ''  // oauthId
}

const getters = {}

const mutations = {
  setAccessToken: (state, data) => {
    if (data) {
      Cookies.set('accessToken', data)
    } else {
      Cookies.remove('accessToken')
    }
    state.accessToken = data
  },
  setToken: (state, data) => {
    if (data) {
      Cookies.set('token', data)
    } else {
      Cookies.remove('token')
    }
    state.token = data
  },
  setMsg: (state, data) => {
    state.userLoginMsg = data
  },
  setUID: (state, data) => {
    state.uid = data
  },
  setAccount: (state, data) => {
    state.account = data
  },
  setName: (state, data) => {
    state.name = data
  },
  setRole: (state, data) => {
    state.role = data
  },
  setOnline: (state, data) => {
    state.online = data
  },
  setMobile: (state, data) => {
    state.mobile = data
  },
  setOauthId: (state, data) => {
    state.oauthId = data
  }
}

const actions = {
  // 登出
  logout({ commit }) {
   
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

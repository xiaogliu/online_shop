import Vue from 'vue';
import Vuex from 'vuex';
import * as Cookie from 'js-cookie';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    activeSubmenuUrl: 'client',
    userInfo: {},
    isLogin: false,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookie.get(key),
        setItem: (key, value) => Cookie.set(key, value),
        removeItem: key => Cookie.remove(key),
      },
    }),
  ],
  mutations: {
    changeSubmenuUrl(state, path) {
      state.activeSubmenuUrl = path;
    },
    updateUserInfo(state, data) {
      state.userInfo = data;
    },
    initialVuex(state) {
      state.activeSubmenuUrl = 'client';
      state.userInfo = {};
      state.isLogin = false;
    },
    changeLoginState(state, data) {
      state.isLogin = data;
    },
  },
});

export default store;

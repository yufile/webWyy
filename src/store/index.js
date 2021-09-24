import {createStore} from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

const store = createStore({
  state: {
    songlistpath: '',
    keepIdList: [],
    dishIndex: 0,
    songIndex: 0
  },
  mutations: {
    SongListPath(state, payload) {
      state.songlistpath = payload
    },
    keepId(state, payload) {
      let a = state.keepIdList.findIndex(item => {
        return item.id === payload.id
      })
      if(a !== -1) {
        state.keepIdList.splice(a,1);
      }
      state.keepIdList.unshift(payload)
    }
  },
  actions: {
    disposeId(state, payload) {
      state.commit('keepId', payload)
    }
  },
  getters: {},
  modules: {},
  plugins: [
    createPersistedstate()
  ]
})

export default store
import Vue from 'vue'
import Vuex from 'vuex'
import disease360 from './disease360'
import diseaseEntry from './diseaseEntry'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTitle: '',
    pathRoutes: []
  },
  mutations: {
    setPathRoutes (state, v) {
      if (state.pathRoutes.length) {
        const oname = v.title
        const name = localStorage.getItem('userName') + oname
        state.pathRoutes.map((ele) => {
          if (ele.title !== v.title) {
            v.title = name
            state.pathRoutes.push(v)
          }
        })
      } else {
        if (localStorage.getItem('pathRoutes')) {
          state.pathRoutes = JSON.parse(localStorage.getItem('pathRoutes'))
        } else {
          state.pathRoutes.push(v)
        }
      }
      state.pathRoutes.length = v.index
      localStorage.setItem('pathRoutes', JSON.stringify(state.pathRoutes))
    }
  },
  modules: {
    disease360: { ...disease360 },
    diseaseEntry: { ...diseaseEntry }
  }
})

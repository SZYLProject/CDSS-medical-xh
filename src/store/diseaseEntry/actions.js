import api from '@/request'
import TYPES from '../type'
const actions = {
  apiGetDepartmentToolsSelect ({ commit }, v) {
    api.diseaseEntry
      .apiGetDepartmentToolsSelect({})
      .then(res => {
        res = res.data
        commit(TYPES.SETSAVELIST, res)
        commit(TYPES.LOADINGCHANGE)
      })
      .catch(err => {
        console.log(err)
        commit(TYPES.LOADINGCHANGE)
      })
  },
  apiPostAtientTableSelect ({ commit }, v) {
    api.diseaseEntry
      .apiPostAtientTableSelect(v)
      .then(res => {
        if (res.status === '1') {
          commit(TYPES.STATUESERROY, { message: res.message, type: 'error' })
        } else {
          commit(TYPES.SETTABALEDATA, res)
        }
        commit(TYPES.LOADINGCHANGE)
      })
      .catch(err => {
        console.log(err)
        commit(TYPES.LOADINGCHANGE)
      })
  }
}

export default actions

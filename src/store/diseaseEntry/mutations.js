import Vue from 'vue'
import TYPES from '../type'
const mutations = {
  [TYPES.SETSAVELIST] (state, v) {
    const listMap = new Map()
    for (let index = 0; index < v.length; index++) {
      const ele = v[index]
      if (listMap.has(ele.department)) {
        const mapItem = listMap.get(ele.department)
        mapItem.children.push(ele)
      } else {
        listMap.set(ele.department, {
          id: ele.dep_id,
          title: ele.department,
          children: [ele]
        })
      }
    }
    state.cards = listMap
    state.saveList = listMap
  },
  [TYPES.LOADINGCHANGE] (state) {
    state.loading = false
  },
  [TYPES.SETTABALEDATA] (state, res) {
    state.tableDataAll = res.total
    state.tableData = res.data || []
    // console.log(total, v, 'this')
    // state.tableData = state.tableDataAll.slice(
    //   (state.pageMsg.currentPage - 1) * state.pageMsg.pageSize,
    //   state.pageMsg.currentPage * state.pageMsg.pageSize
    // )
  },
  // [TYPES.SETPAGELIST] (state, v) {
  //   state.pageMsg.currentPage = v.currentPage
  //   state.tableData = state.tableDataAll.slice(
  //     (state.pageMsg.currentPage - 1) * state.pageMsg.pageSize,
  //     state.pageMsg.currentPage * state.pageMsg.pageSize
  //   )
  // },
  [TYPES.STATUESERROY] (state, v) {
    Vue.prototype.$message({
      showClose: true,
      message: v.message,
      type: v.type
    })
  },
  [TYPES.SEARCHCARDLIST] (state, v) {
    if (v) {
      const searchMap = new Map()
      state.cards = searchMap.set(v, state.saveList.get(v))
    } else {
      state.cards = state.saveList
    }
  }
}
export default mutations

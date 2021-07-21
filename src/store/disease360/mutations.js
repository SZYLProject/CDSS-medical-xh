import Vue from 'vue'
import TYPES from '../type'
import { zoom } from '@/utils/animate'
// import router from '@/router/index'
import currentScience from '@/config'
let preType
const mutations = {
  /** ********************************高级搜索值增删改查：START*************** */
  // 清除高级搜索列表
  [TYPES.CLEARSEARCHFILTERS] (state, data) {
    state.searchFilters = [
      {
        relation: '',
        theme: '',
        condition: '',
        range: '',
        children: [],
        presentation_type: null,
        label: null,
        value: null,
        publicInfoModel: null
      }
    ]
  },
  // 相似病例：高级搜索赋值，当高级搜索第一列选择条件后
  [TYPES.UPDATAONADDChILDFILTER] (state, v) {
    var searchFiltersLengthNumList = 0
    for (let i = 0; i < state.searchFilters.length; i++) {
      searchFiltersLengthNumList += state.searchFilters[i]?.children.length
    }

    searchFiltersLengthNumList += state.searchFilters.length

    const item = state.searchDataList[v.data2]?.children[v.data3]
    if (state.treeListIndex.childIndex === null) {
      state.searchFilters[state.treeListIndex.parentIndex].label =
        item.disease_info_title
      state.searchFilters[state.treeListIndex.parentIndex].value =
        searchFiltersLengthNumList +
        '-' +
        item.id +
        '-' +
        item.disease_info_title
      state.searchFilters[state.treeListIndex.parentIndex].publicInfoModel =
        item.publicInfoModel
    } else {
      state.searchFilters[state.treeListIndex.parentIndex].children[
        state.treeListIndex.childIndex
      ].label = item.disease_info_title
      state.searchFilters[state.treeListIndex.parentIndex].children[
        state.treeListIndex.childIndex
      ].value =
        searchFiltersLengthNumList +
        '-' +
        item.id +
        '-' +
        item.disease_info_title
      state.searchFilters[state.treeListIndex.parentIndex].children[
        state.treeListIndex.childIndex
      ].publicInfoModel = item.publicInfoModel
    }
  },
  // 相似病例高级搜索第一列：添加children事件
  [TYPES.ONADDChILDFILTER] (state, v) {
    const obj = {
      theme: '',
      condition: '',
      range: '',
      presentation_type: null,
      label: null,
      value: null,
      publicInfoModel: null
    }
    state.searchFilters[v].children.push(obj)
  },
  // 删除children数据
  [TYPES.ONDELCHILDFLITER] (state, { index, idx }) {
    state.searchFilters[index].children.splice(idx, 1)
  },
  // 添加一条数据事件
  [TYPES.ONADDFLITER] (state) {
    const obj = {
      relation: 'and', // 默认为且
      theme: '',
      condition: '',
      range: '',
      children: [],
      presentation_type: null,
      label: null,
      value: null,
      publicInfoModel: null
    }
    state.searchFilters.push(obj)
    console.warn(state.searchFilters)
  },
  // 删除数据
  [TYPES.ONDELFLITER] (state, index) {
    state.searchFilters.splice(index, 1)
  },
  // 搜索主题的搜索项数据 修改
  [TYPES.SEARCHDATALIST] (state, data) {
    state.searchDataList = Object.assign(data)
  },
  // 高级搜索弹出框选择后进行赋值
  [TYPES.SEARCHDATAINDEX] (state, data) {
    state.searchDataIndex = data
  },
  /** ********************************高级搜索：值增删改查：END*************** */

  /** *******************************echarts饼形图、柱状图修改：START*************** */

  // 修改饼形图数据：暂未用到
  [TYPES.UPDATACHARTLISTPIE] (state, data) {
    const dataTest = []
    for (let i = 0; i < Object.keys(data).length; i++) {
      dataTest.push({
        title: Object.keys(data)[i],
        data: []
      })
      // const keydata = Object.keys(data)[i]

      // dataTest[i].treatmentDataX = Object.keys(data[keydata])
      // dataTest[i].treatmentDataY = Object.values(data[keydata])
      // dataTest[i].treatmentDataY = dataTest[i].treatmentDataY.map(item => {
      //   return item.toFixed(2)
      // })
    }
    console.log(dataTest)
    state.chartList = dataTest
  },
  // 高级搜索修改柱状图数据
  [TYPES.UPDATACHARTLIST] (state, data) {
    const dataTest = []

    for (let i = 0; i < data.length; i++) {
      dataTest.push({
        title: data[i][0]?.tap,
        treatmentDataX: [],
        treatmentDataY: [],
        totalList: []
      })

      // const keydata = Object.keys(data)[i] // 当前data对象中的某个对象名
      // dataTest[i].treatmentDataX =  Object.keys(data[keydata])
      // dataTest[i].treatmentDataY = Object.values(data[keydata])
      // dataTest[i].treatmentDataY = dataTest[i].treatmentDataY.map(item => {
      //   return item.toFixed(2)
      // })
      dataTest[i].treatmentDataX = data[i].map((item, index) => {
        return item.title
      })
      dataTest[i].totalList = data[i].map((item, index) => {
        return item.total
      })
      // 只要前十个，解决相隔无字
      dataTest[i].treatmentDataX = dataTest[i].treatmentDataX.splice(0, 10)
      dataTest[i].treatmentDataY = data[i].map(item => {
        return Number(item.percent.toFixed(2))
      })
    }
    // 过滤掉无值的
    // const dataValue = dataTest.filter(item => {
    //   return item.treatmentDataX.length > 0
    // })
    // state.chartList = dataValue

    state.chartList = dataTest // 更新高级检索的柱状图
  },
  // 初始化更新柱状图
  [TYPES.UPDATACHARTLISTDEFAULT] (state, data) {
    const dataTest = []

    for (let i = 0; i < data.length; i++) {
      dataTest.push({
        title: data[i][0]?.tap,
        treatmentDataX: [],
        treatmentDataY: [],
        totalList: []
      })

      // const keydata = Object.keys(data)[i] // 当前data对象中的某个对象名
      // dataTest[i].treatmentDataX =  Object.keys(data[keydata])
      // dataTest[i].treatmentDataY = Object.values(data[keydata])
      // dataTest[i].treatmentDataY = dataTest[i].treatmentDataY.map(item => {
      //   return item.toFixed(2)
      // })
      dataTest[i].treatmentDataX = data[i].map((item, index) => {
        return item.title
      })
      dataTest[i].totalList = data[i].map((item, index) => {
        return item.total
      })
      // 只要前十个，解决相隔无字
      dataTest[i].treatmentDataX = dataTest[i].treatmentDataX.splice(0, 10)
      dataTest[i].treatmentDataY = data[i].map(item => {
        return Number(item.percent.toFixed(2))
      })
    }
    // 过滤掉无值的
    // const dataValue = dataTest.filter(item => {
    //   return item.treatmentDataX.length > 0
    // })
    // state.chartList = dataValue

    state.chartListDefault = dataTest // 初始化更新相似病例的柱状图数据
    state.chartList = dataTest // 初始化更新高级检索的柱状图数据
  },
  // 线形图:初始化Title后：修改title和属性
  [TYPES.UPDATACHARTTITLEDATA] (state, data) {
    const header = data.map((item, index) => {
      return {
        name: item.label,
        index: String(index),
        title: item.label
      }
    })
    // 初始化赋值
    state.chartData.schema = JSON.parse(JSON.stringify(header))
    state.chartData.parallelAxis = JSON.parse(JSON.stringify([]))
    for (let i = 0; i < data.length; i++) {
      state.chartData.parallelAxis.push({
        dim: String(i),
        name: data[i].label,
        type: 'category',
        data: [],
        numType: 0
      })
      if (data[i].publicInfoModel) {
        for (let j = 0; j < data[i].publicInfoModel.length; j++) {
          state.chartData.parallelAxis[i].data.push(
            data[i].publicInfoModel[j].public_info_title
          )
        }
        console.log('111111')
      }
      if (data[i].publicInfoModel.length <= 0) {
        console.log(state.chartData.dataBJ, 'state.chartData.dataBJ')
        state.chartData.parallelAxis[i].numType = 1
      }
    }
  },
  // 线形图:初始化和AI数据后：添加title下的无值的属性
  [TYPES.UPDATACHARTTITLEDATANEXT] (state, data) {
    for (let i = 0; i < state.chartData.parallelAxis.length; i++) {
      const r = []
      for (let j = 0; j < state.chartData.dataBJ.length; j++) {
        r.push(state.chartData.dataBJ[j][i])
      }
      console.log(r, 'r')

      if (state.chartData.parallelAxis[i].numType === 1) {
        state.chartData.parallelAxis[i].data = r.filter(function (
          element,
          index,
          self
        ) {
          return self.indexOf(element) === index
        })
        state.chartData.parallelAxis[i].numType = 0
      }
    }
  },

  // 线条图: 高级检索后：修改title及属性
  [TYPES.UPDATAONADDChILDFILTERTitle] (state, data) {
    const updatDataList = JSON.parse(JSON.stringify(state.searchFilters))
    for (let i = 0; i < state.searchFilters.length; i++) {
      updatDataList.splice(i, 0, ...state.searchFilters[i]?.children)
    }

    // this.commit('UPDATACHARTTITLEDATA', updatDataList)
    // [TYPES.UPDATACHARTTITLEDATA](updatDataList)
    const header = updatDataList.map((item, index) => {
      return {
        name: item?.label || '',
        index: String(index),
        title: item?.label || ''
      }
    })
    // 搜索后赋值
    state.chartData.schema = JSON.parse(JSON.stringify(header))
    state.chartData.parallelAxis = JSON.parse(JSON.stringify([]))
    state.chartData.schemaNameTemporary = []
    for (let i = 0; i < updatDataList.length; i++) {
      state.chartData.parallelAxis.push({
        dim: String(i),
        name: updatDataList[i]?.label || '',
        type: 'category',
        data: [],
        numType: 0
      })

      if (updatDataList[i].publicInfoModel) {
        for (let j = 0; j < updatDataList[i].publicInfoModel?.length; j++) {
          state.chartData.parallelAxis[i].data.push(
            updatDataList[i].publicInfoModel[j].public_info_title
          )
        }
      } else {
        state.chartData.parallelAxis[i].numType = 1
        state.chartData.schemaNameTemporary.push({
          value: updatDataList[i].theme.split('-')[3],
          index: i
        })
      }
      if (updatDataList[i].publicInfoModel?.length === 0) {
        state.chartData.parallelAxis[i].numType = 1
        state.chartData.schemaNameTemporary.push({
          value: updatDataList[i].theme.split('-')[3],
          index: i
        })
        console.log(
          state.chartData.schemaNameTemporary,
          'state.chartData.schemaNameTemporary'
        )
      }
    }
    console.log(state.chartData, 'state.chartData')
  },
  // 线条图:：初始化和高级检索和AI和后：添加title下的无值的data属性
  [TYPES.UPDATACHARTDATAPARALLELAXISDATA] (state, res) {
    for (
      let index = 0;
      index < state.chartData.schemaNameTemporary.length;
      index++
    ) {
      const data2 = state.chartData.schemaNameTemporary[index].value
      const dataIndex = state.chartData.schemaNameTemporary[index].index
      const tempalData = res.map(item => {
        return item[data2]
      })
      // 数组去重
      const r = tempalData.filter(function (element, index, self) {
        return self.indexOf(element) === index
      })

      if (state.chartData.parallelAxis[dataIndex].numType === 1) {
        state.chartData.parallelAxis[dataIndex].data = r
        state.chartData.parallelAxis[dataIndex].numType = 0
      }
    }
    console.log(state.chartData.parallelAxis, 'parallelAxis')
  },
  [TYPES.CONDITIONLIST] (state, data) {
    state.conditionList = data
  },
  // 线性图：初始化和高级搜索和AI后：修改展示数据
  [TYPES.CHARTDATA] (state, data) {
    const headerData = []
    for (let i = 0; i < data.data.length; i++) {
      headerData.push([])
      for (let j = 0; j < state.chartData.schema.length; j++) {
        const constdata = [state.chartData.schema[j].title]
        headerData[i].push(data.data[i][constdata])
      }
      headerData[i][0] = headerData[i][0]?.split('/')[0] // 赋值数组值
    }
    state.chartData.dataBJ = JSON.parse(JSON.stringify(headerData))
  },

  /** *******************************echarts饼形图、柱状图修改：END*************** */

  [TYPES.SETDISEASEINFOSELECTDATA] (state, v) {
    console.log(v)
    state.diseaseInfoSelectData = v
    // state.diseaseInfoSelectData.diseaseInfo = v
    state.diseaseInfoSelectData.displyTreatments = v.displyTreatments
    state.diseaseInfoSelectData.finished = true
    state.diseaseInfoSelectData.basicInfoModel = v.basicInfoModel
    state.diseaseInfoSelectData.pathologyInfo = v.pathologyInfo
    state.diseaseInfoSelectData.vtaurants = v.vtaurants
    state.diseaseInfoSelectData.chartData = v.chartData
    state.diseaseInfoSelectData.chartList = v.chartList
  },
  [TYPES.FULLSCREENLOADING] (state, v) {
    Vue.set(state.diseaseInfoSelectData, 'fullscreenLoading', v)
  },
  [TYPES.SETFINISHED] (state, v) {
    Vue.set(state.diseaseInfoSelectData, 'finished', true)
  },

  // 搜索主题下拉框
  [TYPES.ONSHOWTOAST] (state, obj) {
    console.log(obj, 'obj')
    state.treeListIndex.parentIndex = obj.parentIndex
    state.treeListIndex.childIndex = obj.childIndex

    // if (obj.parentIndex === 3 || obj.parentIndex === 4) return
    state.dialogShow = true
    if (obj.isSearch) {
      state.themeObj = { ...obj }
      state.componentForm = 'FormDialog'
    } else {
      const diseaseInfoModel = JSON.parse(
        localStorage.getItem('diseaseInfoModel')
      )
      state.componentForm = 'FormDialogEdit'
      state.dialogTitle = diseaseInfoModel[obj.childIndex]?.disease_info_title
      let vultArr = []
      const recursiveArr = function (arr) {
        if (Array.isArray(arr)) {
          arr.forEach(ele => {
            if (ele.children && Array.isArray(ele.children)) {
              return recursiveArr(ele.children)
            } else {
              vultArr.push(ele)
            }
          })
        } else {
          vultArr = []
        }
      }
      recursiveArr(diseaseInfoModel[obj.childIndex].children)
      vultArr.map((ele, index, array) => {
        if (ele.multiselect === 1) {
          const arrm = (ele.disease_info_title_value
            ? ele.disease_info_title_value
            : ''
          )?.split(',')
          array[index].smoveList = arrm.filter(e => {
            return e
          })
        }
        if (ele.disease_info_title === 'ECOG-PS评分') {
          state.publicInfoModel = ele.publicInfoModel
          ele.publicInfoModel.map(opt => {
            if (opt.public_info_title === ele.disease_info_title_value) {
              state.optionTip = opt.public_info_title_value
            }
          })
        }
      })
      state.formItems = vultArr
      console.log(vultArr)
    }
  },
  [TYPES.ONCHANGEOPTION] (state, v) {
    state.publicInfoModel.map(opt => {
      if (opt.public_info_title === v) {
        state.optionTip = opt.public_info_title_value
      }
    })
  },
  [TYPES.CLOSEDIALOG] (state) {
    state.dialogShow = false
    state.activeName = '0'
  },
  [TYPES.ONADDSEARCHITEM] (state) {
    state.dialogShow = false
    if (state.themeObj.isParent) {
      state.searchFilters[state.themeObj.parentIndex].theme =
        state.searchDialogForm.theme
    } else {
      state.searchFilters[state.themeObj.parentIndex].children[
        state.themeObj.childIndex
      ].theme = state.searchDialogForm.theme
    }
  },
  [TYPES.SETDRAWERDOM] (state, v) {
    state.drawerDom = v
  },
  [TYPES.SETSUBMITLOADING] (state, v) {
    state.submitLoading = v
  },
  /**
   * onShoworCloseDrawer : 显示/隐藏抽屉
   * params type（1：方案推荐、2：相似病例、3：文案检索、0：关闭）
   */
  [TYPES.ONSHOWORCLOSEDRAWER] (state, { drawer, type = 1 }) {
    // console.log(type)
    // 全景图注释
    // if (type === 4) {
    //   // router.push('DiseaseDetail360History')
    //   const patientId = localStorage.getItem('patientId')
    //   window.open(`${currentScience.jumpUrl}?patientId=${patientId}`, '_blank')
    //   return
    // }type
    state.screenWidth = document.body.clientWidth
    state.drawer = true
    if (type !== 0) {
      state.defaultTab = type - 1
    }
    let stap = 22
    switch (type) {
      case 1:
        state.draweWidth = parseInt(state.screenWidth * 0.4)
        stap = 22
        state.componentDefault = 'SchemeRecommendation'
        break
      case 2:
        state.draweWidth = parseInt((state.screenWidth * 9) / 10)
        stap = 40
        state.componentDefault = 'SimilarCases'
        preType = type
        break
      case 3:
        state.componentDefault = 'DocumentRetrieval'
        state.draweWidth = parseInt(state.screenWidth * 0.4)
        stap = 22
        break
      case 4:
        state.componentDefault = 'Feedback'
        state.draweWidth = parseInt(state.screenWidth * 0.4)
        stap = 22
        break
      // case 4:
      //   state.componentDefault = 'FollowUp'
      //   state.draweWidth = parseInt(state.screenWidth * 0.26)
      //   stap = 22
      //   break
      case 5:
        state.componentDefault = 'FollowUp'
        state.draweWidth = parseInt(state.screenWidth * 0.26)
        stap = 22
        break
      default:
        break
    }
    if (type === 0 && preType === 2) {
      stap = 60
    }
    zoom(stap, state.drawerDom, 'width', state.draweWidth, 10, type)
  }
}
export default mutations

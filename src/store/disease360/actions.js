import TYPES from '../type'
import api from '@/request/index'
import Vue from 'vue'
const actions = {
  apiGetDiseaseInfoSelectHCForm ({ commit }, { drawer, query }) {
    const param = {
      patient_id: localStorage.getItem('patientId'),
      num_hospital: localStorage.getItem('numHospital'),
      disease_name: localStorage.getItem('disease_name')
    }
    commit(TYPES.FULLSCREENLOADING, true)
    commit(TYPES.SETFINISHED)
    api.diease360
      .apiGetDiseaseInfoSelectHC(param)
      .then(res => {
        if (res.status === '1') {
          Vue.prototype.$message.error(res.message)
          commit(TYPES.FULLSCREENLOADING, false)
        } else {
          commit(TYPES.SETDISEASEINFOSELECTDATA, res.data)

          // 配置全科的不显示方案推荐
          // eslint-disable-next-line no-unused-vars
          let drawerType = 1
          if (localStorage.getItem('department') === '全科') {
            drawerType = 2
          }
          commit(TYPES.ONSHOWORCLOSEDRAWER, { drawer, type: drawerType })
          const diseaseInfoModelData = res.data.diseaseInfoModel
          // diseaseInfoModelData[1].children.splice(3, 1)
          localStorage.setItem(
            'diseaseInfoModel',
            JSON.stringify(diseaseInfoModelData)
          )
        }
      })
      .catch(err => {
        console.log(err)
        commit(TYPES.FULLSCREENLOADING, false)
        Vue.prototype.$message.error(JSON.stringify(err))
        // this.fullscreenLoading = false
        // this.finished = true
      })
  },
  apiPostEdit (context, { query }) {
    context.commit(TYPES.SETSUBMITLOADING, true)
    const submitArr = [...context.state.formItems]
    submitArr.map((ele, index, array) => {
      const obj = {}
      obj.disease_info_title = ele.disease_info_title
      obj.disease_info_title_unit = ele.disease_info_title_unit
      if (Array.isArray(ele.smoveList)) {
        const arr = [...new Set(ele.smoveList)]
        const str = arr.join(',')
        obj.disease_info_title_value = str
      } else {
        obj.disease_info_title_value = ele.disease_info_title_value
      }
      array[index] = obj
    })
    let param = {}
    console.log(query.split('&'))
    if (query.split('&').length > 1) {
      query.split('&').map(e => {
        param[e.split('=')[0]] = e.split('=')[1]
        param.diseaseInfoModel = submitArr
      })
    } else {
      param = {
        patient_id: localStorage.getItem('patientId'),
        num_hospital: localStorage.getItem('numHospital'),
        diseaseInfoModel: submitArr,
        disease_name: localStorage.getItem('disease_name')
      }
    }

    api.diease360
      .apiUpdateDiseaseInfo(param)
      .then(res => {
        if (res.status === '1') {
          Vue.prototype.$message.error(res.message)
          context.commit(TYPES.SETSUBMITLOADING, false)
        } else {
          context.commit(TYPES.SETSUBMITLOADING, false)
          context.commit(TYPES.CLOSEDIALOG)
          context.dispatch('apiGetDiseaseInfoSelectHCForm', {
            drawer: null,
            query
          })
          Vue.prototype.$message({
            message: '修改成功！',
            type: 'success'
          })
        }
      })
      .catch(err => {
        console.log(err)
        context.commit(TYPES.CLOSEDIALOG)
        context.commit(TYPES.SETSUBMITLOADING, false)
      })
  }
}

export default actions

<template>
  <div v-if="diseaseInfoModel" style="overflow-y: scroll; overflow-x:hidden；">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-form-item
          :label="diseaseInfoModel[0].disease_info_title.substring(0, 4)"
        >
        </el-form-item>
        <!-- <el-button
          size="mini"
          :loading="formLoad"
          type="primary"
          round
          @click="onSubmit"
          >提交</el-button
        > -->
      </el-form-item>
    </el-form>
    <el-form
      ref="form"
      label-width="100px"
      size="mini"
      v-for="(item, i) in diseaseInfoModel[0].children"
      :key="i"
    >
      <!-- 第二层输入框 -->
      <el-form-item
        :label="item.disease_info_title"
        v-if="item.presentation_type === '1'"
      >
        <el-form-item v-for="(item1, j) in item.children" :key="j">
          <div
            style="margin-right:20px;color:#606266; weight:500;font-size:14px;font-family:'Helvetica'"
          >
            {{ item1.disease_info_title }}:
          </div>
          <el-input
            style="width:150px;"
            v-model="item1.disease_info_title_value"
          >
            <template slot="append" v-if="item1.disease_info_title_unit">{{
              item1.disease_info_title_unit
            }}</template>
          </el-input>
        </el-form-item>
      </el-form-item>
      <!-- 第二层多选框 -->
      <el-form-item
        v-else-if="item.presentation_type !== '1' && !item.children[0].children"
        :label="item.disease_info_title"
      >
        <el-checkbox-group v-model="item.childrenList">
          <el-checkbox
            v-for="(item2, index) in item.children"
            :key="index"
            :label="item2.disease_info_title"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 第三层多选框 -->
      <el-form-item
        v-else-if="item.presentation_type !== '1' && item.children[0].children"
        :label="item.disease_info_title"
      >
        <div>
          <el-form-item
            v-for="(it, a) in item.children"
            :key="a"
            :label="it.disease_info_title"
          >
            <el-checkbox-group v-model="it.childrenList">
              <el-checkbox
                v-for="(item2, index) in it.children"
                :key="index"
                :label="item2.disease_info_title"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-form-item>
    </el-form>
    <div
      style="display:flex; justify-content:center ; width:70%;margin-left:15%;margin-top:50px"
    >
      <el-button class="reSubmit" round style="width:100%" @click="reSubmit"
        >重置</el-button
      >
      <el-button
        class="onSubmit"
        :loading="formLoad"
        round
        style="width:100%"
        @click="onSubmit"
        >提交</el-button
      >
    </div>
    <div
      style="display:flex ;display: flex;
    justify-content: center;
    margin-top: 40px;"
    >
      <div>
        重症基础诊疗临床辅助系统仅提供辅助决策信息，诊疗意见以临床意见为准。当前为试用版，详细功能以最终注册信息为准。
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import api from '@/request/index'
// import func from 'vue-editor-bridge'

export default {
  data () {
    return {
      formLoad: false,
      list: ['腹胀', '呕吐'],
      diseaseInfoModel: null,
      diseaseInfoModelTem: null
    }
  },
  props: {
    diseaseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    ...mapState({
      pathologyInfo: state => state.disease360.pathologyInfo
    })
  },
  mounted () {
    this.diseaseInfoModelFun()
  },
  watch: {
    diseaseInfo () {
      this.diseaseInfoModelFun()
    }
  },
  methods: {
    diseaseInfoModelFun () {
      this.diseaseInfoModel = []
      this.diseaseInfoModel = JSON.parse(
        JSON.stringify(this.diseaseInfo?.diseaseInfoModel)
      )
      this.diseaseInfoModel[0].children = this.diseaseInfo?.diseaseInfoModel[0].children.map(
        item => {
          return {
            ...item,
            childrenList: []
          }
        }
      )
      for (
        let i = 0;
        i < this.diseaseInfo?.diseaseInfoModel[0].children.length;
        i++
      ) {
        this.diseaseInfoModel[0].children[
          i
        ].children = this.diseaseInfo?.diseaseInfoModel[0].children[
          i
        ].children.map(item => {
          return {
            ...item,
            childrenList: []
          }
        })
      }
      this.diseaseInfoModel[0].children.forEach(el => {
        if (el.presentation_type !== '1') {
          el.childrenList = el.children.map(item => {
            if (item.disease_info_title_value === 'y') {
              return item.disease_info_title
            }
          })
        }
      })
      for (
        let i = 0;
        i < this.diseaseInfo?.diseaseInfoModel[0].children.length;
        i++
      ) {
        this.diseaseInfoModel[0].children[i].children.forEach(el => {
          if (el.presentation_type !== '1') {
            el.childrenList = el.children?.map(item => {
              if (item.disease_info_title_value === 'y') {
                return item.disease_info_title
              }
            })
          }
        })
      }
      console.log(this.diseaseInfoModel, 'this.diseaseInfoModel')

      this.diseaseInfoModelTem = JSON.parse(
        JSON.stringify(this.diseaseInfoModel)
      )
    },
    updateDiseaseInfoSP () {
      const param = {
        diseaseInfoModel: this.updateDiseaseInfoSPFun(),
        num_hospital: localStorage.getItem('numHospital'),
        patient_id: localStorage.getItem('patientId')
      }

      api.diease360.apiUpdateDiseaseInfo(param).then(res => {
        if (res.status === '0') {
          this.formLoad = false
          this.$message.success('修改患者信息成功')

          this.$store.dispatch('disease360/apiGetDiseaseInfoSelectHCForm', {
            drawer: this.$refs.drawer,
            query: window.location.hash
              ? window.location.hash.split('?')[1]
              : ''
          })
        }
      })
    },
    updateDiseaseInfoSPFun () {
      // eslint-disable-next-line no-unused-vars
      let updataModel = []
      this.diseaseInfoModel[0].children.forEach(item => {
        if (item.presentation_type === '1') {
          updataModel = updataModel.concat(
            item.children.map(v => {
              return {
                disease_info_title: v.disease_info_title,
                disease_info_title_unit: v.disease_info_title_unit,
                disease_info_title_value: v.disease_info_title_value
              }
            })
          )
        } else if (
          item.presentation_type !== '1' &&
          !item.children[0].children
        ) {
          // updataModel.concat(item.children.map())
          item.children.forEach(el => {
            if (item.childrenList.indexOf(el.disease_info_title) !== -1) {
              updataModel.push({
                disease_info_title: el.disease_info_title,
                disease_info_title_unit: el.disease_info_title_unit,
                disease_info_title_value: el.disease_info_title_value
              })
            }
          })
        } else if (
          item.presentation_type !== '1' &&
          item.children[0].children
        ) {
          for (let i = 0; i < item.children.length; i++) {
            item.children[i].children.forEach(el => {
              if (
                item.children[i].childrenList.indexOf(el.disease_info_title) !==
                -1
              ) {
                updataModel.push({
                  disease_info_title: el.disease_info_title,
                  disease_info_title_unit: el.disease_info_title_unit,
                  disease_info_title_value: 'y'
                })
              }
            })
          }
        }
      })
      return updataModel
    },
    onSubmit () {
      this.formLoad = true
      this.updateDiseaseInfoSP()
      // setTimeout(() => {
      //   this.formLoad = false
      // }, 2000)
      // console.log('submit!')
    },
    reSubmit () {
      this.diseaseInfoModel = JSON.parse(
        JSON.stringify(this.diseaseInfoModelTem)
      )
      this.$message.success('重置患者信息成功')
    },
    ...mapMutations({
      ONSHOWTOAST: 'disease360/ONSHOWTOAST'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/commonPublic.scss';
/deep/.el-form-item--mini .el-form-item__content,
.el-form-item--mini .el-form-item__label {
  display: flex;
  justify-content: flex-start;
  // justify-content: space-evenly;
}
/deep/.el-form-item {
  padding-right: 0px;
}
.onSubmit {
  color: white;
  background: $publicBackground;
}
.reSubmit {
  background: #b2d6c5;
  color: #5b8b70;
}
/deep/.el-form-item__label {
  font-weight: 800;
}
</style>

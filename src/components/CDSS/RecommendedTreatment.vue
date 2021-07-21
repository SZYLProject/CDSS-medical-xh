<template>
  <div class="c-rt-wrap" >
    <div class="c-rt-m-c-wrap">
      <div class="c-rt-top-wrap mar-20">
      <p>
        <i class="el-icon-search" style="font-size:16px;font-weight: 800;"></i>
        <span>治疗方案推荐</span>
      </p>
    </div>
    <el-collapse  class="c-rt-t-m-wrap mar-20" v-model="activeNames" v-if = '$store.state.disease360.diseaseInfoSelectData.finished' @change="handleChange">
      <el-collapse-item :name="item.plan_num" v-for= '(item, index) in $store.state.disease360.diseaseInfoSelectData.displyTreatments' :key="index">
        <template slot="title">
          <i class="header-icon el-icon-document"></i> <span class="sub-title">{{item.plan_num}}</span><span>{{'---'+(index+1)}}</span>
        </template>
        <div v-for="(sub,idx) in item.displyTreatmentChild" :key="idx">
          <p>{{sub.treatment_way_name}}</p>
          <p>{{sub.ruleName}}</p>
          <p>{{sub.itemNote}}</p>
          <p>{{sub.itemContraind}}</p>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="c-rt-b-wrap mar-20">
      <el-tooltip class="item" effect="dark" content="编辑患者信息可重新生成治疗方案" placement="top-start" size = 'mini'>
        <p @click="onClickChild('edit')"><i class="el-icon-edit"></i><span>患者信息修改</span></p>
      </el-tooltip>
    </div>
    <div class="c-rt-bottom-wrap c-rt-top-wrap mar-20">
      <p><i class="el-icon-s-tools" style="font-size:16px;font-weight: 800;"></i><span>辅助工具</span></p>
    </div>
    <p @click="onClickChild('same')" class="sub-wrap mar-20"><i class="el-icon-suitcase"  style="font-size:13px;font-weight: 500;"></i><span>相似病例</span></p>
    <p @click="onClickChild('literature')" class="sub-wrap mar-20"><i class="el-icon-s-help" style="font-size:13px;font-weight: 500;"></i><span>文献检索</span></p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      activeNames: []
    }
  },
  methods: {
    ...mapMutations({
      ONSHOWTOAST: 'disease360/ONSHOWTOAST'
    }),
    onClickChild (v) {
      this.ONSHOWTOAST({ parentIndex: 1, childIndex: 0, isParent: false, isSearch: false })
      this.$emit('onClickChild', v)
    },
    handleChange (v) {
      console.log(v)
    }
  }
}
</script>

<style lang="scss" scoped>
.mar-20{
  margin: 20px;
}
.c-rt-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  .c-rt-m-c-wrap{
    flex: 1;
    overflow-y: auto;
  }
  .c-rt-top-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
      display: flex;
      align-items: center;
      span{
        font-size: 13px;
        font-weight: 600;
        margin-left: 8px;
      }
    }
  }
  .c-rt-t-m-wrap {
    margin: 10px 0;
    margin-top: 20px;
    border-radius: 4px;
    border: 1px solid rgba($color: #000000, $alpha: 0.04);
    /deep/ .el-collapse-item__header{
      border-bottom: none;
      background-color: rgba($color: #000000, $alpha: 0.02);
      padding: 0 20px;
    }
    /deep/ .el-collapse-item__content{
      padding:6px 6px 6px 20px;
      // max-height: 200px;
      overflow-y: auto;
    }
    .sub-title {
      padding-left: 6px;
      font-size: 12px;
    }
  }
  .c-rt-b-wrap {
    padding: 10px 20px;
    color: #303133;
    font-weight: 500;
    p{
      width: max-content;
      &:hover{
      color: #409EFF;
    }
    }
    span{
      padding-left: 6px;
    }
    border-bottom: 1px solid #eee;
  }
  .c-rt-bottom-wrap {
    padding: 20px 0;
  }
  .sub-wrap {
    padding: 10px 20px;
    &:hover{
      color: #409EFF;
    }
    span{
      padding-left: 6px;
      font-size: 12px;
      font-weight: 500;
    }
  }
}
</style>

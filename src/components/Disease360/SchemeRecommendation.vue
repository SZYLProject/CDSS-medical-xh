<template>
  <div class="scheme-wrap">
    <el-collapse v-model="activeNames" @change="handleChange" v-if="displyTreatments&&displyTreatments.length && finished">
      <el-collapse-item :title="item.plan_num" :name="item.plan_num" v-for="(item, index) in displyTreatments" :key="index">
        <div>{{item.itemNote}}</div>
        <div v-for="(child, idx) in item.displyTreatmentChild" :key="idx">
          <p class="padding-left-10 padding-bottom-10">{{child.treatment_way_name}}</p>
          <p class="padding-left-10 padding-bottom-10">{{child.ruleName}}</p>
          <p class="padding-left-10 padding-bottom-10">{{child.itemNote}}</p>
          <p class="padding-left-10 padding-bottom-10">{{child.itemDosage}}</p>
          <p class="padding-left-10 padding-bottom-10">{{child.itemContraind}}</p>
        </div>
      </el-collapse-item>
    </el-collapse>
    <Empty v-else></Empty>
  </div>
</template>

<script>

import { Collapse } from 'element-ui'
export default {
  props: {
    displyTreatments: {
      type: Array
    },
    finished: {
      type: Boolean
    }
  },
  data () {
    return {
      activeNames: []
    }
  },
  components: {
    [Collapse.name]: Collapse
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.scheme-wrap {
  position: absolute;
  left: 30px;
  right: 20px;
  bottom: 40px;
  top: 60px;
  overflow-y: auto;
  padding-bottom: 40px;
    // .ss {
    //   height: 2000px;
    //   width: 200px;
    //   background-color: #fff;
    // }

  /deep/ .el-collapse-item__header {
    background-color: transparent;
  }
  /deep/ .el-collapse-item__wrap {
    background-color: transparent;
    width: 90%;
    margin: 0 auto;
  }
}
</style>

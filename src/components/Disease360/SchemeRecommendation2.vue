<template>
  <div class="scheme-wrap">
    <el-collapse
      v-model="activeNames"
      @change="handleChange"
      v-if="displyTreatmentsData && displyTreatmentsData.length && finished"
    >
      <div v-if="diseaseInfoSelectData">
        {{ diseaseInfoSelectData.typeData }}
      </div>
      <el-collapse-item
        :title="item.recommendID"
        :name="item.recommendID + index"
        v-for="(item, index) in displyTreatmentsData"
        :key="index"
      >
        <p class="padding-left-10 padding-bottom-10">
          {{ item.recommendContent }}
        </p>
      </el-collapse-item>
    </el-collapse>
    <Empty v-else></Empty>
  </div>
</template>

<script>
import { Collapse } from 'element-ui'
import { mapState } from 'vuex'

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
      activeNames: [],
      displyTreatmentsData: []
    }
  },

  components: {
    [Collapse.name]: Collapse
  },
  computed: {
    ...mapState({
      diseaseInfoSelectData: state => state.disease360.diseaseInfoSelectData
    })
  },
  mounted () {
    this.displyTreatmentsFun()
    // console.log(this.diseaseInfoSelectData, 'this.diseaseInfoSelectData')
  },
  methods: {
    displyTreatmentsFun () {
      this.displyTreatments.forEach((item, index) => {
        if (item.recommendID === '抗感染方案推荐') {
          this.displyTreatmentsData.push(item)
        }
      })
    },
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
  right: 40px;
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

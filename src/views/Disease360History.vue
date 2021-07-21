<template>
  <div class="history-wrap">
    <HistoryInfo class="h-info-wrap border-bottom"></HistoryInfo>
    <div class="h-date-wrap">
      <span>2019/03/12 16:20:21</span><span>2019/08/10 11:10:31</span>
    </div>
    <div class="h-content-wrap shadow">
      <div class="h-c-top-wrap" >
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- <el-tab-pane label="用户管理" name="first" v-for="">用户管理</el-tab-pane> -->
        </el-tabs>
      </div>
      <div class="h-c-c-wrap">
        <DiseaseHistoryChart></DiseaseHistoryChart>
      </div>
    </div>
  </div>
</template>

<script>
import HistoryInfo from '@/components/Disease360/HistoryInfo'
import DiseaseHistoryChart from '@/components/Disease360/DiseaseHistoryChart'
export default {
  components: {
    HistoryInfo, DiseaseHistoryChart
  },
  data () {
    return {
      activeName: '2',
      checked: false,
      listTab: [
        { id: '1', title: '生命体征' },
        { id: '2', title: '合并症状况' },
        { id: '3', title: '实验室检查' },
        { id: '4', title: '治疗状况分析' }
      ]
    }
  },
  mounted () {
    // alert(2222)
  },
  methods: {
    handleClick () {

    }
  }
}
</script>

<style lang="scss" scoped>
.history-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  .h-info-wrap {
    min-height: 30px;
  }
  .h-date-wrap {
    height: 38px;
    background-color: skyblue;
    margin: 10px 20px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
  }
  .h-content-wrap {
    flex: 1;
    background-color: #fff;
    overflow-y: auto;
    margin: 0 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    .h-c-top-wrap {
      height: 60px;
      background-color: steelblue;
    }
    .h-c-c-wrap {
      flex: 1;
      background-color: slateblue;
      overflow-y: auto;
      padding-bottom: 30px;
      position: relative;
    }
  }
}
</style>

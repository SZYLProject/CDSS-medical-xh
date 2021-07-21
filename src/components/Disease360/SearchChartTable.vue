<template>
  <!-- <！-- 表格里面的数据源 -->
  <div class="chart-table-wrap">
    <el-table
      height="450"
      style="width: 100%"
      :data="tableData"
      border
      stripe
      empty-text="未找到相似病例"
    >
      <!--
      设置表头数据源，并循环渲染出来，property对应列内容的字段名，详情见下面的数据源格式
      -->
      <el-table-column
        v-for="info in HeaderData"
        :key="info.key"
        :property="info.key"
        :label="info.label"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row[scope.column.property] || '-' }}
          <!-- 渲染对应表格里面的内容 -->
        </template>
      </el-table-column>
      <el-table-column label="患者详情" align="center">
        <template slot-scope="scope"
          ><span class="detail-span" @click="onDetail(scope.row)"
            >患者详情</span
          ></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'searchChartTable',
  props: {
    tableData: {
      type: Array
    },
    HeaderData: {
      type: Array
    }
  },
  data () {
    return {}
  },
  methods: {
    onDetail (row) {
      this.$emit('onDetail', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-table-wrap {
  width: 100%;
  .detail-span {
    color: #409eff;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="document-retrieval-wrap">
    <div class="search-wrap shadow">
      <div class="search-btn-wrap">
        <el-autocomplete
          class="inline-input"
          v-model="state2"
          :fetch-suggestions="querySearch"
          placeholder="请输入检索关键词"
          :trigger-on-focus="false"
          @select="handleSelect"
          clearable
        >
        </el-autocomplete>
        <el-button type="primary" @click="onRetrieval">检索</el-button>
      </div>
      <div class="search-content-wrap" v-if = 'isShowRecommend'>
        <div class="search-result-wrap">
          <p>热门文献</p>
          <div class="url-wrap" v-for="link in defaultLinks" :key="link.title">
            <a href="">{{link.title}}</a>
          </div>
        </div>
      </div>
      <div v-else class="search-content-wrap">
        <el-table
          :data="restaurants"
          style="width: 100%">
          <el-table-column
            prop="value"
            label="检索结果"
            fixed
            >
            <template slot-scope="scope"><el-link type="primary" @click="onLink(scope.row)">{{scope.row.value}}</el-link></template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { Autocomplete, Button } from 'element-ui'
import { mapState } from 'vuex'
export default {
  name: 'documnetRetrieval',
  components: {
    [Autocomplete.name]: Autocomplete,
    [Button.name]: Button
  },
  data () {
    return {
      isShowRecommend: true,
      tableData: '',
      state1: '',
      state2: '',
      defaultLinks: [
        { title: '12.5Gb/s SerDes CDR中频率锁定环路的设计', url: '' },
        { title: '大型单中心医院登记的7753例肺癌手术患者生存报告:基于第8版国际肺癌TNM分期标准 ', url: '' },
        { title: '17至18世纪中国园林文化对英国园林转型的影响', url: '' },
        { title: '15例艾滋病合并巨细胞病毒肺炎的CT表现', url: '' },
        { title: '154例重症病毒性肺炎病原学及临床特征分析', url: '' },
        { title: '国医大师刘嘉湘从顾护脾胃论治肺癌经验', url: '' }
      ]
    }
  },
  computed: {
    ...mapState({
      restaurants: state => state.disease360.restaurants
    })
  },
  methods: {
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    onRetrieval () {
      this.isShowRecommend = false
    },
    handleSelect (item) {
      this.isShowRecommend = false
    },
    onLink (val) {
      window.open('https://kns.cnki.net/kns/brief/default_result.aspx', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.document-retrieval-wrap {
  height: 100%;
  box-sizing: border-box;
  .search-wrap {
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    height: 100%;
    /deep/ .el-autocomplete ,/deep/ .el-input , /deep/ .el-input__inner{
      width: 100%;
    }
    .search-btn-wrap {
      display: flex;
      width: 100%;
      padding: 15px 0;
    }
  }
  .search-content-wrap {
      margin-top: 80px;
      min-height: 200px;
      position: absolute;
      left: 20px;
      right: 20px;
      top: 80px;
      bottom: 0;
      overflow-y: auto;
      background: #ffffff;
      .search-result-wrap {
        display: flex;
        flex-direction: column;
        background: #ffffff;
        border-radius: 5px;
        padding: 20px;
        p {
          padding-bottom: 20px;
          font-size: 16px;
          font-weight: 700;
        }
        .url-wrap {
          display: flex;
          flex-direction: column;
          a{
            padding: 10px 20px;
            font-size: 13px;
          }
        }
      }
    }

}
</style>

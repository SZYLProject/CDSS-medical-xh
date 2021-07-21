<template>
  <div
    class="list-wrap"
    v-loading="loading"
    element-loading-text="拼命加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)"
  >
    <DiseaseDetailHeaderTable
      v-if="!loading"
      @onPushDetail="onPushDetail"
      class="home-card-wrap"
      :listInfo="listInfo"
    ></DiseaseDetailHeaderTable>
  </div>
</template>

<script>
import DiseaseDetailHeaderTable from '@/components/DiseaseDetailHeaderTable'
import { mapState } from 'vuex'
export default {
  components: {
    DiseaseDetailHeaderTable
  },
  data () {
    return {
      headerInfo: {
        tabs: [{ title: '病人列表' }, { title: 'Worklist' }, { title: 'MDT' }],
        defaultSelect: 0
      }
    }
  },
  computed: {
    listInfo: function () {
      return {
        title: this.headerInfo.tabs[this.headerInfo.defaultSelect].title,
        dropdownName: '导出表格'
      }
    },
    ...mapState({
      loading: state => state.diseaseEntry.loading
    })
  },
  mounted () {
    this.$store.dispatch('diseaseEntry/apiPostAtientTableSelect', {
      disease_name: this.$route.query.disease_name,
      pageSize: 10,
      pageIndex: 1
    })
  },
  methods: {
    onChangeTab (tab) {
      this.headerInfo.defaultSelect = tab
      this.listInfo.title = this.headerInfo.tabs[
        this.headerInfo.defaultSelect
      ].title
    },
    onPushDetail (item) {
      // console.log(item)
      localStorage.setItem('userName', item.tpatname)
      localStorage.setItem('patientId', item.patient_id)
      localStorage.setItem('numHospital', item.num_hospital)
      console.log(item.num_hospital, 'item.num_hospital')
      this.$router.push({
        path: 'DiseaseList/DiseaseDetail360',
        query: { disease_name: this.$route.query.disease_name }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../static/style/flexStyle.scss';
.list-wrap {
  height: 100%;
  overflow-y: auto;
  flex: 1;
  .home-card-wrap {
    overflow-y: auto;
    height: 100%;
  }
  .content-list {
    display: flex;
    height: 100%;
    .h-c-content {
      width: 60px;
      height: 100%;
      background-color: rgb(35, 53, 75);
    }
  }
  .fixed-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    button {
      @include flexistyle();
      flex-wrap: wrap;
      font-weight: 600;
      padding: 10px;
      background-color: rgb(35, 53, 75);
      border: 1px solid rgb(35, 53, 75);
    }
  }
}
</style>

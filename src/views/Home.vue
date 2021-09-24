<template>
  <div class="home-wrap">
    <DiseaseDetailHeader v-if="isShowNav" class="header" :headerInfo = 'headerInfo' :isShowBack = 'isShowNav'></DiseaseDetailHeader>
    <!-- <BreadCrumb v-if ='isShowNav'></BreadCrumb> -->
     <router-view/>
  </div>
</template>

<script>
import DiseaseDetailHeader from '@/components/DiseaseDetailHeader'
// import BreadCrumb from '@/components/BreadCrumb'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    DiseaseDetailHeader
  },
  data () {
    return {
      isShowNav: false,
      isShowBack: false,
      headerInfo: {
        title: '重症临床决策支持系统',
        tabs: [
          { title: '病人列表' },
          { title: 'Worklist' },
          { title: 'MDT' }
        ],
        name: '',
        defaultSelect: 0
      }
    }
  },
  computed: {
    ...mapState(['pathRoutes'])
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: function (o, n) {
        console.log(o)
        this.setPathRoutes({ path: o.fullPath, title: o.meta.title, index: o.meta.index })
        if (o.path === '/Login'.toLowerCase()) {
          this.isShowNav = false
        } else {
          this.isShowNav = true
          this.$set(this.headerInfo, 'name', localStorage.getItem('token'))
        }
        if (o.path === '/' || o.path === '/Login'.toLowerCase()) {
          this.isShowBack = false
        } else {
          this.isShowBack = true
        }
      }
    }
  },
  methods: {
    ...mapMutations(['setPathRoutes'])
  }
}
</script>

<style lang="scss" scoped>
.home-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
/deep/ .el-loading-spinner {
    p ,i{
    color: #23354b;
    font-size: 14px;
    }
}
</style>

<template>
  <div id="app">
    <router-view/>
    <!-- <div class="fixed-wrap" v-if="isShowBack">
      <p  @click="onBack" type="success">返回</p>
    </div> -->
  </div>
</template>
<script>
// import DiseaseDetailHeader from './components/DiseaseDetailHeader'
// import BreadCrumb from './components/BreadCrumb'
// import { mapState, mapMutations } from 'vuex'
export default {
  // components: {
  //   DiseaseDetailHeader, BreadCrumb
  // },
  data () {
    return {
      // isShowBack: false,
      // isShowNav: false,
      // headerInfo: {
      //   title: '临床决策支持系统',
      //   tabs: [
      //     { title: '病人列表' },
      //     { title: 'Worklist' },
      //     { title: 'MDT' }
      //   ],
      //   name: '',
      //   defaultSelect: 0
      // }
    }
  }
  // watch: {
  //   $route: {
  //     deep: true,
  //     immediate: true,
  //     handler: function (o, n) {
  //       console.log(o, n)
  //       if (o.path === '/Login'.toLowerCase()) {
  //         this.isShowNav = false
  //       } else {
  //         this.isShowNav = true
  //         this.$set(this.headerInfo, 'name', localStorage.getItem('token'))
  //         if (o.meta.title !== undefined) {
  //           if (o.fullPath === '/') {
  //             this.setPathRoutes([{ title: '首页', path: o.fullPath }])
  //           } else if (o.fullPath.includes('?')) {
  //             this.setPathRoutes([
  //               { title: '首页', path: o.fullPath },
  //               { title: o.meta.title, path: o.fullPath },
  //               { title: n.meta.title, path: window.encodeURI(o.fullPath) }
  //             ])
  //           } else {
  //             this.setPathRoutes([
  //               { title: '首页', path: '/' },
  //               { title: o.meta.title, path: window.encodeURI(o.fullPath) }
  //             ])
  //           }
  //           // this.setPathRoutes()
  //           console.log(2222, this.pathRoutes)
  //         }
  //       }
  //       if (o.path === '/' || o.path === '/Login'.toLowerCase()) {
  //         this.isShowBack = false
  //       } else {
  //         this.isShowBack = true
  //       }
  //     }
  //   }
  // },
  // computed: {
  //   ...mapState(['pathRoutes'])
  // },
  // methods: {
  //   ...mapMutations(['setPathRoutes']),
  //   onBack () {
  //     this.$router.go(-1)
  //   }
  // }
}
</script>
<style lang="scss">
@import './assets/commonScss';
@import './static/style/flexStyle.scss';
.fixed-wrap{
      position: fixed;
      bottom: 20px;
      right: 100px;
      z-index: 100;
      p {
        border-radius: 3px;
        @include flexistyle();
        flex-wrap: wrap;
        font-weight: 600;
        padding: 10px;
        background-color: rgb(35, 53, 75);
        border: 1px solid rgb(35, 53, 75);
        color: #fff;
        cursor: pointer;
      }
    }
</style>

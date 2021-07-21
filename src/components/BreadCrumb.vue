<template>
  <div class="bc-wrap shadow" >
    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="pathRoutes.length">
      <el-breadcrumb-item  :replace = 'true' :to="{ path: tab.path }" v-for="(tab, index) in pathRoutes" :key="index">{{tab.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['pathRoutes'])
  }
}
</script>

<style lang="scss" scoped>
.bc-wrap {
  display: flex;
  align-items: center;
  height: 60px;
  padding-left: 23px;
}
</style>

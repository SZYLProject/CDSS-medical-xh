<template>
  <div
    class="entry-box-top-wrap"
    v-loading="loading"
    element-loading-text="拼命加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.03)"
  >
    <el-card shadow="always">
      <div class="ts-form-wrap">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-select
              v-model="formInline.region"
              placeholder="科室查询"
              clearable
            >
              <el-option
                :label="item.key"
                :value="key"
                v-for="[key, item] in saveList"
                :key="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="SEARCHCARDLIST(formInline.region)"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <template v-if="cards || loading">
        <DiseaseCart
          :cards="card"
          @goToDetail="goToDetail"
          class="home-card-wrap"
          v-for="[key, card] of cards"
          :key="key"
        ></DiseaseCart>
      </template>
      <Empty v-else></Empty>
    </el-card>
  </div>
</template>

<script>
import { Button, Dropdown } from 'element-ui'
import DiseaseCart from '@/components/DiseaseCart'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Home',
  components: {
    DiseaseCart,
    [Button.name]: Button,
    [Dropdown.name]: Dropdown
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      formInline: state => state.diseaseEntry.formInline,
      cards: state => state.diseaseEntry.cards,
      loading: state => state.diseaseEntry.loading,
      saveList: state => state.diseaseEntry.saveList
    })
  },

  mounted () {
    this.$store.dispatch('diseaseEntry/apiGetDepartmentToolsSelect', {})
  },
  methods: {
    ...mapMutations({ SEARCHCARDLIST: 'diseaseEntry/SEARCHCARDLIST' }),
    goToDetail (item) {
      if (!item.url) return

      const u = item.url.slice(0, 4)
      if (u === 'http') {
        window.open(item.url)
        return
      }
      console.log(item.url.slice(0, 4), 'http')
      localStorage.setItem('userName', `${item.department} / ${item.tools} `)
      localStorage.setItem('disease_name', item.disease_name)
      localStorage.setItem('department', item.department)

      this.$router.push({
        path: '/DiseaseList',
        query: { id: item.id, disease_name: item.disease_name }
      })
    },
    loginOut () {
      localStorage.removeItem('token')
      this.$router.replace('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.entry-box-top-wrap {
  flex: 1;
  padding-top: 0;
  overflow-y: auto;
  margin-top: 2px;
  .ts-form-wrap {
    padding-left: 23px;
    padding-bottom: 40px;
  }
  /deep/ .el-form-item {
    margin-bottom: 0;
    width: 20%;
    padding-right: 30px;
  }
  /deep/ .el-form-item__content,
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-button {
    padding: 12px 30px;
  }
}
</style>

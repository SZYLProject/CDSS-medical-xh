<template>
  <el-form ref="searchDialogForm" :model="searchDialogForm" label-width="80px">
    <el-form-item
      v-for="(item, index) in searchDataList"
      :key="item.value"
      :label="item.label"
    >
      <el-radio-group v-model="searchDialogForm.theme">
        <el-radio
          v-for="item in searchDataList[index].children"
          :key="item.value"
          :label="item.value"
          >{{ item.label }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-button type="success" @click="ONADDSEARCHITEM('search')"
      >确定</el-button
    >
  </el-form>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      searchDialogForm: state => state.disease360.searchDialogForm,
      searchDataList: state => state.disease360.searchDataList
    })
  },
  watch: {
    // 监听选择后的值
    searchDialogForm: {
      deep: true,
      handler (val) {
        // 取的value值
        console.log(val.theme)
        const data = val.theme.split('-')
        this.SEARCHDATAINDEX(data[0] + '-' + data[1])
      }
    }
  },
  data () {
    return {}
  },
  mounted () {
    console.log(this.searchDataList, 'this.searchDataList')
  },
  methods: {
    ...mapMutations({
      ONADDSEARCHITEM: 'disease360/ONADDSEARCHITEM',
      SEARCHDATAINDEX: 'disease360/SEARCHDATAINDEX'
    })
  }
}
</script>

<style lang="scss" scoped></style>

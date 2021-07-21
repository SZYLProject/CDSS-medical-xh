<template>
  <div class="h-info-wrap">
    <!-- <div class="info-item"> -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="意见反馈">
        <el-input
          type="textarea"
          placeholder="请输入您的建议"
          maxlength="30"
          show-word-limit
          v-model="form.desc"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
    <!-- </div> -->
  </div>
</template>

<script>
import disease360 from '@/request/api/disease360'
export default {
  data () {
    return {
      form: {
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      const data = {
        proposal_info: this.form.desc
      }
      disease360.submitProposalInfo(data).then(res => {
        if (res.status === '0') {
          this.$message.success('提交意见成功')
        }
        // console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.h-info-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 40px;

  .info-item {
    display: flex;
    align-items: center;
    line-height: 24px;
    padding-right: 30px;
    h3 {
      padding-right: 10px;
      font-size: 13px;
      font-weight: 600;
    }
  }
}
</style>

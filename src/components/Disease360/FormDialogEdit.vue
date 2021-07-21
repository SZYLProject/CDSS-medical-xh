<template>
  <el-form
    :label-position="labelPosition"
    :inline="true"
    ref="searchDialogForm"
    :model="editForm"
  >
    <el-form-item
      :label="item.disease_info_title"
      v-for="(item, index) in formItems"
      :key="index"
      :class="{
        'danger-color':
          item.abnormal_value_judgment === 2 ||
          item.abnormal_value_judgment === 1
      }"
    >
      <div v-if="item.presentation_type === '1'" class="f-item-wrap">
        <el-input
          size="mini"
          style="width:180px;"
          v-model="item.disease_info_title_value"
          :disabled="item.is_use === 1 ? true : false"
          ><template slot="append" v-if="item.disease_info_title_unit">{{
            item.disease_info_title_unit
          }}</template></el-input
        >
        <i class="icon icon-tip" v-if="!item.disease_info_title_value"></i>
        <i
          class="icon icon-top"
          v-if="
            item.disease_info_title_value && item.abnormal_value_judgment === 2
          "
        ></i>
        <i
          class="icon icon-down"
          v-if="
            item.disease_info_title_value && item.abnormal_value_judgment === 1
          "
        ></i>
      </div>
      <div v-else-if="item.presentation_type === '2'" class="f-item-wrap">
        <el-radio-group
          v-model="item.disease_info_title_value"
          :disabled="item.is_use === 1 ? true : false"
        >
          <el-radio
            :label="radio.public_info_title"
            v-for="radio in item.publicInfoModel"
            :key="radio.id"
          >
            {{ radio.public_info_title === 'n' ? '否' : '是' }}
          </el-radio>
        </el-radio-group>
        <i class="icon icon-tip" v-if="!item.disease_info_title_value"></i>
        <i
          class="icon icon-top"
          v-if="
            item.disease_info_title_value && item.abnormal_value_judgment === 2
          "
        ></i>
        <i
          class="icon icon-down"
          v-if="
            item.disease_info_title_value && item.abnormal_value_judgment === 1
          "
        ></i>
      </div>
      <div
        v-else-if="item.presentation_type === '3' && item.multiselect === 1"
        class="f-item-wrap"
      >
        <el-select
          size="mini"
          v-model="item.smoveList"
          multiple
          placeholder="请选择"
          :disabled="item.is_use === 1 ? true : false"
        >
          <el-option
            v-for="item in item.publicInfoModel"
            :key="item.id"
            :label="item.public_info_title"
            :value="item.public_info_title"
          >
          </el-option>
        </el-select>
        <i class="icon icon-tip" v-if="!item.smoveList.length"></i>
        <i
          class="icon icon-top"
          v-if="item.smoveList.length && item.abnormal_value_judgment === 2"
        ></i>
        <i
          class="icon icon-down"
          v-if="item.smoveList.length && item.abnormal_value_judgment === 1"
        ></i>
      </div>
      <div v-else class="f-item-wrap">
        <el-select
          size="mini"
          v-model="item.disease_info_title_value"
          placeholder="请选择"
          @change="ONCHANGEOPTION"
          :disabled="item.is_use === 1 ? true : false"
        >
          <el-option
            :label="child.public_info_title"
            :value="child.public_info_title"
            v-for="child in item.publicInfoModel"
            :key="child.id"
          >
          </el-option>
        </el-select>
        <div>
          <i class="icon icon-tip" v-if="!item.disease_info_title_value"></i>
          <i
            class="icon icon-top"
            v-if="
              item.disease_info_title_value &&
                item.abnormal_value_judgment === 2
            "
          ></i>
          <i
            class="icon icon-down"
            v-if="
              item.disease_info_title_value &&
                item.abnormal_value_judgment === 1
            "
          ></i>
        </div>
        <p class="tip-box" v-if="item.disease_info_title === 'ECOG-PS评分'">
          {{ optionTip }}
        </p>
      </div>
    </el-form-item>
    <el-button v-if="!submitLoading" type="success" @click="onEdit" size="mini"
      >提交</el-button
    >
    <el-button v-else type="success" size="mini" :loading="submitLoading"
      >提交中</el-button
    >
  </el-form>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      labelPosition: 'right'
    }
  },
  computed: {
    ...mapState({
      editForm: state => state.disease360.editForm,
      optionTip: state => state.disease360.optionTip,
      submitLoading: state => state.disease360.submitLoading,
      formItems: state => state.disease360.formItems
    })
  },
  created () {
    console.log(this.editForm, this.$store.state.disease360.editForm)
  },
  methods: {
    ...mapMutations({ ONCHANGEOPTION: 'disease360/ONCHANGEOPTION' }),
    onEdit () {
      this.$store.dispatch('disease360/apiPostEdit', {
        query: window.location.hash ? window.location.hash.split('?')[1] : ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tip-box {
  padding-top: 6px;
  max-width: 200px;
  font-size: 12px;
  color: #e6a23c;
  line-height: 20px;
  padding-left: 6px;
}
.danger-color {
  /deep/ .el-form-item__label {
    color: #f56c6c;
  }
}
.default-color {
  /deep/ .el-form-item__label {
    color: #409eff;
  }
}
.f-item-wrap {
  display: flex;
}
/deep/ .el-form-item__content {
  vertical-align: middle;
}
/deep/ .el-form-item {
  margin-bottom: 10px;
}
</style>

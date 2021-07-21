<template>
  <div class="new-c-d-wrap">
    <el-dialog title="ADD CASE" :visible.sync="dialogFormVisible" :before-close="onCancelAddCase">
      <el-form :model="form">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width:260px" placeholder="Please write name"></el-input>
        </el-form-item>
        <el-form-item label="Cancer type" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select cancer type" style="width:260px">
            <el-option label="CRC" value="shanghai"></el-option>
            <el-option label="BREAST" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancelAddCase">Cancel</el-button>
        <el-button type="primary" @click="onSubmitAddCase">Add Case</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Dialog, Form, Button, Select } from 'element-ui'
export default {
  components: {
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [Select.name]: Select,
    [Button.name]: Button
  },
  props: {
    dialogFormVisible: {
      type: Boolean
    }
  },
  data () {
    return {
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      dialogTableVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    onCancelAddCase () {
      this.$emit('update:dialogFormVisible', false)
    },
    onSubmitAddCase () {
      this.$emit('update:dialogFormVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.new-c-d-wrap {
  width: 100%;
}
</style>

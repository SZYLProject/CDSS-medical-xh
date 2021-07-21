<template>
  <div class="h-list-wrap">
    <div class="table-top-wrap">
      <span>{{ listInfo.title }}</span>
      <div class="table-right-wrap">
        <div
          @click="exportDataModel()"
          style="width: 180px;
    font-size: 14px;
    cursor: pointer;
"
        >
          下载导入模板
        </div>

        <el-upload
          :action="upLoadUrl()"
          class="upload-demo"
          :http-request="handleUpload"
          multiple
          :limit="1"
          :show-file-list="false"
          :on-exceed="handleExceed"
        >
          <div
            style="width: 130px;
    font-size: 14px;
    cursor: pointer;"
          >
            导入数据
          </div>
        </el-upload>
        <el-input
          placeholder="搜索名字或者ID"
          suffix-icon="el-icon-search"
          v-model="searchForm.search"
        >
        </el-input>
        <div class="dropdowm-wrap">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ listInfo.dropdownName
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Excel</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <Empty v-if="!loading && !tableData.length"></Empty>
    <div class="table-ctn-wrap">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :default-sort="{ prop: 'date', order: 'descending' }"
        style="width:100%;"
      >
        <el-table-column prop="tpatname" sortable label="姓名">
        </el-table-column>

        <el-table-column label="PatientID" prop="patient_id" sortable>
          <template slot-scope="scope">{{ scope.row.patient_id }}</template>
        </el-table-column>

        <el-table-column prop="age" label="年龄"> </el-table-column>

        <el-table-column label="性别" prop="gender" sortable>
          <template slot-scope="scope">{{ scope.row.gender }}</template>
        </el-table-column>

        <el-table-column prop="admit_diagnosis" label="门急诊诊断/入院诊断">
          <template slot-scope="scope">{{
            scope.row.admit_diagnosis
          }}</template>
        </el-table-column>

        <el-table-column label="入院时间" prop="visit_time" sortable>
          <template slot-scope="scope">{{ scope.row.visit_time }}</template>
        </el-table-column>
        <el-table-column label="主管医生" prop="doctor_name" sortable>
          <template slot-scope="scope">{{ scope.row.doctor_name }}</template>
        </el-table-column>

        <el-table-column label="详情">
          <template slot-scope="scope">
            <span class="detail-span" @click="onPushDetail(scope.row)"
              >查看详情</span
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-wrap">
        <el-pagination
          background
          :page-size="pageSize"
          @current-change="onCurrentChange"
          layout="prev, pager, next, total"
          :total="tableDataAll"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { Table, Input, Dropdown, Button, Pagination } from 'element-ui'
import { mapState, mapMutations } from 'vuex'
import diease360 from '../request/api/disease360'
export default {
  components: {
    [Table.name]: Table,
    [Input.name]: Input,
    [Button.name]: Button,
    [Pagination.name]: Pagination,
    [Dropdown.name]: Dropdown
  },
  props: {
    listInfo: {
      type: Object,
      default: () => {
        return {
          fileList: [
            {
              name: 'food.jpeg',
              url:
                'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            },
            {
              name: 'food2.jpeg',
              url:
                'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }
          ]
        }
      }
    }
  },
  data () {
    return {
      searchForm: {},
      pageSize: 10,
      pageIndex: 1
    }
  },
  computed: {
    ...mapState({
      tableDataAll: state => state.diseaseEntry.tableDataAll,
      tableData: state => state.diseaseEntry.tableData,
      loading: state => state.diseaseEntry.loading
    })
  },
  mounted () {
    this.start()
    // this.$store.dispatch('diseaseEntry/apiPostAtientTableSelect', {
    //   disease_name: localStorage.getItem('disease_name'),
    //   pageSize: this.pageSize,
    //   pageIndex: this.pageIndex
    // })
  },
  methods: {
    ...mapMutations({
      SETPAGELIST: 'diseaseEntry/SETPAGELIST'
    }),
    start () {},
    // // 查树状结构
    // getSimilarityEntity () {
    //   const data = {
    //     disease_name: localStorage.getItem('disease_name')
    //   }
    //   diease360.getSimilarityEntity(data).then(res => {})
    // },
    onCurrentChange (val) {
      this.pageIndex = val
      // console.log(val)
      // this.similarityCase()
      // this.SETPAGELIST({ currentPage: val })
      this.$store.dispatch('diseaseEntry/apiPostAtientTableSelect', {
        disease_name: localStorage.getItem('disease_name'),
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      })
    },
    onPushDetail (item) {
      this.$emit('onPushDetail', item)
    },
    // 下载文件
    exportDataModel () {
      console.log(111)

      const data = {
        disease_name: localStorage.getItem('disease_name')
      }
      const responseType = 'blob'
      diease360.exportDataModel(data, responseType).then(res => {
        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
        const objectUrl = URL.createObjectURL(blob)
        window.location.href = objectUrl
        // window.open(res)
        // window.URL.createObjectURL(new Blob([res.data]))
      })
    },
    // 限制同次上传文件个数：1
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    // 当前无用，不可删除
    upLoadUrl () {
      console.log(1111)
      return 'https:localhost'
    },
    // 上传文件
    handleUpload (param) {
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('disease_name', localStorage.getItem('disease_name'))
      diease360.importData(formData).then(res => {
        if (res.status === '0') {
          this.$message.success(`上传 ${param.file.name} 文件成功`)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$theme-clor: rgb(35, 53, 75);
$font-clor: rgb(30, 38, 50);
.h-list-wrap {
  padding: 0 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .detail-span {
    color: #409eff;
    cursor: pointer;
  }
  .table-top-wrap {
    display: flex;
    align-items: center;
    padding: 10px;
    font-weight: 900;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    span {
      font-weight: 600;
      font-size: 14px;
    }
    .table-right-wrap {
      display: flex;
      align-items: center;
      .dropdowm-wrap {
        min-width: 140px;
        text-align: center;
      }
      .add-wrap {
        min-width: 100px;
        padding-right: 30px;
        button {
          background-color: $theme-clor;
          border-color: $theme-clor;
        }
      }
    }
  }
  .pagination-wrap {
    text-align: right;
    height: 80px;
    display: flex;
    align-items: center;
    /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: $theme-clor;
    }
    /deep/ .el-pager li:hover {
      color: $theme-clor;
    }
    /deep/
      .el-pagination.is-background
      .el-pager
      li:not(.disabled).active:hover {
      color: #fff;
    }
  }
  .table-ctn-wrap {
    flex: 1;
    overflow-y: auto;
  }
}
</style>

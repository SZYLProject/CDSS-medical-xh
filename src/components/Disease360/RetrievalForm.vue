<template>
  <div class="re-form-wrap">
    <div class="seatch-filter-sub-wrap">
      <!-- <el-form ref="form" :model="form" label-width="100px" :inline="true" >
        <p class="search-title">关键词搜索</p>
        <el-form-item label="">
          <el-input v-model="form.name" clearable ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即搜索</el-button>
        </el-form-item>
      </el-form> -->
      <div class="gj-search-wrap">
        <!-- <p class="search-title">高级搜索</p> -->
        <!-- 搜索抬头：搜索关系、搜索主题、搜索条件、值域范围 文字 -->
        <div class="seatch-filter-wrap">
          <p v-for="(item, index) in filtersData" :key="index">{{ item }}</p>
        </div>
        <div
          class="seatch-filter-wrap seatch-filter-content-wrap"
          style="padding-bottom:10px"
          v-for="(fliter, index) in searchFilters"
          :key="index"
        >
          <div class="seatch-filter-sub-wrap">
            <div style="min-width:100px">
              <el-select
                v-model="fliter.relation"
                placeholder="或"
                style="width:90px"
                size="small"
                v-if="index"
              >
                <el-option
                  v-for="item in relationFilter"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <el-input
              style="width:130px;"
              placeholder="搜索项"
              size="small"
              @focus="
                ONSHOWTOAST({
                  parentIndex: index,
                  childIndex: null,
                  isParent: true,
                  isSearch: true
                })
              "
              suffix-icon="el-icon-plus"
              v-model="fliter.theme.split('-')[3]"
            >
            </el-input>
            <!-- 关系下拉框 -->
            <el-select
              v-model="fliter.condition"
              placeholder="关系"
              style="width:130px"
              size="small"
              :disabled="!fliter.theme"
            >
              <el-option
                v-for="item in relaOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <!-- 值域范围下拉框数据 -->
            <el-select
              v-if="presentation_type !== '1'"
              v-model="fliter.range"
              placeholder="请选择"
              style="width:130px"
              size="small"
              :disabled="!fliter.condition"
            >
              <el-option
                v-for="item in range"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <div
              v-if="presentation_type === '1' && option_info !== '1'"
              class="demo-input-size"
              style="width:130px;margin-left:20px;"
            >
              <el-input
                size="small"
                placeholder="请输入内容"
                suffix-icon="el-icon-date"
                v-model="fliter.range"
              >
              </el-input>
            </div>
            <div
              v-if="presentation_type === '1' && option_info === '1'"
              class="demo-input-size"
              style="width:130px;margin-left:20px;"
            >
              <el-autocomplete
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                v-model.trim="fliter.range"
                size="small"
                @select="handleSelect"
                suffix-icon="el-icon-date"
              >
              </el-autocomplete>
            </div>

            <!-- 添加children -->
            <div style="padding-left: 20px">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-s-data"
                @click="ONADDChILDFILTER(index)"
              ></el-button>
            </div>
            <!-- 添加一条数据 -->
            <div style="padding-left: 20px">
              <el-button
                type="success"
                size="mini"
                icon="el-icon-plus"
                @click="ONADDFLITER"
              ></el-button>
            </div>
            <!-- 删除数据 -->
            <div v-if="index" style="padding-left: 20px">
              <el-button
                type="info"
                size="mini"
                icon="el-icon-close"
                @click="ONDELFLITER(index)"
              ></el-button>
            </div>
          </div>
          <div
            class="seatch-filter-sub-child-wrap"
            v-for="(child, idx) in fliter.children"
            :key="idx"
          >
            <div class="input-line-wrap">
              <span></span>
              <el-input
                class="child-input"
                style="width:130px;margin-left:0px;"
                placeholder="搜索项"
                size="small"
                @focus="
                  ONSHOWTOAST({
                    parentIndex: index,
                    childIndex: idx,
                    isParent: false,
                    isSearch: true
                  })
                "
                suffix-icon="el-icon-plus"
                v-model="child.theme.split('-')[3]"
              >
              </el-input>
            </div>
            <!-- 关系下拉框 -->
            <el-select
              v-model="child.condition"
              placeholder="关系"
              style="width:130px"
              size="small"
              :disabled="!child.theme"
            >
              <el-option
                v-for="item in relaOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <!-- 值域范围下拉框数据 -->
            <el-select
              v-if="presentation_type !== '1'"
              v-model="child.range"
              placeholder="请选择"
              style="width:130px"
              size="small"
              :disabled="!child.condition"
            >
              <el-option
                v-for="item in range"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <div
              v-if="presentation_type === '1' && option_info !== '1'"
              class="demo-input-size"
              style="width:130px;margin-left:20px;"
            >
              <el-input
                size="small"
                placeholder="请输入内容"
                suffix-icon="el-icon-date"
                v-model="child.range"
              >
              </el-input>
            </div>
            <div
              v-if="presentation_type === '1' && option_info === '1'"
              class="demo-input-size"
              style="width:130px;margin-left:20px;"
            >
              <el-autocomplete
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                v-model.trim="child.range"
                size="small"
                @select="handleSelect"
                suffix-icon="el-icon-date"
              >
              </el-autocomplete>
            </div>
            <!-- 删除一条children数据 -->
            <div style="padding-left: 20px">
              <el-button
                type="info"
                size="mini"
                icon="el-icon-close"
                @click="ONDELCHILDFLITER({ index, idx })"
              ></el-button>
            </div>
          </div>
        </div>
        <div class="gj-search-btn">
          <el-button type="primary" @click="onSubmit" size="mini"
            >立即搜索</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import disease360 from '@/request/api/disease360'
export default {
  props: {
    // 当前注释
    form: {
      type: Object
    },
    // 暂时无用
    searchDialogForm: {
      type: Object
    },
    // 页面title数据
    filtersData: {
      type: Array
    },
    // 页面循环数据
    searchFilters: {
      type: Array
    },
    // 搜索条件：关系下拉框
    relaOptions: {
      type: Array
    },
    // 且、或、非关系下拉框
    relationFilter: {
      type: Array
    },
    // 值域范围下拉框数据
    range: {
      type: Array
    },
    presentation_type: {
      type: String
    },
    option_info: {
      type: String
    },
    disease_info_id: {
      type: String
    }
  },
  watch: {
    option_info (val) {
      console.log(val, 'option_info')
    }
  },
  mounted () {},
  methods: {
    ...mapMutations({
      // 搜索主题下拉框
      ONSHOWTOAST: 'disease360/ONSHOWTOAST',
      // 添加一条数据事件
      ONADDFLITER: 'disease360/ONADDFLITER',
      // 添加children事件
      ONADDChILDFILTER: 'disease360/ONADDChILDFILTER',
      // 删除数据
      ONDELFLITER: 'disease360/ONDELFLITER',
      // 删除children数据
      ONDELCHILDFLITER: 'disease360/ONDELCHILDFLITER'
    }),
    onSubmit () {
      this.$emit('onSubmit')
    },
    handleSelect (fliter) {
      return fliter.range
    },
    querySearchAsync (queryString, callback) {
      const params = {
        option_info: queryString,
        disease_info_id: this.disease_info_id,
        disease_name: localStorage.getItem('disease_name'),
        pageIndex: 1,
        pageSize: 40
      }
      if (queryString === '') {
        return
      }
      disease360.searchOptionInfo(params).then(res => {
        const data = res.data.data.map(item => {
          return {
            value: item
          }
        })
        callback(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.re-form-wrap {
  padding-top: 10px;
  width: 100%;
  position: relative;
  .search-title {
    padding: 20px 0;
    font-size: 16px;
    font-weight: 700;
    padding-top: 0px;
  }
  .gj-search-wrap {
    /deep/ .el-form-item {
      width: 30%;
    }
    /deep/ .el-form-item__content {
      width: 100%;
    }
    .seatch-filter-wrap {
      display: flex;
      p {
        width: 150px;
        height: 30px;
        font-size: 14px;
        flex-wrap: 700;
        &:first-of-type {
          width: 100px;
        }
      }
      /deep/ .el-select {
        margin-left: 20px;
        &:first-of-type {
          margin-left: 0;
        }
      }
    }
    .gj-search-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: 20px;
    }
    .seatch-filter-content-wrap {
      flex-direction: column;
      padding-top: 10px;
    }
    .seatch-filter-sub-wrap {
      display: flex;
      position: relative;
      z-index: 2;
    }
    .seatch-filter-sub-child-wrap {
      display: flex;
      width: 100%;
      padding-left: 160px;
      padding-top: 20px;
      position: relative;
      .input-line-wrap {
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: -20px;
          top: -36px;
          width: 1px;
          height: 53px;
          background-color: #409eff;
        }
      }
      .child-input {
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: -20px;
          top: 50%;
          width: 20px;
          height: 1px;
          background-color: #409eff;
        }
      }
    }
  }
  .search-wrap {
    min-height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #fff;
    box-sizing: border-box;
    i,
    span {
      font-size: 18px;
      font-weight: 900;
    }
  }
}
</style>

<template>
  <div class="similar-case-wrap">
    <el-tabs v-model="activeName" @tab-click="onTabClick">
      <el-tab-pane label="相似病例" name="list">
        <!-- 相似病例表格 -->
        <div class="chart-wrap list-wrap shadow">
          <SearchChartTable
            :tableData="tableData"
            :HeaderData="HeaderData"
            @onDetail="onDetail"
          ></SearchChartTable>
        </div>
        <!-- 相似病例分页 -->
        <div class="pagination-wrap">
          <el-pagination
            background
            :page-size="pageSize"
            @current-change="onCurrentChange"
            layout="prev, pager, next, total"
            :total="tableTotal"
          >
          </el-pagination>
        </div>
        <!-- 相似病例图 -->
        <div class="chart-wrap chart-wrap-content shadow">
          <!-- 曲线图 -->
          <div
            id="myChartDefault"
            :style="{ width: `${screenWidth * 0.8}px`, height: '300px' }"
          ></div>

          <!-- 柱状图 -->
          <div class="doughnut-wrap shadow">
            <div class="doughnut-top-wrap">
              <p>
                <span>共发现{{ tableTotal }}个相似病人</span>
                <!-- <span>共计3203(1.01%)</span> -->
              </p>
            </div>

            <div class="chart-pie-wrap">
              <div
                class="d-chart-wrap"
                v-for="(chart, index) in chartListDefault"
                :key="index"
              >
                <Bar
                  :id="'tempale' + index"
                  :style="{
                    width: `${screenWidth * 0.8 * 0.25}px`,
                    height: '400px'
                  }"
                  :title="chart.title"
                  titleLocal="left"
                  :dataX="chart.treatmentDataX"
                  :dataY="chart.treatmentDataY"
                  :totalList="chart.totalList"
                  :direction="direction"
                />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="自定义搜索" name="chart">
        <div class="chart-wrap chart-wrap-content shadow">
          <!-- 自定义搜索高级搜索按钮 -->
          <div class="search-wrap">
            <span>{{ changeTitle }}</span>
            <div>
              <i
                v-if="changeTitle != '病人筛选结果'"
                @click="onChangeComponent({ val: 1, title: '病人筛选结果' })"
                class="lineChart-icon"
              ></i>
              <i
                @click="onChangeComponent({ val: 2, title: '相似病例搜索' })"
                class="ld-icon"
              ></i>
              <i
                v-if="department === '全科'"
                @click="onChangeComponent({ val: 3, title: '疾病模板' })"
                class="ai-icon"
              ></i>
            </div>
          </div>
          <!-- 曲线图 -->
          <div
            v-show="isShowEchart === 1"
            id="myChart"
            :style="{ width: `${screenWidth * 0.8}px`, height: '300px' }"
          ></div>
          <!-- 高级搜索 -->
          <div v-show="isShowEchart === 2" class="form-wrap">
            <RetrievalForm
              :form="form"
              :relaOptions="relaOptions"
              :relationFilter="relationFilter"
              :range="range"
              @onSubmit="onSubmit"
              :filtersData="filtersData"
              :searchFilters="searchFilters"
              :presentation_type="presentation_type"
              :option_info="option_info"
              :disease_info_id="disease_info_id"
            ></RetrievalForm>
          </div>
          <!-- 检索 -->
          <div v-show="isShowEchart === 3" class="form-wrap">
            <AISearchGroup
              @onSubmitAI="onSubmitAI"
              :groups="groups"
            ></AISearchGroup>
          </div>
          <!-- 柱状图 -->
          <div class="doughnut-wrap shadow">
            <div class="doughnut-top-wrap">
              <p>
                <span>共发现{{ total }}个相似病人</span>
                <!-- <span>共计3203(1.01%)</span> -->
              </p>
            </div>
            <!-- 饼形图 -->
            <!-- <div class="chart-pie-wrap">
              <div
                class="d-chart-wrap"
                v-for="(chart, index) in chartListPie"
                :key="index"
              >
                <div
                  :id="'doughnutChart' + index"
                  :style="{
                    width: `${screenWidth * 0.8 * 0.25}px`,
                    height: '400px'
                  }"
                ></div>
              </div>
            </div> -->

            <div class="chart-pie-wrap">
              <div
                class="d-chart-wrap"
                v-for="(chart, index) in chartList"
                :key="index"
              >
                <Bar
                  :id="'tempale' + index"
                  :style="{
                    width: `${screenWidth * 0.8 * 0.25}px`,
                    height: '400px'
                  }"
                  :title="chart.title"
                  titleLocal="left"
                  :dataX="chart.treatmentDataX"
                  :dataY="chart.treatmentDataY"
                  :totalList="chart.totalList"
                  :direction="direction"
                />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane
        class="totalPeople"
        :label="'总相似人数：' + tableData.length + '人'"
        name=""
        disabled
        tab-position="right"
      >
      </el-tab-pane> -->
    </el-tabs>
    <div class="mask-wrap shadow" v-show="dialogTableVisible">
      <p>
        <span>{{ patientName }}的治疗方案：系统治疗</span
        ><i class="el-icon-error" @click="dialogTableVisible = false"></i>
      </p>
      <div class="collapse-wrap">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="系统治疗：分子靶向治疗" name="1">
            <div>一线治疗：索拉菲尼or 仑伐替尼。二线治疗：瑞戈非尼</div>
            <div>
              索拉菲尼：常规推荐用法为400mg，口服，bid，用于Child
              Pugh=A级或B级，注意对HBV和肝功能的影响；仑伐替尼：用法为体质量≥60kg
              者，12mg，口服，每日 1 次；者，8mg，口服，每日 1 次，用于肝功能
              Child-Pugh A 级的肝癌病人。瑞戈非尼：用法为 160mg，每日 1 次，连用
              3 周，停用 1 周。在我国，初始剂量可采用一次 80mg 或 120mg，每日 1
              次，根据病人的耐受情况逐渐增量
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { Table, Form } from 'element-ui'
import SearchChartTable from './SearchChartTable'
import RetrievalForm from './RetrievalForm'
import AISearchGroup from './AISearchGroup'
import disease360 from '@/request/api/disease360'
import Bar from '../../components/Echarts/Bar.vue'
// import api from '@/request/index'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    [Table.name]: Table,
    [Form.name]: Form,
    SearchChartTable,
    RetrievalForm,
    AISearchGroup,
    Bar
  },
  props: {
    // 全部图表width参数
    screenWidth: {
      type: Number
    },
    // 当前无用
    searchDialogForm: {
      type: Object
    }
  },
  destroyed () {
    this.CLEARSEARCHFILTERS()
  },
  data () {
    return {
      department: localStorage.getItem('department'), // 获取当前的科室名字：全科、膀胱癌
      groups: [],
      treatmentDataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      treatmentDataY: [30, 10],
      direction: false,
      changeTitle: '病人筛选结果',
      activeNames: ['1'],
      dialogTableVisible: false,
      patientName: '',
      relaOptions: ['<', '=', '>', '包含'],
      relationFilter: [
        { label: '且', value: 'and' },
        { label: '或', value: 'or' }
      ],
      range: ['T3NIM0~T3NIM02', 'T3NIM2~T3NIM03'], // 值域范围下拉框数据：后台返回
      filtersData: ['搜索关系', '搜索主题', '搜索条件', '值域范围'],
      isShowEchart: 1,
      presentation_type: '3',
      option_info: '0',
      disease_info_id: '',
      advancedSearchForm: {},
      myChartTitleAndList: [],
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
      activeName: 'list',
      HeaderData: [
        // {
        //   label: '编码',
        //   key: 'code'
        // },
        // {
        //   label: '姓名',
        //   key: 'name'
        // },
        // {
        //   label: '权限描述',
        //   key: 'description'
        // }
      ],
      tableTotal: 0,
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      tableData: [
        // {
        //   id: 221,
        //   code: '01',
        //   name: '西药开立权限',
        //   description: '医生对西药处方权限',
        //   ifUse: '0'
        // },
        // {
        //   id: 222,
        //   code: '02',
        //   name: '草药开立权限',
        //   description: '医生对草药处方权限',
        //   ifUse: '0'
        // }
      ]
    }
  },
  computed: {
    ...mapState({
      searchFilters: state => state.disease360.searchFilters,
      chartData: state => state.disease360.chartData,
      chartList: state => state.disease360.chartList,
      chartListDefault: state => state.disease360.chartListDefault,
      chartListPie: state => state.disease360.chartListPie,
      searchDataList: state => state.disease360.searchDataList,
      searchDataIndex: state => state.disease360.searchDataIndex,
      conditionListData: state => state.disease360.conditionList
    })
  },
  mounted () {
    // 饼形图两个初始化方法
    // this.initData()
    // this.chartListPie.forEach((chart, index) => {
    //   this.chartPieInit(chart, index)
    // })
    this.getSimilarityEntity()

    this.similarityCase()
    this.getSimilarityEntityFlag()
    this.conditionList()
  },
  watch: {
    searchFilters (val) {
      console.log(val, 'searchFilters')
    },
    searchDataIndex (val) {
      const data1 = val.split('-')
      const data2 = data1[0]
      const data3 = data1[1]
      this.range = []
      this.range = this.searchDataList[data2]?.children[
        data3
      ].publicInfoModel.map(item => {
        return item.public_info_title
      })
      this.presentation_type = this.searchDataList[data2]?.children[
        data3
      ].presentation_type
      this.option_info = this.searchDataList[data2]?.children[data3].option_info
      this.disease_info_id = this.searchDataList[data2]?.children[
        data3
      ].id.toString()

      // // 赋值下拉框数据:取全部值
      // const item = this.searchDataList[data2]?.children[data3]
      // this.myChartTitleAndList.push({
      //   label: item.disease_info_title,
      //   value:
      //     this.myChartTitleAndList?.length +
      //     '-' +
      //     item.id +
      //     '-' +
      //     item.disease_info_title,
      //   publicInfoModel: item.publicInfoModel
      // })
      // this.UPDATACHARTTITLEDATA(this.myChartTitleAndList)

      const data = {
        data2: data2,
        data3: data3,
        index: null
      }

      this.UPDATAONADDChILDFILTER(data)
    },
    chartData: {
      deep: true,
      handler (val) {
        this.initData()
      }
    },
    'chartData.dataBJ' (val) {
      // this.initData()
    }
  },
  methods: {
    ...mapMutations({
      SEARCHDATALIST: 'disease360/SEARCHDATALIST',
      CHARTDATA: 'disease360/CHARTDATA',
      UPDATACHARTTITLEDATA: 'disease360/UPDATACHARTTITLEDATA',
      UPDATAONADDChILDFILTERTitle: 'disease360/UPDATAONADDChILDFILTERTitle',
      UPDATACHARTLIST: 'disease360/UPDATACHARTLIST',
      UPDATACHARTLISTPIE: 'disease360/UPDATACHARTLISTPIE',
      UPDATACHARTLISTDEFAULT: 'disease360/UPDATACHARTLISTDEFAULT',
      CONDITIONLIST: 'disease360/CONDITIONLIST',
      UPDATACHARTDATAPARALLELAXISDATA:
        'disease360/UPDATACHARTDATAPARALLELAXISDATA',
      CLEARSEARCHFILTERS: 'disease360/CLEARSEARCHFILTERS',
      UPDATACHARTTITLEDATANEXT: 'disease360/UPDATACHARTTITLEDATANEXT'
    }),
    conditionList () {
      const param = {
        disease_name: localStorage.getItem('disease_name')
      }
      disease360.conditionList(param).then(res => {
        if (!res.data) {
          return
        }
        console.log(res, 'conditionList')
        const data = JSON.parse(res.data[0].conditions)
        console.log(data, 'onditionListData')
        const data2 = res.data.map(item => {
          return {
            ...item,
            conditionsList: JSON.parse(item.conditions)
          }
        })
        this.CONDITIONLIST(data2)
        const data3 = data2.map((item, index) => {
          return {
            title: item.conditionDisplay,
            index: index,
            children: []
          }
        })
        console.log(data2, 'data2')
        for (let i = 0; i < data2.length; i++) {
          data3[i].children = data2[i].conditionsList.map(item => {
            return item.searchName + ':' + item.searchVal
          })
        }
        this.groups = data3
      })
    },
    onCurrentChange (val) {
      this.pageIndex = val
      console.log(val)
      this.similarityCase()
    },
    async similarityCase () {
      const param = {
        patient_id: localStorage.getItem('patientId'),
        num_hospital: localStorage.getItem('numHospital'),
        disease_name: localStorage.getItem('disease_name'),
        pageIndex: this.pageIndex, // 页数
        pageSize: this.pageSize // 条数
      }
      await disease360.similarityCase(param).then(res => {
        sessionStorage.setItem('similarityCase', 'similarityCase')
        this.tableTotal = res.total
        this.total = res.total
        this.tableData = res.data
        // this.tableData = res.data.filter((item, i) => {
        //   return parseInt(item.scop) >= 50
        // })
        const data = {
          header: [],
          data: res.data
        }
        this.CHARTDATA(data) // 修改线形图数据dataBJ
        // let statistics = {}
        // for (let i = 0; i < res.statistics.keys.length; i++) {
        //   res.statistics.values[i]=
        // }
        this.UPDATACHARTLISTDEFAULT(res.statistics) // 修改柱状图
        this.UPDATACHARTDATAPARALLELAXISDATA(res.data) // 添加title下的无值的data属性
        this.UPDATACHARTTITLEDATANEXT() // 添加title下的无值的属性（第二遍data,方便初始化时候使用）

        this.tableData.forEach(element => {
          if (element.scop) {
            element.scop = element.scop + '%'
          }
        })
      })
    },
    compare (property) {
      return function (obj1, obj2) {
        const value1 = obj1[property]
        const value2 = obj2[property]
        return value2 - value1 // 降序
      }
    },
    /*
     * 根据数组对象属性删除对应项
     * @param {Array} arr - 数组对象
     * @param {String} attr - 属性
     * @param {} value - 属性值
     * @return void
     */
    removeByValue (arr, attr, value) {
      var index = 0
      for (var i in arr) {
        if (arr[i][attr] === value) {
          index = i
          break
        }
      }
      arr.splice(index, 1)
    },

    // // 查树状结构
    // getSimilarityEntity () {
    //   const data = {
    //     disease_name: localStorage.getItem('disease_name')
    //   }
    //   disease360.getSimilarityEntity(data).then(res => {})
    // },
    // 表格数据
    async getSimilarityEntity () {
      const param = {
        patient_id: localStorage.getItem('patientId'),
        num_hospital: localStorage.getItem('numHospital'),
        disease_name: localStorage.getItem('disease_name')
      }
      await disease360.getSimilarityEntity(param).then(res => {
        const headerData = res.data.filter((item, i) => {
          return item.icon_top_is === '1'
        })
        // const headerData = res.data
        console.log(headerData, 'headerData')
        this.HeaderData = headerData.map(item => {
          return {
            label: item?.disease_info_title || '',
            key: item?.disease_info_title || ''
          }
        })
        this.HeaderData.unshift({
          label: '患者ID',
          key: '患者ID'
        })
        this.HeaderData.push({
          label: '相似度',
          key: 'scop'
        })
        // 赋值下拉框数据:取列表展示icon_top_is为1的值
        let searchDataListSearchData = []
        searchDataListSearchData = headerData.map((item, index) => {
          return {
            label: item?.disease_info_title || '',
            value: index + '-' + item.id + '-' + item.disease_info_title,
            publicInfoModel: item.publicInfoModel
          }
        })
        // 修改图标连线数据title
        this.UPDATACHARTTITLEDATA(searchDataListSearchData)
      })
    },
    // 图标展示下拉框和图标的数据
    getSimilarityEntityFlag () {
      const param = {
        patient_id: localStorage.getItem('patientId'),
        num_hospital: localStorage.getItem('numHospital'),
        disease_name: localStorage.getItem('disease_name')
      }
      disease360.getSimilarityEntityFlag(param).then(res => {
        console.log(res)
        // // 取全部值
        let searchDataListSearch = []
        searchDataListSearch = res.data.map((item, index) => {
          return {
            ...item,
            label: item?.disease_info_title || '',
            value: index + '-' + item.id + '-' + item.disease_info_title,
            publicInfoModel: item.publicInfoModel,
            children: item.children
          }
        })
        for (let i = 0; i < searchDataListSearch.length; i++) {
          searchDataListSearch[i].children = searchDataListSearch[
            i
          ].children.map((item, index) => {
            return {
              ...item,
              label: item?.disease_info_title || '',
              value:
                i +
                  '-' +
                  index +
                  '-' +
                  item.id +
                  '-' +
                  item.disease_info_title +
                  '-' +
                  item.presentation_type +
                  '-' +
                  item.option_info || '0',
              publicInfoModel: item.publicInfoModel
            }
          })
        }
        // 过滤掉高级搜索的第一个选择数据的内容为空的
        searchDataListSearch = searchDataListSearch.filter(item => {
          return item.children.length > 0
        })
        this.SEARCHDATALIST(searchDataListSearch)
      })
    },
    onShowToast (i) {
      this.$emit('onShowToast', i)
    },
    onChangeComponent ({ val, title, selectitem = {} }) {
      this.isShowEchart = val
      this.changeTitle = title
      if (selectitem.title) {
        console.warn(selectitem)
        const arr = []
        selectitem.children.forEach(ele => {
          arr.push({ title: ele })
        })
        this.chartData.schema = arr
        this.initData()
      }
    },
    handleChange (val) {
      console.log(val)
    },
    onDetail (val) {
      // console.log(val, 'val')
      // this.patientName = val.name
      // this.$router.push({
      //   path: 'DiseaseList/DiseaseDetail360',
      //   query: { disease_name: localStorage.getItem('disease_name') }
      // })

      // 新页面打开
      const routeUrl = this.$router.resolve({
        path: 'DiseaseDetail360',
        query: { disease_name: localStorage.getItem('disease_name') }
      })
      localStorage.patientId = val.患者ID
      localStorage.numHospital = val.住院次数
      window.open(routeUrl.href, '_blank')

      // this.dialogTableVisible = true
    },
    ...mapMutations({
      ONADDChILDFILTER: 'disease360/ONADDChILDFILTER',
      ONDELFLITER: 'disease360/ONDELFLITER',
      UPDATAONADDChILDFILTER: 'disease360/UPDATAONADDChILDFILTER'
    }),
    // 高级检索事件
    onSubmit () {
      // 假数据误删
      const data = {
        disease_name: localStorage.getItem('disease_name'),
        sign: [
          {
            searchName: 'N分期',
            searchVal: 'N1',
            opt: '',
            searchType: '=',
            relationId: '118',
            praList: [
              {
                searchName: 'M分期',
                searchVal: 'M0',
                opt: '',
                searchType: '=',
                relationId: '119',
                praList: []
              }
            ]
          },
          {
            searchName: 'N分期',
            searchVal: 'N2',
            opt: 'or',
            searchType: '=',
            relationId: '118',
            praList: [
              {
                searchName: 'M分期',
                searchVal: 'M0',
                opt: '',
                searchType: '=',
                relationId: '119',
                praList: []
              }
            ]
          }
        ]
      }

      const dataTable = this.searchFilters?.map(item => {
        return {
          searchName: item.theme?.split('-')[3],
          searchVal: item.range,
          opt: item.relation,
          searchType: item.condition,
          relationId: item.theme?.split('-')[2],
          praList: []
        }
      })
      for (let i = 0; i < dataTable.length; i++) {
        dataTable[i].praList = this.searchFilters[i].children?.map(item => {
          return {
            searchName: item.theme?.split('-')[3],
            searchVal: item.range,
            opt: '',
            searchType: item.condition,
            relationId: item.theme?.split('-')[2],
            praList: []
          }
        })
      }
      sessionStorage.setItem('similarityCase', 'similarityCaseSearh')

      data.sign = dataTable
      this.UPDATAONADDChILDFILTERTitle() // 修改线条图的title

      disease360.similarityCaseSearh(data).then(res => {
        if (res.status === '0') {
          // // 赋值表格
          // this.tableData = res.data
          // this.tableData.forEach(element => {
          //   if (element.scop) {
          //     element.scop = element.scop + '%'
          //   }
          // })
          // 图表赋值
          const data = {
            header: this.HeaderData,
            data: res.data.list
          }
          this.total = res.data.total
          // 去掉scop属性
          // this.removeByValue(this.HeaderData, 'key', 'scop')

          this.CHARTDATA(data) // 修改线性图表展示数据：dataJB
          this.UPDATACHARTLIST(res.data.statistics) // 修改柱状图数据
          // this.UPDATACHARTLISTPIE(res.data.statistics)
          this.UPDATACHARTDATAPARALLELAXISDATA(res.data.list)

          // 跳转组件
          this.onChangeComponent({ val: 1, title: '病人筛选结果' })
        } else {
          this.$message.warning(res.message)
        }
      })

      // this.onChangeComponent({ val: 1, title: '病人筛选结果' })
    },
    // AI检索返回方法
    onSubmitAI (val) {
      const data = {
        disease_name: localStorage.getItem('disease_name'),
        sign: this.conditionListData[val.selectitem.index].conditionsList
      }
      sessionStorage.setItem('similarityCase', 'similarityCaseSearh')

      // this.UPDATAONADDChILDFILTERTitle() // 修改线条图的title
      this.getSimilarityEntity()

      disease360.similarityCaseSearh(data).then(res => {
        if (res.status === '0') {
          // 图表赋值
          const data = {
            header: this.HeaderData,
            data: res.data.list
          }
          this.total = res.data.total

          this.CHARTDATA(data)
          this.UPDATACHARTLIST(res.data.statistics) // 修改柱状图
          // this.UPDATACHARTLISTPIE(res.data.statistics)
          // this.UPDATACHARTDATAPARALLELAXISDATA(res.data.list) // 添加title下的无值的data属性
          this.UPDATACHARTTITLEDATANEXT(res.data.list)

          // 跳转组件
          this.onChangeComponent({ val: 1, title: '病人筛选结果' })
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    onTabClick (tab, event) {
      this.activeName = tab.name
    },
    // 更新线图：制作数据
    initData () {
      // this.UPDATACHARTTITLEDATANEXT()

      const mcolors = ['rgba(0,0,0,0.1)', '#409EFF', 'rgb(141,176,243)']
      const dataBJ = this.chartData.dataBJ
      const dataGZ = this.chartData.dataGZ
      const dataSH = this.chartData.dataSH
      const dataParallelAxis = Object.assign(this.chartData.parallelAxis)
      console.log(this.chartData, 'this.chartData2')
      console.log(dataBJ, 'dataBJ')
      const option = {
        parallelAxis: dataParallelAxis,
        parallel: {
          left: '5%',
          right: '13%',
          bottom: '10%',
          top: '20%',
          parallelAxisDefault: {
            type: 'value',
            name: 'postion',
            nameLocation: 'end',
            nameGap: 23,
            splitNumber: 4,
            nameTextStyle: {
              fontSize: 14,
              verticalAlign: 'bottom',
              color: '#333',
              padding: [3, 10]
            },
            axisLabel: {
              show: true,
              margin: 10,
              // color: '#409EFF',
              align: 'center',
              zlevel: 2222,
              interval: false
            },
            axisLine: {
              lineStyle: {
                // color: '#409EFF',
                opacity: 1,
                zlevel: 1,
                width: 1
              },
              zlevel: 2
            },
            axisTick: {
              show: false,
              alignWithLabel: true,
              length: 20,
              lineStyle: {
                width: 1,
                color: 'red',
                rotate: 90
              }
            },
            minorTick: {
              show: false
            }
          }
        },
        series: [
          {
            name: 'persion',
            type: 'parallel',
            smooth: true,
            data: dataBJ,
            textStyle: {
              color: '#333'
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: mcolors[0],
                  opacity: 1
                }
              }
            }
          },
          {
            name: 'simple',
            type: 'parallel',
            smooth: true,
            data: dataSH,
            lineStyle: {
              color: mcolors[1],
              opacity: 1,
              width: 1
            }
          },
          {
            name: 'other',
            type: 'parallel',
            smooth: true,
            data: dataGZ,
            lineStyle: {
              color: mcolors[2],
              opacity: 1
            }
          }
        ]
      }
      this.chartInit(option)
    },
    // 更新具体的线图
    chartInit (option) {
      // 基于准备好的dom，初始化echarts实例
      setTimeout(() => {
        // 获取存储的值，如果是初始化更新的时候为similarityCase两边都更新，如果是similarityCaseSearch则只更新高级检索那的
        const d = sessionStorage.getItem('similarityCase')
        if (d === 'similarityCase') {
          const myChartDefault = this.$echarts.init(
            document.getElementById('myChartDefault')
          )
          myChartDefault.setOption(option, true)

          const myChart = this.$echarts.init(document.getElementById('myChart'))
          myChart.setOption(option, true)
        } else {
          const myChart = this.$echarts.init(document.getElementById('myChart'))
          myChart.setOption(option, true)
        }
      }, 200)
    },
    // 暂未用到
    chartPieInit (chart, index) {
      var myChart = this.$echarts.init(
        document.getElementById(`doughnutChart${index}`)
      )
      const option = {
        color: ['red', 'green', 'gray', 'origin'],
        title: {
          text: chart.title,
          right: 'center'
        },
        legend: {
          orient: 'vertical',
          top: 40,
          left: 0,
          width: '40',
          selectedMode: false,
          data: chart.legend
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: [30, 45],
            hoverOffset: 2,
            avoidLabelOverlap: true,
            center: ['40%', '60%'],
            label: {
              show: true,
              position: 'left',
              formatter: '{d}%'
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: chart.data
          }
        ]
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style lang="scss" scoped>
$theme-clor: rgb(35, 53, 75);
$font-clor: rgb(30, 38, 50);
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
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
    color: #fff;
  }
}
.similar-case-wrap {
  padding: 0 20px;
  height: 100%;
  overflow-y: auto;
  background: #fff;
  .mask-wrap {
    position: fixed;
    left: 30%;
    right: 30%;
    top: 15%;
    bottom: 40%;
    z-index: 2000;
    border-radius: 8px;
    background: #f2f4f5;
    padding: 20px;
    display: flex;
    flex-direction: column;
    p {
      font-size: 16px;
      font-weight: 800;
      height: 40px;
      display: flex;
      justify-content: space-between;
      i {
        font-size: 22px;
        margin-right: 20px;
      }
    }
    .collapse-wrap {
      overflow-y: auto;
      flex: 1;
      /deep/ .el-collapse-item__wrap {
        background: #f2f4f5;
      }
      /deep/ .el-collapse-item__header {
        background: #f2f4f5;
      }
    }
  }
  .chart-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // background: #f2f4f5;
    border-radius: 4px;
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
  .chart-wrap-content {
    .form-wrap {
      padding-left: 20px;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      background: #f2f4f5;
      padding-bottom: 30px;
      max-height: 370px;
      overflow-y: auto;
    }
    .doughnut-wrap {
      min-height: 400px;
      width: 100%;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      background: #fff;
      overflow-x: hidden;
      .doughnut-top-wrap {
        padding: 20px 0;
        span {
          font-size: 14px;
          font-weight: 600;
        }
      }
      .chart-pie-wrap {
        width: 100%;
        display: flex;
        overflow-x: auto;
        .d-chart-wrap {
          flex: 1;
          width: 25%;
          border-right: 1px solid #ccc;
          padding-left: 30px;
          &:first-of-type {
            padding-left: 0;
          }
          &:last-of-type {
            border: none;
          }
        }
      }
    }
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 10px;
    }
    .ld-icon {
      background: url('../../static/images/search.png') no-repeat;
      background-size: contain;
    }
    .ai-icon {
      background: url('../../static/images/AI.png') no-repeat;
      background-size: contain;
    }
    .lineChart-icon {
      background: url('../../static/images/line-chart.png') no-repeat;
      background-size: contain;
    }
  }
  .list-wrap {
    height: 80%;
    background-color: #fff;
  }
  /deep/.el-tabs__item.is-disabled {
    display: inline;
    left: 300%;
  }
}
</style>

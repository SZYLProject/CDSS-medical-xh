const state = {
  // 高级搜索数组
  searchFilters: [
    {
      relation: '',
      theme: '',
      condition: '',
      range: '',
      children: [],
      presentation_type: null,
      label: null,
      value: null,
      publicInfoModel: null
    }
  ],
  searchDialogForm: {
    theme: ''
  },
  searchDataList: [], // 搜索主题的搜索项数据
  searchDataIndex: null, // 高级搜索弹出框选择后进行赋值
  activeName: '0',
  editForm: {},
  formItems: [],
  themeObj: {
    parentIndex: 0,
    childIndex: null,
    isParent: true
  },
  dialogShow: false,
  dialogTitle: '高级搜索',
  componentForm: 'FormDialog',
  diseaseInfoSelectData: {
    fullscreenLoading: true,
    finished: false,
    basicInfoModel: {},
    diseaseInfoModel: [],
    displyTreatments: []
  },
  drawerDom: null,
  drawer: false,
  screenWidth: null,
  defaultTab: 0,
  componentDefault: 'SchemeRecommendation',
  optionTip: '',
  publicInfoModel: [],
  submitLoading: false,
  pathologyInfo: {
    jyjc: [
      { label: 'ALK', value: 0 },
      { label: 'ROS1', value: 0 },
      { label: 'BRAF', value: 1 },
      { label: 'MET', value: 1 }
    ],
    NSCLC: [
      { title: 'TNM ', subValue: 'T3N1M0 ', value: 'ⅡB期 ' },
      { title: '转移 ', subValue: ' ', value: '脑转移、骨转移 ' },
      { title: '淋巴结情况 ', subValue: ' ', value: '单组或两组转移 ' },
      { title: '病变可切除性 ', subValue: ' ', value: '预期病变可完全切除 ' }
    ],
    clinical: ['胸腔积液 ', '淋巴结肿大 ', '心包积液 ', '共济失调 '],
    history: ['高血压 ', '糖尿病 ', '吸烟 ', '饮酒 '],
    historyZl: [
      '多西他赛 ',
      '吉非替尼 ',
      '阿特珠单抗 ',
      '二甲双胍 ',
      '硝苯地平 '
    ],
    clinicaltx: [
      '咳嗽 ',
      '呼吸困难 ',
      '痰中带血 ',
      '上静脉综合症 ',
      '发热 ',
      '腹泻 ',
      '...... '
    ],
    laboratoryExamination: {
      title: '实验室检查 ',
      children: [
        {
          children: [
            {
              degree: 3,
              label: '血红蛋白（HGB） ',
              value: '130g/L ',
              date: '2020-6-11 '
            },
            {
              degree: 2,
              label: '中性粒细胞比率（NEUTP） ',
              value: '61% ',
              date: '2020-4-1 '
            },
            {
              degree: 3,
              label: '血小板 ',
              value: '220×10^9 /L ',
              date: '2020-5-21 '
            },
            {
              degree: 2,
              label: '总胆红素（T-BIL） ',
              value: '12μmol/L ',
              date: '2020-7-12 '
            }
          ]
        },
        {
          children: [
            {
              degree: 3,
              label: '血红细胞（RBC） ',
              value: '10x10^12/L ',
              date: '2019-6-10 '
            },
            {
              degree: 2,
              label: '碱性磷酸酶（ALP） ',
              value: '91U/L ',
              date: '2019-8-11 '
            },
            {
              degree: 3,
              label: '总蛋白（TP） ',
              value: '72g/L  ',
              date: '2019-9-14 '
            },
            {
              degree: 3,
              label: '球蛋白（GLB） ',
              value: '26g/L  ',
              date: '2019-9-20 '
            },
            {
              degree: 1,
              label: '钾（K）： ',
              value: '4mmol/L ',
              date: '2020-1-11 '
            },
            {
              degree: 1,
              label: '钠（Na）： ',
              value: '150mmol/L ',
              date: '2020-2-4 '
            }
          ]
        },
        {
          children: [
            {
              degree: 1,
              label: '血红细胞角质素片段（CyfRra21-1） ',
              value: '10ng/ml ',
              date: '2020-6-11 '
            },
            {
              degree: 1,
              label: '癌胚抗原（CEA） ',
              value: '5ng/ml ',
              date: '2020-6-20 '
            },
            {
              degree: 1,
              label: '神经元特异性烯醇化酶（NSE） ',
              value: '0.8ng/ml ',
              date: '2020-6-11 '
            },
            {
              degree: 1,
              label: '鳞状细胞癌抗原（SCC） ',
              value: '2.2ng/ml ',
              date: '2020-7-9 '
            },
            {
              degree: 1,
              label: '糖抗原125（CA125） ',
              value: '3U/ml ',
              date: '2020-7-10 '
            },
            {
              degree: 1,
              label: '甲胎蛋白（AFP） ',
              value: '4.7ng/ml ',
              date: '2020-6-22 '
            }
          ]
        }
      ]
    },
    lungInfo: [
      { disease_info_title: '肿瘤大小 ', disease_info_title_value: '2mm ' },
      {
        disease_info_title: '肿瘤位置 ',
        disease_info_title_value: '左肺上叶 '
      },
      {
        disease_info_title: '组织学分级 ',
        disease_info_title_value: '低分级 '
      },
      {
        disease_info_title: '是否累及主支气管 ',
        disease_info_title_value: '否 '
      },
      { disease_info_title: '是否侵犯神经 ', disease_info_title_value: '是 ' }
    ]
  },
  restaurants: [
    { value: '三全鲜食（北新泾店） ', address: '长宁区新渔路144号 ' },
    {
      value: 'Hot honey 首尔炸鸡（仙霞路） ',
      address: '上海市长宁区淞虹路661号 '
    },
    {
      value: '新旺角茶餐厅 ',
      address: '上海市普陀区真北路988号创邑金沙谷6号楼113 '
    },
    { value: '泷千家(天山西路店) ', address: '天山西路438号 ' },
    {
      value: '胖仙女纸杯蛋糕（上海凌空店） ',
      address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101 '
    },
    { value: '贡茶 ', address: '上海市长宁区金钟路633号 ' },
    {
      value: '豪大大香鸡排超级奶爸 ',
      address: '上海市嘉定区曹安公路曹安路1685号 '
    },
    { value: '茶芝兰（奶茶，手抓饼） ', address: '上海市普陀区同普路1435号 ' },
    { value: '十二泷町 ', address: '上海市北翟路1444弄81号B幢-107 ' },
    { value: '星移浓缩咖啡 ', address: '上海市嘉定区新郁路817号 ' },
    { value: '阿姨奶茶/豪大大 ', address: '嘉定区曹安路1611号 ' },
    { value: '新麦甜四季甜品炸鸡 ', address: '嘉定区曹安公路2383弄55号 ' },
    {
      value: 'Monica摩托主题咖啡店 ',
      address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F '
    },
    {
      value: '浮生若茶（凌空soho店） ',
      address: '上海长宁区金钟路968号9号楼地下一层 '
    },
    { value: '香宜度麻辣香锅 ', address: '长宁区淞虹路148号 ' },
    { value: '凡仔汉堡（老真北路店） ', address: '上海市普陀区老真北路160号 ' },
    { value: '港式小铺 ', address: '上海市长宁区金钟路968号15楼15-105室 ' },
    { value: '蜀香源麻辣香锅（剑河路店） ', address: '剑河路443-1 ' },
    { value: '北京饺子馆 ', address: '长宁区北新泾街道天山西路490-1号 ' },
    {
      value: '饭典*新简餐（凌空SOHO店） ',
      address: '上海市长宁区金钟路968号9号楼地下一层9-83室 '
    },
    {
      value: '焦耳·川式快餐（金钟路店） ',
      address: '上海市金钟路633号地下一层甲部 '
    },
    { value: '动力鸡车 ', address: '长宁区仙霞西路299弄3号101B ' },
    { value: '浏阳蒸菜 ', address: '天山西路430号 ' },
    { value: '四海游龙（天山西路店） ', address: '上海市长宁区天山西路 ' },
    {
      value: '樱花食堂（凌空店） ',
      address: '上海市长宁区金钟路968号15楼15-105室 '
    },
    { value: '壹分米客家传统调制米粉(天山店) ', address: '天山西路428号 ' },
    {
      value: '福荣祥烧腊（平溪路店） ',
      address: '上海市长宁区协和路福泉路255弄57-73号 '
    },
    {
      value: '速记黄焖鸡米饭 ',
      address: '上海市长宁区北新泾街道金钟路180号1层01号摊位 '
    },
    { value: '红辣椒麻辣烫 ', address: '上海市长宁区天山西路492号 ' },
    { value: '(小杨生煎)西郊百联餐厅 ', address: '长宁区仙霞西路88号百联2楼 ' },
    { value: '阳阳麻辣烫 ', address: '天山西路389号 ' },
    {
      value: '南拳妈妈龙虾盖浇饭 ',
      address: '普陀区金沙江路1699号鑫乐惠美食广场A13 '
    }
  ],
  myChartTitleAndList: [],
  treeListIndex: {
    parentIndex: null, // 树当前选择的父级
    childIndex: null // 树当前选项的子级
  },

  conditionList: [],
  chartListPie: [
    {
      title: '死亡率/死因',
      data: [
        {
          value: 35,
          name: '活着'
        },
        {
          value: 100,
          name: '原发性肿瘤相关死亡'
        },
        {
          value: 34,
          name: '其他肿瘤相关死亡'
        },
        {
          value: 0,
          name: '氏癌'
        }
      ],
      legend: ['活着', '原发性肿瘤相关死亡', '其他肿瘤相关死亡', '氏癌']
    },
    {
      title: '5年复发率',
      data: [
        {
          value: 5,
          name: '复发'
        },
        {
          value: 75,
          name: '不复发'
        },
        {
          value: 2,
          name: '未知'
        }
      ],
      legend: ['复发', '不复发', '未知']
    },
    {
      title: '5年复发分布',
      data: [
        {
          value: 0,
          name: '奥卡尔'
        },
        {
          value: 0,
          name: '淋巴结点'
        },
        {
          value: 100,
          name: '远点'
        }
      ],
      legend: ['奥卡尔', '淋巴结点', '远点']
    },
    {
      title: '5年元转移',
      data: [
        {
          value: 0,
          name: '脑'
        },
        {
          value: 0,
          name: '骨'
        },
        {
          value: 0,
          name: '肝脏'
        },
        {
          value: 100,
          name: '多重'
        }
      ],
      legend: ['肝脏', '肺', '脑', '骨', '多重']
    }
  ],
  chartData: {
    // 连线数据
    dataBJ: [
      ['T2a', 'N1', 'M0', '膀胱癌', '', 'G1', '单发', '无CIS'],
      ['T3a', 'N1', 'M1b', '膀胱癌', '', 'G1', '单发', '无CIS', '2'],
      ['T3a', 'N0', 'M0', '膀胱癌', 'G3', '单发', '无CIS', '3']
    ],
    // dataGZ: [['结肠', 2, 2, 1, 1.39, '腺癌']],
    // dataSH: [['结肠', 3, 2, 1, 0.82, '腺癌']],
    // title名字
    schema: [
      { name: 'T分期 ', index: '0', title: 'T分期' },
      { name: 'N分期 ', index: '1', title: 'N分期' },
      { name: 'M分期 ', index: '2', title: 'M分期' },
      { name: '疾病诊断 ', index: '3', title: '疾病诊断' }
    ],
    parallelAxis: [
      {
        dim: 0,
        name: 'T分期',
        type: 'category',
        data: ['T2a', 'T3a']
      },
      {
        dim: 1,
        name: 'N分期',
        type: 'category',
        data: ['N1', 'N0']
      }
    ],
    schemaNameTemporary: [] // 临时存储没有下拉框的title
  },
  chartDataDefault: {
    // 连线数据
    dataBJ: [
      ['T2a', 'N1', 'M0', '膀胱癌', '', 'G1', '单发', '无CIS'],
      ['T3a', 'N1', 'M1b', '膀胱癌', '', 'G1', '单发', '无CIS', '2'],
      ['T3a', 'N0', 'M0', '膀胱癌', 'G3', '单发', '无CIS', '3']
    ],
    // dataGZ: [['结肠', 2, 2, 1, 1.39, '腺癌']],
    // dataSH: [['结肠', 3, 2, 1, 0.82, '腺癌']],
    // title名字
    schema: [
      { name: 'T分期 ', index: '0', title: 'T分期' },
      { name: 'N分期 ', index: '1', title: 'N分期' },
      { name: 'M分期 ', index: '2', title: 'M分期' },
      { name: '疾病诊断 ', index: '3', title: '疾病诊断' }
    ],
    parallelAxis: [
      {
        dim: 0,
        name: 'T分期',
        type: 'category',
        data: ['T2a', 'T3a']
      },
      {
        dim: 1,
        name: 'N分期',
        type: 'category',
        data: ['N1', 'N0']
      }
    ],
    schemaNameTemporary: [] // 临时存储没有下拉框的title
  },
  chartList: [
    {
      title: '死亡率/死因',
      treatmentDataX: [
        'CTU',
        'MRU',
        'PET-CT',
        '心电图',
        '胸部CT',
        '盆腔MR',
        '盆腔CT',
        '胸部正侧位X线',
        '膀胱超声',
        '膀胱镜'
      ],
      treatmentDataY: [30, 10, 30, 60, 100, 40, 49, 39, 40, 20, 40, 100, 10]
    },
    {
      title: '5年复发率',
      treatmentDataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      treatmentDataY: [30, 10]
    },
    {
      title: '5年复发分布',
      treatmentDataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      treatmentDataY: [30, 10]
    },
    {
      title: '5年元转移',
      treatmentDataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      treatmentDataY: [30, 10]
    }
  ],
  chartListDefault: [
    {
      title: '死亡率/死因',
      treatmentDataX: [
        'CTU',
        'MRU',
        'PET-CT',
        '心电图',
        '胸部CT',
        '盆腔MR',
        '盆腔CT',
        '胸部正侧位X线',
        '膀胱超声',
        '膀胱镜'
      ],
      treatmentDataY: [30, 10, 30, 60, 100, 40, 49, 39, 40, 20, 40, 100, 10]
    },
    {
      title: '5年复发率',
      treatmentDataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      treatmentDataY: [30, 10]
    },
    {
      title: '5年复发分布',
      treatmentDataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      treatmentDataY: [30, 10]
    },
    {
      title: '5年元转移',
      treatmentDataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      treatmentDataY: [30, 10]
    }
  ]
}
export default state

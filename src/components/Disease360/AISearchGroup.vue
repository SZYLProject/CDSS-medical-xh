<template>
  <div class="ai-group-wrap">
    <p>
      <el-button @click="onSearch" type="success" size="mini">搜索</el-button
      ><span>{{ selectitem.title }}</span
      ><i class="el-icon-info"></i>选择组合搜索
    </p>
    <div class="ai-group-top-wrap">
      <div
        :ref="'group' + index"
        class="group"
        v-for="(item, index) in groups"
        :key="index"
        @click="onSeletGrpup(index, $event)"
      >
        <div class="ai-g-title-wrap">
          <h1>{{ item.title }}</h1>
          <i
            :class="['checked-icon', item.checked ? 'selected' : 'select']"
          ></i>
        </div>
        <div class="ai-g-item-wrap">
          <p v-for="child in item.children" :key="child">
            {{ child }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array,
      default: () => [
        {
          title: '第1组',
          checked: false,
          children: ['淋巴情况1', 'TNM1', 'BP1', '咳嗽1', '淋巴情况11', 'TN1']
        },
        {
          title: '第2组',
          checked: false,
          children: ['淋巴情况2', 'TNM2', 'BP2', '咳嗽2', '淋巴情况22', 'TN2']
        },
        {
          title: '第3组',
          checked: false,
          children: ['淋巴情况3', 'TNM3', 'BP3', '咳嗽3', 'TN3', '恶心']
        },
        {
          title: '第4组',
          checked: false,
          children: ['淋巴情况4', 'TNM4', 'BP4', '咳嗽4', 'BMP4', '发热4']
        },
        {
          title: '第5组',
          checked: false,
          children: ['淋巴情况5', 'TNM5', 'BP5', '咳嗽5', 'BMP5', '发热5']
        },
        {
          title: '第6组',
          checked: false,
          children: ['淋巴情况6', 'TNM6', 'BP6', '咳嗽6', 'BMP6', '发热6']
        }
      ]
    }
  },
  data () {
    return {
      // groups: [],
      selectitem: {}
    }
  },
  methods: {
    onSeletGrpup (i, e) {
      this.groups.forEach((ele, index) => {
        if (i === index) {
          this.$set(ele, 'checked', !ele.checked)
          this.selectitem = ele.checked ? ele : {}
        } else {
          this.$set(ele, 'checked', false)
        }
      })
    },
    onSearch () {
      // console.log(this.selectitem)
      this.$emit('onSubmitAI', {
        val: 1,
        title: '病人筛选结果',
        selectitem: this.selectitem
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ai-group-wrap {
  > p {
    font-size: 13px;
    font-weight: 500;
    padding: 16px;
    color: #909399;
    span {
      padding: 0 20px;
    }
  }
  width: 100%;
  .ai-group-top-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .group {
    width: 20%;
    border: 1px solid #fff;
    padding: 20px;
    cursor: pointer;
    h1 {
      font-size: 14px;
      font-weight: 800;
    }
    .ai-g-title-wrap {
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .checked-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
      }
      .selected {
        background: url('../../static/images/selected.png') no-repeat;
        background-size: contain;
      }
      .select {
        background: url('../../static/images/select.png') no-repeat;
        background-size: contain;
      }
    }
    .ai-g-item-wrap {
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      p {
        width: 33%;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 18px;
      }
    }
  }
}
</style>

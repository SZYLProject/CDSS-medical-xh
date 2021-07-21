<template>
  <div class="header-wrap">
    <div class="left-wrap">
      <img src="../static/images/logo.png" alt="" />
      <span class="title-spa">{{ headerInfo.title }}</span>
    </div>
    <div class="right-wrap" v-if="isShowBack">
      <el-avatar icon="el-icon-user-solid" class="user-solid-wrap"></el-avatar>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ headerInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="loginOut">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Avatar, Dropdown, Input, Option } from 'element-ui'
export default {
  components: {
    [Avatar.name]: Avatar,
    [Input.name]: Input,
    [Option.name]: Option,
    [Dropdown.name]: Dropdown
  },
  props: {
    headerInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isShowBack: {
      type: Boolean
    }
  },
  watch: {
    'searchForm.search': {
      deep: true,
      handler: function (oldVal, newVal) {
        console.log(oldVal, newVal)
        if (oldVal !== newVal) {
          this.isSearch = true
        }
      }
    }
  },
  data () {
    return {
      searchForm: {
        search: ''
      },
      isSearch: false
    }
  },
  computed: {
    diseaseObj: function () {
      if (localStorage.getItem('token') === 'admin') {
        return {
          kind: '肺癌',
          options: [
            { value: '肝癌' },
            { value: '肺癌' },
            { value: '胃癌' },
            { value: '肠癌' },
            { value: '大肠息肉' }
          ]
        }
      } else {
        return {
          kind: '肺癌',
          options: [{ value: '肺癌' }]
        }
      }
    }
  },
  methods: {
    changeTab (tab) {
      this.$emit('changeTab', tab)
    },
    loginOut () {
      this.$api.login.apiPostUserLogout().then(res => {
        if (res.status === '0') {
          localStorage.removeItem('token')
          this.$router.replace('/login')
        }
      })
    },
    onSearchPatient () {
      if (this.isSearch) {
        console.log(this.searchForm)
        this.isSearch = false
      } else {
        console.log('no search')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../static/style/flexStyle.scss';
.header-wrap {
  height: 60px;
  background: rgb(35, 53, 75);
  width: 100%;
  padding: 0 20px;
  display: flex;
  box-sizing: border-box;
  z-index: 30;
  justify-content: space-between;
  .left-wrap {
    min-width: 100px;
    @include flexistyle();
    justify-content: flex-start;
    img {
      height: 70%;
      width: 30%;
      padding-right: 30px;
    }
  }
  .right-wrap {
    min-width: 200px;
    @include flexistyle();
    .user-solid-wrap {
      margin-right: 20px;
    }
    .el-dropdown-link {
      color: #fff;
      cursor: pointer;
    }
  }
  .middle-wrap {
    padding-left: 30px;
    flex: 1;
    @include flexistyle();
    justify-content: flex-start;
    /deep/ .el-input__inner {
      background-color: rgba(255, 255, 255, 0.2);
      border: none;
      color: #fff;
    }
    p {
      height: 100%;
      padding: 0 20px;
      @include flexistyle();
      cursor: pointer;
      span {
        color: #fff;
        font-weight: 600;
        font-size: 16px;
      }
    }
    .avtiveTab {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
.el-select-dropdown__item.selected span {
  color: rgb(35, 53, 75);
}
</style>

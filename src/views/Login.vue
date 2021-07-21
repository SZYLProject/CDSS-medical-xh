<template>
  <div class="login-wrap">
    <el-card class="box-card">
      <div class="row-box">
        <div class="lf-box">
          <img src="@/static/images/logo.png" alt="">
          <p>{{title}}</p>
        </div>
        <div class="rg-form">
          <p class="input-box">
            <el-input placeholder = '请输入用户名' v-model="loginForm.name" prefix-icon="el-icon-user"></el-input>
          </p>
          <p class="input-box">
              <el-input placeholder = '请输入密码' show-password v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
          </p>
          <p class="checkbox-box">
              <el-checkbox v-model="loginForm.save">记住密码</el-checkbox>
          </p>
          <p>
              <el-button v-if = 'loading' type="primary" style="width:100%;" :loading="true">登陆中</el-button>
              <el-button v-else type="primary" @click="onSubmit" style="width:100%;">登陆</el-button>
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Card, Input } from 'element-ui'
export default {
  components: {
    [Card.name]: Card,
    [Input.name]: Input
  },
  data () {
    return {
      title: '临床决策支持系统',
      loginForm: {
        save: true,
        name: '',
        password: ''
      },
      loading: false
    }
  },
  created () {
    this.getCoolie()
  },
  methods: {
    onSubmit () {
      if (this.loginForm.name && this.loginForm.password) {
        this.loading = true
        this.$api.login.apiPostUserLogin({ userName: this.loginForm.name, userPassword: this.loginForm.password }).then((res) => {
          this.loading = false
          if (res.status === '1') {
            this.$message.error(res.message)
          } else {
            localStorage.setItem('token', res.data.name)
            this.$router.push('DiseaseEntry')
          }
          if (this.loginForm.save) {
            this.setCookie(this.loginForm.name, this.loginForm.password, 5)
          } else {
            this.delCookie()
          }
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
      } else {
        this.$message({
          message: '请输入用户名：admin，密码：admin123',
          type: 'warning'
        })
      }
    },
    setCookie (name, password, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      var expires = 'expires=' + d.toUTCString()
      const user = {
        name: name,
        password: password
      }
      document.cookie = `user=${JSON.stringify(user)};${expires};path=/`
    },
    getCoolie () {
      const cookie = document.cookie
      console.log(cookie)
      if (cookie.length) {
        const user = JSON.parse(cookie.split('=')[1])
        this.loginForm.name = user ? user.name : ''
        this.loginForm.password = user ? user.password : ''
      }
    },
    delCookie () {
      var date = new Date()
      date.setTime(date.getTime() - 10000)
      const user = document.cookie.split('=')[0]
      if (user) {
        document.cookie = user + '=null; expire=' + date.toGMTString() + '; path=/'
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../static/style/flexStyle.scss';
$theme-clor:rgb(35,53,75);
.login-wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url('../static/images/background.png');
  @include flexistyle( );
  background-size: cover;
  .box-card {
    background-color: rgba(255,255,255,.5);
    border: none;
    /deep/ .el-card__body {
      padding: 0;
    }
    @include flexistyle( );
    .row-box {
      display: flex;
      height: 366px;
      .lf-box {
        width: 290px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 33px;
        color: #fff;
        font-weight: 900;
        flex-direction: column;
        img {
          width: 75%;
          height: 16%;
        }
      }
      .rg-form {
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        padding: 0 30px;
        justify-content: center;
        >p {
          font-size: 30px;
          width: 100%;
        }
        .input-box {
          padding: 5px 0;
          text-align: center;
        }
        .checkbox-box {
          padding: 12px 0 10px;
        }
      }
    }
    img {
      height: 100px;
      padding-bottom: 40px;
    }
.login-btn{
  width: 400px;
  padding-top: 40px;
   @include flexistyle(flex, center, none );
}
  }
}
</style>

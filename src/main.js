
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './request/index'
import EmptyComponent from './components/customComponents/emptyComponent/Empty'
import echarts from 'echarts'
import $ from 'jquery'
Vue.prototype.$echarts = echarts
Vue.prototype.$api = api
Vue.prototype.$ = $
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(EmptyComponent)
Vue.directive('drag', // 自定义指令
  {
    // 只调用一次 指令第一次绑定到元素的时候
    bind: function (el, binding) {
      const oDiv = el // 当前元素
      oDiv.onmousedown = function (e) {
      // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - oDiv.offsetLeft
        const disY = e.clientY - oDiv.offsetTop

        document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
          const l = e.clientX - disX
          const t = e.clientY - disY
          // 移动当前元素
          oDiv.style.left = l + 'px'
          oDiv.style.top = t + 'px'
          // 将此时的位置传出去
          // binding.value({ x: e.pageX, y: e.pageY })
        }
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  }
)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 按需导入Vant组件
import { Button } from 'vant'
// 2.导入amfe-flexible: 作用是自动根据视口变化设置rem基准值为当前屏幕 1/10
import 'amfe-flexible'

Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

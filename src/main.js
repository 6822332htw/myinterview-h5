import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 注册全局组件
import ArticleItem from '@/components/ArticleItem.vue'

// 完敢安装
// 2.导入amfe-flexible: 作用是自动根据视口变化设置rem基准值为当前屏幕 1/10
import 'amfe-flexible' // 第三方的直接写文件名
// 导入vant.js
import '@/utils/vant.js'
Vue.component('ArticleItem', ArticleItem) // 自己写的要路径明确

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

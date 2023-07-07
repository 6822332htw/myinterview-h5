import Vue from 'vue'
// 这个模块作用： 帮我们导入各种vant组件，减少main.js代码量
// 按需导入Vant组件
// 1. 从node_modules文件夹的vant资源包里面导入组件
import { Button, NavBar, Form, Field, Toast, Cell, CellGroup, List, Tabbar, TabbarItem, Icon, Grid, GridItem, Dialog } from 'vant'
// 2. 使用组件： 底层原理是注册组件
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast) // Vue.prototype.$toast = Toast
// 这里全局生效，因为vant.js导入到main.js中
Toast.success('成功了') // 要在哪个网页组件上单独用就直接在js里面调用，this.$toast.success('注册成功')
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(List)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Dialog)// 同Toast一样，会在原型里面创建：Vue.prototype.$dialog = Dialog

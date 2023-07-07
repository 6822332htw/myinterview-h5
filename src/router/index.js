import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件，一级路由
import { getToken } from '@/utils/storage'
import register from '@/views/register.vue'
import login from '@/views/login.vue'
import detail from '@/views/ArticleDetail.vue'
import layout from '@/views/layout.vue'
// 二级路由
import MyLike from '@/views/MyLike.vue'
import user from '@/views/MyUser.vue'
import collect from '@/views/MyCollect.vue'
import article from '@/views/MyArticle.vue'

Vue.use(VueRouter)

// 路由规则
const routes = [
  { path: '/', redirect: '/layout' },
  { path: '/register', component: register },
  { path: '/login', component: login },
  // params传参数
  { path: '/ArticleDetail', component: detail },
  { path: '/ArticleDetail/:id', component: detail },
  {
    path: '/layout',
    component: layout,
    children: [
      { path: '/', redirect: '/MyArticle' },
      { path: '/MyLike', component: MyLike },
      { path: '/MyUser', component: user },
      { path: '/MyCollect', component: collect },
      { path: '/MyArticle', component: article }
    ]
  }
]

const router = new VueRouter({
  routes
})

/*
路由导航守卫
注意：一但开启导航守卫，那么next（）方法一定要调用，否则默认全部拦截，无法跳转
三个参数：
to : 要到哪里去
from: 从哪个页面跳转的
next: next() 正常放行(进入to页面)
      next('/路径') 拦截你，跳转到指定页面
*/
const arr = ['/login', '/register'] // 白名单
router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (getToken() || arr.includes(to.path)) {
    next()
  } else {
    next('/login') // 没有登录，跳转登录页
  }
  // if (to.path === '/login' || to.path === '/register') {
  //   next()
  // } else {
  //   const tokenStr = window.sessionStorage.getItem('token')
  //   if (!tokenStr) {
  //     next('/login')
  //   } else {
  //     next()
  //   }
  // }
})

export default router

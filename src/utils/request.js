/* axios第一次封装： 封装基地址 + 拦截器
默认的导出/导入：因为这个模块只封装了一个对象request */

// 下载和导入axios: npm i axios
import axios from 'axios'
// 1. 基地址
// 低级写法axios.defaults.baseURL = 'http://interview-api-t.itheima.net'
// 高级写法，因为一个项目有时会有多个基地址，如果用低级写法就只有一个基地址，
// 而多个基地址就需要多个axios实例
// request 和 axios 是兄弟关系，他们都相当于是构造函数Axios的实例
// Axios.prototype.request(){//get,post,put},
// const axios = new Axios(), const request = new Axios(), 有同一个爹
// 所以 axios所有的功能，request都能使用
// 高级. 创建一个新的axios实例 ,const 对象名 = axios.create({}),并且设置基地址
import { getToken } from '@/utils/storage.js'

import { Toast } from 'vant'
import router from '@/router'
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net',
  timeout: 20000 // 网络超时，发送ajax请求，如果在这个时间内没有收到服务器回复，就取消这个请求
})

// 2. 拦截器，固定代码
// 2.1 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么，可以发token
  if (getToken()) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  // 请求报文
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 2.2 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 响应报文，解构res.data,一旦加了data，其他的地方就不能再用res，可以再下一层
  // 注册页，登录页,首页，等使用ajax的地方
  return response.data
}, function (error) {
  // debugger
  // 对响应错误做点什么
  // 注意：只有 .vue文件中的this才是指向vm实例，才可以使用Vue原型中的方法，所以下面的this不起效果
  // js中的文件this不是指向vm实例，不能使用Vue原型中的方法
  // 解决方案：导入需要的组件toast,使用组件
  // this.$toast.fail(error.response.data.message)
  Toast.fail(error.response.data.message)
  // 处理401，token过期
  if (error.response.status === 401) {
    Toast.fail('token过期,请重新登录')
    // 同样需要router组件，不能用this，要导入
    router.push('/login')
  }
  return Promise.reject(error)
})
// 默认的导出,按需导出
export default request

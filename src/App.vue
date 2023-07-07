<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

// 做分离之后，按需导入登录,然后可以直接调函数，记得传参,本质上创建的是promise实例，用promise接
// import { UserLogin } from '@/api/user.js'
// const promise = UserLogin({
//   username: 'shenzhen98',
//   password: '123456'
// })
// console.log(promise)
// promise.then(res => {
//   console.log(res)
// })
// UserLogin({
//   username: 'htw666',
//   password: '6822332'
// }).then(res => {
//   console.log(res)
// })

// 按需导入
// import { setToken, getToken, removeToken } from '@/utils/storage.js'
// // 默认的导入request
// import request from '@/utils/request.js'
// // 请求基地登录地址，传账号和密码
// request.post('/h5/user/login', {
//   username: 'shenzhen98',
//   password: '123456'
// }).then(res => {
//   console.log(res)
// })
// setToken('123456')
// removeToken()
// const res = getToken()
// console.log(res)
export default {

}
</script>

<style>
.btn{
  width: 100px;
  height: 50px;
}
</style>

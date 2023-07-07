<template>
  <div class="login-page">
    <!-- 1.顶部栏 vant-nav-bar -->
    <van-nav-bar title="面经登录"/>
    <!-- 2.表单 vant-form -->
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="username"  label="用户名:" placeholder="请输入用户名"
      :rules="[
      { required:true, message:'请输入用户名'},
      { pattern:/^\w{6,15}$/, message:'用户名6-15位'},
      ]"
      ></van-field>
      <van-field type="password" v-model="password" name="password"  label="密码:" placeholder="请输入密码"
      :rules="[
      { required:true, message:'请输入密码'},
      { pattern:/^\w{6,15}$/, message:'密码6-15位'},
      ]"
      ></van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 3.跳转按钮 : a -->
    <a class="link" href="#/register">没账号,去注册</a>
  </div>
</template>

<script>

// 导入接口
import { UserLogin } from '@/api/user.js'
import { setToken } from '@/utils/storage.js'

export default {
  name: 'login-page',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // 注册按钮
    async onSubmit (values) {
      // (1)发送ajax，加了data响应体解构，获取到的不再是res，直接下一层data
      const data = await UserLogin(values)
      console.log('================================')
      console.log(data)
      /* 存储token */
      console.log(data.data.token)
      // setToken(res.data.data.token)
      setToken(data.data.token)
      // (2)提示 + 跳转登录页
      this.$toast.success('登录成功')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>

.link {
  color: #069;
  font-size: 12px;
  padding-right: 20px;
  float: right;
}
</style>

<template>
  <div class="register-page">
    <!-- 1.顶部栏 vant-nav-bar,只需要一个标题 -->
    <van-nav-bar title="面经注册"/>
    <!-- 2.表单 vant-form -->
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="username"  label="用户名:" placeholder="请输入用户名"
      :rules="[
        {required:true,message:'请输入用户名'},
        {pattern:/^\w{6,15}$/,message:'用户名6-15位'}
      ]"></van-field>
      <van-field type="password" v-model="password" name="password"  label="密码:" placeholder="请输入密码"
      :rules="[
        {required:true,message:'请输入密码'},
        {pattern:/^\w{6,15}$/,message:'密码6-15位'}
      ]"></van-field>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <!-- 3.跳转按钮 : a, 右浮动 -->
    <a class="link" href="#/login">有账号,去登录</a>
  </div>
</template>

<script>

// 导入接口
import { UserRegister } from '@/api/user.js'

export default {
  name: 'register-page',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // 注册按钮,表单提交，values就是表单的所有值
    async onSubmit (values) {
      // (1)发送ajax，加了data响应体解构，不再是res，直接下一层data
      const data = await UserRegister(values)
      console.log(data)
      // (2)提示 + 跳转登录页
      this.$toast.success('注册成功') // 轻提示
      this.$router.push('/login')
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

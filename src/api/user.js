/* 封装目的： 让 .vue(业务层) 和网络层分离，便于维护
按需导出/导入： 不同的页面需要调用不同的接口
 */

// 导入request
import request from '@/utils/request.js'

// 1.登录,解构赋值，保持一致,参数解构好处：阅读性高，容错率/安全性高
export const UserLogin = ({ username, password }) => {
  console.log(username, password)
  return request.post('/h5/user/login', { username, password })
}
// 2.注册，记得在对应网页层导入
export const UserRegister = ({ username, password }) => {
  return request.post('/h5/user/register', { username, password })
}

/*
两种请求方法：
1. axios.get('请求路径',{ params:{参数名：参数值}})
   axios.post('请求路径',{参数名：参数值})
2. axios({
  url: '请求路径',
  method: 'get/post',
  params: {请求行参数},
  data: {请求行参数}
})
*/

// 3.获取用户详情
export const getUserInfo = () => {
  return request.get('/h5/user/currentUser')
}

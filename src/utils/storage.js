// 本地存储的语法，存取删
// 要按需导出/导入 ： 要封装三个函数(多个数据使用按需)，并且这三个函数时再三个不同的页面使用
// 存
const KEY = 'myinterview-h5'
export const setToken = (token) => {
  localStorage.setItem(KEY, token)
}

// 取
export const getToken = () => {
  return localStorage.getItem(KEY)
}

// 删
export const removeToken = () => {
  localStorage.removeItem(KEY)
}

/*
按需导入：在需要导入的文件中，将上面的三中函数封装戽�用，就叫按需封装
import { setToken, getToken, removeToken } from '@/utils/storage.js'
*/

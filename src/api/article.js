// import { getToken } from '../utils/storage'
/* 导入request */
import request from '@/utils/request.js'
// 1. 按需导出，面经列表,记得加请求头token,Bearer
export const getArticleList = ({ current, pageSize, sorter }) => {
  return request.get('/h5/interview/query', {
    params: {
      current, pageSize, sorter
    }
    // 由于账户会很多，所以一般不用这个，直接在axios拦截器里发token
    // headers: {
    //   Authorization: 'Bearer ' + getToken()
    //   // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzMyIsImlhdCI6MTY4ODYzOTg1NywiZXhwIjoxNjg4ODk5MDU3fQ.4n0pL08Db5qywDXhmhdb2JMmmPlFkTPinxFfIdXrB3U'
    // }
  })
}

// 2. 获取单个面经详情,记得在详情页导入获取，渲染
export const getArticleDetail = (id) => {
  return request.get('/h5/interview/show', {
    params: { id }
  })
}

// 3. 切换点赞,不需要返回数据，用post,记得在详情页导入
export const toggleLike = (id) => {
  return request.post('/h5/interview/opt', {
    id,
    optType: 1
  })
}

// 4. 切换收藏
export const toggleCollect = (id) => {
  return request.post('/h5/interview/opt', {
    id,
    optType: 2
  })
}

// 5. 收藏列表
export const getCollectList = ({ page, pageSize }) => {
  return request.get('/h5/interview/opt/list', {
    params: {
      page,
      pageSize,
      optType: 2
    }
  })
}

// 6. 点赞列表
export const getLikeList = ({ page, pageSize }) => {
  return request.get('/h5/interview/opt/list', {
    params: {
      page,
      pageSize,
      optType: 1
    }
  })
}

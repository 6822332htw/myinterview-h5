<template>
  <div class="article-page">
    <nav class="my-nav van-hairline--bottom">
      <a href="javascript:;" @click="doCheck('weight_desc')">推荐</a>
      <a href="javascript:;" @click="doCheck('')">最新</a>
      <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
    </nav>
    <!-- 使用长列表List包裹 ： 上拉加载更多  -->
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
      <!-- 父传子 -->
      <!-- 默认情况，只有原生的标签，才可以绑定DOM原生的事件，所以在这里弄路由跳转不起效果 -->
      <!-- 组件不能加原生事件，@click,加了就变子传父接收数据了 -->
      <!-- 如果要给自定义标签(组件)绑定dom原生事件，可以使用native修饰符 -->
      <!-- params传参，注意item.id是变量，用反引号加${} -->
      <ArticleItem @click.native="$router.push(`/ArticleDetail/${item.id}`)" v-for="item in list" :key="item.id"
      :item="item"
      ></ArticleItem>
    </van-list>
    <!-- <nav class="my-nav van-hairline--bottom">
      <a href="javascript:;" @click="doChange('weight_desc')">推荐</a>
      <a href="javascript:;" @click="doChange('')">最新</a>
      <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
    </nav> -->

    <!-- 长列表 ： 上拉加载更多 -->
    <!-- <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    > -->
      <!-- (1)默认清空下,只有原生的标签，才可以绑定DOM原生的事件
            (2)如果给组件绑定事件,vue默认会认为你是$emit()自定义事件
            (3)如果希望给自定义标签(组件)绑定DOM原生事件,就可以使用native修饰符
       -->
      <!-- <ArticleItem @click.native="$router.push(`/detail/${item.id}`)" v-for="item in list" :key="item.id"
      :item="item"
      ></ArticleItem>
    </van-list> -->
  </div>
</template>

<script>
// 导入接口
import { getArticleList } from '@/api/article.js'
export default {
  name: 'article-page',
  data () {
    return {
      // 1.当前页
      current: 1,
      // 2.每页数量
      pageSize: 10,
      // 3.排序规则  推荐:'weight_desc'  最新: ''
      sorter: 'weight_desc',
      // 4.文章列表
      list: [],
      // 5.加载更多动画
      loading: false,
      // 6.是否全部加载完毕
      finished: false
    }
  },
  // async created () {
  //   // 调用函数渲染列表
  //   this.getList()
  //   // 1. 发送ajax请求，加了data响应体解构，获取到的不再是res，直接下一层data
  //   // const data = await getArticleList({
  //   //   current: this.current,
  //   //   pageSize: this.pageSize,
  //   //   sorter: this.sorter
  //   // })
  //   // console.log('..................................')
  //   // console.log(data)
  //   // this.list = data.data.rows
  // },
  methods: {
    // 0.封装获取文章列表函数
    async getList () {
      // (1).发送ajax
      const data = await getArticleList({
        current: this.current,
        pageSize: this.pageSize,
        sorter: this.sorter
      })
      // (2).绑定到data
      console.log('..................................')
      console.log(data)
      // this.list = data.data.rows
      // 使用了加载时发送请求，不能直接把数据全拿，用push
      // 下一页：添加到数组后面 push，且下拉每次触发，页码加1，
      this.list.push(...data.data.rows)
      // 页码加1，才不会每次请求到的数据都是从第一页开始,不加1会重复且看不到下一页数据
      this.current++
      // (3)当加载到最后一页再下拉没数据了，要设置finished为true，表示结束不再加载，判断rows为空
      if (data.data.rows.length === 0) {
        this.finished = true
      }
    },
    // 1.切换推荐和最新
    // async doChange (type) {
    //   console.log(type)
    //   // (1).绑定到data
    //   this.sorter = type
    //   // (2).调用函数渲染列表
    //   this.getList()
    // },
    // 2.加载下一页,一触发onLoad，自动更改loading为true,
    // 注意请求要异步，才不会被同步限制不起效果
    async onLoad () {
      console.log('默认第一次加载，类似created钩子，所以发送ajax可以移步这里')
      // (1).请求列表，由于每次加载都会请求一次，每次都会覆盖上一次的数据，所以不能用等于赋值list，可以用push添加,列表添加
      await this.getList()
      // (2)加载完成要关闭动画：设置loading为false，否则拉到底部一直有这个加载转圈
      this.loading = false // 关闭本次加载动画
    },
    // 切换排序方式，推荐和最新
    doCheck (sorter) {
      console.log(sorter)
      // (1)修改sorter
      this.sorter = sorter
      // (2)当前数组要清空+页码清空
      this.list = []
      this.current = 1
      // (3)重新渲染数据,加上加载动画，避免报id可能重复提醒
      this.loading = true // 设置true的作用是避免报id可能重复提醒
      this.finished = false // 重置加载完毕为false
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}

</style>

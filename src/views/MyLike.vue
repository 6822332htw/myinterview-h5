<template>
  <div class="article-page">
    <van-nav-bar title="喜欢列表" fixed></van-nav-bar>

    <!-- 长列表 ： 上拉加载更多 -->
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
      <!-- (1)默认清空下,只有原生的标签，才可以绑定DOM原生的事件
            (2)如果给组件绑定事件,vue默认会认为你是$emit()自定义事件
            (3)如果希望给自定义标签(组件)绑定DOM原生事件,就可以使用native修饰符
       -->
      <ArticleItem @click.native="$router.push(`/detail/${item.id}`)" v-for="item in list" :key="item.id"
      :item="item"
      ></ArticleItem>
    </van-list>
  </div>
</template>

<script>
// 导入接口
import { getLikeList } from '@/api/article.js'
export default {
  name: 'collect-page',
  data () {
    return {
      // 1.当前页
      page: 1,
      // 2.每页数量
      pageSize: 5,
      // 4.文章列表
      list: [],
      // 5.加载更多动画
      loading: false,
      // 6.是否全部加载完毕
      finished: false
    }
  },
  methods: {
    // 1.切换推荐和最新
    async doChange (type) {
      console.log(type)
      // (1)绑定到data
      this.sorter = type
      // (2)页码和数组 清空
      this.page = 1
      this.list = []
      // (3)开始加载数据
      this.loading = true// 设置true的作用是出现加载动画
      this.finished = false// 重置加载完毕为false
      this.onLoad()
    },
    // 2.加载下一页
    async onLoad () {
      // (1)请求列表
      const data = await getLikeList({
        page: this.page,
        pageSize: this.pageSize
      })
      console.log(data)
      // (2)服务器添加到数组后面
      this.list.push(...data.data.rows)
      // (3)页码++
      this.page++
      // (4)设置loading为false : 关闭动画。 (否则底部一直转圈)
      this.loading = false
      // (5)如果服务器数据加载完毕,设置finished为true
      if (data.data.rows.length === 0) {
        this.finished = true
      }
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

<template>
  <div class="detail-page">
    <van-nav-bar
      left-text="返回"
      @click-left="$router.back()"
      fixed
      title="面经详细"
    />
    <header class="header">
      <h1>{{ article.stem }}</h1>
      <p>
        {{ article.createdAt }} | {{ article.views }} 浏览量 |
        {{ article.likeCount }} 点赞数
      </p>
      <p>
        <img :src="article.avatar" alt="" />
        <span>{{ article.creator }}</span>
      </p>
    </header>
    <main class="body" v-html="article.content"></main>
    <div class="opt">
      <van-icon @click="doLike" :class="{active:article.likeFlag}" name="like-o"/>
      <van-icon @click="doCollect" :class="{active:article.collectFlag}" name="star-o"/>
    </div>
  </div>
</template>

<script>

// 导入接口
import { getArticleDetail, toggleLike, toggleCollect } from '@/api/article.js'
export default {
  name: 'detail-page',
  data () {
    return {
      article: {}
    }
  },
  async created () {
    // (1)发送ajax,params传参过来的数据，在$route里
    // 通过id获取单个详情数据，需要里面的数据原型是对象，所以data准备一个对象接收绑定
    const data = await getArticleDetail(this.$route.params.id)
    console.log('======++++++++++++++++++++++++++++')
    console.log(data)
    // 绑定到data
    this.article = data.data
  },
  methods: {
    // 异步
    async doLike () {
      // 切换喜欢,没有返回值，不用接
      await toggleLike(this.$route.params.id)
      // 如果0就切换1,如果1就切换0，取反操作
      this.article.likeFlag = !this.article.likeFlag
      this.$toast.success('喜欢切换成功')
      // 更新喜欢的人数，也就是点赞
      console.log(this.article.likeFlag)
      if (this.article.likeFlag) {
        this.article.likeCount++
      } else {
        this.article.likeCount--
      }
    },
    async doCollect () {
      // 切换收藏，没有返回值，不用接
      await toggleCollect(this.$route.params.id)
      // 取反
      this.article.collectFlag = !this.article.collectFlag
      this.$toast.success('收藏切换成功')
    }
  }
  // data () {
  //   return {
  //     // 面经详情
  //     article: {}
  //   }
  // },
  // async created () {
  //   // (1)发送ajax
  //   const data = await getArticleInfo(this.$route.params.id)
  //   console.log(data)
  //   // (2)绑定到data
  //   this.article = data.data
  // },
  // methods: {
  //   // 1.切换喜欢
  //   async doLike () {
  //     // (1)发送ajax
  //     await changeLike(this.$route.params.id)
  //     // (2)取反
  //     this.$toast.success('切换喜欢成功')
  //     this.article.likeFlag = !this.article.likeFlag
  //     // (3)修改喜欢人数
  //     if (this.article.likeFlag) {
  //       this.article.likeCount++
  //     } else {
  //       this.article.likeCount--
  //     }
  //   },
  //   // 2.切换收藏
  //   async doCollect () {
  //     // (1)发送ajax
  //     await changeCollect(this.$route.params.id)
  //     // (2)取反
  //     this.$toast.success('切换收藏成功')
  //     this.article.collectFlag = !this.article.collectFlag
  //   }
  // }
}
</script>

<style lang="less" scoped>
.detail-page {
  margin-top: 44px;
  overflow: hidden;
  padding: 0 15px;
  .header {
    h1 {
      font-size: 24px;
    }
    p {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .opt {
    position: fixed;
    bottom: 100px;
    right: 0;
    > .van-icon {
      margin-right: 20px;
      background: #fff;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      box-shadow: 2px 2px 10px #ccc;
      font-size: 18px;
      &.active {
        background: #FEC635;
        color: #fff;
      }
    }
  }
}
</style>

<template>
  <div class="layout-page">
    <!-- 1.路由出口，二级 -->
    <router-view></router-view>
    <!-- 2.底部栏 -->
    <van-tabbar route>
      <van-tabbar-item to="/MyArticle" icon="home-o">面经</van-tabbar-item>
      <van-tabbar-item to="/MyCollect" icon="star-o">收藏</van-tabbar-item>
      <van-tabbar-item to="/MyLike" icon="friends-o">喜欢</van-tabbar-item>
      <van-tabbar-item to="/MyUser" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout-page'
}
</script>

<style lang="less" scoped></style>

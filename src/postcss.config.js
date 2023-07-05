module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 设置rem基准值，根据你的设计稿来。 750设计稿 -> 1rem=37.5px
      // 这个时候，当我们代码写任意px，这插件就会帮我们转成rem .  例如你写37.5px就会变成37.5/37.5 = 1rem
      rootValue: 37.5,
      // 设置对什么标签生效，默认所有标签
      propList: ['*']
    }
  }
}

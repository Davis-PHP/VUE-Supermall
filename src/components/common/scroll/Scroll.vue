<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 创建scroll实例
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType, // 监听滚动类型, 0,1 不监听, 2, 只监听手指真实滑动的位置,惯性滚动的不监听, 3, 可以监听惯性滚动的位置,
        pullUpLoad: this.pullUpLoad
      });
      //监听滚动
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      });
      //监听上拉加载更多
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();//完成上拉加载更多, 不然只会触发一次,之后不再触发
      },
      refresh() {
        this.scroll && this.scroll.refresh(); ///图片加载完成刷新一下scroll不然scroll计算的高度不确定,因为图片还没加载完成就计算了
      }
    }
  }
</script>

<style scoped>

</style>

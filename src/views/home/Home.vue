<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banner="banner"></home-swiper>
      <recommend-view :recommends="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-controller :titles="tabTitle" class="tab-control" @tabClick="tabClick"></tab-controller>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/common/backTop/BackTop";

  import TabController from "components/content/tabController/TabController";
  import GoodsList from "components/content/goods/GoodsList";

  import {getHomeMultiData, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      FeatureView,
      NavBar,
      HomeSwiper,
      RecommendView,
      TabController,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banner: [],
        recommend: [],
        // dKeyword: [],
        // keywords: [],
        tabTitle: ['流行', '新款', '精选'],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求首页多个数据
      this.getHomeMultiData();

      //获取商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      //通过事件总线,监听goods item 图片是否加载完成
      this.$bus.$on('itemImgLoad', () => {
        this.$refs.scroll.refresh(); //图片加载完成刷新一下scroll不然scroll计算的高度不确定,因为图片还没加载完成就计算了
      })
    },
    methods: {
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 500;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
          // this.dKeyword = res.data.dKeyword.list;
          // this.keywords = res.data.keywords.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp();
        });
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    color: #ffffff;
    background-color: var(--color-tint);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>

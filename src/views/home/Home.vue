<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";

  import {getHomeMultiData} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper
    },
    data() {
      return {
        banner: [],
        recommend: [],
        dKeyword: [],
        keywords: [],
      }
    },
    created() {
      getHomeMultiData().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
        this.dKeyword = res.data.dKeyword.list;
        this.keywords = res.data.keywords.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    color: #ffffff;
    background-color: var(--color-tint);
  }
</style>

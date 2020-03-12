<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-item :top-images="topImages"></detail-item>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetailData, Goods} from "network/detail";
  import DetailItem from "./childComps/DetailItem";

  export default {
    name: "Detail",
    components: {
      DetailItem,
      DetailNavBar,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {}
      }
    },
    created() {
      this.iid = this.$route.params.iid;

      getDetailData(this.iid).then(res => {
        console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages;
        this.goods = new Goods(data.itemInfo, data.colnums, data.shopInfo.services)
      })
    }
  }
</script>

<style scoped>

</style>

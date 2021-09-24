<template>
  <div class="recommend">
    <div class="recommend-banner">
      <carousel :homePageBanner="homePageBanner" :isShow="isShow"/>
    </div>
    <div class="recommend-hot-w">
      <recommend-hot :recommend-hot-list="recommendHotList"/>
    </div>
  </div>
</template>

<script>
import Carousel from "components/commen/Carousel.vue";
import RecommendHot from "components/commen/RecommendHot.vue";
import {getFindHome,getSongList} from "network/homefind.js";
import {onMounted, reactive, toRefs} from "vue";
export default {
  name: "Recommend",
  components: {
    Carousel,
    RecommendHot
  },
  setup() {
    onMounted(() => {
      getFindHome().then(res => {
        if (res.data.code === 200) {
          // console.log(res)
          state.homePageBanner = res.data.banners;
          state.isShow = true;
        }
      });
      // 推荐歌单
      getSongList(10).then((res)=> {
        if(res.data.code === 200) {
          state.recommendHotList = res.data.result;
        }
      });
    });
    const state = reactive({
      homePageBanner: [],
      recommendHotList:[],
      isShow: false
    })
    return toRefs(state)
  }
}
</script>

<style scoped lang="less">
.recommend {
  height: 100%;
  color: #0f0f0f;
  .recommend-hot-w {
    width: 1000px;
    height: 100%;
    border:1px solid #b8b8b8;
    margin: 0 auto;
    background-color: #FFFFFF;
  }
}
</style>
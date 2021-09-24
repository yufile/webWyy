<template>
  <div class="find-home-page">
    <home-bottom-nav :listData="headBottomNavList"></home-bottom-nav>
    <router-view/>
  </div>
</template>

<script>
import HomeBottomNav from "components/commen/HomeBottomNav.vue";
import {reactive, toRefs} from 'vue'

export default {
  name: "FindHomePage",
  components: {
    HomeBottomNav
  },
  setup() {
    const state = reactive({
      headBottomNavList: ['推荐', '排行榜', '歌单', '主播电台', '歌手', '新碟上架']
    });
    return toRefs(state)
  }
}
</script>

<style scoped>
.find-home-page {
  position: relative;
}
</style>
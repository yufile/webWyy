<template>
  <div class="ranking-list">
   排行榜
  </div>
</template>

<script>
import {inject} from "vue";
import store from "store";
export default {
  name: "RankingList",
  setup() {
    const reload = inject('reload');
    if(store.state.songlistpath == '/findhomepage/recommend'){
      reload()
      store.state.songlistpath = ''
    }
  }
}
</script>

<style scoped>
.ranking-list {
  color: #0f0f0f;
}
</style>
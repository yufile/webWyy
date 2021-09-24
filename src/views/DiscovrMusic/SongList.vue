<template>
  <div class="song-list">歌单</div>
</template>

<script>
import {inject} from "vue";
import store from "store";

export default {
  name: "SongList",
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
.song-list {
  color: #0f0f0f;
}
</style>
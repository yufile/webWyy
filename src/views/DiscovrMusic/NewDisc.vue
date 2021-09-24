<template>
  <div class="new-disc">新碟上架</div>
</template>

<script>
import {inject} from "vue";
import store from "store";
export default {
  name: "NewDisc",
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
.new-disc {
  color: #0f0f0f;
}
</style>
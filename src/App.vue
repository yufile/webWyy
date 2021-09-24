<template class="xx">
  <el-scrollbar height="100vh">
    <router-view v-if="isActivePath"/>
    <play-components></play-components>
  </el-scrollbar>

</template>

<script>
import {nextTick, reactive, toRefs, provide} from "vue";
import router from "./router";
import PlayComponents from "components/commen/PlayComponents.vue";

export default {
  components: {
    PlayComponents
  },
  setup() {
    const reload = () => {
      state.isActivePath = false;
      nextTick(() => {
        state.isActivePath = true;
      })
    }
    provide('reload', reload)
    const state = reactive({
      path: router.currentRoute._rawValue.fullPath,
      isActivePath: true,
    })
    return toRefs(state)
  }
}
</script>

<style>
@import "assets/css/base.css";
.xx {
  position: relative;
}
</style>

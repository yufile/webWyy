<template>
  <div class="my-music">
    <home-bottom-nav></home-bottom-nav>
  </div>
</template>

<script>
import HomeBottomNav from "components/commen/HomeBottomNav.vue";
export default {
  name: "MyMusic",
  components: {
    HomeBottomNav
  }
}
</script>

<style scoped>
.my-music {
  color: #0f0f0f;
}
</style>
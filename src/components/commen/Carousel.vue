<template>
  <div class="carousel">
    <div class="block" v-if="isShow">
      <el-carousel height="285px"  :interval="4000">
        <el-carousel-item   v-for="(item,index) in homePageBanner" :key="index">
          <div class="block-img" :style="{backgroundImage: 'url(' + (item.imageUrl) + '?imageView&blur=40x20)',backgroundSize: '6000px', backgroundPosition: 'center center'}">
            <img :src="item.imageUrl" alt="">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>

export default {
  name: "Carousel",
  components: {},
  props: {
    homePageBanner: Array,
    isShow: Boolean
  },
  setup() {

  }
}
</script>

<style scoped lang="less">
.carousel {
  width: 100%;
  .block {
    .el-carousel__item {
      .block-img {
        width: 100%;
        background-size: contain;
        img {
          width: 1000px;
          height: 285px;
          margin-left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}


</style>
<template>
  <div class="new-dish">
    <nav-slot>
      <template v-slot:title><span>新碟上架</span></template>
      <template v-slot:some><span class="some-s" @click="SomeDish">更多</span></template>
    </nav-slot>
    <div class="block">
      <el-carousel height="200px" indicator-position="none" :autoplay="false" arrow="hover">
        <el-carousel-item  v-for="(item,index) in dishList" :key="index">
          <div class="new-dish-w">
            <div class="new-dish-w-item" @click="SongListDetails(dish.id)" v-for="(dish,indx) in item" :key="indx">
              <img :src="dish.picUrl" alt="">
              <span>{{dish.name}}</span>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import NavSlot from "./NavSlot.vue";
import {onMounted, reactive, toRefs} from "vue";
import router from "router";
import {getNewDish} from "network/homefind";
import store from "../../store";

export default {
  name: "RecommendHotNewDish",
  components: {
    NavSlot
  },
  setup() {
    const SomeDish = () => {
      router.push('/findhomepage/newdisc')
    }
    const SongListDetails = (id) => {
      router.push({
        path: '/findhomepage/playlist',
        query: {
          id: id,
        }
      })
      store.state.dishIndex = 1;
      store.state.songIndex = 0;
    }
    const state = reactive({
      SomeDish,
      SongListDetails,
      dishList: [[],[]]
    })

    onMounted(()=> {
      getNewDish().then(res => {
        if(res.data.code) {
          for(let i in res.data.albums) {
            if(i<5) {
              state.dishList[0].push(res.data.albums[i])
            }else if(i<10) {
              state.dishList[1].push(res.data.albums[i])
            }
          }
        }

      })
    })
    return toRefs(state)
  }
}
</script>

<style scoped lang="less">
.new-dish {
  .block {
    border: 1px silver solid;
    margin-top: 10px;
    background-color: #eaeaea;
    .new-dish-w {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 200px;
      .new-dish-w-item {
        cursor: pointer;
        width: 118px;
        height: 100px;
        background-image: url("assets/img/coverall.png");
        background-repeat: no-repeat;
        background-position: 0 -570px;
        img {
          width:100px;
          height: 100%;
        }
        span {
          font-size: 12px;
          display: block;
          margin-top: 5px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}

.some-s {
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    text-decoration: underline;
  }
}
</style>
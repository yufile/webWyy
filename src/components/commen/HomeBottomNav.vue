<template>
  <div class="home-bottom-nav">
    <div class="home-bottom-nav-list">
      <ul v-if="listData">
        <li v-for="(item,index) in listData" :key="index" :class="{'active-li': index === indexList }"
            @click="clickList(index)">{{ item }}
        </li>
      </ul>
      <p v-else></p>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs, watch} from 'vue'

import router from 'router'
export default {
  name: "HomeBottomNav",
  props: {
    listData: Array
  },
  setup() {
    const clickList = (index) => {
      state.indexList = index;
      if(index === 0){
        router.push('/findhomepage/recommend')
      }else if(index === 1) {
        router.push('/findhomepage/rankinglist')
      }else if(index === 2) {
        router.push('/findhomepage/songlist')
      }else if(index === 3) {
        router.push('/findhomepage/newsradio')
      }else if(index === 4) {
        router.push('/findhomepage/singer')
      }else if(index === 5) {
        router.push('/findhomepage/newdisc')
      }
    }
    const state = reactive({
      indexList: 0,
      clickList
    });
    onMounted(()=>{
      let path = router.currentRoute._rawValue.fullPath;
      if(path == '/findhomepage/recommend') {
        state.indexList = 0;
      }else if (path == '/findhomepage/rankinglist') {
        state.indexList = 1;
      }else if (path == '/findhomepage/songlist') {
        state.indexList = 2;
      }else if (path == '/findhomepage/newsradio') {
        state.indexList = 3;
      }else if (path == '/findhomepage/singer') {
        state.indexList = 4;
      }else if (path == '/findhomepage/newdisc') {
        state.indexList = 5;
      }else {
        state.indexList=-1
      }
    })

    return toRefs(state)
  }

}
</script>

<style scoped lang="less">
.home-bottom-nav {
  width: 100%;
  min-width: 970px;
  background-color: #C20C0C;
  font-size: 12px;

  .home-bottom-nav-list {
    width: 1100px;
    margin: 0 auto;

    p {
      height: 5px;
      margin: 0;
    }

    ul {
      list-style-type: none;
      display: flex;
      padding: 5px 0 5px 160px;

      li {
        cursor: pointer;
        height: 24px;
        width: 7%;
        text-align: center;
        line-height: 24px;
        border-radius: 15px;
        margin-left: 20px;
        &:nth-of-type(3) {
          position: relative;
          &::after {
            position: absolute;
            top: 0;
            right: 10px;
            content: '';
            display: inline-block;
            width: 10px;
            height: 10px;
            background-image: url("assets/img/R.svg");
            background-repeat: no-repeat;
            background-size: cover;
          }
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
}

.active-li {
  background-color: rgba(0, 0, 0, 0.4);
}

</style>
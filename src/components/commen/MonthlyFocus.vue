<template>
  <div class="monthly-focus">
    <nav-slot>
      <template v-slot:title>榜单</template>
      <template v-slot:some><span class="some-s" @click="goRankingList">更多</span></template>
    </nav-slot>
    <div class="monthly-focus-list">
      <dl v-for="(item,index) in monthlyData" :key="index">
        <dt>
          <div class="monthly-focus-item-img">
            <img :src="item.coverImgUrl" alt="">
          </div>
          <div class="monthly-focus-item-info">
            <div>{{item.name}}</div>
            <div>
              <span class="el-icon-video-play"></span>
              <span class="el-icon-folder-add"></span>
            </div>
          </div>
        </dt>
        <dd>
          <ul>
            <li v-for="(list,indexl) in item.musiclist" :key="indexl">
              <div>
                <span>{{indexl + 1}}</span><span>{{list.name}}</span>
              </div>
              <div >
                <em class="el-icon-video-play" @click="play(list)"></em>
                <em class="el-icon-folder-add"></em>
                <em class="el-icon-plus"></em>
              </div>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import NavSlot from "./NavSlot.vue";
import {onMounted, reactive, toRefs} from "vue";
import router from "router";
import store from "store";
import {getMonthlyFocus} from "network/homefind.js";

export default {
  name: "MonthlyFocus",
  components: {
    NavSlot
  },
  setup() {
    const goRankingList = () => {
      router.push('/findhomepage/rankinglist')
    };
    const play = (item) => {
      let obj = {
        id: item.id,
        name: item.ar[0].name,
        nameM: item.name,
        img: item.al.picUrl,
        time: item.dt,
      }
      store.dispatch('disposeId', obj)
    }
    const state = reactive({
      goRankingList,
      listId: [19723756,3779629,2884035],
      monthlyData: [],
      play
    });
    onMounted(() => {
      for (let i in state.listId)
      getMonthlyFocus(state.listId[i]).then(res => {
        if(res.data.code) {
          let data = res.data.playlist;
          data.tracks.length = 10
          state.monthlyData.push({
            name:data.name,
            id: data.id,
            coverImgUrl: data.coverImgUrl,
            musiclist: data.tracks
          })
          console.log(state.monthlyData)
        }
      })
    })
    return toRefs(state)
  }
}
</script>

<style scoped lang="less">
.monthly-focus {
  margin-top: 20px;
  margin-bottom: 40px;
  .monthly-focus-list {
    width: 100%;
    margin-top: 20px;
    background-color: #eaeaea;
    display: flex;
    justify-content: space-between;
    border: 1px #a7a7a7 solid;
    dl {
      width: 33%;
      margin: 0 0;
      &:nth-of-type(2) {
        border-left: 1px solid #d9d9d9;
        border-right: 1px solid #d9d9d9;
      }
      dt{
        display: flex;
        padding: 20px 0 0 19px;
        .monthly-focus-item-img {
          width: 80px;
          height: 80px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .monthly-focus-item-info {
          margin: 6px 0 0 10px;
          div {
            &:nth-of-type(1) {
              font-size: 16px;
              font-weight: bold;
            }
            &:nth-of-type(2) {
              font-size: 20px;
              color: #bfbfbf;
              margin-top: 10px;
              font-weight: bold;
              span {
                margin-right: 10px;
                cursor: pointer;
                &:hover {
                  color: #dbdbdb;
                }
              }
            }
          }
        }
      }
      dd {
        margin-left: 0;
        margin-top: 20px;
        ul {
          box-sizing: border-box;

          li {
            display: flex;
            &:hover {
              div {
                &:nth-of-type(2) {
                  display: inline-block;
                }
              }
            }
            div {
              &:nth-of-type(2) {
                font-size: 16px;
                display: none;
                em {
                  margin: 0 5px;
                  &:hover {
                    color: #d54e53;
                  }
                }
              }
            }
            &:nth-of-type(1),&:nth-of-type(2),&:nth-of-type(3) {
              span {
                &:nth-of-type(1) {
                  color: darkred;
                }
              }
            }
            width: 100%;
            div {
              height: 30px;
              width: 150px;
              line-height: 30px;
              white-space: nowrap;
              overflow: hidden;
              margin-left: 30px;
              text-overflow: ellipsis;
              cursor: pointer;
              &:hover {
                span {
                  &:nth-of-type(2) {
                    text-decoration: underline;
                  }
                }
              }
              span {
                &:nth-of-type(1) {
                  margin-right: 10px;
                }
              }
            }
            &:nth-of-type(2n+1) {
              background-color: #d7d7d7;
            }

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

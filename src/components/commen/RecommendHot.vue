<template>
  <div class="recommend-hot" v-if="isLogin">
    <div class="recommend-hot-content">
      <div>
        <div class="recommend-hot-head">
          <div class="recommend-hot-head-left">
            <img src="~@/assets/img/yuan.svg" alt="">
            <span>热门歌单</span>
            <ul>
              <li v-for="(item,index) in hotList" :key="index">{{ item }}</li>
            </ul>
          </div>
          <div class="recommend-hot-many" @click="handleToSongList">
            <span>更多</span>
            <span class="el-icon-right"></span>
          </div>
        </div>
        <div class="recommend-hot-list">
          <div class="recommend-hot-list-item" v-for="(item,index) in recommendHotList" :key="index"
               @click="SongListDetails(item.id)">
            <img :src="item.picUrl" alt="">
            <span>{{ item.name }}</span>
            <div class="list-item-info">
              <div class="toge-listen">
                <span class="el-icon-headset"></span>
                <span>{{ $filters.currencyUSD(item.playCount) }}</span>
              </div>
              <span class="el-icon-caret-right aat"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="recommend-hot-newsdish">
        <recommend-hot-new-dish/>
      </div>
      <div class="recommend-hot-List">
        <monthly-focus/>
      </div>
    </div>
    <div class="recommend-hot-right">
      <div class="recommend-hot-right-login">
        <span>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</span>
        <div>
          <button>用户登录</button>
        </div>
      </div>
      <div class="recommend-hot-right-Singer">
        <div>
          <div class="recommend-hot-right-Singer-head">
            <span>入驻歌手</span>
            <span>查看全部 ></span>
          </div>
          <div class="recommend-hot-right-Singer-content">
            <div class="recommend-hot-right-Singer-info" v-for="(item,index) in singerInfo" :key="index">
              <img :src="item.picUrl" alt="">
              <div class="Singer-info">
                <p>{{ item.name }}</p>
                <p>歌手</p>
              </div>
            </div>
            <div class="recommend-hot-right-Singer-success">
              <a href="#">申请成为网易云音乐人</a>
            </div>
          </div>
        </div>
        <div class="hot-anchor">
          <div class="head">
            <span>热门主播</span>
          </div>
          <div class="content" v-for="(item,index) in anchorInfo" :key="index">
            <img :src="item.avatarUrl" alt="">
            <div class="info">
              <p>{{ item.nickName }}</p>
              <p>主播</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {getSingerInfo, getAnchorInfo} from "network/homefind.js";
import router from "router";
import RecommendHotNewDish from "./RecommendHotNewDish.vue";
import store from "store";
import MonthlyFocus from "./MonthlyFocus.vue";

export default {
  name: "RecommendHot",
  components: {
    RecommendHotNewDish,
    MonthlyFocus
  },
  props: {
    recommendHotList: Array
  },
  setup(props) {
    const handleToSongList = () => {
      router.push({
        path: '/findhomepage/songlist'
      })
    }
    const SongListDetails = (id) => {
      router.push({
        path: '/findhomepage/playlist',
        query: {
          id: id
        }
      })
      store.state.songIndex = 1;
      store.state.dishIndex = 0;
      // console.log(id)
    }
    const state = reactive({
      hotList: ['华语', '流行', '摇滚', '民谣', '电子'],
      handleToSongList,
      singerInfo: [],
      anchorInfo: [],
      SongListDetails,
      isLogin: false
    });

    onMounted(() => {
      // 5条歌手信息

      getSingerInfo(5).then(res => {
        if (res.data.code === 200){
          state.singerInfo = res.data.artists;
          state.isLogin = true;
        }
      })
      // 5条主播信息
      getAnchorInfo(5).then(res => {
        if (res.data.code === 200) {
          state.anchorInfo = res.data.data.list
        }
      })
    })
    return toRefs(state)
  }
}
</script>

<style scoped lang="less">
.recommend-hot {
  margin: 0 0 10px 10px;
  display: flex;
  .recommend-hot-content {
    width: 729px;

    .recommend-hot-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 5px;
      padding-top: 20px;
      border-bottom: 2px solid #d54e53;

      .recommend-hot-head-left {
        display: flex;
        align-items: center;
      }

      .recommend-hot-many {
        display: flex;
        align-items: center;
        cursor: pointer;

        span {
          font-size: 14px;
          margin-right: 5px;

          &:nth-of-type(1) {
            &:hover {
              text-decoration: underline;
            }
          }

          &:nth-of-type(2) {
            color: #d54e53;
            font-weight: bold;
          }
        }

      }

      img {
        margin-right: 10px;
      }

      span {
        font-size: 24px;
      }

      ul {
        display: flex;

        li {
          margin: 0 10px;

          &:not(:nth-last-child(1)) {
            position: relative;

            &::after {
              display: inline-block;
              content: '';
              width: 1px;
              height: 15px;
              position: absolute;
              top: 2px;
              background-color: #6d6d6d;
              margin-left: 10px;
            }
          }

          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    }

    .recommend-hot-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 20px;

      .recommend-hot-list-item {
        width: 140px;
        height: 200px;
        margin-bottom: 20px;
        position: relative;
        cursor: pointer;

        img {
          width: 100%;
          height: 140px;
        }

        span {
          &:hover {
            text-decoration: underline;
          }
        }

        .list-item-info {
          position: absolute;
          bottom: 60px;
          height: 30px;
          width: 138px;
          left: 1px;
          background-color: rgba(0, 0, 0, 0.4);
          border-top: 1px solid #7d7d7d;
          box-shadow: 0 0 1px 1px #2d3143, 0 0 1px 1px rgba(0, 0, 0, 0), 0 0 1px 1px rgba(0, 0, 0, 0), 0 0 0 1px rgba(0, 0, 0, 0);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 18px;

          span {
            font-size: 24px;
            margin-right: 10px;

            &:hover {
              text-decoration: none;
              color: #dddddd;
              cursor: pointer;
            }
          }

          .toge-listen {
            display: flex;
            align-items: center;

            span {
              font-size: 16px;

              &:nth-of-type(2) {
                flex: 1;
              }

              &:hover {
                color: #fff;
              }
            }
          }
        }
      }

    }
  }

  .recommend-hot-right {
    flex: 1;
    margin-left: 20px;
    height: 126px;

    .recommend-hot-right-login {
      height: 100%;
      background-color: #ddd;
      font-size: 12px;
      border: 1px solid #ddd;
      box-shadow: 0px 2px 1px 1px #c9c6c6, 0 2px 1px 1px rgba(255, 255, 255, 1), 0 2px 1px 1px rgba(255, 255, 255, 1), 0 2px 1px 1px rgba(255, 255, 255, 1);

      span {
        width: 200px;
        padding: 20px 0;
        margin: 0 auto;
        display: block;
      }

      div {
        width: 100px;
        margin: 0 auto;

        button {
          background-color: #bd1313;
          border: 0;
          color: #fff;
          padding: 6px 20px;
          border-radius: 10px;
        }
      }
    }

    .recommend-hot-right-Singer {
      height: 920px;
      border-left: 1px solid #ddd;
      padding: 10px;

      .recommend-hot-right-Singer-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        border-bottom: 1px #ddd solid;
        padding-bottom: 10px;

        span {
          &:nth-of-type(1) {
            font-weight: bold;
          }

          &:nth-of-type(2) {
            color: #6f6f6f;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      .hot-anchor {
        margin-top: 20px;

        .head {
          font-size: 12px;
          font-weight: bold;
          border-bottom: 1px solid #ddd;
          margin-bottom: 10px;
          padding-bottom: 5px;
        }

        .content {
          display: flex;
          align-items: center;
          margin-bottom: 15px;

          .info {
            margin-left: 10px;
            font-size: 14px;
            width: 170px;

            p {
              margin: 0;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }

          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }

    .recommend-hot-right-Singer-content {
      margin-top: 20px;

      .recommend-hot-right-Singer-info {
        display: flex;
        align-items: center;
        border: 1px #ddd solid;
        background-color: #eaeaea;
        margin-bottom: 20px;

        img {
          width: 62px;
          height: 62px;
        }

        .Singer-info {
          margin-left: 10px;

          p {
            width: 150px;
            margin: 0;
            padding-bottom: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &:nth-of-type(1) {
              font-weight: bold;
            }
          }
        }
      }

      .recommend-hot-right-Singer-success {
        background-color: #ffffff;
        text-align: center;
        border-radius: 10px;
        padding: 5px 0;
        border: 1px #ddd solid;
        box-shadow: 1px 1px 1px 1px #ddd;

        a {
          color: #000;
        }
      }
    }
  }

}
</style>

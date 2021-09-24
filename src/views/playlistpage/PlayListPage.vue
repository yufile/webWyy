<template>
  <div class="play-list-page" v-if="isShow">
    <div class="playlist-left">
      <song-page-head :playlist="playlist"/>
      <div class="left-playlist">
        <div class="left-playlist-head">
          <div><span>歌曲列表</span><span>{{ playlist.trackCount }}首歌</span></div>
          <div><span>播放：<span>{{ playlist.playCount }}</span>次</span></div>
        </div>
        <table>
          <thead>
          <th></th>
          <th>歌曲标题</th>
          <th>时长</th>
          <th>歌手</th>
          <th>专辑</th>
          </thead>
          <tbody>
          <tr v-for="(item,index) in songList" :key="index" @mousemove="moveThis(index)" @mouseleave="leaveThis()">
            <td>
              <span>{{ index + 1 }}</span>
              <span class="el-icon-video-play" @click="playId(item)"></span>
            </td>
            <td><span :title="item.name">{{ item.name }}</span></td>
            <td>
              <span v-if="!(index === isShowIndex)">{{ $filters.SongTime(item.dt) }}</span>
              <span v-else class="isShow">
                <span class="el-icon-plus"></span>
                <span class="el-icon-folder-add"></span>
                <span class="el-icon-share"></span>
                <span class="el-icon-download"></span>
              </span>
            </td>
            <td><span :title="item.ar[0].name">{{ item.ar[0].name }}</span></td>
            <td><span :title="item.al.name">{{ item.al.name }}</span></td>
          </tr>
          </tbody>
        </table>
        <page-comment :id="id"/>
      </div>
    </div>
    <div class="playlist-right">
      <div class="playlist-right-head">
        喜欢这个歌单的人
      </div>
      <div class="playlist-right-img">
        <div class="playlist-right-item" v-for="(item,index) in likeP" :key="index">
          <img :src="item.avatarUrl" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {inject, onMounted, toRefs, reactive} from "vue";
import {getSongListInfo, getDishLink} from 'network/homefind.js'
import store from "store";
import router from "router";
import SongPageHead from "components/commen/SongPageHead.vue";
import PageComment from "components/commen/PageComment.vue";

export default {
  name: "PlayListPage",
  components: {
    SongPageHead,
    PageComment
  },
  setup() {

    const id = router.currentRoute._rawValue.query.id
    // 刷新页面
    const reload = inject('reload');

    let moveThis = (index) => {
      state.isShowIndex = index;
    };
    let leaveThis = () => {
      state.isShowIndex = null
    }
    let playId = (item) => {
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
      playId,
      playlist: {
        name: '',
        coverImgUrl: '',
        tags: [],
        description: '',
        subscribedCount: 0,
        shareCount: 0,
        commentCount: 0,
        userId: 0,
        creator: {
          nickname: '',
          avatarUrl: ''
        },
        createTime: 0,
        trackCount: '',
        playCount: 0
      },
      songList: [],
      likeP: [],
      moveThis,
      leaveThis,
      isShowIndex: null,
      isShow: false,
      id: id
    })
    if (store.state.songlistpath === '/findhomepage/recommend') {
      store.state.songlistpath = ''
      reload();
    }
    onMounted(() => {
      if (store.state.songIndex === 1)
        getSongListInfo(id).then(res => {
          if (res.data.code === 200) {
            let data = res.data.playlist;
            state.playlist = {
              name: data.name,
              coverImgUrl: data.coverImgUrl,
              tags: data.tags,
              description: data.description,
              subscribedCount: data.subscribedCount,
              shareCount: data.shareCount,
              commentCount: data.commentCount,
              userId: data.userId,
              creator: {nickname: data.creator.nickname, avatarUrl: data.creator.avatarUrl},
              createTime: data.createTime,
              trackCount: data.trackCount,
              playCount: data.playCount
            };
            state.songList = data.tracks;
            state.likeP = data.subscribers;
            state.isShow = true;
          }
        })
      if (store.state.dishIndex === 1)
        getDishLink(id).then(res => {
          if(res.data.code) {
            let data = res.data.album;
            state.playlist = {
              name: data.name,
              coverImgUrl: data.picUrl,
              tags: [],
              description: data.description,
              shareCount: data.info.shareCount,
              commentCount: data.info.commentCount,
              userId: data.artist.id,
              company: data.company,
              creator: {nickname: data.artists[0].name},
              createTime: data.publishTime,
              trackCount: data.info.commentCount,
            };
            state.songList = res.data.songs;
            state.isShow = true;
          }
          console.log(res)
        })
    })
    return toRefs(state)
  }
}
</script>

<style scoped lang="less">
.play-list-page {
  width: 980px;
  margin: 0 auto;
  border: 1px solid #a8a8a8;
  color: #000;
  display: flex;
  background-color: #fff;

  .playlist-left {
    width: 640px;
    margin: 40px;


    .left-playlist {
      .left-playlist-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 10px 20px;

        div {
          &:nth-of-type(1) {
            span {
              &:nth-of-type(1) {
                font-size: 20px;
                margin-right: 10px;
              }

            }
          }

          &:nth-of-type(2) {
            span {
              span {
                color: #d54e53;
              }
            }
          }
        }
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 640px;
        border: silver 1px solid;

        thead {
          height: 40px;
          box-shadow: 0 1px 1px 1px #ddd;

          th {
            &:nth-of-type(1) {
              border: 0;
              width: 74px;
            }

            background-color: #eeeeee;
            padding: 0 0 0 10px;
            text-align: left;
            margin: 0;
            border-left: 2px solid silver;
          }
        }

        tbody {
          tr {
            height: 40px;
            font-size: 14px;

            &:nth-of-type(2n) {
              background-color: #bdbdbd;
            }

            td {

              span {
                &:hover {
                  cursor: pointer;
                  text-decoration: underline;
                }
              }

              padding-left: 10px;

              &:nth-of-type(1) {
                padding-left: 0;
                display: flex;
                justify-content: space-around;
                line-height: 40px;
                align-items: center;

                span {
                  width: 40px;
                  box-sizing: border-box;
                  text-decoration: none;
                  padding-left: 10px;

                  &:nth-of-type(2) {
                    font-size: 18px;

                    &:hover {
                      cursor: pointer;
                      color: #d54e53;
                    }
                  }
                }
              }

              &:nth-of-type(3) {
                span {
                  text-decoration: none;
                  display: inline-block;
                  width: 100px
                }

                .isShow {
                  display: flex;
                  font-size: 15px;

                  span {
                    &:hover {
                      color: #d54e53;

                      font-weight: bold;
                    }
                  }

                }
              }

              &:nth-of-type(2) {
                span {
                  display: inline-block;
                  width: 180px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }

              &:nth-of-type(4) {
                span {
                  display: inline-block;
                  width: 100px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }

              &:nth-of-type(5) {
                span {
                  display: inline-block;
                  width: 150px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
            }
          }
        }
      }
    }
  }

  .playlist-right {
    flex: 1;
    border-left: 1px #a8a8a8 solid;
    padding: 20px;

    .playlist-right-head {
      font-size: 14px;
      border-bottom: 1px silver solid;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }

    .playlist-right-img {
      display: flex;
      align-content: center;
      flex-wrap: wrap;

      .playlist-right-item {
        img {
          width: 40px;
          height: 40px;
          margin-bottom: 20px;
          margin-left: 10px;
        }
      }
    }

  }
}
</style>
<template>
  <div class="left-head">
    <div class="left-head-img">
      <img :src="playlist.coverImgUrl" alt="">
    </div>
    <div class="left-head-content">
      <div class="left-head-content-title">
        <span class="el-icon-house"></span>
        <span>{{ playlist.name }}</span>
      </div>
      <div class="left-head-content-create">
        <img :src="playlist.creator.avatarUrl" alt="" v-if="playlist.creator.avatarUrl !== undefined">
        <span>{{ playlist.creator.nickname }}</span>
        <span style="margin-right: 5px;" v-if="playlist.company !== undefined">公司：{{playlist.company}}</span>
        <span>{{ $filters.editTime(playlist.createTime) }} 创建</span>

      </div>
      <div class="left-head-content-play">
        <div><span class="el-icon-video-play">播放</span><span>+</span></div>
        <div><span class="el-icon-folder-add"><span v-if="playlist.subscribedCount !== undefined">({{ $filters.currencyUSD(playlist.subscribedCount) }})</span></span>
        </div>
        <div><span class="el-icon-s-finance">({{ playlist.shareCount }})</span></div>
        <div><span class="el-icon-download">下载</span></div>
        <div><span class="el-icon-chat-dot-round">({{ playlist.commentCount }})</span></div>
      </div>
      <div class="left-head-content-classify">
        <span>标签:</span><span v-for="(item,index) in playlist.tags" :key="index">{{ item }}</span>
      </div>
      <div class="left-head-content-info">
        <pre>{{ playlist.description }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongPageHead",
  props: {
    playlist: Object
  },
  setup(props) {
  }
}
</script>

<style scoped lang="less">
.left-head {
  display: flex;

  .left-head-img {
    width: 214px;
    height: 204px;
    padding: 1px;
    border: 1px #bf3b3b solid;

    img {
      width: 204px;
      height: 204px;
    }
  }

  .left-head-content {
    margin-left: 20px;

    .left-head-content-title {
      margin-bottom: 15px;
      font-size: 22px;
      display: flex;
      align-items: center;

      span {
        &:nth-of-type(1) {
          display: inline-block;
          font-size: 38px;
          transform: rotate(90deg);
          color: #bb1b1b;
          margin-right: 10px;
        }
      }
    }

    .left-head-content-create {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      span {
        color: silver;

        &:nth-of-type(1) {
          color: #2aabd2;
          cursor: pointer;
          margin-right: 10px;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }

    .left-head-content-play {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      div {
        font-size: 15px;
        margin-right: 10px;
        width: 25%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px #2d3143 solid;
        border-radius: 5px;
        background-color: silver;
        cursor: pointer;
        box-shadow: 1px 1px 1px 1px #000000;

        &:hover {
          background-color: #eaeaea;
        }

        &:nth-of-type(2) {

        }

        &:nth-of-type(1) {
          display: flex;
          align-items: center;
          background-color: #00acfc;
          border-radius: 5px;

          span {
            width: 50px;
            line-height: 30px;
            display: inline-block;
            border-radius: 5px;
            cursor: pointer;

            &:nth-of-type(1) {
              padding: 0 5px;


              &:hover {
                background-color: #5ed4ff;
              }
            }

            &:nth-of-type(2) {
              width: 30px;
              border-left: 1px #000 solid;
              color: #fff;

              &:hover {
                background-color: #70d2fc;
              }
            }
          }
        }
      }
    }

    .left-head-content-classify {
      margin-bottom: 20px;

      span {
        border: 1px silver solid;
        padding: 4px 10px;
        border-radius: 10px;
        margin-right: 10px;

        &:hover {
          background-color: #ddd;
          cursor: pointer;
        }

        &:nth-of-type(1) {
          border: 0;
          padding: 0;
          background: #fff;
          cursor: auto;
        }
      }
    }

    .left-head-content-info {
      pre {
        white-space: initial;
      }
    }
  }
}
</style>
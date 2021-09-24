<template>
  <div v-if="wyc" class="play-components" @mousemove="movePlay" @mouseleave="leaveTo"
       :class="{'le': isShow,'ss':isShowTo}">
    <span @click="block" :class="{'el-icon-remove':!isShowTo,'el-icon-circle-plus':isShowTo}" class="ic"></span>
    <div class="play-btn">
      <div class="play-btn-left">
        <span class="el-icon-caret-left" @click="upMusic"></span><span @click="playMusic()"
                                                                       :class="{'el-icon-video-play':!play,'el-icon-video-pause': play}"></span><span
          class="el-icon-caret-right" @click="nextMusic"></span>
      </div>
      <div class="play-btn-content">
        <audio hidden :src="MusicUrl" preload ref="audioRef" controls></audio>
        <img :src="songInfo.img" alt="">

        <div class="progress-bar" style="width: 500px">
          <div><span>{{ songInfo.nameM }}</span><span>{{ songInfo.name }}</span></div>
          <el-slider v-model="value3" @input="inputChange" :step="1" :max="duration" :show-tooltip="true"></el-slider>
        </div>
        <div class="play-time"><span>{{ times }}</span>/<span>{{ $filters.SongTime(playTime) }}</span></div>
      </div>
      <div class="play-btn-right">
        <span class="el-icon-service" @click="HiddenVolume"></span>
        <div class="block" v-show="isVolume">
          <el-slider
              v-model="value1"
              vertical
              @input="editVolume"
              height="100px">
          </el-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs} from "vue";

import state from 'assets/js/playMusicC.js'
export default {
  name: "PlayComponents",
  components: {},
  setup() {
    return toRefs(state())
  }
}
</script>

<style scoped lang="less">

.play-components {
  width: 100%;
  min-width: 992px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.6);
  left: 0;
  z-index: 10;
  transition: transform .3s;
  position: absolute;
  bottom: -55px;
  color: #f3f3f3;
  box-shadow: -1px -1px 1px 1px rgba(0, 0, 0, 0.6);
  font-size: 14px;

  .ic {
    cursor: pointer;
    display: inline-block;
    width: 40px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: -20px;
    border-radius: 10px 10px 0 0;
    right: 10px;
  }

  .play-btn {
    display: flex;
    align-content: center;
    justify-content: space-around;
    line-height: 60px;

    .play-btn-left {
      font-size: 26px;

      span {
        color: #d9d9d9;
        cursor: pointer;

        &:nth-of-type(2) {
          font-size: 30px;
          margin: 0 15px;
        }

        &:hover {
          color: #fff;
        }
      }
    }

    .play-btn-content {
      width: 670px;
      display: flex;
      align-items: center;

      .progress-bar {
        margin-left: 20px;

        div {
          &:nth-of-type(1) {
            position: absolute;
            top: -20px;
            font-size: 12px;

            span {
              margin-right: 10px;
            }
          }
        }
      }

      img {
        width: 40px;
        height: 40px;
      }

      audio {
        source {
        }
      }
    }

    .play-btn-right {
      width: 200px;
      position: relative;
      span {
        &:nth-of-type(1) {
          font-size: 20px;
        }
      }
      .block {
        position: absolute;
        top: -100px;
        left: -10px;
      }
    }
  }
}

.le {
  transform: translateY(-55px);
}

.ss {
  transform: translateY(-55px);
}
</style>
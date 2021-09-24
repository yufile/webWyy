<template>
  <div class="home">
    <div class="home-head">
      <div class="home-head-login">
        <img src="~@/assets/img/wangyiyunyinyue.png" alt=""/><span>网易云音乐</span>
      </div>
      <div class="home-head-nav">
        <router-link to="/findhomepage" class="liA" active-class="active">发现音乐 <em></em></router-link>
        <router-link to="/mymusic" active-class="active" class="liA">我的音乐 <em></em></router-link>
        <router-link to="/a" active-class="active" class="liA">朋友 <em></em></router-link>
        <router-link to="/b" active-class="active" class="liA">商城 <em></em></router-link>
        <router-link to="/c" active-class="active" class="liA">音乐人 <em></em></router-link>
        <router-link to="/d" active-class="active" class="liA">下载客户端<em></em></router-link>
      </div>
      <div class="home-head-info">
        <input type="text">
        <span>创作者中心</span>
        <span>登录</span>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {reactive, computed, toRefs, onMounted} from 'vue';
import router from "../router";

export default {
  name: "Home",
  components: {

  },
  setup() {
    const state = reactive({
    })
    return toRefs(state)
  }
}
</script>

<style scoped lang="less">
.home {

  width: 100%;
  min-width: 970px;
  height: 70px;
  background-color: #383838;
  color: #fff;
  font-size: 14px;
  margin: 0 auto;

  .home-head {
    width: 1100px;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;

    .home-head-login {
      height: 70px;
      line-height: 70px;
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }

    .home-head-nav {
      height: 70px;

      .liA {
        display: inline-block;
        width: 90px;
        height: 70px;
        text-align: center;
        line-height: 70px;
        &:hover {
          background-color: #242424;
        }
      }
    }

    .home-head-info {
      margin-left: 70px;
      line-height: 40px;

      input {
        width: 100px;
        outline: none;
        border-radius: 15px;
        border: 0;
        height: 25px;
        margin-right: 20px;
        padding-left: 30px;
        background-image: url("assets/img/search.svg");
        background-repeat: no-repeat;
        background-position: 5px 5px;
        background-size: 20px;
      }

      span {
        &:nth-of-type(1) {
          border: 1px solid #909090;
          margin-right: 20px;
          padding: 5px 15px;
          border-radius: 20px;
          color: #909090;

          &:hover {
            border-color: #ddd;
            color: #ddd;
          }
        }

        &:nth-of-type(2) {
          color: #717171;
          cursor: pointer;

          &:hover {
            color: #afafaf;
            text-decoration: underline;
          }
        }
      }
    }
  }
}

// 点击的样式
.click-style {
  background-color: #242424;
}
.active {
  background-color: #242424;
  position: relative;
  em {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0; /*设置宽度*/
    border-width: 5px; /*设置边框宽度*/
    border-style: solid;
    /*设置边框颜色 上(透明) 右(透明) 下(黑色) 左(透明) 上三角形*/
    border-color: transparent transparent #ff0000 transparent;

  }
}
</style>
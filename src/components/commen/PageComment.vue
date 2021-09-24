<template>
  <div class="page-comment">
    <div class="page-comment-head">
      <span>评论</span><span>共28条评论</span>
    </div>
    <div class="my-input">
      <div class="my-input-img">
        <img src="~@/assets/img/wangyiyunyinyue.png" alt="">
      </div>
      <div class="my-input-comment">
        <textarea type="text" maxlength="140" v-model="value1" placeholder="评论"></textarea>
        <em> &lt; </em>
        <div class="my-input-publish">
          <div class="my-input-publish-left">
            <span class="el-icon-more"></span>
            <span>@</span>
          </div>
          <div class="my-input-publish-right">
            <span>{{ words - valuelength }}</span>
            <span>评论</span>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-p">
      <div v-if="hotComments.length > 0">
        <div class="comment-p-head">精彩评论</div>
        <div class="comment-p-item" v-for="(item,index) in hotComments" :key="index">
          <div class="comment-p-item-img">
            <img :src="item.user.avatarUrl" alt="">
          </div>
          <div class="comment-p-item-user">
            <div class="comment-p-item-user-name">
              <span>{{ item.user.nickname }}</span><span> ：{{ item.content }}</span>
            </div>
            <div class="comment-p-item-user-other" v-if="item.beReplied.length > 0">
              <em>^</em>
              <span><b>{{ item.beReplied[0].user.nickname }}</b> ：{{ item.beReplied[0].content }}</span>
            </div>
            <div class="comment-p-item-user-time">
              <span>{{ $filters.editTime(item.time) }}</span>
              <div><span class="el-icon-sunrise"><b v-if="item.likedCount > 0">（{{ item.likedCount }}）</b></span> |
                <span>回复</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="comment-p-head">最新评论({{ total }})</div>
      <div class="comment-p-item" v-for="(item,index) in comments" :key="index">
        <div class="comment-p-item-img">
          <img :src="item.user.avatarUrl" alt="">
        </div>
        <div class="comment-p-item-user">
          <div class="comment-p-item-user-name">
            <span>{{ item.user.nickname }}</span><span> ：{{ item.content }}</span>
          </div>
          <div class="comment-p-item-user-other" v-if="item.beReplied.length > 0">
            <em>^</em>
            <span><b>{{ item.beReplied[0].user.nickname }}</b> ：{{ item.beReplied[0].content }}</span>
          </div>
          <div class="comment-p-item-user-time">
            <span>{{ $filters.editTime(item.time) }}</span>
            <div><span class="el-icon-sunrise"><b v-if="item.likedCount > 0">（{{ item.likedCount }}）</b></span> | <span>回复</span>
            </div>
          </div>
        </div>
      </div>
      <div class="paging">
        <el-pagination
            background
            @current-change="sizeChange"
            layout="prev, pager, next"
            :total="total"
            :page-size="20">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, onUpdated, reactive, toRefs} from "vue";
import {getSongListComment,getDishComments} from "network/homefind.js";
import store from "../../store";

export default {
  name: "PageComment",
  props: {
    id: String
  },

  setup(props) {
    // 点击换页
    const sizeChange = (index) => {
      if(store.state.songIndex === 1)
      getSongListComment(props.id, index - 1).then(res => {
        if (res.data.code) {
          state.comments = res.data.comments;
          state.hotComments = res.data.hotComments || [];
        }
      })
      if(store.state.dishIndex === 1)
        getDishComments(props.id,index-1).then(res => {
          if(res.data.code) {
            state.comments = res.data.comments;
            state.hotComments = res.data.hotComments || [];
          }
        })
    }
    const state = reactive({
      words: 140,
      value1: '',
      valuelength: 0,
      comments: [],
      hotComments: [],
      total: 0,
      sizeChange,
    });
    onUpdated(() => {
      state.valuelength = state.value1.length;
    });
    onMounted(() => {
      if(store.state.songIndex === 1)
      getSongListComment(props.id, 0).then(res => {
        if (res.data.code) {
          console.log(res)
          state.comments = res.data.comments;
          state.total = res.data.total;
          state.hotComments = res.data.hotComments || [];
        }
      })
      if(store.state.dishIndex === 1)
      getDishComments(props.id,0).then(res => {
        if(res.data.code) {
          state.comments = res.data.comments;
          state.total = res.data.total;
          state.hotComments = res.data.hotComments || [];
        }
      })
    })

    return toRefs(state)
  }
}
</script>

<style scoped lang="less">
.page-comment {
  margin-top: 40px;

  .page-comment-head {
    font-size: 20px;
    border-bottom: 2px #ce2228 solid;
    padding-bottom: 10px;
    margin-bottom: 20px;

    span {
      &:nth-of-type(2) {
        font-size: 12px;
        margin-left: 20px;
      }
    }

  }

  .my-input {
    display: flex;
    align-content: center;

    .my-input-img {

      img {
        width: 50px;
        height: 50px;
      }
    }

    .my-input-comment {
      margin-left: 20px;
      width: 560px;
      position: relative;

      em {
        width: 10px;
        height: 6.5px;
        position: absolute;
        top: 18px;
        line-height: 6.5px;
        background-color: #FFFFFF;
        left: -8px;
        color: silver;
      }

      textarea {
        resize: none;
        outline: none;
        width: 550px;
        height: 63px;
        border-color: silver;
        padding: 10px 0 0 10px;
      }

      .my-input-publish {
        display: flex;
        align-content: center;
        justify-content: space-between;

        .my-input-publish-left {
          span {
            cursor: pointer;

            &:nth-of-type(2) {
              margin-left: 10px;
            }
          }
        }

        .my-input-publish-right {
          span {
            &:nth-of-type(2) {
              cursor: pointer;
              color: #FFFFFF;
              margin-left: 10px;
              display: inline-block;
              width: 60px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              background-color: #00acfc;
              border-radius: 5px;
              box-shadow: 0 1px 1px 1px #6d80ff, 0px 0px 1px 1px #6d80ff;

              &:hover {
                background-color: #2aabd2;
              }
            }
          }
        }
      }
    }
  }

  .comment-p {
    margin-top: 20px;

    .comment-p-head {
      margin-bottom: 20px;
      border-bottom: 2px silver solid;
      padding-bottom: 5px;
    }

    .comment-p-item {
      display: flex;
      align-content: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px silver dashed;

      .comment-p-item-img {
        width: 50px;
        height: 50px;
        margin-right: 20px;


        img {
          width: 50px;
          height: 50px;
        }
      }

      .comment-p-item-user {
        width: 540px;

        .comment-p-item-user-name {
          margin-bottom: 10px;

          span {
            &:nth-of-type(1) {
              color: #2aabd2;
              cursor: pointer;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }

        .comment-p-item-user-other {
          width: 550px;
          background-color: #f3f3f3;
          line-height: 40px;
          border: 1px silver solid;
          position: relative;
          padding-left: 10px;

          span {
            b {
              font-weight: initial;
              color: #2aabd2;
              cursor: pointer;

              &:hover {
                text-decoration: underline;
              }
            }
          }

          em {
            display: inline-block;
            width: 7px;
            font-size: 15px;
            position: absolute;
            top: -4px;
            left: 15px;
            line-height: 6.5px;
            color: silver;

            &:after {
              content: "";
              width: 6px;
              height: 1px;
              position: absolute;
              top: 3px;
              left: 1.2px;
              background-color: #f3f3f3;
            }
          }
        }

        .comment-p-item-user-time {
          font-size: 12px;
          display: flex;
          margin-top: 10px;
          justify-content: space-between;
          align-content: center;
          color: silver;

          div {
            span {
              &:nth-of-type(1) {
                color: #2aabd2;
                cursor: pointer;
                font-size: 14px;

                b {
                  cursor: auto;
                  color: #2d3143;
                  font-size: 12px;
                  font-weight: initial;
                }

                &:hover {
                  color: #00acfc;
                }
              }
            }

          }
        }
      }
    }

    .paging {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
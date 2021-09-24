<template>
  <div class="nav-slot">
    <div>
      <span class="el-icon-s-data"></span>
      <slot name="title"></slot>
    </div>
    <div>
      <slot name="some"></slot>
      <span class="el-icon-right"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavSlot"
}
</script>

<style scoped lang="less">
.nav-slot {
  width: 100%;
  height: 40px;
  border-bottom: 2px #d54e53 solid;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 10px;
  div {
    &:nth-of-type(1) {
      font-size: 30px;
      span {
        &:nth-of-type(1) {
          font-size: 30px;
          color: #d54e53;
          margin-right: 10px;
        }
      }
    }
    &:nth-of-type(2) {
      span {
        color: #d54e53;
        font-weight: bold;
      }
    }
  }
}
</style>
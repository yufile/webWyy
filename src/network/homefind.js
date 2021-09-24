import {api} from "./api";
// 首页发现接口 /homepage/block/page
// banner
export function getFindHome() {
  return api({
    method:'get',
    url: '/banner',
  })
}
// /personalized 推荐歌单 默认30条limit
export function getSongList(num) {
  return api({
    method:'get',
    url: '/personalized',
    params: {
      limit: num
    }
  })
}
// http://localhost:7000/playlist/detail?id=6892176976
//获取歌单详情
export function getSongListInfo(id) {
  return api({
    method:'get',
    url: '/playlist/detail',
    params:{
      id: id
    }
  })
}
// http://localhost:7000/artist/list?type=-1&area=-1&limit=8 获取8个歌手
export function getSingerInfo(num) {
  return api({
    method:'get',
    url: '/artist/list',
    params:{
      type: -1,
      area:-1,
      limit: num
    }
  })
}
// 热门主播 http://localhost:7000/dj/toplist/popular?limit=30
export function getAnchorInfo(num) {
  return api({
    method:'get',
    url: '/dj/toplist/popular',
    params:{
      limit: num
    }
  })
}
// 歌单评论 http://localhost:7000/comment/playlist?id=2476070975
export function getSongListComment(id,num) {
  return api({
    method:'get',
    url: '/comment/playlist',
    params:{
      id: id,
      offset: (num * 20)
    }
  })
}
// 歌曲链接  http://localhost:7000/song/url?id=33894312
export function getSongLink(id) {
  return api({
    method:'get',
    url: '/song/url',
    params:{
      id: id
    }
  })
}
// 新碟 http://localhost:7000/album/newest
export function getNewDish() {
  return api({
    method:'get',
    url: '/album/newest'
  })
}
// http://localhost:7000/album?id=132489397 专辑信息
export function getDishLink(id) {
  return api({
    method:'get',
    url: '/album',
    params:{
      id: id
    }
  })
}
// http://localhost:7000/comment/album?id=32311 专辑【评论
export function getDishComments(id,num) {
  return api({
    method:'get',
    url: '/comment/album',
    params:{
      id: id,
      offset: (num * 20)
    }
  })
}
/*飙升榜id 19723756

新歌榜id 3779629

原创榜id: 2884035*/
// http://localhost:7000/playlist/detail?id=19723756 获取榜单
export function getMonthlyFocus(id) {
  return api({
    method:'get',
    url: '/playlist/detail',
    params: {
      id: id
    }
  })
}
// http://localhost:7000/playlist/hot 分类
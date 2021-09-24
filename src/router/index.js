import {createRouter, createWebHistory} from 'vue-router'
import Home from 'views/Home.vue'
import store from "../store";
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: {name: 'FindHomePage'},
    component: Home,
    linkActiveClass:'active',
    children: [
      {
        path: 'findhomepage',
        name: 'FindHomePage',
        redirect: {name: 'Recommend'},
        component: () => import('views/DiscovrMusic/FindHomePage.vue'),
        children: [
          {
            path: 'recommend',
            name: 'Recommend',
            component: () => import('views/DiscovrMusic/Recommend.vue')
          },
          {
            path: 'rankinglist',
            name: 'RankingList',
            component: () => import('views/DiscovrMusic/RankingList.vue'),

          },
          {
            path: 'songlist',
            name: 'SongList',
            component: () => import('views/DiscovrMusic/SongList.vue')
          },
          {
            path: 'newsradio',
            name: 'NewsRadio',
            component: () => import('views/DiscovrMusic/NewsRadio.vue')
          },
          {
            path: 'singer',
            name: 'Singer',
            component: () => import('views/DiscovrMusic/Singer.vue')
          },
          {
            path: 'newdisc',
            name: 'NewDisc',
            component: () => import('views/DiscovrMusic/NewDisc.vue')
          },
          {
            path: 'playlist',
            name: 'PlayListPage',
            component: () => import('views/playlistpage/PlayListPage.vue')
          }
        ]
      },
      {
        path: 'mymusic',
        name: 'MyMusic',
        linkActiveClass:'active',
        component: () => import('views/MyMusic/MyMusic.vue')
      }
    ]
    // 歌曲列表

  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to,from)=>{
  store.commit('SongListPath',from.fullPath)
})
export default router
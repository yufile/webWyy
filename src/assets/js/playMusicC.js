import {computed, reactive, ref, toRefs, watch} from "vue";
import store from "store";
import {getSongLink} from "network/homefind.js";
import {antiShake} from "commen/utils.js";

export default function list() {
  const audioRef = ref();
  // 移动到
  const movePlay = () => {
    state.isShow = true;
  }
  // 移开
  const leaveTo = () => {
    state.isShow = false;
  }
  // 锁上
  const block = () => {
    state.isShow = false;
    state.isShowTo = !state.isShowTo;
  }
  // 滑动进度条
  const inputChange = () => {
    audioRef.value.currentTime = state.value3;
    state.ts = state.value3;

  }
  // 下一首
  const nextMusic = () => {
    if ((store.state.keepIdList.length - 1) === state.i) {
      state.i = 0;
    } else {
      state.i++;
    }
    bf()
  }
  // 声音
  const editVolume = () => {
    audioRef.value.volume = (state.value1 / 100)
  }
  // 隐藏音量显示
  const HiddenVolume = () => {
    state.isVolume = !state.isVolume;
  }
  // 上一首
  const upMusic = () => {
    if (state.i === 0) {
      state.i = (store.state.keepIdList.length - 1)
    }
    state.i--;
    bf()
  }
  // 自动切换下一首
  const bf = () => {
    state.value3 = 0;
    state.ts = 0;
    state.wyc = true;
    state.playTime = store.state.keepIdList[state.i].time;
    state.songInfo.name = store.state.keepIdList[state.i].name;
    state.songInfo.nameM = store.state.keepIdList[state.i].nameM;
    state.songInfo.img = store.state.keepIdList[state.i].img;
    clearInterval(timer);
    playMusic(store.state.keepIdList[state.i].id)
  }

  // 播放音乐
  let timer = null;
  const playMusic = antiShake((id) => {
    getSongLink(id).then(res => {
      if (res.data.code) {
        state.MusicUrl = res.data.data[0].url;
        console.log(res)
      }
    })
    setTimeout(() => {
      if (audioRef._value.paused) {
        state.play = true;
        audioRef._value.play();
        if (timer) clearInterval(timer)
        timer = setInterval(() => {
          state.ts++;
          state.value3++;
          if (audioRef.value.duration == audioRef.value.currentTime) {
            nextMusic()
          }
        }, 1000)
        state.duration = audioRef.value.duration;
      } else {
        state.play = false;
        clearInterval(timer);
        audioRef._value.pause();
      }
    }, 300)
  })

  const state = reactive({
    movePlay,
    leaveTo,
    block,
    playMusic,
    nextMusic,
    inputChange,
    upMusic,
    editVolume,
    HiddenVolume,
    isVolume: false,
    songInfo: {
      name: '',
      nameM: '',
      img: ''
    },
    isShow: false,
    isShowTo: false,
    audioRef: audioRef,
    play: false,
    value3: 0,
    value1: 100,
    duration: 0,
    MusicUrl: '',
    playTime: '00:00',
    ts: 0,
    i: 0,
    wyc: false,
    times: computed(() => {
      return (parseInt(state.ts / 60) >= 10 ?
          parseInt(state.ts / 60) :
          '0' + parseInt(state.ts / 60)) + ':' + ((state.ts % 60) >= 10 ? parseInt(state.ts % 60) : '0' + parseInt(state.ts % 60))
    }),

  });
  watch(store.state.keepIdList, (c, d) => {
    state.value3 = 0;
    state.ts = 0;
    state.playTime = c[0].time;
    state.wyc = true;
    state.songInfo.name = c[0].name;
    state.songInfo.nameM = c[0].nameM;
    state.songInfo.img = c[0].img;
    clearInterval(timer);
    playMusic(c[0].id)
  })
  return state
}
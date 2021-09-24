import {createApp} from 'vue';
import App from './App.vue';
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

app.config.globalProperties.$filters = {
  currencyUSD(value) {
    if (value >= 10000) {
      value = value / 10000;
      return value.toFixed(1) + '万'
    } else {
      return value
    }
  },
  editTime(value) {
    let date = new Date(value)
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
  },
  SongTime(value) {
    if (Number.isFinite(value)) {
      let fz = (value / 1000 % 60) >= 10 ? parseInt(value / 1000 % 60) : ('0' + parseInt(value / 1000 % 60))
      let timer = (value / 1000 / 60) >= 10 ? parseInt(value / 1000 / 60) : ('0' + parseInt(value / 1000 / 60).toFixed(0)) + ':' + fz;
      return timer
    }
    return '00:00'
  }
}

app.use(router);
app.use(ElementPlus)
app.use(store);
app.mount('#app');

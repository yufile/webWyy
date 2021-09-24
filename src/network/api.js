import axios from 'axios';
// http://localhost:7000/homepage/block/page 发现接口
export function api(config) {
  const server = axios.create({
    baseURL:'http://localhost:7000',
    timeoutL:5000
  })
  // server.interceptors.request.use((config) => {
  //   return config
  // },error => {
  //   console.log(error)
  //   return error
  // })
  // server.interceptors.response.use(config => {
  //   return config
  // })
  return server(config)
}
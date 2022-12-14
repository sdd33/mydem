import axios from 'axios'
// @ts-ignore
import {getToken} from "./token";

const http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})
// 添加请求拦截器
http.interceptors.request.use((config)=> {
  const token = getToken()
  if(token){
    // @ts-ignore
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error)=> {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response)=> {
  return response
}, (error)=> {
  return Promise.reject(error)
})

export { http }

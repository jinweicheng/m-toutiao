import axios from 'axios'
import store from '../store'
// 1、设置baseURL
const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/'
})

// 2、axios的请求拦截器：Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { user } = store.state
    if(user && user.data && user.data.token) {
        config.headers.Authorization = `Bearer ${user.data.token}`
    }
    console.log('config',config)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 3、axios设置response拦截器
export default request
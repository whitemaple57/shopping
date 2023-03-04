//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
import "nprogress/nprogress.css";
//引入store
import store from '@/store'
const requests = axios.create({
   baseURL:"/api",//基础路径
   timeout:5000,//超时时间
});
//请求拦截器
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        //在请求头加vuex中计算的userTempId传递
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //在请求头加vuex中存储的token个人账户信息传递
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    nprogress.start();
    return config;
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new error('faile'))
});


export default requests;
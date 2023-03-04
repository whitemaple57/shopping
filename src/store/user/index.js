//登录与注册
import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo,reqLogout } from "@/api";
import {setToken,getToken,removeToken} from "@/utils/token"
const state = {
  code:"",
  token:getToken(),
  userInfo:"",
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  //token存储在vuex数据(刷新后消失)
  USERLOGIN(state, token) {
    state.token = token;
  },
  //存储用户信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //清除本地数据
  CLEAR(state){
    //仓库信息清空
  state.token = "";
  state.userInfo = {};
  //本地存储清空
  removeToken();
  },
};
const getters = {};
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("失败"));
    }
  },
  //用户注册
  async registerUser({}, obj) {
    //注册接口没有返回data,不需要提交mutation
    let result = await reqRegister(obj);
    if (result.code == 200) {
      //注册成功
      return "ok";
    } else {
      //注册失败
      return Promise.reject(new Error(result.message));
    }
  },
  //用户登录
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    if (result.code == 200) {
      //前端常带token个人标识字符串来拉取个人数据
      commit("USERLOGIN", result.data.token);
      //永久储存用户token
      setToken(result.data.token)
      return "ok";
    } else {
      return Promise.reject(new Error("失败"));
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    }else{
      return Promise.reject(new Error('失败'));
    }
    //无需else错误，刚来未登录必须错误
  },
  //退出登录
 async userLogout({commit}){
  //只发送一次请求无需Promise的reject
   let result =  await reqLogout();
   if(result.code==200){
    commit("CLEAR");
    return 'ok'
   }else {
    return Promise.reject(new Error('失败'));
   }
  },
};
export default {
  state,
  mutations,
  getters,
  actions,
};

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import store from "@/store";
import routes from "./routes";
//重写vc中的push方法
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve & reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写vc中的replace方法
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    //代表滚动条在最上(单位为px，y不能为负数)
    return { y: 0 };
  },
});
router.beforeEach(async(to, from, next) => {
   let token = store.state.user.token;
   let name = store.state.user.userInfo.name
   if(token){
   //登录了禁止进入login
   if(to.path=='/login'){
    next('/home')
   }else{
    //登陆了但没去login,如果用户名已有
    if(name){
    next();
    }else{
      //没有用户信息，派发action让仓库存储信息在跳转
     try {
      //获取用户信息成功
      await store.dispatch('getUserInfo');
      next();
     } catch (error) {
      //token失效，清除token
      await store.dispatch('userLogout');
      next('/login');
     }
    }
   }
   }else{
    //未登录禁止去支付相关
    let toPath = to.path;
    if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
     //把未登录的没去成信息携带
      next('/login?redirect='+toPath);
    }else{
      next();
    }
   }
});

export default router;

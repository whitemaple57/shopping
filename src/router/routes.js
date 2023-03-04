//引入二级路由组件
// import MyOrder from "@/pages/Center/myOrder";
// import GroupOrder from "@/pages/Center/groupOrder";

// //路由懒加载(分成不同代码块,完整写法)
// const foo = () =>{
//   return import("@/pages/Home")
// } 

// 配置路由信息(懒加载优化写法,带引入页面)
export default [
  {
    path: "/center",
    component: () =>import("@/pages/Center"),
    meta: { show: true },
    //二级路由组件
    children: [
      {
        path: "myorder",
        component: () =>import("@/pages/Center/myOrder"),
      },
      {
        path: "grouporder",
        component: () =>import("@/pages/Center/groupOrder"),
      },
      //重定向
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    path: "/paysuccess",
    component: () =>import("@/pages/PaySuccess"),
    meta: { show: true },
  },
  {
    path: "/pay",
    component: () =>import("@/pages/Pay"),
    meta: { show: true },
    beforeEnter:(to,from,next)=>{
      if(from.path=='/trade'){
        next();
      }else{
        next(false);
      }
    }
  },
  {
    path: "/trade",
    component: () =>import("@/pages/Trade"),
    meta: { show: true },
    //路由独享
    beforeEnter:(to,from,next)=>{
      //去交易页面，必须从购物车来
     if(from.path=="/shopcart"){
      next()
     }else{
      //其他来停留当前页面
      next(false);
     }
    }
  },
  {
    path: "/shopcart",
    component: () =>import("@/pages/ShopCart"),
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () =>import("@/pages/AddCartSuccess"),
    meta: { show: true },
  },
  {
    path: "/detail/:skuid",
    component: () =>import("@/pages/Detail"),
    meta: { show: true },
  },

  {
    path: "/home",
    component: () =>import("@/pages/Home"),
    meta: { show: true },
  },

  {
    path: "/search/:keyword?",
    component: () =>import("@/pages/Search"),
    meta: { show: true },
    name: "search",
    props: ($route) => ({
      keyword: $route.params.keyword,
      k: $route.query.k,
    }),
  },

  {
    path: "/login",
    component: () =>import("@/pages/Login"),
    meta: { show: false },
  },

  {
    path: "/register",
    component: () =>import("@/pages/Register"),
    meta: { show: false },
  },

  // 重定向
  {
    path: "*",
    redirect: "/home",
  },
];

//进行api统一管理
//引入二次封装axios
import requests from "./request";
import mockRequests from "./mockAjax";
//三级联动接口
export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });
//轮播图接口
export const reqGetBannerList = () => mockRequests.get("/banner");
//floor接口
export const reqFloorList = () => mockRequests.get("/floor");
//search接口
export const reqGetSearchInfo = (params) =>
  requests({ url: "/list", method: "post", data: params });
//获取产品详情信息接口
export const reqGoodsInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });
//产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });
//获取购物车列表接口
export const reqCartList = () =>
  requests({ url: `/cart/cartList`, method: "get" });
//删除购物车接口
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
//修改商品选中状态接口
export const reqUpdateCheckedByid = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });
//获取验证码
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });
//注册
export const reqRegister = (data) =>
  requests({ url: `/user/passport/register`, data, method: "post" });
//登录
export const reqUserLogin = (data) =>
  requests({ url: `/user/passport/login`, data, method: "post" });
  //带着token检验获取用户信息
  export const reqUserInfo = () =>
  requests({ url: `/user/passport/auth/getUserInfo`, method: "get" });
  //退出登录
  export const reqLogout = () =>
  requests({ url: `/user/passport/logout`, method: "get" });
  //获取用户地址信息
  export const reqAddressInfo = () =>
  requests({ url: `/user/userAddress/auth/findUserAddressList`, method: "get" });
  //获取商品清单
  export const reqShopInfo = () =>
  requests({ url: `/order/auth/trade`, method: "get" });
  //带参提交订单/order/auth/submitOrder?tradeNo={tradeNo}
  export const reqSubmitOrder = (tradeNo,data) =>
  requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,data, method: "post" });
  //获取支付信息
  export const reqPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });
  //查询订单状态
  export const reqPayState = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" });
  //获取个人中心数据
  export const reqMyOrderList = (page,limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: "get" });
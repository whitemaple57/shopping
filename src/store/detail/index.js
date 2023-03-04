import { reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";
//封装游客身份uuid(不可在变)
import {getUUID} from '@/utils/uuid_token';
const state = {
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
};
const actions = {
  //获取产品信息的action
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  //添加产品到购物车
 async addOrUpdateShopCart({commit},{skuId,skuNum}){
   let result = await reqAddOrUpdateShopCart(skuId,skuNum);
    if(result.code == 200){
      return "添加成功"
    }else{
      return Promise.reject(new Error('添加失败'));
    }
  },
};
const getters = {
  //路径导航简化数据
  categoryView(state){
    //当前计算的categoryView属性值至少是一个空对象，否则会报错
  return state.goodInfo.categoryView||{};
  },
  //简化产品信息数据
  skuInfo(state){
    return state.goodInfo.skuInfo||{};
  },
  //产品售卖属性的简化
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList||[];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};

import { reqAddressInfo, reqShopInfo } from "@/api";

const state = {
  address: [],
  orderInfo: {},
};
const mutations = {
  GETADDRESS(state, address) {
      state.address = address;
  },
  GETSHOPINFO(state, orderInfo) {
      state.orderInfo = orderInfo;
  },
};
const actions = {
   //获取用户信息地址
   async getAddress({ commit,}) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
        commit('GETADDRESS', result.data);
        return 'ok'
    } else {
        return Promise.reject(new Error(result.message));
    }
},
//获取商品清单
async getShopInfo({ commit, }) {
    let result = await reqShopInfo();
    if (result.code == 200) {
        commit('GETSHOPINFO', result.data);
        return 'ok';
    } else {
        return Promise.reject(new Error(result.message));
    }
},
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};

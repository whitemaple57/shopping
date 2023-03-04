import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api";
const state = {
  cartList: [],
};
const mutations = {
  GETCARLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  //获取购物车列表
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARLIST", result.data);
    }
  },
  //删除购物车产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //修改购物车产品选中状态
  async changeChecked({}, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject();
    }
  },
  //删除全部勾选产品函数
  deleteAllCart({ state, dispatch }) {
    let arr = [];
    //获取仓库里面购物车的数据
    state.cartList[0].cartInfoList.forEach((item) => {
      //商品的勾选状态是勾选的,发请求一个一个删除
      if (item.isChecked == 1) {
        let ps = dispatch("deleteCartListBySkuId", item.skuId);
        arr.push(ps);
      }
    });
    return Promise.all(arr);
  },
  //修改全部产品状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("changeChecked", { skuId: item.skuId, isChecked });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};

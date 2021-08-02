// 直接更新state的多个方法的对象
import {
    RECEIVE_ADDRESS, RECEIVE_FOODS, RECEIVE_SHOPS, RECEIVE_USER_INFO,
    RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO, INCEREMENT_FOOD_COUNT,
    DECEREMENT_FOOD_COUNT,RESET_USER_INFO,RESET_CART_FOODS,RECEIVE_SEARCH_SHOPS,
} from './mutation-types'

export default {
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },
    [RECEIVE_FOODS](state, { foods }) {
        state.foods = foods
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    },
    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },
    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },
    [INCEREMENT_FOOD_COUNT](state, { food }) {
        if (!food.count) {
            food.count = 1//vue2这样是没有数据绑定的，但是vue3可以可能是改掉了
            // Vue.set(对象，属性名，属性值) vue3没有这玩意了
            //food加入购物车
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    [DECEREMENT_FOOD_COUNT](state, { food }) {
        if (food.count) {
            food.count--
            if (food.count === 0) {
                state.cartFoods.splice(state.cartFoods.indexOf(food),1)
            }
        }
    },
    [RESET_USER_INFO](state) {
        state.userInfo = {}
    },
    [RESET_CART_FOODS](state) {
        state.cartFoods.forEach(food => {
            food.count = 0
        })
        state.cartFoods = []
    },
    [RECEIVE_SEARCH_SHOPS](state, { searchShops }) {
      state.searchShops = searchShops  
    },
}
// 通过mutations间接更新state的多个方法的对象    
import {
    RECEIVE_ADDRESS, RECEIVE_FOODS, RECEIVE_SHOPS,
    RECEIVE_USER_INFO, RECEIVE_GOODS, RECEIVE_RATINGS,
    RECEIVE_INFO, INCEREMENT_FOOD_COUNT, DECEREMENT_FOOD_COUNT,
    RESET_USER_INFO,RESET_CART_FOODS,RECEIVE_SEARCH_SHOPS,
} from './mutation-types'
import {
    reqAddress, reqFoodTypes, reqShops, reqUserInfo,
    reqShopGoods, reqShopRatings, reqShopInfo, reqLoginOut,
    reqSearchShops,
} from '../api/index'

export default {
    async getAddress({ commit,state }) {
        const geohash = state.latitude + "," + state.longitude
        const result = await reqAddress(geohash)
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS, {address})
        }
    },
    async getFoods({ commit }) {
        const result = await reqFoodTypes()
        if (result.code === 0) {
            const foods = result.data
            commit(RECEIVE_FOODS, {foods})
        }
    },
    async getShops({ commit, state }) {
        const { longitude,latitude } = state
        const result = await reqShops(longitude,latitude)
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, {shops})
        }
    },

    recordUserInfo({ commit }, userInfo ) {
        commit(RECEIVE_USER_INFO, {userInfo})
    },
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 0) {
            const userInfo = result.data
            commit(RECEIVE_USER_INFO, {userInfo})
        }
    },
    async getShopGoods({ commit }, callback) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
            //如果组件接收了回调后表示数据成功更新,通过回调通知组件
            callback && callback()
        }
    },
    async getShopRatings({ commit }, callback) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })
            //如果组件接收了回调后表示数据成功更新,通过回调通知组件
            callback && callback()
        }
    },
    async getShopInfo({ commit }, callback) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            // info.sorce = 3.5
            commit(RECEIVE_INFO, { info })
            //如果组件接收了回调后表示数据成功更新,通过回调通知组件
            callback && callback()
        }
    },
    updateFoodCount({ commit }, { isAdd, food }) {
        if (isAdd) {
            commit(INCEREMENT_FOOD_COUNT, { food })
        } else {
            commit(DECEREMENT_FOOD_COUNT, { food })
        }
    },
    //登出
    async loginOut({ commit }) {
        const result = await reqLoginOut()
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }
    },
    //清空购物车
    clearCart({ commit }) {
        commit(RESET_CART_FOODS)
    },
    async getSearchShops({ commit,state }, keyword) {
        const geohash = state.latitude + "," + state.longitude
        const result = await reqSearchShops(geohash,keyword)
        if (result.code === 0) {
            const searchShops = result.data
            commit(RECEIVE_SEARCH_SHOPS, { searchShops })
        }
    }
}
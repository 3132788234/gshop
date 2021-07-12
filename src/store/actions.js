// 通过mutations间接更新state的多个方法的对象    
import { RECEIVE_ADDRESS, RECEIVE_FOODS, RECEIVE_SHOPS } from './mutation-types'
import { reqAddress,reqFoodTypes,reqShops } from '../api/index'

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
    async getShops({ commit,state }) {
        const result = await reqShops(state.longitude,state.latitude)
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, {shops})
        }
    }
}
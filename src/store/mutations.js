// 直接更新state的多个方法的对象
import { RECEIVE_ADDRESS,RECEIVE_FOODS,RECEIVE_SHOPS } from './mutation-types'

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
}
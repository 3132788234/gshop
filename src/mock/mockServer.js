import Mock from 'mockjs'

import data from './data.json'

//返回商品数据
Mock.mock('/goods', {code : 0,data: data.goods})
//返回评论
Mock.mock('/ratings', {code : 0,data: data.ratings})
//返回商家数据
Mock.mock('/info', { code: 0, data: data.info })

//不需要向外暴露任何数据，只需要保证能执行一次
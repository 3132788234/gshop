<template>
   <!--首页外卖-->
    <div class="on">
      <section class="msite">
        <HeaderTop :title="address.name">
          <template  v-slot:left>
            <router-link class="header_search" to="/search">
              <i class="iconfont icon-search"></i>
            </router-link>
          </template>
          <template  v-slot:right>
            <router-link class="header_login" :to="userInfo._id?'/userInfo':'/login'">
              <span class="header_login_text" v-if="!userInfo._id">登录/注册</span>
              <span class="header_login_text" v-else>
                <i class="iconfont icon-person"></i>
              </span>
            </router-link>
          </template>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="foods.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(foods,index) in foodsArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(food,index) in foods" :key="index">
                  <div class="food_container">
                    <!-- <img src="./images/nav/1.jpg"> -->
                    <img :src="baseImgUrl+food.image_url">
                  </div>
                  <span>{{food.title}}</span>
                </a>
              </div> 
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <ShopList/>
      </section>
    </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
import Swiper from 'swiper'
import SwiperCore, { Navigation, Pagination } from 'swiper/core'
import 'swiper/swiper-bundle.min.css'

import {mapState} from 'vuex'


export default {
  setup(){
    return{ 
      baseImgUrl: "https://fuss10.elemecdn.com",
    }
  },
  components:{
    HeaderTop,
    ShopList
  },
  mounted(){
    this.$store.dispatch("getFoods")
    this.$store.dispatch("getShops")
  },
  watch:{
    foods(){
      this.$nextTick(()=>{//一旦界面完成更新立刻调用
        SwiperCore.use([Navigation, Pagination])
        new Swiper(".swiper-container",{
          // loop: true,
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
    }
  },
  computed:{
    ...mapState(["address","foods","userInfo"]),
    foodsArr(){
      const {foods} = this
      const arr = []
      let minArr = []
      foods.forEach(food=>{
        minArr.push(food)
        if(minArr.length === 8){
          arr.push(minArr)
          minArr = []
        }
      })
      if(minArr.length !== 0){
        arr.push(minArr)
      }
      return arr
      // const {foods} = this
      //   // 准备空的2维数组
      //   const arr = []
      //   // 准备一个小数组(最大长度为8)
      //   let minArr = []
      //   // 遍历categorys
      //   foods.forEach(c => {
      //     // 如果当前小数组已经满了, 创建一个新的
      //     if(minArr.length===8) {
      //       minArr = []
      //     }
      //     // 如果minArr是空的, 将小数组保存到大数组中
      //     if(minArr.length===0) {
      //       arr.push(minArr)
      //     }
      //     // 将当前分类保存到小数组中
      //     minArr.push(c)
      //   })

      //   return arr
    }
  },
}
</script>

<style lang="less">
@import '../../common/less/mixins.less';

.msite{
    width: 100%;
    .msite_nav{
        .bottom-border-1px(#e4e4e4);
        margin-top: 45px;
        height: 200px;
        background: #fff;
        .swiper-container{
            width: 100%;
            height: 100%;
            .swiper-wrapper{
                width: 100%;
                height: 100%;
                .swiper-slide{
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    .link_to_food{
                        width: 25%;
                        .food_container{
                            display: block;
                            width: 100%;
                            text-align: center;
                            padding-bottom: 10px;
                            font-size: 0;
                            img{
                                display: inline-block;
                                width: 50px;
                                height: 50px;
                            }
                        }
                    }
                    span{
                        display: block;
                        width: 100%;
                        text-align: center;
                        font-size: 13px;
                        color: #666;
                    }
                }
            }
            .swiper-pagination{
                >span.swiper-pagination-bullet-active{
                    background: #02a774;
                }
            }
        }
    }
}
</style>

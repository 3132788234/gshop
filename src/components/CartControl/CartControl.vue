<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="iconfont icon-remove" v-show="food.count" 
                @click.stop="updateFoodCount(false)"></div>
        </transition>
        <div class="cart-count" v-show="food.count">{{food.count}}</div>
        <div class="iconfont icon-Add" @click.stop="updateFoodCount(true)"></div>
    </div>
</template>

<script>
export default {
    props:{
        food: Object,
    },
    methods:{
        updateFoodCount(isAdd){
            this.$store.dispatch("updateFoodCount", {isAdd,food :this.food})
        },
    }
}
</script>

<style lang="less">
@import '../../common/less/mixins.less';

.cartcontrol{
    font-size: 0;
    .cart-decrease{
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
    }
    .icon-remove{
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: green;
        &.move-enter-active,&.move-leave-active{
            transition: all .5s;
        }
        &.move-enter-from,&.move-leave-to{
            opacity: 0;
            transform: translateX(15px) rotate(180deg);
        }
    }
    .cart-count{
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 19px;
        color: rgb(147, 153, 159);
    }
    .icon-Add{
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: green;
    }
}
</style>
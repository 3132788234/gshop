<template>
  <div>
    <router-view></router-view>
    <FooterGuide :show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
// import {reqFoodTypes} from './api'
export default {
  components:{
    FooterGuide
  },
  // async mounted(){
  //   const result = await reqFoodTypes()
  //   console.log(result)
  // },
}
</script>

<style>

</style>

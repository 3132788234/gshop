<template>
  <div>
    <router-view></router-view>
    <FooterGuide :show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'


export default {
  components:{
    FooterGuide
  },
  mounted(){
    this.$store.dispatch("getAddress")
    this.$store.dispatch("getUserInfo")
  },
}
</script>

<style>

</style>

<template>
  <!-- <div>Login</div> -->
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on: loginType}" @click="loginType=true">短信登录</a>
            <a href="javascript:;" :class="{on: !loginType}" @click="loginType=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on: loginType}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}" @click.prevent="sendCode">
                  {{computedTime>0?`已发送(${computedTime}秒)`:"获取验证码"}}
                </button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on: !loginType}">
              <section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="password" maxlength="8" placeholder="密码" v-if="showPassword" v-model="password">
                  <input type="text" maxlength="8" placeholder="密码" v-else v-model="password">
                  <div class="switch_button" :class="showPassword?'on':'off'" @click="showPassword = !showPassword">
                    <div class="switch_circle" :class="{right:showPassword}"></div>
                    <span class="switch_text">{{showPassword?"...":"eye"}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" 
                    alt="captcha" @click="getCaptcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-previewleft"></i>
        </a>
      </div>
      <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"/>
    </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import { reqLoginCode,reqLoginPhone,reqLoginPassword } from '../../api'

export default {
  data(){
    return{
      loginType: true,//true表示短信登陆，false表示密码登录
      phone: "",
      code: "",//手机验证码
      computedTime: 0,
      name: "",//用户名
      password: "",//密码
      showPassword: true,//是否显示密码
      captcha: "",//图形验证码
      alertText: "",//错误提示信息
      showAlert: false,//是否显示错误信息
    }
  },
  computed:{
    rightPhone(){
      return /^1[3456789]\d{9}$/.test(this.phone)
    }
  },
  methods:{
    async sendCode(){
      //如果当前没有计时
      if(!this.computedTime){
        //启动倒计时
        this.computedTime = 30
        this.intervalId = setInterval(()=>{
          this.computedTime--
          if(this.computedTime === 0)
            clearInterval(this.intervalId)
        },1000)
        //发送请求
        const result = await reqLoginCode(this.phone)
        if(result.code === 1){
          this.isShowAlert(result.msg)
          //停止计时
          if(this.computedTime){
            this.computedTime = 0
            clearInterval(this.intervalId)
          }
        }
      }
    },
    async login(){
      let result
      //区别登陆方式
      if(this.loginType){//短信登陆
        const{phone,code} = this
        if(!this.rightPhone){
          this.isShowAlert("手机号错误")
          return
        }else if(!(/^\d{6}$/.test(code))){
          this.isShowAlert("验证码错误")
          return
        }
        //发送请求短信登陆
        result = await reqLoginPhone(phone,code)
      }else{//密码登录
        const{name,password,captcha} = this
        if(!name){
          this.isShowAlert("请输入正确的用户名")
          return
        }else if(!password){
          this.isShowAlert("请输入正确的密码")
          return
        }else if(!captcha){
          this.isShowAlert("验证码错误")
          return
        }
        //发送请求密码登陆
        result = await reqLoginPassword(name,password,captcha)
      }
      if(result.code === 0){
        const user = result.data
        //用户信息保存到vuex的state
        this.$store.dispatch("recordUserInfo",user)
        //页面跳转
        this.$router.replace("/profile")
      }else{
        this.getCaptcha()
        this.isShowAlert(result.msg)
      }
    },
    closeTip(){
      this.showAlert=false
      this.alertText=""
    },
    getCaptcha(){
      this.$refs.captcha.src = "http://localhost:4000/captcha?time="+Date.now()
    },
    isShowAlert(data){
      this.showAlert=true
      this.alertText=data
    }
  },
  components:{
    AlertTip,
  },
}
</script>

<style lang="less">
    .loginContainer{
      width: 100%;
      height: 100%;
      background: #fff;
      .loginInner{
        padding-top: 60px;
        width: 80%;
        margin: 0 auto;
        .login_header{
          .login_logo{
            font-size: 40px;
            font-weight: bold;
            color: #02a774;
            text-align: center;
          }
          .login_header_title{
            padding-top: 40px;
            text-align: center;
            >a{
              color: #333;
              font-size: 14px;
              padding-bottom: 4px;
              &:first-child{
                margin-right: 40px;
              }
              &.on{
                color: #02a774;
                font-weight: 700;
                border-bottom: 2px solid #02a774;
              }
            }
          }
        }
        .login_content{
          >form{
            >div{
              display: none;
              &.on{
                display: block;
              }
              input{
                width: 100%;
                height: 100%;
                padding-left: 10px;
                box-sizing: border-box;
                border: 1px solid #ddd;
                border-radius: 4px;
                outline: 0;
                font: 400 14px Arial;
                &:focus{
                  border: 1px solid #02a774;
                }
              }
              .login_message{
                position: relative;
                margin-top: 16px;
                height: 48px;
                font-size: 14px;
                background: #fff;
                .get_verification{
                  position: absolute;
                  top: 50%;
                  right: 10px;
                  transform: translateY(-50%);
                  border: 0;
                  color: #ccc;
                  font-size: 14px;
                  background: transparent;
                  &.right_phone{
                    color: #333;
                  }
                }
              }
              .login_verification{
                position: relative;
                margin-top: 16px;
                height: 48px;
                font-size: 14px;
                background: #fff;
                .switch_button{
                  font-size: 12px;
                  border: 1px solid #ddd;
                  border-radius: 8px;
                  transition: background-color .3s,border-color .3s;
                  padding: 0 6px;
                  width: 30px;
                  height: 16px;
                  line-height: 16px;
                  color: #fff;
                  position: absolute;
                  top: 50%;
                  right: 10px;
                  transform: translateY(-50%);
                  &.off{
                    background: #fff;
                    .switch_text{
                      float: right;
                      color: #ddd;
                    }
                  }
                  &.on{
                    background: #02a774;
                  }
                  >.switch_circle{
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    width: 16px;
                    height: 16px;
                    border: 1px solid #ddd;
                    border-radius: 50%;
                    background: #fff;
                    box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
                    transition: transform .3s;
                    &.right{
                      transform: translateX(27px);
                    }
                  }
                }
              }
              .login_hint{
                margin-top: 12px;
                color: #999;
                font-size: 14px;
                line-height: 20px;
                >a{
                  color: #02a774;
                }
              }
            }
            .login_submit{
              display: block;
              width: 100%;
              height: 42px;
              margin-top: 30px;
              border-radius: 4px;
              background: #4cd96f;
              color: #fff;
              text-align: center;
              font-size: 16px;
              line-height: 42px;
              border: 0;
            }
          }
          .about_us{
            display: block;
            font-size: 12px;
            margin-top: 20px;
            text-align: center;
            color: #999;
          }
        }
        .go_back{
          position: absolute;
          top: 5px;
          left: 5px;
          width: 30px;
          height: 30px;
          >.iconfont{
            font-size: 20px;
            color: #999;
          }
        }
      }
    }
</style>
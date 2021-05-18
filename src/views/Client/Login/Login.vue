<template>
   <div class="app-login-section">
    <div class="app-login-col-1">
      <div class="app-login-bg-cover">
        <div class="app-login-logo"><img src="../../../assets/images/logo-colored.svg" loading="lazy" width="120" alt="" class="app-logo-img"></div>
      </div>
    </div>
    <div class="app-login-col-2">
      <h2 class="login-header">Welcome Back!</h2>
      <div class="login-sub">Kindly fill in your credentials to login into your account.</div>
      <div >
        <form >
          <div class="app-login-form-group"><label for="Email-address" class="login-label">Account Number</label><input type="number" class="app-login-text-field w-input"  placeholder="012929292" required=""></div>
          <div class="app-login-form-group"><label for="password" class="login-label">Hardware Token</label><input type="password" class="app-login-text-field w-input" placeholder="xxxxxxxxxxxxx" required=""></div>
        </form>
      </div>
      <button @click="attemptLogin" class="app-login-button">Login into Account</button>
      <div class="app-login-divider"></div>
      <div class="app-login-notice">
        <div class="app-login-notice-col-1"></div>
        <div class="app-login-notice-col-2">Experiencing any problem with loging into your account ? Kindly contact the super admin to help resolve your issues.</div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../../router";

export default {
  methods:{
    data:function (){
      return {
        errorInfo : String
      }
    },
    attemptLogin:function (){
        router.push("overview")
    }
  }
}
</script>

<style>

</style>
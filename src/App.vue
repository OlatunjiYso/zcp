<template>
 <div class="app">
  <router-view />
</div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{

    }
  },
  created(){
    axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        if(localStorage.getItem(token-mfb)){
           // if you ever get an unauthorized, logout the user
        this.$store.dispatch('Logout')
        return router.push('/client/login')
      // you can also redirect to /login if needed !
        }
        else if(localStorage.getItem(token)){
                 // if you ever get an unauthorized, logout the user
        this.$store.dispatch('Logout')
        return router.push('/admin/login')
        }
     
      }
      throw err;
    });
  });
  }
}
</script>

<style>
@import "assets/css/global.css";
@import "assets/css/normalize.css";
@import "assets/css/paysure-core.webflow.css";
@import "assets/css/webflow.css";

.app {
    font-family: 'Nunito Sans', sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
}
</style>

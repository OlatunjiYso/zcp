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
    this.checkExpiration()
  },
  methods: {
    checkExpiration (){ 
    //check if past expiration date
        var values = localStorage.getItem('et');
    //check "my hour" index here
    if (values < new Date()) {
      localStorage.removeItem("et")
       localStorage.removeItem("user-mfb") 
       localStorage.removeItem("token-mfb")
       localStorage.removeItem("user")
       localStorage.removeItem("token")
        //  localStorage.getItem("et") ? localStorage.removeItem("et") : null
        //   localStorage.getItem("user-mfb") ? localStorage.removeItem("user-mfb") : null
        //    localStorage.getItem("token-mfb") ? localStorage.removeItem("token-mfb") : null
        //     localStorage.getItem("user") ? localStorage.removeItem("user") : null
        //      localStorage.getItem("token") ? localStorage.removeItem("token") : null

    }
}
  },
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

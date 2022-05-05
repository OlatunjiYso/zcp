<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      logoutTimer: null,
    };
  },
  mounted() {
    this.events.forEach(function (event) {
      window.addEventListener(event, this.resetTimer);
    }, this);

    this.setTimers();
    this.checkExpiration();
  },
  methods: {
    setTimers() {
      if (process.env.VUE_APP_ENV_VARIABLE === "Development") {
        this.logoutTimer = setTimeout(this.logoutUser, 60 * 60 * 1000);
      } else {
        this.logoutTimer = setTimeout(this.logoutUser, 5 * 60 * 1000);
      }
    },

    logoutUser() {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("et");
        window.location = "/admin/login";
      } else if (localStorage.getItem("token-mfb")) {
        localStorage.removeItem("user-mfb");
        localStorage.removeItem("token-mfb");
        localStorage.removeItem("et");
        window.location = "/client/login";
      } else {
        return;
      }
    },

    resetTimer() {
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },

    checkExpiration() {
      //check if past expiration date
      var values = localStorage.getItem("et");
      const expTime = new Date(values);
      const today = new Date();
      //check "my hour" index here

      if (expTime < today) {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("et");
          window.location = "/admin/login";
        } else if (localStorage.getItem("token-mfb")) {
          localStorage.removeItem("user-mfb");
          localStorage.removeItem("token-mfb");
          localStorage.removeItem("et");
          window.location = "/client/login";
        } else {
          return;
        }
      } else {
        return;
      }
    },
  },
};
</script>

<style>
@import "assets/css/global.css";
@import "assets/css/normalize.css";
@import "assets/css/paysure-core.webflow.css";
@import "assets/css/webflow.css";

.app {
  font-family: "Nunito Sans", sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
}
</style>

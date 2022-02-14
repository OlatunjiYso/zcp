<template>
  <div class="app-admin-section">
    <div class="app-admin-col-1">
      <Leftbar />
    </div>
    <div class="app-admin-col-2">
      <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div @click="previousPage" class="settings-icon"></div>
          <div
            class="admin-top-barlinks"
          >
            User
          </div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{ getDate }}</div>
        </div>
      </div>
      <div>
        <AllAccountHolders />
      </div>
    </div>
  </div>
</template>


<script>
import Global from "../../../views/global.js";
import Leftbar from "../../../components/Client/leftbar/leftbar";
import Rightbar from "../../../components/Client/rightbar/rightbar";
import AllAccountHolders from "./All.vue";
export default {
  name: "AccountHoldersIndex",
  components: {
    Leftbar,
    Rightbar,
    AllAccountHolders,
  },
  mixins: [Global],
  data() {
    return {
      activeClass: "admin-active-top-link",
    };
  },
  methods: {
  }
};
</script>
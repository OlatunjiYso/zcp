<template>
  <div class="left-bar-menu">
    <div class="app-admin-brand"></div>
    <router-link to="/client/overview">
      <div class="admin-col-link-div" @click="changeNav(1)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentNav == 1 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentNav == 1 ? activeNav : '']"
        >
          Dashboard
        </div>
      </div>
    </router-link>
    <router-link
      to="/client/activity-requests"
      v-show="checkPerm('Activity_Requests')"
    >
      <div class="admin-col-link-div" @click="changeNav(2)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentNav == 2 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentNav == 2 ? activeNav : '']"
        >
          Activity Requests
        </div>
      </div>
    </router-link>
    <router-link to="/client/activities" v-show="checkPerm('Make_Requests')">
      <div class="admin-col-link-div" @click="changeNav(3)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentNav == 3 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentNav == 3 ? activeNav : '']"
        >
          Activities
        </div>
      </div>
    </router-link>
    <router-link to="/client/card-status" v-show="checkPerm('Card_Status')">
      <div class="admin-col-link-div" @click="changeNav(4)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentNav == 4 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentNav == 4 ? activeNav : '']"
        >
          Card Status
        </div>
      </div>
    </router-link>
    <router-link to="/client/audit" v-show="checkPerm('Mfb_Audit_Trail')">
      <div class="admin-col-link-div" @click="changeNav(5)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentNav == 5 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentNav == 5 ? activeNav : '']"
        >
          Audit
        </div>
      </div>
    </router-link>
    <router-link
      to="/client/user-management"
      v-show="checkPerm('Mfb_User_Management')"
    >
      <div class="admin-col-link-div" @click="changeNav(6)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentNav == 6 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentNav == 6 ? activeNav : '']"
        >
          User<br />Management
        </div>
      </div>
    </router-link>

    <div @click="Logout" style="cursor: pointer" class="admin-col-logout">
      <span class="text-span-3"></span> Logout
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import global from "../../../views/global";
export default {
  mixins: [global],
  data() {
    return {
      activeNav: "active-link",
    };
  },
  computed: {
    ...mapGetters(["getCurrentNav"]),
  },
  methods: {
    changeNav(nav) {
      this.$store.commit("setNav", nav);
      localStorage.setItem("c-CN", nav);
    },
    Logout() {
      localStorage.removeItem("token-mfb");
      localStorage.removeItem("user-mfb");
      this.$router.push("/client/login");
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.left-bar-menu {
  max-height: 80%;
  overflow: scroll;
}
</style>
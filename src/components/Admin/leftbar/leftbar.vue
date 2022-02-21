<template>
  <div class="left-bar-menu">
    <div class="app-admin-brand"></div>
    <router-link to="/admin/overview">
      <div class="admin-col-link-div" @click="changeNav(1)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentAdminNav == 1 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentAdminNav == 1 ? activeNav : '']"
        >
          Dashboard
        </div>
      </div>
    </router-link>
    <router-link
      to="/admin/companies"
      v-show="checkPermAdmin('Admin_Onboarding')"
    >
      <div class="admin-col-link-div" @click="changeNav(2)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentAdminNav == 2 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentAdminNav == 2 ? activeNav : '']"
        >
          Companies
        </div>
      </div>
    </router-link>
    <router-link
      to="/admin/activities"
      v-show="checkPermAdmin('Admin_Onboarding')"
    >
      <div class="admin-col-link-div" @click="changeNav(3)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentAdminNav == 3 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentAdminNav == 3 ? activeNav : '']"
        >
          Activities
        </div>
      </div>
    </router-link>
    <router-link
      to="/admin/activity-requests"
      v-show="checkPermAdmin('Admin_Onboarding')"
    >
      <div class="admin-col-link-div" @click="changeNav(4)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentAdminNav == 4 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentAdminNav == 4 ? activeNav : '']"
        >
          Activity Requests
        </div>
      </div>
    </router-link>
    <router-link
      to="/admin/card-status"
      v-show="checkPermAdmin('Admin_View_CardStatus')"
    >
      <div class="admin-col-link-div" @click="changeNav(5)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentAdminNav == 5 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentAdminNav == 5 ? activeNav : '']"
        >
          Card Status
        </div>
      </div>
    </router-link>
    <router-link to="/admin/audit" v-show="checkPermAdmin('Admin_Audit_Trail')">
      <div class="admin-col-link-div" @click="changeNav(6)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentAdminNav == 6 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentAdminNav == 6 ? activeNav : '']"
        >
          Audit
        </div>
      </div>
    </router-link>
    <router-link
      to="/admin/user-management"
      v-show="checkPermAdmin('Admin_User_Management')"
    >
      <div class="admin-col-link-div" @click="changeNav(7)">
        <div
          class="admin-col-1-links"
          :class="[getCurrentAdminNav == 7 ? activeNav : '']"
        >
          
        </div>
        <div
          class="admin-col-link-text"
          :class="[getCurrentAdminNav == 7 ? activeNav : '']"
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
    ...mapGetters(["getCurrentAdminNav"]),
  },
  methods: {
    changeNav(nav) {
      this.$store.commit("setAdminNav", nav);
      localStorage.setItem("c-AN", nav);
    },
    Logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/admin/login");
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
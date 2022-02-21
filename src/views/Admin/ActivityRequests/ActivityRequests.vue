<template>
  <div class="app-admin-section">
    <div class="app-admin-col-1">
      <Leftbar />
    </div>
    <div class="app-admin-col-2">
      <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div @click="previousPage" class="settings-icon"></div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{ getDate2 }}</div>
        </div>
      </div>
      <div class="content-header">Activity Requests</div>
      <div class="content-sub">
        Here are the activity requests on the system
      </div>
      <div class="summary-flexbox">
        <div
          class="content-slide-box"
          v-for="(item, index) in requests"
          :key="index"
        >
          <div class="activity-info-card">
            <div class="activity-card-icon"></div>
            <div class="activity-card-header">{{ item.name }}</div>
            <router-link :to="item.url">
              <div class="activity-btn">Open</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="app-admin-col-3">
      <Rightbar/>
    </div> -->
  </div>
</template>

<script>
import Global from "../../../views/global";
import Leftbar from "../../../components/Admin/leftbar/leftbar.vue";
import Loading from "../../../components/Loading/Loading.vue";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Loading,
    Leftbar,
  },
  mixins: [Global],
  data() {
    return {
      url: "/admin/go",
      requests: [
        {
          id: 1,
          name: "Card Requests",
          url: "/admin/companies",
        },
        {
          id: 11,
          name: "Card Reissue",
          url: "/admin/companies",
        },
        {
          id: 2,
          name: "Card Cancellation",
          url: "/admin/companies",
        },
        {
          id: 7,
          name: "Dispute Requests",
          url: "/admin/dispute-requests",
        },
        {
          id: 12,
          name: "Card Parameterization",
          url: "/admin/card-param",
        },
        {
          id: 6,
          name: "Pin Reissue",
          url: "/admin/pin-reissue",
        },
        {
          id: 14,
          name: "Card Stock Request",
          url: "/admin/card-stock-request",
        }
      ],
      activities: [],
    };
  },
  computed: {
    ...mapGetters(["getActivities"])
  },
  created() {
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.activity-card-header {
  margin-bottom: 15px;
  color: #262626;
  font-size: 14px;
  font-weight: 700;
}

.activity-btn {
  background: #c00;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  color: white;
  width: 100px;
}
</style>
<template>
  <div class="app-admin-section">
    <div class="app-admin-col-1">
      <Leftbar />
    </div>
    <div class="app-admin-col-2">
      <Loader v-show="globalLoader" />
      <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <router-link to="/client/activity-requests"
            ><div class="settings-icon"></div></router-link
          >
          <!-- <div
            @click="switchView('All')"
            class="admin-top-barlinks"
            :class="[AllView ? activeClass : '']"
          >
            All Stock Requests
          </div> -->
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('pendingApproval')"
            class="admin-top-barlinks"
            :class="[pendingApprovalView ? activeClass : '']"
          >
            Pending Approval
          </div>
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('pendingProcessing')"
            class="admin-top-barlinks"
            :class="[pendingProcessingView ? activeClass : '']"
          >
            Pending Processing
          </div>
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('pendingDispatch')"
            class="admin-top-barlinks"
            :class="[pendingDispatchView ? activeClass : '']"
          >
            Pending Dispatch
          </div>
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('pendingAcknowledge')"
            class="admin-top-barlinks"
            :class="[pendingAcknowledgeView ? activeClass : '']"
          >
            Pending Acknowledgement
          </div>
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('acknowledged')"
            class="admin-top-barlinks"
            :class="[acknowledgedView ? activeClass : '']"
          >
            Acknowledged Requests
          </div>
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('rejected')"
            class="admin-top-barlinks"
            :class="[rejectedView ? activeClass : '']"
          >
            Rejected Requests
          </div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{ getDate }}</div>
        </div>
      </div>
      <div v-show="pendingApprovalView">
        <PendingApproval
          :pendingApprovalLoader="pendingApprovalLoader"
          :requestsPendingApproval="requestsPendingApproval"
          :checkPerm="checkPerm"
        />
      </div>
      <div v-show="pendingProcessingView">
        <PendingProcessing
          :pendingProcessingLoader="pendingProcessingLoader"
          :requestsPendingProcessing="requestsPendingProcessing"
        />
      </div>
      <div v-show="pendingDispatchView">
        <PendingDispatch
          :pendingDispatchLoader="pendingDispatchLoader"
          :requestsPendingDispatch="requestsPendingDispatch"
        />
      </div>
      <div v-show="pendingAcknowledgeView">
        <PendingAcknowledge
          :pendingAcknowledgeLoader="pendingAcknowledgeLoader"
          :requestsPendingAcknowledge="requestsPendingAcknowledge"
          :checkPerm="checkPerm"
        />
      </div>
      <div v-show="acknowledgedView">
        <Acknowledged
          :acknowledgedLoader="acknowledgedLoader"
          :acknowledgedRequests="acknowledgedRequests"
        />
      </div>
      <div v-show="rejectedView">
        <Rejected
          :rejectLoader="rejectLoader"
          :rejectedRequests="rejectedRequests"
          :checkPerm="checkPerm"
        />
      </div>
    </div>
    <!-- <div class="app-admin-col-3">
              <Rightbar />
            </div> -->
  </div>
</template>


<script>
import Leftbar from "../../../components/Client/leftbar/leftbar";
import Rightbar from "../../../components/Client/rightbar/rightbar";
import PendingApproval from "./PendingApproval";
import PendingProcessing from "./PendingProcessing";
import PendingDispatch from "./PendingDispatch";
import PendingAcknowledge from "./PendingAcknowledge";
import Acknowledged from "./Acknowledged";
import Rejected from "./RejectedRequest";
import All from "./All";
import axios from "axios";
import { mapGetters } from "vuex";
import common from "../../../views/common.js";
import Loader from "../../../components/Loader/Loader";
export default {
  mixins: [common],
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    PendingApproval,
    PendingProcessing,
    PendingDispatch,
    PendingAcknowledge,
    Acknowledged,
    Rejected,
    All,
    Loader,
  },
  data() {
    return {
      selectedTab: "",
      AllView: true,
      pendingApprovalView: true,
      pendingProcessingView: false,
      pendingDispatchView: false,
      pendingAcknowledgeView: false,
      acknowledgedView: false,
      rejectedView: false,
      activeClass: "admin-active-top-link",
      requestsPendingApproval: [],
      requestsPendingProcessing: [],
      requestsPendingDispatch: [],
      requestsPendingAcknowledge: [],
      acknowledgedRequests: [],
      rejectedRequests: [],
      AllRequests: [],

      pendingApprovalLoader: false,
      pendingProcessingLoader: false,
      pendingDispatchLoader: false,
      pendingAcknowledgeLoader: false,
      acknowledgedLoader: false,
      rejectLoader: false,
      AllLoader: false,
      globalLoader: false,
    };
  },
  computed: {
    ...mapGetters(["getUrl2", "getCardSetup"]),
    getDate: function () {
      var today = new Date();
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var date =
        today.getDate() +
        ", " +
        months[today.getMonth()] +
        " " +
        today.getFullYear();
      return date;
    },
  },
  async created() {
    this.globalLoader = true;
    await this.$store.dispatch("getCardSetup");
    await this.$store.dispatch("getRoles");
    await this.fetchReason();
    await this.fetchCardType();
    await this.fetchCreditCardType();
    await this.fetchCardSetup();
    this.globalLoader = false;
    //this.fetchAllRequests();
    this.fetchRequestsPendingApproval();
    this.fetchRequestsPendingProcessing();
    this.fetchRequestsPendingDispatch();
    this.fetchRequestsPendingAcknowledge();
    this.fetchAcknowledgedRequests();
    this.fetchRejectedRequests();
  },
  methods: {
    reloadAllRequest() {
      this.fetchAllRequests();
    },
    updateAllRequest(result) {
      this.AllRequests = result;
    },
    decodeCardType(card) {
      if (this.creditCardTypes.length <= 0) return "";
      return this.creditCardTypes.find(
        (entry) => card.typeOfCard === entry.cardProductCode
      )?.description;
    },
    async fetchAllRequests() {
      this.AllLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 + "api/CardStock/all/" + companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard:
            this.creditCardTypes.length > 0
              ? this.creditCardTypes.find((entry) => {
                  return x.typeOfCard === entry.cardProductCode;
                })?.description
              : null,
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.AllRequests = requests;
      this.AllLoader = false;
    },

    async fetchRequestsPendingApproval() {
      this.pendingApprovalLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 + "api/CardStock/pendingApproval/" + companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.requestsPendingApproval = requests;
      this.pendingApprovalLoader = false;
    },

    async fetchRequestsPendingProcessing() {
      this.pendingProcessingLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 + "api/CardStock/pendingProcessing/" + companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.requestsPendingProcessing = requests;
      this.pendingProcessingLoader = false;
    },
    async fetchRequestsPendingDispatch() {
      this.pendingDispatchLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 + "api/CardStock/pendingDispatch/" + companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.requestsPendingDispatch = requests;
      this.pendingDispatchLoader = false;
    },
    async fetchRequestsPendingAcknowledge() {
      this.pendingAcknowledgeLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 +
          "api/CardStock/pendingacknowledgement/" +
          companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.requestsPendingAcknowledge = requests;
      this.pendingAcknowledgeLoader = false;
    },
    async fetchAcknowledgedRequests() {
      this.acknowledgedLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 +
          "api/CardStock/acknowledged/" +
          companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.acknowledgedRequests = requests;
      this.acknowledgedLoader = false;
    },
    async fetchRejectedRequests() {
      this.RejectLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 +
          "api/CardStock/PendingRejectRequest/" +
          companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.rejectedRequests = requests;
      this.rejectLoader = false;
    },
    turnOffViews() {
      this.AllView = false;
      this.pendingApprovalView = false;
      this.pendingProcessingView = false;
      this.pendingDispatchView = false;
      this.pendingAcknowledgeView = false;
      this.acknowledgedView = false;
      this.rejectedView = false;
    },
    switchView(selected) {
      this.turnOffViews();
      if (selected == "All") {
        this.AllView = true;
      } else if (selected == "pendingApproval") {
        this.pendingApprovalView = true;
      } else if (selected == "pendingProcessing") {
        this.pendingProcessingView = true;
      } else if (selected == "pendingDispatch") {
        this.pendingDispatchView = true;
      } else if (selected == "pendingAcknowledge") {
        this.pendingAcknowledgeView = true;
      } else if (selected == "acknowledged") {
        this.acknowledgedView = true;
      } else if (selected == "rejected") {
        this.rejectedView = true;
      }
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
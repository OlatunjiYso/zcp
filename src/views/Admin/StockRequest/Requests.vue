<template>
  <div class="app-admin-section">
    <div class="app-admin-col-1">
      <Leftbar />
    </div>
    <div class="app-admin-col-2">
      <Loader v-show="globalLoader" />
      <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <router-link to="/admin/activity-requests"
            ><div class="settings-icon"></div></router-link
          >
          <div
            @click="switchView('PendingProcessing')"
            class="admin-top-barlinks"
            :class="[PendingProcessingView ? activeClass : '']"
          >
            Pending Processing
          </div>
          <div
            @click="switchView('PendingDispatch')"
            class="admin-top-barlinks"
            :class="[PendingDispatchView ? activeClass : '']"
          >
            Pending Dispatch
          </div>
          <div
            @click="switchView('PendingAcknowledge')"
            class="admin-top-barlinks"
            :class="[PendingAcknowledgeView ? activeClass : '']"
          >
            Pending Acknowledgement
          </div>
          <div
            @click="switchView('Rejected')"
            class="admin-top-barlinks"
            :class="[RejectedView ? activeClass : '']"
          >
            Rejected Requests
          </div>
          <div
            @click="switchView('Acknowledged')"
            class="admin-top-barlinks"
            :class="[AcknowledgedView ? activeClass : '']"
          >
            Acknowledged Stock Requests
          </div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{ getDate }}</div>
        </div>
      </div>
      <div v-show="PendingProcessingView">
        <PendingProcessing
          :pendingProcessingLoader="pendingProcessingLoader"
          :reqPendingProcessing="reqPendingProccessing"
        />
      </div>
      <div v-show="PendingDispatchView">
        <PendingDispatch
          :pendingDispatchLoader="pendingDispatchLoader"
          :reqPendingDispatch="reqPendingDispatch"
        />
      </div>
      <div v-show="PendingAcknowledgeView">
        <PendingAcknowledge
          :AcknowledgeLoader="AcknowledgeLoader"
          :reqPendingAcknowledgement="reqPendingAcknowledgement"
        />
      </div>
      <div v-show="RejectedView">
        <Rejected
          :rejectLoader="rejectLoader"
          :rejectedRequests="rejectedRequests"
        />
      </div>
      <div v-show="AcknowledgedView">
        <AcknowledgedRequest
          :acknowledgedLoader="acknowledgedLoader"
          :acknowledgedRequests="acknowledgedRequests"
        />
      </div>
    </div>
  </div>
</template>


<script>
import Leftbar from "../../../components/Admin/leftbar/leftbar";
import PendingProcessing from "./PendingProcessing";
import PendingDispatch from "./PendingDispatch";
import PendingAcknowledge from "./PendingAcknowledge";
import AcknowledgedRequest from "./AcknowledgedRequest.vue";
import Rejected from "./RejectedRequest";
import axios from "axios";
import { mapGetters } from "vuex";
import common from "../../../views/common.js";
import Loader from "../../../components/Loader/Loader";
export default {
  mixins: [common],
  name: "Home",
  components: {
    Leftbar,
    PendingProcessing,
    PendingDispatch,
    PendingAcknowledge,
    Rejected,
    AcknowledgedRequest,
    Loader,
  },
  data() {
    return {
      selectedTab: "",
      PendingProcessingView: true,
      PendingDispatchView: false,
      PendingAcknowledgeView: false,
      RejectedView: false,
      AcknowledgedView: false,
      activeClass: "admin-active-top-link",
      reqPendingProcessing: [],
      reqPendingDispatch: [],
      reqPendingAcknowledgement: [],
      rejectedRequests: [],
      acknowledgedRequests: [],
      pendingProcessingLoader: false,
      pendingDispatchLoader: false,
      pendingAcknowledgeLoader: false,
      rejectLoader: false,
      acknowledgedLoader: false,
      globalLoader: false,
    };
  },
  computed: {
    ...mapGetters(["getUrl", "getCardSetup"]),
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
    this.fetchReqPendingProcessing();
    this.fetchReqPendingDispatch();
    this.fetchReqPendingAcknowledgement();
    this.fetchRejectedRequests();
    this.fetchAcknowledgedRequests();
  },
  methods: {
    serializeRequests(requests) {
      if (!Array.isArray(requests)) return [];
      return requests.map((req) => {
        return {
          ...req,
          typeOfCard:
            this.creditCardTypes.length > 0
              ? this.creditCardTypes.find((entry) => {
                  return req.typeOfCard === entry.cardProductCode;
                })?.description
              : null,
          create_at: req.create_at?.split("T")[0],
        };
      });
    },
    async fetchReqPendingProcessing() {
      this.pendingProcessingLoader = true;
      const result = await axios.get(
        this.getUrl + "api/CardStock/pendingprocessing"
      );
      const requests = this.serializeRequests(result.data.requests);
      this.reqPendingProccessing = requests;
      this.pendingProcessingLoader = false;
    },
    async fetchReqPendingDispatch() {
      this.pendingDispatchLoader = true;
      const result = await axios.get(
        this.getUrl + "api/cardstock/pendingdispatch"
      );
      const requests = this.serializeRequests(result.data.requests);
      this.reqPendingDispatch = requests;
      this.pendingDispatchLoader = false;
    },
    async fetchReqPendingAcknowledgement() {
      this.pendingAcknowledgeLoader = true;
      const result = await axios.get(
        this.getUrl + "api/cardstock/pendingacknowledgement"
      );
      const requests = this.serializeRequests(result.data.requests);
      this.reqPendingAcknowledgement = requests;
      this.pendingAcknowledgeLoader = false;
    },
    async fetchRejectedRequests() {
      this.rejectLoader = true;
      const result = await axios.get(this.getUrl + "api/cardstock/rejected/");
      const requests = this.serializeRequests(result.data.requests);
      this.rejectedRequests = requests;
      this.rejectLoader = false;
    },
    async fetchAcknowledgedRequests() {
      this.acknowledgedLoader = true;
      const result = await axios.get(
        this.getUrl + "api/cardstock/acknowledged"
      );
      const requests = this.serializeRequests(result.data.requests);
      this.acknowledgedRequests = requests;
      this.acknowledgedLoader = false;
    },

    turnOffViews() {
      this.AcknowledgedView = false;
      this.PendingProcessingView = false;
      this.PendingDispatchView = false;
      this.PendingAcknowledgeView = false;
      this.RejectedView = false;
    },
    switchView(selected) {
      this.turnOffViews();
      if (selected == "Acknowledged") {
        this.AcknowledgedView = true;
      } else if (selected == "PendingProcessing") {
        this.PendingProcessingView = true;
      } else if (selected == "PendingDispatch") {
        this.PendingDispatchView = true;
      } else if (selected == "PendingAcknowledge") {
        this.PendingAcknowledgeView = true;
      } else if (selected == "Rejected") {
        this.RejectedView = true;
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
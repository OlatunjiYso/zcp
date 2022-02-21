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
            @click="switchView('All')"
            class="admin-top-barlinks"
            :class="[AllView ? activeClass : '']"
          >
            All Stock Requests
          </div>
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
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{ getDate }}</div>
        </div>
      </div>
      <div v-show="AllView">
        <All
          :allLoader="allLoader"
          :allRequests="allRequests"
          @updateRequests="updateAllRequest"
          @reloadRequests="reloadAllRequest"
        />
      </div>
      <div v-show="PendingProcessingView">
        <PendingProcessing
          :pendingProcessingLoader="pendingProcessingLoader"
          :reqPendingProcessing="reqPendingProcessing"
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
    </div>
  </div>
</template>


<script>
import Leftbar from '../../../components/Admin/leftbar/leftbar'
import All from "./All";
import PendingProcessing from "./PendingProcessing";
import PendingDispatch from "./PendingDispatch";
import PendingAcknowledge from "./PendingAcknowledge";
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
    All,
    PendingProcessing,
    PendingDispatch,
    PendingAcknowledge,
    Rejected,
    Loader,
  },
  data() {
    return {
      selectedTab: "",
      AllView: true,
      PendingProcessingView: false,
      PendingDispatchView: false,
      PendingAcknowledgeView: false,
      RejectedView: false,
      activeClass: "admin-active-top-link",
      allRequests: [],
      reqPendingProcessing: [],
      reqPendingDispatch: [],
      reqPendingAcknowledgement: [],
      rejectedRequests: [],
      allLoader: false,
      pendingProcessingLoader: false,
      pendingDispatchLoader: false,
      pendingAcknowledgeLoader: false,
      rejectLoader: false,
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
      this.fetchAllRequests();
      this.fetchReqPendingProcessing();
      this.fetchReqPendingDispatch();
      this.fetchReqPendingAcknowledgement();
      this.fetchRejectedRequests();
  },
  methods: {
    reloadAllRequest() {
      this.fetchAllRequests();
    },
    updateAllRequest(result) {
      this.allRequests = result;
    },
    async fetchAllRequests() {
      this.allLoader = true;
      const result = await axios.get(this.getUrl2 + "api/CardStock/all/2");
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
      this.allRequests = requests;
      this.allLoader = false;
    },

    async fetchReqPendingDispatch() {
      this.pendingDispatchLoader = true;
      const result = await axios.get(
        this.getUrl2 + "api/CardStock/pendingApproval/2"
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
          productType:
            this.creditCardTypes.length > 0
              ? this.creditCardTypes.find((entry) => {
                  return x.productType === entry.code;
                })?.description
              : null,
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.reqPendingDispatch = requests;
      this.pendingDispatchLoader = false;
    },
    async fetchReqPendingProcessing() {
      this.pendingProcessingLoader = true;
      const result = await axios.get(
        this.getUrl2 + "api/CardStock/pendingApproval/2"
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
          productType:
            this.creditCardTypes.length > 0
              ? this.creditCardTypes.find((entry) => {
                  return x.productType === entry.code;
                })?.description
              : null,
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.reqPendingProccessing = requests;
      this.pendingProcessingLoader = false;
    },
    async fetchReqPendingAcknowledgement() {
      this.pendingAcknowledgeLoader = true;
      const result = await axios.get(
        this.getUrl2 + "api/CardStock/pendingacknowledgement/2"
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
          productType:
            this.creditCardTypes.length > 0
              ? this.creditCardTypes.find((entry) => {
                  return x.productType === entry.code;
                })?.description
              : null,
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.reqPendingAcknowledgement = requests;
      this.pendingAcknowledgeLoader = false;
    },
    async fetchRejectedRequests() {
      this.rejectLoader = true;
      const result = await axios.get(
        this.getUrl2 + "api/CardStock/PendingRejectRequest/2"
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
          productType:
            this.creditCardTypes.length > 0
              ? this.creditCardTypes.find((entry) => {
                  return x.productType === entry.code;
                })?.description
              : null,
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.rejectedRequests = requests;
      this.rejectLoader = false;
    },

    switchView(selected) {
      if (selected == "All") {
        this.AllView = true;
        this.PendingProcessingView = false;
        this.PendingDispatchView = false;
        this.PendingAcknowledgeView = false;
        this.RejectedView = false;
      } else if (selected == "PendingProcessing") {
        this.AllView = false;
        this.PendingProcessingView = true;
        this.PendingDispatchView = false;
        this.PendingAcknowledgeView = false;
        this.RejectedView = false;
      } else if (selected == "PendingDispatch") {
        this.AllView = false;
        this.PendingProcessingView = false;
        this.PendingDispatchView = true;
        this.PendingAcknowledgeView = false;
        this.RejectedView = false;
      } else if (selected == "PendingAcknowledge") {
        this.AllView = false;
        this.PendingProcessingView = false;
        this.PendingDispatchView = false;
        this.PendingAcknowledgeView = true;
        this.RejectedView = false;
      } else if (selected == "Rejected") {
        this.AllView = false;
        this.PendingProcessingView = false;
        this.PendingDispatchView = false;
        this.PendingAcknowledgeView = false;
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
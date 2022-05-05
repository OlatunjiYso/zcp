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
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('initiatedReq')"
            class="admin-top-barlinks"
            :class="[initiatedReqView ? activeClass : '']"
          >
            Initiated
          </div>
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('approvedReq')"
            class="admin-top-barlinks"
            :class="[approvedReqView ? activeClass : '']"
          >
            Approved
          </div>
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('csdApprovedReq')"
            class="admin-top-barlinks"
            :class="[csdApprovedReqView ? activeClass : '']"
          >
            CSD Approved
          </div>
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('processedReq')"
            class="admin-top-barlinks"
            :class="[processedReqView ? activeClass : '']"
          >
            Processed
          </div>
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('dispatchedReq')"
            class="admin-top-barlinks"
            :class="[dispatchedReqView ? activeClass : '']"
          >
            Dispatched
          </div>
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('acknowledgedReq')"
            class="admin-top-barlinks"
            :class="[acknowledgedReqView ? activeClass : '']"
          >
            Acknowledged
          </div>
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('rejectedReq')"
            class="admin-top-barlinks"
            :class="[rejectedReqView ? activeClass : '']"
          >
            Rejected
          </div>
          <div
            v-show="checkPerm('Activity_Requests')"
            @click="switchView('csdRejectedReq')"
            class="admin-top-barlinks"
            :class="[csdRejectedReqView ? activeClass : '']"
          >
            CSD Rejected
          </div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{ getDate }}</div>
        </div>
      </div>
      <div v-show="initiatedReqView">
        <InitiatedReq
          :initiatedReqLoader="initiatedReqLoader"
          :initiatedReq="initiatedReq"
          :checkPerm="checkPerm"
        />
      </div>
      <div v-show="approvedReqView">
        <ApprovedReq
          :approvedReqLoader="approvedReqLoader"
          :approvedReq="approvedReq"
        />
      </div>
      <div v-show="csdApprovedReqView">
        <CSDApprovedReq
          :csdApprovedReqLoader="csdApprovedReqLoader"
          :csdApprovedReq="csdApprovedReq"
        />
      </div>
      <div v-show="processedReqView">
        <ProcessedReq
          :processedReqLoader="processedReqLoader"
          :processedReq="processedReq"
        />
      </div>
      <div v-show="dispatchedReqView">
        <DispatchedReq
          :dispatchedReqLoader="dispatchedReqLoader"
          :dispatchedReq="dispatchedReq"
          :checkPerm="checkPerm"
        />
      </div>
      <div v-show="acknowledgedReqView">
        <AcknowledgedReq
          :acknowledgedReqLoader="acknowledgedReqLoader"
          :acknowledgedReq="acknowledgedReq"
        />
      </div>
      <div v-show="rejectedReqView">
        <RejectedReq
          :rejectedReqLoader="rejectedReqLoader"
          :rejectedReq="rejectedReq"
          :checkPerm="checkPerm"
        />
      </div>
      <div v-show="csdRejectedReqView">
        <CSDRejectedReq
          :csdRejectedReqLoader="csdRejectedReqLoader"
          :csdRejectedReq="csdRejectedReq"
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
import InitiatedReq from "./InitiatedReq.vue";
import ApprovedReq from "./ApprovedReq.vue";
import CSDApprovedReq from "./CSDApproved.vue";
import DispatchedReq from "./DispatchedReq.vue";
import ProcessedReq from "./ProcessedReq.vue";
import AcknowledgedReq from "./AcknowledgedReq";
import RejectedReq from "./RejectedRequest";
import CSDRejectedReq from "./CSDRejected.vue";
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
    InitiatedReq,
    ApprovedReq,
    CSDApprovedReq,
    ProcessedReq,
    DispatchedReq,
    AcknowledgedReq,
    RejectedReq,
    CSDRejectedReq,
    All,
    Loader,
  },
  data() {
    return {
      selectedTab: "",
      AllView: true,
      initiatedReqView: true,
      approvedReqView: false,
      csdApprovedReqView: false,
      processedReqView: false,
      dispatchedReqView: false,
      acknowledgedReqView: false,
      rejectedReqView: false,
      csdRejectedReqView: false,
      activeClass: "admin-active-top-link",

      initiatedReq: [],
      approvedReq: [],
      csdApprovedReq: [],
      processedReq: [],
      dispatchedReq: [],
      acknowledgedReq: [],
      rejectedReq: [],
      csdRejectedReq: [],
      AllRequests: [],

      initiatedReqLoader: false,
      approvedReqLoader: false,
      csdApprovedReqLoader: false,
      processedReqLoader: false,
      dispatchedReqLoader: false,
      acknowledgedReqLoader: false,
      rejectedReqLoader: false,
      csdRejectedReqLoader: false,
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
    this.fetchInitiatedRequests();
    this.fetchApprovedRequests();
    this.fetchCsdApprovedRequests();
    this.fetchProcessedRequests();
    this.fetchDispatchedRequests();
    this.fetchAcknowledgedRequests();
    this.fetchRejectedRequests();
    this.fetchCsdRejectedRequests();
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

    async fetchInitiatedRequests() {
      this.initiatedReqLoader = true;
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
      this.initiatedReq = requests;
      this.initiatedReqLoader = false;
    },

    async fetchApprovedRequests() {
      this.approvedReqLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 + "api/CardStock/mfbApproved/" + companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.approvedReq = requests;
      this.approvedReqLoader = false;
    },
    async fetchCsdApprovedRequests() {
      this.csdApprovedReqLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 +
          "api/CardStock/csdApprovedRequests/" +
          companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.csdApprovedReq = requests;
      this.csdApprovedReqLoader = false;
    },
    async fetchProcessedRequests() {
      this.processedReqLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 +
          "api/CardStock/processed/" +
          companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.processedReq = requests;
      this.processedReqLoader = false;
    },
    async fetchDispatchedRequests() {
      this.dispatchedReqLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 + "api/CardStock/dispatched/" + companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.dispatchedReq = requests;
      this.dispatchedReqLoader = false;
    },
    
    async fetchAcknowledgedRequests() {
      this.acknowledgedReqLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 + "api/CardStock/acknowledged/" + companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.acknowledgedReq = requests;
      this.acknowledgedReqLoader = false;
    },
    async fetchRejectedRequests() {
      this.rejectedReqLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 +
          "api/CardStock/mfbRejected/" +
          companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.rejectedReq = requests;
      this.rejectedReqLoader = false;
    },
    async fetchCsdRejectedRequests() {
      this.csdRejectedReqLoader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const result = await axios.get(
        this.getUrl2 + "api/CardStock/csdRejectedRequest/" + companyId.companyId
      );
      const requests = result.data.map((x) => {
        return {
          ...x,
          typeOfCard: this.decodeCardType(x),
          create_at: x.create_at?.split("T")[0],
        };
      });
      this.csdRejectedReq = requests;
      this.csdRejectedReqLoader = false;
    },
    turnOffViews() {
      this.AllView = false;
      this.initiatedReqView = false;
      this.approvedReqView = false;
      this.csdApprovedReqView = false;
      this.processedReqView = false;
      this.dispatchedReqView = false;
      this.acknowledgedReqView = false;
      this.rejectedReqView = false;
      this.csdRejectedReqView = false;
    },
    switchView(selected) {
      this.turnOffViews();
      if (selected == "All") {
        this.AllView = true;
      } else if (selected == "initiatedReq") {
        this.initiatedReqView = true;
      } else if (selected == "approvedReq") {
        this.approvedReqView = true;
      } else if (selected == "csdApprovedReq") {
        this.csdApprovedReqView = true;
      } else if (selected == "processedReq") {
        this.processedReqView = true;
      }else if (selected == "dispatchedReq") {
        this.dispatchedReqView = true;
      }  else if (selected == "acknowledgedReq") {
        this.acknowledgedReqView = true;
      } else if (selected == "rejectedReq") {
        this.rejectedReqView = true;
      } else if (selected == "csdRejectedReq") {
        this.csdRejectedReqView = true;
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
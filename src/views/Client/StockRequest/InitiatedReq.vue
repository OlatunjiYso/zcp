<template>
  <div>
    <Loader v-show="loader" />
    <Status
      :state="state"
      :message="message"
      :resetState="resetState"
      v-if="status"
    />
    <ViewDetails
      v-show="viewDetails"
      :closeModal="closeModal"
      :viewDetailsData="viewDetailsData"
    />
    <ConfirmationModal
      v-show="showConfirmationModal"
      :closeConfirmationModal="closeConfirmationModal"
      :confirmationModalData="confirmationModalData"
      :closeConfirmationModalToast="closeConfirmationModalToast"
      :approve="approve"
      :decline="decline"
      :testProp="testProp"
      :transientProp="'transient rubbbisddhsh'"
    />
    <div class="content-header">Initiated Card Stock Requests</div>
    <div class="content-sub">Here are the requests that need approval</div>
    <div class="app-table-actions"></div>
    <Loading v-if="initiatedReqLoader" />
    <div v-else>
      <table class="app-table2" v-if="!resultQuery.length <= 0">
        <thead>
          <tr class="app-table2-row">
            <th class="app-table2-header">Id</th>
            <th class="app-table2-header">Date</th>
            <th class="app-table2-header">No of Card</th>
            <th class="app-table2-header">Type of Card</th>
            <th class="app-table2-header">Card Limit</th>
            <th class="app-table2-header"></th>
            <th class="app-table2-header" v-show="checkPerm('Approve_Credit_Card_StockRequest')">
            </th>
            <th class="app-table2-header" v-show="checkPerm('Approve_Credit_Card_StockRequest')">
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(result, index) in resultQuery"
            :key="index"
            class="app-table2-row"
          >
            <td class="app-table2-data">{{ index + 1 }}</td>
            <td class="app-table2-data">{{ result.create_at }}</td>
            <td class="app-table2-data">{{ result.noOfCards }}</td>
            <td class="app-table2-data">{{ result.typeOfCard }}</td>
            <td class="app-table2-data">{{ result.cardLimit }}</td>
            <td class="app-table2-data">
              <div
                @click="openModal(result)"
                style="cursor: pointer; color: red; text-decoration: underline"
              >
                View<span class="table-button-icon"></span>
              </div>
            </td>
            <td class="app-table2-data" v-show="checkPerm('Approve_Credit_Card_StockRequest')">
              <div
                @click="attemptApprove(result)"
                style="cursor: pointer"
                class="table-btn"
              >
                Approve<span class="table-button-icon"></span>
              </div>
            </td>
            <td class="app-table2-data" v-show="checkPerm('Approve_Credit_Card_StockRequest')">
              <div
                @click="attemptDecline(result)"
                style="cursor: pointer; background: #c00"
                class="table-btn"
              >
                Decline<span class="table-button-icon"></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <EmptyData v-else />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import Status from "../../../components/Status/Status2";
import { mapGetters } from "vuex";
import EmptyData from "../../../components/EmptyData/EmptyData";
import Loading from "../../../components/Loading/Loading";
import ViewDetails from "./ViewDetails";
import ConfirmationModal from "./ConfirmationModal.vue";

export default {
  props: ["initiatedReq", "initiatedReqLoader", "checkPerm"],
  components: {
    Loader,
    Status,
    EmptyData,
    Loading,
    ConfirmationModal,
    ViewDetails,
  },
  data() {
    return {
      loading: false,
      loader: false,
      status: false,
      state: null,
      message: null,
      searchQuery: "",
      newReq: [],
      multiAction: false,
      singleAction: true,
      reason: "",
      viewDetails: false,
      viewDetailsData: "",
      showConfirmationModal: false,
      confirmationModalData: {intent:'99', req: {}},
      showConfirmationModalToast: false,
      testProp: {flag: 'true'}
    };
  },
  computed: {
    ...mapGetters(["getUrl2"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.initiatedReq.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.accountNbr.toLowerCase().includes(v));
        });
      } else {
        return this.initiatedReq;
      }
    },
  },

  methods: {
    closeModal() {
      this.viewDetails = false;
    },
    openModal(result) {
      this.viewDetailsData = result;
      this.viewDetails = true;
    },
    closeConfirmationModal() {
      this.showConfirmationModal = false;
    },
    openConfirmationModal() {
      this.showConfirmationModal = true;
    },
    closeConfirmationModalToast() {
      this.showConfirmationModal = false;
    },
    attemptApprove(req) {
      this.confirmationModalData.intent = 'approve';
      this.confirmationModalData.req = req;
      this.openConfirmationModal();
    },
    attemptDecline(req) {
      this.confirmationModalData.intent = 'decline';
       this.confirmationModalData.req = req;
      this.openConfirmationModal();
    },
    async approve(req, reason) {
      const user = JSON.parse(localStorage.getItem("user-mfb"));
      const formData = {
        requestId: req.id,
        companyId: parseInt(user.companyId),
        workflowId: req.workflowId,
        userId: parseInt(user.id),
        reason: reason,
        clientCode: "null",
      };
      try {
        const response = await axios.post(
          this.getUrl2 + "api/CardStock/approveoracknowledge",
          formData
        );
        this.loader = false;
        this.status = true;
        if (response.data.responseCode == "00") {
          this.state = "success";
          this.message = response.data.responseMessage;
        } else {
          this.state = "failed";
          this.message = response.data.responseMessage;
        }
      } catch (error) {
        this.loader = false;
        this.status = true;
        this.state = "failed";
        this.message = "Operation Failed. Please Contact Admin";
      }
    },
    async decline(req, reason) {
      const user = JSON.parse(localStorage.getItem("user-mfb"));
      const formData = {
        requestId: req.id,
        companyId: parseInt(user.companyId),
        workflowId: 0,
        userId: parseInt(user.id),
        reason,
        clientCode: "null",
      };
      try {
        const response = await axios.post(
          this.getUrl2 + "api/CardStock/RejectCardRequest",
          formData
        );
        this.loader = false;
        this.status = true;
        if (response.data == true) {
          this.state = "success";
          this.message = "Request Denied Successfully";
        } else {
          this.state = "failed";
          this.message = "You don't have the permission to decline this request.";
        }
      } catch (error) {
        this.loader = false;
        this.status = true;
        this.state = "failed";
        this.message = "Operation Failed";
      }
    },
    resetState() {
      this.status = false;
      location.reload();
      return false;
    },
  },
};
</script>
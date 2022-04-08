<template>
  <div>
    <LoaderPlus v-show="loader" :infoLine1="infoLine1" :infoLine2="infoLine2" />
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
      :approve="Approve"
      :decline="Decline"
    />
    <div class="content-header">Card Stock Pending Processing</div>
    <div class="content-sub">
      Here are the stock requests that needs to be processed
    </div>
    <div class="app-table-actions">
      <div class="app-table-search">
        <div class="form-block w-form">
          <input
            v-model="searchQuery"
            type="text"
            class="app-input-search w-input"
            placeholder="Account Number"
            id="name"
          />
        </div>
      </div>
    </div>
    <Loading v-if="pendingProcessingLoader" />
    <div v-else>
      <table class="app-table2" v-if="!resultQuery?.length <= 0">
        <thead>
          <tr class="app-table2-row">
            <th class="app-table2-header">Id</th>
            <th class="app-table2-header">Date</th>
            <!-- <th class="app-table2-header">Company</th> -->
            <th class="app-table2-header">No of Cards</th>
            <th class="app-table2-header">Type of Card</th>
            <th class="app-table2-header">Card Limit</th>
            <th class="app-table2-header"></th>
            <th class="app-table2-header"></th>
            <th class="app-table2-header"></th>
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
            <!-- <td class="app-table2-data">{{ 'companyName' }}</td> -->
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
            <td class="app-table2-data">
              <div
                @click="attemptApprove(result)"
                style="cursor: pointer"
                class="table-btn"
              >
                Approve<span class="table-button-icon"></span>
              </div>
            </td>
            <td class="app-table2-data">
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
import LoaderPlus from "../../../components/Loader/LoaderPlus";
import Status from "../../../components/Status/Status2";
import { mapGetters } from "vuex";
import EmptyData from "../../../components/EmptyData/EmptyData";
import Loading from "../../../components/Loading/Loading";
import ViewDetails from "./ViewDetails";
import ConfirmationModal from "./ConfirmationModal.vue";
export default {
  props: ["reqPendingProcessing", "pendingProcessingLoader"],
  components: {
    LoaderPlus,
    Status,
    EmptyData,
    Loading,
    ViewDetails,
    ConfirmationModal,
  },
  data() {
    return {
      loading: false,
      loader: false,
      status: false,
      state: null,
      message: null,
      searchQuery: "",
      newReq: 0,
      multiAction: false,
      singleAction: true,
      reason: "",
      viewDetails: false,
      viewDetailsData: "",
      showConfirmationModal: false,
      confirmationModalData: { intent: "", req: {} },
      showConfirmationModalToast: false,
      infoLine1: "",
      infoLine2: "",
    };
  },
  computed: {
    ...mapGetters(["getUrl", "getCardSetup"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.reqPendingProcessing.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.accountNbr.toLowerCase().includes(v));
        });
      } else {
        return this.reqPendingProcessing;
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
    hideLoader() {
      this.loader = false;
      this.infoLine1 = "";
      this.infoLine2 = "";
    },
    attemptApprove(req) {
      this.confirmationModalData.req = req;
      this.confirmationModalData.intent = "approve";
      this.openConfirmationModal();
    },
    attemptDecline(req) {
      console.log('attemeptdecline, req', req);
      this.confirmationModalData.req = req;
      this.confirmationModalData.intent = "decline";
      this.openConfirmationModal();
    },
    async Approve(result) {
      this.closeConfirmationModal();
      this.loader = true;
      this.infoLine1 = "Kindly wait while we process your cards on PMA"
      this.infoLine2 = "This may take a while . . . . ."
      const formData = {
        companyId: result.companyId,
        requestId: result.id,
        reason: this.reason,
      };
      try {
        const response = await axios.post(
          this.getUrl + "api/cardstock/approval",
          formData
        );
        this.hideLoader();
        this.status = true;
        this.state = "success";
        this.message = response.data.responseMessage;
        this.closeConfirmationModal();
      } catch (error) {
        this.hideLoader();
        this.status = true;
        this.state = "failed";
        this.message = error.response?.data.responseMessage;
        this.closeConfirmationModal();
      }
    },
    async Decline(result) {
      this.closeConfirmationModal();
      this.loader = true;
      this.infoLine1 = "Rejecting request"
      this.infoLine2 = ""
      const formData = {
        companyId: result.companyId,
        requestId: result.id,
        reason: this.reason,
      };
      try {
        const response = await axios.post(
          this.getUrl + "api/cardstock/rejection",
          formData
        );
        this.hideLoader();
        this.status = true;
        this.state = "success";
        this.message = response.data.responseMessage;
        this.closeConfirmationModal();
      } catch (error) {
        this.hideLoader();
        this.status = true;
        this.state = "failed";
        this.message = error.response?.data.responseMessage;
        this.closeConfirmationModal();
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
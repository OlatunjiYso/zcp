<template>
  <div>
    <Loader v-show="loader" />
    <Status
      :state="state"
      :message="message"
      :resetState="resetState"
      v-if="status"
    />
    <ConfirmationModal
      v-show="showConfirmationModal"
      :closeConfirmationModal="closeConfirmationModal"
      :confirmationModalData="confirmationModalData"
      :closeConfirmationModalToast=null
      :approve="acknowledge"
      :decline="()=>{}"
    />
    <div class="content-header">Dispatched Card Stock Requests.</div>
    <div class="content-sub">
      Here are the requests that have been dispatched and needs acknowledgement.
    </div>
    <Loading v-if="dispatchedReqLoader" />
    <div v-else>
      <table class="app-table2" v-if="!resultQuery.length <= 0">
        <thead>
          <tr class="app-table2-row">
            <th class="app-table2-header">Id</th>
            <th class="app-table2-header">Date</th>
            <th class="app-table2-header">No of Card</th>
            <th class="app-table2-header">Type Of Card</th>
            <th class="app-table2-header">Card Limit</th>
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
            <td class="app-table2-data">{{ result.noOfCards }}</td>
            <td class="app-table2-data">{{ result.typeOfCard }}</td>
            <td class="app-table2-data">{{ result.cardLimit }}</td>
            <td class="app-table2-data" v-show="checkPerm('Approve_Credit_Card_StockRequest')">
              <div
                @click="attemptAcknowledgement(result)"
                style="cursor: pointer"
                class="table-btn"
              >
                Acknowledge<span class="table-button-icon"></span>
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
import ConfirmationModal from './ConfirmationModal.vue';
export default {
  props: ["dispatchedReq", "dispatchedReqLoader", "checkPerm"],
  components: {
    Loader,
    Status,
    EmptyData,
    Loading,
    ConfirmationModal
  },
  data() {
    return {
      loader: false,
      status: false,
      state: null,
      message: null,
      searchQuery: "",
      showConfirmationModal: false,
      confirmationModalData: {req: {}, intent: ''}
    };
  },
  computed: {
    ...mapGetters(["getUrl2"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.dispatchedReq.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.accountNbr.toLowerCase().includes(v));
        });
      } else {
        return this.dispatchedReq;
      }
    },
  },
  methods: {
    resetState() {
      this.status = false;
      location.reload();
      return false;
    },
    closeConfirmationModal() {
      this.showConfirmationModal = false;
    },
    openConfirmationModal(intent, req) {
      this.confirmationModalData.req = req;
      this.confirmationModalData.intent = intent;
      this.showConfirmationModal = true;
    },
    attemptAcknowledgement(req) {
      this.openConfirmationModal('acknowledgement', req)
    },
    async acknowledge(req, reason) {
      this.loader = true;
      const user = JSON.parse(localStorage.getItem("user-mfb"));
      const formData = {
        requestId: req.id,
        companyId: parseInt(user.companyId),
        workflowId: 5,
        userId: parseInt(user.id),
      };
      try {
        const response = await axios.post(
          this.getUrl2 + "api/CardStock/approveoracknowledge",
          formData
        );
        if (response.status == 200) {
          this.loader = false;
          this.status = true;
          this.state = "success";
          this.message = "Operation Sucessful";
        } else {
          this.loader = false;
          this.status = true;
          this.state = "failed";
          this.message = response.data.responseMessage;
        }
        this.closeConfirmationModal();
      } catch (error) {
        this.loader = false;
        this.status = true;
        this.state = "failed";
        this.message = "Operation Failed";
        this.closeConfirmationModal();
      }
    },
  },
};
</script>
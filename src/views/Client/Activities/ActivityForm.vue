<template>
  <Loader v-show="loader" />
  <Status
    :state="state"
    :closeModal="closeAddReload"
    :message="message"
    :resetState="resetState"
    v-if="status"
  />
  <div class="app-admin-section">
    <div class="app-admin-col-1">
      <Leftbar />
    </div>
    <div class="app-admin-col-2">
      <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <router-link to="/client/activities"
            ><div class="settings-icon"></div></router-link
          >
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{ getDate }}</div>
        </div>
      </div>
      <CardRequestForm v-if="form == 1" />
      <CardCancellationForm :searchCard="searchCard" v-else-if="form == 10" />
      <TransactionLogsForm v-else-if="form == 12" />
      <PinGenerationForm v-else-if="form == 4" />
      <PinReIssueForm v-else-if="form == 5" />
      <ChargeBackForm v-else-if="form == 6" />
      <CardReactivationForm v-else-if="form == 8" />
      <CardDeactivationForm v-else-if="form == 7" />
      <CardReIssueForm v-else-if="form == 9" />
      <CardParameterizationForm v-else-if="form == 11" />
      <CardStatusForm v-else-if="form == 3" />
      <CardStockRequestForm v-else-if="form == 13" />
      <AccountOpeningForm v-else-if="form == 14" />
      <CardStockRequestForm v-else-if="form == 10002" />
      <AccountOpeningForm v-else-if="form == 10003" />
    </div>
    <!-- <div class="app-admin-col-3">
      <Rightbar />
    </div> -->
  </div>
</template>

<script>
import Leftbar from "../../../components/Client/leftbar/leftbar";
import Rightbar from "../../../components/Client/rightbar/rightbar";
import Loader from "../../../components/Loader/Loader";
import Status from "../../../components/Status/Status2";
import { mapGetters } from "vuex";
import CardRequestForm from "../../../components/ActivityForms/CardRequestForm";
import CardCancellationForm from "../../../components/ActivityForms/CardCancellationForm";
import TransactionLogsForm from "../../../components/ActivityForms/TransactionLogsForm";
import PinGenerationForm from "../../../components/ActivityForms/PinGenerationForm";
import PinReIssueForm from "../../../components/ActivityForms/PinReIssueForm";
import ChargeBackForm from "../../../components/ActivityForms/ChargeBackForm";
import CardReactivationForm from "../../../components/ActivityForms/CardReactivationForm";
import CardDeactivationForm from "../../../components/ActivityForms/CardDeactivationForm";
import CardReIssueForm from "../../../components/ActivityForms/CardReIssueForm";
import CardParameterizationForm from "../../../components/ActivityForms/CardParameterizationForm";
import CardStatusForm from "../../../components/ActivityForms/CardStatusForm";
import CardStockRequestForm from "../../../components/ActivityForms/CardStockRequestForm";
import AccountOpeningForm from "../../../components/ActivityForms/AccountOpeningForm";
import CreditCardIssuance from "../../../components/ActivityForms/CreditCardIssuance";
import Global from "../../global.js";
export default {
  mixins: [Global],
  components: {
    CardRequestForm,
    CardCancellationForm,
    TransactionLogsForm,
    PinGenerationForm,
    PinReIssueForm,
    ChargeBackForm,
    CardReactivationForm,
    CardDeactivationForm,
    CardReIssueForm,
    CardParameterizationForm,
    CardStatusForm,
    CardStockRequestForm,
    AccountOpeningForm,
    Leftbar,
    Rightbar,
    Loader,
    Status,
  },
  created() {
    this.form = this.$route.params.slug;
  },
  computed: {
    ...mapGetters(["getUrl2"]),
  },
  data() {
    return {
      form: 0,
      loader: false,
      status: false,
      state: null,
      message: null,
    };
  },
  methods: {},
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
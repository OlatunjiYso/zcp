<template>
  <div>
    <Loader v-show="loader" />
    <Status
      :state="state"
      :closeModal="closeConfirmationModalToast"
      :message="message"
      :resetState="resetState"
      v-if="status"
    />
    <div class="app-modal-overlay" v-else>
      <div
        class="app-modal-div"
        style="width: 60%; height: 50%; overflow: auto"
      >
        <div class="app-modal-heading">
          <div class="app-modal-header">Confirmation</div>
        </div>
        <div>
          <h6>{{ confirmationMsg }}</h6>
        </div>
        <div>
          <form @submit.prevent="send">
            <div className="form-flex" v-show="intent == 'decline'">
              <div className="form-flex-col">
                <label style="color: #a3a3a3; font-weight: 500; font-size: 13px"
                  >Give reasons for declining</label
                >
                <textarea
                  v-model="reason"
                  type="text"
                  className="app-modal-form-field w-input"
                  placeholder="Reasons"
                />
              </div>
            </div>
            <button
              v-show="error == false"
              type="submit"
              style="margintop: 20px; display: block; cursor: pointer"
              class="app-modal-button"
            >
              Continue
            </button>
          </form>
        </div>
        <div @click="closeConfirmationModal" class="app-modal-close"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../../../components/Loader/Loader";
import Status from "../../../components/Status/Status";
import { mapGetters } from "vuex";
export default {
  props: [
    "closeConfirmationModal",
    "closeConfirmationModalToast",
    "confirmationModalData",
    "approve",
    "decline"
  ],
  components: {
    Loader,
    Status,
  },
  data() {
    return {
      loader: false,
      status: false,
      state: null,
      message: null,
      reason: "",
      error: false,
    };
  },
  computed: {
    ...mapGetters(["getUrl", "getRoles"]),
    mfbRoles: function () {
      return this.getRoles.filter((x) => {
        return x.mfbOrBank == "mfb";
      });
    },
    intent: function () {
      return this.confirmationModalData.intent;
    },
    confirmationMsg: function () {
      const { intent, req } = this.confirmationModalData;
      const { noOfCards, typeOfCard, cardLimit } = req;
      const declineMsg = `Caution: You are about to decline a stock request made by ${"companyName"}, consisting of ${noOfCards} nos of ${
        typeOfCard || ""
      }, each on a Limit of ₦${cardLimit}. Proceed if you are sure`;
      const approveMsg = `Caution: You are about to approve a stock request made by ${"companyName"}, consisting of ${noOfCards} nos of ${
        typeOfCard || ""
      }, each on a Limit of ₦${cardLimit}. Proceed if you are sure`;
      if (intent == "decline") return declineMsg;
      return approveMsg;
    },
  },
  created() {},
  methods: {
    resetState() {
      this.status = false;
    },
     async send() {
      const { req, intent } = this.confirmationModalData;
      const reason = this.reason
      if(intent === 'approve') {
        this.approve(req, reason);
      }
      else{
       this.decline(req, reason);
      }
    },
  },
};
</script>

<style>
</style>
<template>
  <div>
    <Loader v-show="loader" />
    <Status
      :state="state"
      :closeModal="closeUpdateReload"
      :message="message"
      :resetState="resetState"
      v-if="status"
    />
    <div class="app-modal-overlay" v-else>
      <div
        class="app-modal-div"
        style="width: 70%; height: 80%; overflow: auto"
      >
        <div class="app-modal-heading">
          <div class="app-modal-header">Issue Credit Card</div>
        </div>
        <div>
          <form @submit.prevent="issueCard">
            <div className="form-flex">
              <div className="form-flex-col">
                <label style="color: #a3a3a3; font-weight: 500; font-size: 13px"
                  >EmbossedName</label
                >
                <input
                  v-model="form.embossedName"
                  id="embossedName"
                  type="text"
                  className="app-modal-form-field w-input"
                  placeholder=""
                  required
                />
              </div>
              <div className="form-flex-col">
                <label style="color: #a3a3a3; font-weight: 500; font-size: 13px"
                  >Card Client Code</label
                >
                <input
                  v-model="form.cardClientCode"
                  id="cardClientCode"
                  type="text"
                  className="app-modal-form-field w-input"
                  placeholder=""
                  required
                />
              </div>
              <div class="form-flex-col">
                <label class="login-label"
                  >Type of Card<span style="color: red">*</span>
                </label>
                <select
                  required
                  v-model="form.typeOfCard"
                  style="marginbottom: 30px"
                  class="app-select w-select"
                >
                  <option
                    v-for="(item, index) in creditCardTypes"
                    :key="index"
                    :value="item.cardProductCode"
                  >
                    {{ item.description }}
                  </option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              style="margintop: 20px; display: block; cursor: pointer"
              class="app-modal-button"
            >
              Issue Card
            </button>
          </form>
        </div>
        <div @click="closeUpdate" class="app-modal-close"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import Status from "../../../components/Status/Status";
import { mapGetters } from "vuex";
export default {
  props: [
    "closeUpdate",
    "closeUpdateReload",
    "selectedAccount",
    "creditCardTypes",
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
      roles: ["Super Admin", "Admin", "Support"],
      activityArray: [],
      form: {
        cardClientCode: "",
        embossedName: "",
        typeOfCard: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getUrl2", "getRoles"])
  },
  created() {},
  methods: {
    resetState() {
      this.status = false;
    },
    closeToast() {
      this.status = false;
    },
    clearForm() {
      this.form.cardClientCode = "";
      this.form.embossedName = "";
    },
    async issueCard() {
      this.loader = true;
      const companyId = JSON.parse(localStorage.getItem("user-mfb"));
      const {
        accountNo,
        idCardType,
        idCardIssueDate,
        idCardLegalID,
        idCardExpDate,
        lastName,
        gender,
        dateOfBirth,
        address,
        city,
        country,
        accountType,
        title,
        firstName,
        phoneNumber,
        email,
        nationality,
      } = this.selectedAccount;
      const formData = {
        accountNbr: accountNo,
        accountType,
        title,
        documentID: idCardType,
        documentIssueDate: idCardIssueDate,
        expiryDateOfDoc: idCardExpDate,
        legalID: idCardLegalID,
        firstName,
        familyName: lastName,
        genderCode: gender,
        phoneNumber,
        email,
        birthDate: dateOfBirth,
        addressLine1: address,
        addressCity: city,
        addressCountry: country,
        nationality,
        embossedName: this.form.embossedName,
        clientCode: this.form.cardClientCode,
        cardProductCode: this.form.typeOfCard
      };
      try {
        const response = await axios.post(
          this.getUrl2 + "api/CreditCardIssuance",
          formData
        );
        this.loader = false;
        this.status = true;
        this.state = "success";
        this.message = response.data.responseMessage;
        this.clearForm();
      } catch (error) {
        const errMessage = error.response
          ? error.response.data?.responseMessage
          : error.message;
        this.loader = false;
        this.status = true;
        this.state = "failed";
        this.message = errMessage;
        this.clearForm();
      }
    },
  },
};
</script>

<style>
</style>
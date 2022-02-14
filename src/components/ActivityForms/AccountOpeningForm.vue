<template>
  <Loader v-show="loader" />
  <Status
    :state="state"
    :closeModal="closeAddReload"
    :message="message"
    :resetState="resetState"
    v-if="status"
  />
  <!-- <div class="content-header">Account Opening</div> -->
  <div class="app-table-actions">
    <h3>Account Opening</h3>

    <router-link
      style="color: red; text-decoration: none"
      to="/client/account-holders"
      v-show="checkPerm('Card_Status')"
    >
      <!-- <button class="app-form-button"> Account Holders </button> -->
      <h6 style="margin-top: 30px">Account Holders >>></h6>
    </router-link>
  </div>
  <form @submit.prevent="sendRequest">
    <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label"
          >Title<span style="color: red">*</span></label
        >
        <select
          required
          v-model="form.title"
          style="marginbottom: 30px"
          class="app-select w-select"
        >
          <option
            v-for="(result, index) in titles"
            :key="index"
            :value="result.titleCode"
          >
            {{ result.titleName }}
          </option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label"
          >First Name<span style="color: red">*</span></label
        >
        <input
          type="text"
          class="app-text-field w-input"
          required
          placeholder="Type Here"
          v-model="form.firstName"
        />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Middle Name</label>
        <input
          type="text"
          class="app-text-field w-input"
          placeholder="Type Here"
          v-model="form.middleName"
        />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label"
          >Last Name<span style="color: red">*</span></label
        >
        <input
          type="text"
          class="app-text-field w-input"
          required
          placeholder="Type Here"
          v-model="form.lastName"
        />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label"
          >Email Address<span style="color: red">*</span></label
        >
        <input
          type="email"
          class="app-text-field w-input"
          required
          placeholder="Type Here"
          v-model="form.email"
        />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label"
          >Date of Birth<span style="color: red">*</span></label
        >
        <input
          type="date"
          :max="computeMinimunYear"
          class="app-text-field w-input"
          required
          placeholder="Type Here"
          v-model="form.dateOfBirth"
        />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">BVN<span style="color: red">*</span></label>
        <input
          type="text"
          class="app-text-field w-input"
          required
          placeholder="Type Here"
          v-model="form.bvn"
        />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label"
          >Phone Number<span style="color: red">*</span></label
        >
        <input
          type="text"
          class="app-text-field w-input"
          required
          placeholder="Type Here"
          v-model="form.phoneNumber"
        />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label"
          >Gender<span style="color: red">*</span></label
        >
        <select
          required
          v-model="form.gender"
          style="marginbottom: 30px"
          class="app-select w-select"
        >
          <option
            v-for="(item, index) in gender"
            :key="index"
            :value="item.code"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label"
          >Address Line 1<span style="color: red">*</span></label
        >
        <input
          v-model="form.address"
          type="text"
          class="app-text-field w-input"
          required
          placeholder="Type Here"
        />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label"
          >Nationality<span style="color: red">*</span></label
        >
        <input
          v-model="form.nationality"
          type="text"
          class="app-text-field w-input"
          required
          placeholder="Type Here"
        />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label"
          >Country<span style="color: red">*</span></label
        >
        <select
          required
          v-model="form.country"
          style="marginbottom: 30px"
          class="app-select w-select"
        >
          <option
            v-for="(item, index) in countries"
            :key="index"
            :value="item.countryCode"
          >
            {{ item.counrtyName }}
          </option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label"
          >State<span style="color: red">*</span></label
        >
        <select
          required
          v-model="form.state"
          @change="fetchStateCities($event)"
          style="marginbottom: 30px"
          class="app-select w-select"
        >
          <option
            v-for="(result, index) in states"
            :key="index"
            :value="result.code"
          >
            {{ result.name }}
          </option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">City<span style="color: red">*</span></label>
        <select
          required
          v-model="form.city"
          style="marginbottom: 30px"
          class="app-select w-select"
        >
          <option
            v-for="(item, index) in stateCities"
            :key="index"
            :value="item.code"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label"
          >Legal ID Card Number<span style="color: red">*</span></label
        >
        <input
          v-model="form.idCardLegalID"
          type="text"
          class="app-text-field w-input"
          required
          placeholder="Type Here"
        />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label"
          >ID Card Type<span style="color: red">*</span></label
        >
        <select
          required
          v-model="form.idCardType"
          style="marginbottom: 30px"
          class="app-select w-select"
        >
          <option
            v-for="(item, index) in idCardType"
            :key="index"
            :value="item.code"
          >
            {{ item.description }}
          </option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">
          ID Card Issued Date<span style="color: red">*</span></label
        >
        <input
          v-model="form.idCardIssueDate"
          :max="currentDate"
          type="date"
          class="app-text-field w-input"
          required
          placeholder="Type Here"
        />
      </div>
      <div
        class="form-flex-col-3"
        v-show="form.idCardType != '02' && form.idCardType != '04'"
      >
        <label class="login-label"
          >Expiry Date<span style="color: red">*</span></label
        >
        <input
          v-model="form.idCardExpiryDate"
          :min="newSorted"
          type="date"
          class="app-text-field w-input"
          placeholder="Type Here"
        />
      </div>
    </div>
    <br /><br />
    <button type="submit" class="app-form-button">Create Account</button>
  </form>
</template>

<script>
import operationMixen from "../../views/operationMixen.js";
import commonMixen from "../../views/common.js";
import Leftbar from "../Client/leftbar/leftbar";
import Rightbar from "../Client/rightbar/rightbar";
import Loader from "../Loader/Loader";
import Status from "../Status/Status2";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    Leftbar,
    Rightbar,
    Loader,
    Status,
  },
  async created() {
    await this.fetchCountries();
    await this.fetchStates();
    await this.fetchCities();
    await this.fetchTitles();
    await this.fetchCardType();
  },
  computed: {
    ...mapGetters(["getUrl2", "getUrl"]),
    computeMinimunYear() {
      const minYear = new Date();
      minYear.setFullYear(minYear.getFullYear() - 18);
      return minYear.toJSON().split("T")[0];
    },
    currentDate() {
      const currentYear = new Date();
      return currentYear.toJSON().split("T")[0];
    }
  },
  mixins: [commonMixen],
  data() {
    return {
      loader: false,
      status: false,
      state: null,
      message: null,
      form: {
        title: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        bvn: "",
        phoneNumber: "",
        gender: "M",
        idCardType: "",
        idCardIssueDate: "",
        idCardExpiryDate: "",
        idCardLegalID: "",
        address: "",
        city: "",
        country: "566",
        nationality: "Nigerian",
      },
      reason: [],
    };
  },
  methods: {
    clearForm() {
      this.form.title = "";
      this.form.firstName = "";
      this.form.middleName = "";
      this.form.lastName = "";
      this.form.email = "";
      this.form.dateOfBirth = "";
      this.form.bvn = "";
      this.form.phoneNumber = "";
      this.form.gender = "Male";
      this.form.idCardType = "";
      this.form.idCardIssueDate = "";
      this.form.idCardExpiryDate = "";
      this.form.idCardLegalID = "";
      this.form.address = "";
      this.form.city = "";
      this.form.country = "566";
      this.form.nationality = "Nigerian";
    },
    resetState() {
      this.status = false;
    },
    async sendRequest() {
      this.loader = true;
      const user = JSON.parse(localStorage.getItem("user-mfb"));
      const company = await axios.get(
        this.getUrl + "api/companies/" + parseInt(user.companyId)
      );
      const formData = {
        ...this.form,
        userId: parseInt(user.id),
        companyId: parseInt(user.companyId),
        sex: this.form.gender,
        // firstName: this.form.firstName,
        // middleName: this.form.middleName,
        // lastName: this.form.lastName,
        // dateOfBirth: this.form.dateOfBirth,
        // bvn: this.form.bvn,
        // emailAddress: this.form.emailAddress,
        // phoneNumber: this.form.phoneNo,
        // gender: this.form.gender,
        // idCardtype: this.form.idCardType,
        // idCardIssueDate: this.form.idCardIssueDate,
        // idCardExpiryDate: this.form.idCardExpiryDate,
        // idCardLegalID: this.form.idCardLegalID,
        // addressLine1: this.form.addressLine1,
        // addressLine2: this.form.addressLine2,
        // city: this.form.city,
        // country: this.form.country,
        // nationality: this.form.nationality,
      };
      try {
        const response = await axios.post(
          this.getUrl2 + "api/settlementAccount",
          formData
        );
        this.loader = false;
        this.status = true;
        this.state = "success";
        this.message = response.data.responseMessage;
        this.clearForm();
      } catch (error) {
        const errorMsg = error.response.data
          ? error.response.data.description ||
            error.response.data.responseMessage
          : error.message;
        this.loader = false;
        this.status = true;
        this.state = "failed";
        this.message = errorMsg;
      }
    },
  },
};
</script>

<style scoped>
</style>
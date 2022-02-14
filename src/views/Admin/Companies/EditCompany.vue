<template>
  <div>
    <Loader v-show="loader" />
    <Status
      :state="state"
      :closeModal="closeEditReload"
      :message="message"
      :resetState="resetState"
      v-if="status"
    />
    <div class="app-modal-overlay" v-else>
      <div
        class="app-modal-div"
        style="width: 70%; height: 90%; overflow: auto"
      >
        <div class="app-modal-heading">
          <div class="app-modal-header">Update Company</div>
        </div>
        <div>
          <form @submit.prevent="updateCompany">
            <div className="form-flex">
              <div className="form-flex-col">
                <label style="color: #a3a3a3; font-weight: 500; font-size: 13px"
                  >MFB Name</label
                >
                <input
                  :value="editData.name"
                  type="text"
                  className="app-modal-form-field w-input"
                  placeholder="MFB Name"
                  id="name"
                  required
                />
              </div>
              <div className="form-flex-col">
                <label style="color: #a3a3a3; font-weight: 500; font-size: 13px"
                  >Account Number</label
                >
                <input
                  :value="editData.accountNumber"
                  onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                  type="text"
                  className="app-modal-form-field w-input"
                  placeholder="Account Number"
                  id="accountNumber"
                  required
                />
              </div>
              <div className="form-flex-col">
                <label style="color: #a3a3a3; font-weight: 500; font-size: 13px"
                  >Company Code</label
                >
                <input
                  readonly
                  :value="editData.companyCode"
                  type="text"
                  className="app-modal-form-field w-input"
                  placeholder="Company Code"
                  id="companyCode"
                  required
                />
              </div>
              <div className="form-flex-col">
                <label style="color: #a3a3a3; font-weight: 500; font-size: 13px"
                  >Email Address</label
                >
                <input
                  :value="editData.emailAddress"
                  type="email"
                  className="app-modal-form-field w-input"
                  placeholder="Email Address"
                  id="emailAddress"
                  required
                />
              </div>
              <div className="form-flex-col">
                <label style="color: #a3a3a3; font-weight: 500; font-size: 13px"
                  >Phone Number</label
                >
                <input
                  :value="editData.phoneNumber"
                  onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                  type="text"
                  className="app-modal-form-field w-input"
                  placeholder="Phone Number"
                  id="phoneNumber"
                  required
                />
              </div>
              <div className="form-flex-col">
                <label style="color: #a3a3a3; font-weight: 500; font-size: 13px"
                  >Address</label
                >
                <input
                  :value="editData.address"
                  type="text"
                  className="app-modal-form-field w-input"
                  placeholder="Address"
                  id="address"
                  required
                />
              </div>
              <div className="form-flex-col">
                <label style="color: #a3a3a3; font-weight: 500; font-size: 13px"
                  >Branch</label
                >
                <input
                  :value="editData.branch"
                  type="text"
                  className="app-modal-form-field w-input"
                  placeholder="Branch"
                  id="branch"
                  required
                />
              </div>
              <div className="form-flex-col">
                <label style="color: #a3a3a3; font-weight: 500; font-size: 13px"
                  >Card Product</label
                >
                <select
                  @change="savecardSetup($event)"
                  style="marginbottom: 30px"
                  class="app-select w-select"
                >
                  <option disabled selected>Update Card Product</option>
                  <option
                    v-for="(result, index) in cardSetup"
                    :key="index"
                    :value="result.cardProductCode"
                  >
                    {{ result.description }}
                  </option>
                </select>
              </div>
            </div>
            <div class="app-modal-heading">
              <div class="app-modal-header">Assigned Activities</div>
            </div>
            <div className="form-flex">
              <div
                className="form-flex-col-x"
                v-for="(perm, index) in editActivities"
                :key="index"
              >
                <label :for="perm.name"
                  ><input
                    disabled="disabled"
                    checked="checked"
                    style="margin-right: 20px"
                    :id="`C${perm.id}`"
                    type="checkbox"
                    value="test"
                  />{{ perm.name }}</label
                >
              </div>
            </div>
            <br />
            <div class="app-modal-heading">
              <div class="app-modal-header">Update Activities</div>
            </div>
            <label
              ><input
                @click="selectAll"
                style="margin-right: 20px"
                id="select-all2"
                type="checkbox"
              />Select All</label
            >
            <div className="form-flex">
              <div
                className="form-flex-col-x"
                v-for="(perm, index) in getActivities"
                :key="index"
              >
                <label :for="perm.name"
                  ><input
                    @click="addToActivity(perm, index)"
                    style="margin-right: 20px"
                    :id="`E${perm.id}`"
                    type="checkbox"
                    value="test"
                  />{{ perm.name }}</label
                >
              </div>
            </div>
            <button
              type="submit"
              style="margintop: 20px; display: block; cursor: pointer"
              class="app-modal-button"
            >
              Update Company
            </button>
          </form>
        </div>
        <div @click="closeModal" class="app-modal-close"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Loader from "../../../components/Loader/Loader";
import Status from "../../../components/Status/Status";
export default {
  props: [
    "cardData",
    "closeModal",
    "closeEditReload",
    "editData",
    "editActivities",
    "companyCardSetup",
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
      activities: [],
      activityArray: [],
      form: {
        name: "",
        companyCode: "",
        address: "",
        emailAddress: "",
        phoneNumber: "",
        accountNumber: "",
        branch: "",
        productName: null,
        productCode: null,
      },
      cardSetup: [],
    };
  },
  computed: {
    ...mapGetters(["getUrl", "getActivities"]),
  },
  async created() {
    await this.getCardSetup();
    await this.$store.dispatch("getActivities");
  },

  methods: {
    savecardSetup(result) {
      let cardCode = result.target.value;
      const y = this.cardSetup.find((x) => {
        return x.cardProductCode == cardCode;
      });
      this.form.productName = y.description;
      this.form.productCode = y.cardProductCode;
    },
    async getCardSetup() {
      const result = await axios.get(
        this.getUrl + "api/CardProductSetup/FetchCardProductCodeForsetup"
      );
      this.cardSetup = result.data;
    },
    resetState() {
      this.status = false;
    },
    async updateCompany() {
      this.loader = true;
      const user = JSON.parse(localStorage.getItem("user"));
      const formData = {
        id: this.editData.id,
        name: document.getElementById("name").value,
        companyCode: document.getElementById("companyCode").value,
        address: document.getElementById("address").value,
        emailAddress: document.getElementById("emailAddress").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        accountNumber: document.getElementById("accountNumber").value,
        branch: document.getElementById("branch").value,
        userId: parseInt(user.id),
      };

      try {
        const response = await axios.post(
          this.getUrl + "api/companies/update",
          formData
        );
        if (response.status == 200) {
          this.addActivities(response.data.id);
        } else {
          this.loader = false;
          this.status = true;
          this.state = "failed";
          this.message = "Operation Failed";
        }
      } catch (error) {
        console.log(error);
        this.loader = false;
        this.status = true;
        this.state = "failed";
        this.message = "Operation Failed";
      }
    },

    async addActivities(companyId) {
      const user = JSON.parse(localStorage.getItem("user"));
      const response2 = await axios.post(
        this.getUrl + "api/companyactivities/update",
        {
          id: this.editData.id,
          activitiesId: this.activityArray,
          companyId: parseInt(companyId),
          isActive: true,
          userId: parseInt(user.id),
        }
      );

      if (response2.status == 200) {
        this.addProduct(companyId);
      } else {
        this.loader = false;
        this.status = true;
        this.state = "failed";
        this.message = "Operation Failed";
      }
    },
    async addProduct(companyId) {
      const user = JSON.parse(localStorage.getItem("user"));
      const response3 = await axios.post(this.getUrl + "api/CardProductSetup", {
        companyId: parseInt(companyId),
        productName:
          this.form.productName == null
            ? this.companyCardSetup.productName
            : this.form.productName,
        cardProductCode:
          this.form.productCode == null
            ? this.companyCardSetup.cardProductCode
            : this.form.productCode,
        isActive: true,
        userId: parseInt(user.id),
      });

      if (response3.status == 200) {
        this.loader = false;
        this.status = true;
        this.state = "success";
        this.message = "Company was updated successfully";
      } else {
        this.loader = false;
        this.status = true;
        this.state = "failed";
        this.message = "Operation Failed";
      }
    },

    selectAll() {
      var checkbox = document.getElementById("select-all2");

      this.activityArray = [];
      if (checkbox.checked == true) {
        for (var i = 0; i < this.getActivities.length; i++) {
          this.activityArray.push(parseInt(this.getActivities[i].id));
          document.getElementById(
            `E${this.getActivities[i].id}`
          ).checked = true;
        }
      } else {
        this.activityArray = [];
        for (var i = 0; i < this.getActivities.length; i++) {
          document.getElementById(
            `E${this.getActivities[i].id}`
          ).checked = false;
        }
      }
    },

    async addToActivity(activity, index) {
      let Avalue = await parseInt(activity.id);

      var checkbox = document.getElementById(`E${activity.id}`);
      const state = await this.activityArray.some((activity) => {
        return activity == Avalue;
      });

      if (state == false && checkbox.checked == true) {
        this.activityArray.push(Avalue);
      } else {
        const newIndex = this.activityArray.findIndex((result) => {
          return result == Avalue;
        });

        await this.activityArray.splice(newIndex, 1);
      }
    },
  },
};
</script>

<style>
</style>
<template>
  <div>
    <div v-show="UpdateAccountModal">
      <UpdateHolder
        :selectedAccount="selectedAccount"
        :closeUpdate="closeUpdate"
        :closeUpdateReload="closeUpdateReload"
        :creditCardTypes="allowedCreditCardTypes"
      />
    </div>
    <div class="content-header">Account Holders</div>
    <div class="content-sub">Here are the list of account holders</div>
    <div class="app-table-actions">
      <div class="app-table-search">
        <input
          v-model="searchQuery"
          type="text"
          class="app-input-search w-input"
          placeholder="Search"
          id="name"
        />
      </div>
      <!-- <div class="app-table-buttons">
        <div className="table-button filter" style="cursor: pointer">dummy</div>
      </div> -->
    </div>
    <Loading v-if="isFetchingAccountHolders" />
    <div v-else>
      <div v-if="resultQuery.length > 0">
        <table class="app-table2">
          <thead>
            <tr class="app-table2-row">
              <th class="app-table2-header">Id</th>
              <th class="app-table2-header">First Name</th>
              <th class="app-table2-header">Last Name</th>
              <th class="app-table2-header">Account Number</th>
              <th class="app-table2-header">Email Address</th>
              <th class="app-table2-header">Phone Number</th>
              <th class="app-table2-header">Card Client Code</th>
              <th class="app-table2-header"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="app-table2-row"
              v-for="user_item in resultQuery"
              :key="user_item.id"
            >
              <td class="app-table2-data">{{ user_item.id }}</td>
              <td class="app-table2-data">{{ user_item.firstName }}</td>
              <td class="app-table2-data">{{ user_item.lastName }}</td>
              <td class="app-table2-data">{{ user_item.accountNo }}</td>
              <td class="app-table2-data">{{ user_item.email }}</td>
              <td class="app-table2-data">{{ user_item.phoneNumber }}</td>
              <td class="app-table2-data">{{ user_item.cardClientCode }}</td>
              <td class="app-table2-data">
                <div
                  v-show="checkPerm('Mfb_User_Management') && !user_item.cardIssued"
                  class="table-btn"
                  style="cursor: pointer"
                  @click="openUpdate(user_item)"
                >
                  Issue Card<span class="table-button-icon"></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <EmptyData v-else />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Leftbar from "../../../components/Client/leftbar/leftbar";
import Rightbar from "../../../components/Client/rightbar/rightbar";
import { mapGetters } from "vuex";
import EmptyData from "../../../components/EmptyData/EmptyData";
import Loading from "../../../components/Loading/Loading";
import global from "../../../views/global";
import UpdateHolder from "./UpdateHolder";
export default {
  mixins: [global],
  name: "AccountHolders",
  components: {
    Loading,
    Leftbar,
    Rightbar,
    EmptyData,
    UpdateHolder
  },
  mounted() {
    try {
      this.fetchAccountHolders();
    } catch (e) {}
  },
  data() {
    return {
      UpdateAccountModal: false,
      selectedAccount: {},
      isFetchingAccountHolders: false,
      roles: [],
      searchQuery: "",
      accountHolders: [ ],
      creditCardTypes: []
    };
  },
  computed: {
    ...mapGetters(["getAccountHolders"]),
    accountHoldersComputed: function () {
      return this.accountHolders.map((holder) => {
        return {
          ...holder
        };
      });
    },
     allowedCreditCardTypes() {
      let filtered = this.creditCardTypes.filter(
        (card) =>
          !card.description?.includes("Staff") &&
          !card.description?.includes("USD") &&
          !card.description?.includes("ZENEX")
      );
      return filtered;
    },
    resultQuery() {
      if (this.searchQuery) {
        return this.accountHoldersComputed.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.firstName.toLowerCase().includes(v));
        });
      } else {
        return this.accountHoldersComputed;
      }
    },
  },
  created() {
    //  this.$store.dispatch("getAdminUsers");
    this.fetchCreditCardTypes();
  },
  methods: {
     async fetchCreditCardTypes() {
      const response = await axios.get(
        this.getUrl2 + "api/Common/CreditCardType"
      );
      this.creditCardTypes = response.data;
    },
    closeUpdate() {
      this.UpdateAccountModal = false;
    },
    closeUpdateReload() {
      this.UpdateAccountModal = false;
      location.reload();
      return false;
    },
    openUpdate(accDetails) {
      this.selectedAccount = accDetails;
      this.UpdateAccountModal = true;
    },
    fetchAccountHolders: function () {
      this.isFetchingAccountHolders = true;
      const company = JSON.parse(localStorage.getItem("user-mfb"));
      Promise.all([
        this.$store.dispatch("getAccountHolders", company.companyId),
        this.$store.dispatch("fetchRoles")
      ])
        .then((response) => {
          this.accountHolders = response[0].data;
        })
        .catch((error) => {
          alert(`Error : ${error}`);
        })
        .then(() => {
          this.isFetchingAccountHolders = false;
        });
    },
    addUser: function () {},
    editUser: function () {},
    deleteUser: function () {},
  },
};
</script>
<template>
  <div class="app-admin-section">
    <div class="app-admin-col-1">
      <Leftbar />
    </div>
    <div class="app-admin-col-2">
      <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div class="settings-icon" @click="previousPage"></div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{ getDate2 }}</div>
        </div>
      </div>
      <div class="content-header">Companies Report</div>
      <div class="content-sub">Select a Company to view its Report</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
            <input
              v-model="searchQuery"
              type="text"
              class="app-input-search w-input"
              placeholder="Search"
              id="name"
            />
          </div>
        </div>
        <div class="app-table-buttons">
          <!-- <div @click="openCaller" style="cursor:pointer;background:#1b1b1b" className="table-button filter">Setup Caller Id<span className="table-button-icon"></span></div> -->
        </div>
      </div>
      <Loading v-if="getLoading" />
      <div v-else>
        <table class="app-table2" v-if="!resultQuery.length <= 0">
          <thead>
            <tr class="app-table2-row">
              <th class="app-table2-header">S/N</th>
              <th class="app-table2-header">Name</th>
              <th class="app-table2-header">Email Address</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(result, index) in resultQuery"
              :key="index"
              class="app-table2-row"
            >
              <!-- <td class="app-table2-data"><input @click="selectCompany(result)" :id="`SC${result.id}`" type="checkbox" value="test" /></td> -->
              <td class="app-table2-data">{{ index + 1 }}</td>
              <td class="app-table2-data">{{ result.name }}</td>
              <td class="app-table2-data">{{ result.emailAddress }}</td>
              <td class="app-table2-data">
                <router-link :to="`/admin/reporting/company/${result.id}`">
                  <div style="cursor: pointer" class="table-btn">
                    View Report<span class="table-button-icon"></span>
                  </div>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <EmptyData v-else />
      </div>
    </div>
  </div>
</template>

<script>
import Leftbar from "../../../components/Admin/leftbar/leftbar";
import { mapGetters } from "vuex";
import EmptyData from "../../../components/EmptyData/EmptyData";
import Loading from "../../../components/Loading/Loading";
import Global from "../../global.js";
export default {
  name: "Home",
  mixins: [Global],
  components: {
    Leftbar,
    EmptyData,
    Loading,
  },
  data() {
    return {
      activities: [],
      companyCardSetup: "",
      companyData: "",
      isSetup: false,
      searchQuery: "",
      cardData: "",
    };
  },
  computed: {
    ...mapGetters(["getLoading", "getUrl", "getUrl2", "getCompanies"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.getCompanies.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.getCompanies;
      }
    },
  },
  created() {
    this.$store.dispatch("getCompanies");
  },
  methods: {
    selectCompany(result) {
      var checkbox = document.getElementById(`SC${result.id}`);
      if (checkbox.checked == true) {
        console.log("check");
        this.companyData = result;
      } else {
        console.log("uncheck");
        this.companyData = "";
      }
    }
  },
};
</script>
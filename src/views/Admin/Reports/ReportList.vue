<template>
  <div>
    <Loader v-show="loader" />
    <CardReport
      v-show="viewCardReport"
      :closeModal="closeModal"
      :cardReportData="cardReportData"
    />
    <div class="content-header">All Credit Cards Report</div>
    <div class="content-sub">Here are the all the cards issed by Company</div>
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
      <form @submit.prevent="filterArray" className="app-table-select">
        <select
          required
          v-model="form.reportsToShow"
          style="margin-right: 20px; width: 40%"
          class="app-select w-select"
        >
          <option
            v-for="(item, index) in [{ name: 'All', value: 0 }, { name: 'Defaulting', value: 1 }, { name: 'NonDefaulting', value: 2}]"
            :key="index"
            :value="item.value"
          >
            {{ item.name }}
          </option>
        </select>
        <button
          type="submit"
          style="
            margin-right: 20px;
            font-size: 15px;
            cursor: pointer;
            height: 40px;
            background: #1b1b1b;
          "
          className="app-icon table-button filter"
        >
          <span className="table-button-icon"></span>
        </button>
        <button
          @click="reload"
          style="font-size: 15px; cursor: pointer; height: 40px"
          className="app-icon table-button filter"
        >
          <span className="table-button-icon"></span>
        </button>
      </form>
    </div>
    <Loading v-if="loader" />
    <div v-else>
      <table class="app-table2" v-if="!resultQuery.length <= 0">
        <thead>
          <tr class="app-table2-row">
            <th class="app-table2-header">Id</th>
            <th class="app-table2-header">Full Name</th>
            <th class="app-table2-header">Acc No</th>
            <th class="app-table2-header">Card Pan</th>
            <th class="app-table2-header">Defaulting</th>
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
            <td class="app-table2-data">{{ result.fullName }}</td>
            <td class="app-table2-data">{{ result.accountNo }}</td>
            <td class="app-table2-data">{{ result.cardClientCode }}</td>
            <td class="app-table2-data">{{ result.defaulting ? 'True': 'False' }}</td>
            <td class="app-table2-data">
              <div
                @click="openModal(result)"
                style="cursor: pointer"
                class="table-btn"
              >
                View<span class="table-button-icon"></span>
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
import Loader from "../../../components/Loader/Loader";
import Status from "../../../components/Status/Status2";
import { mapGetters } from "vuex";
import EmptyData from "../../../components/EmptyData/EmptyData";
import Loading from "../../../components/Loading/Loading";
import CardReport from "./CardReport";
export default {
  props: ["allReports", "loader"],

  components: {
    Loader,
    Status,
    EmptyData,
    Loading,
    CardReport,
  },
  data() {
    return {
      todayDate: new Date().toISOString().split("T")[0],
      loading: false,
      loader: false,
      state: null,
      message: null,
      viewCardReport: false,
      cardReportData: {},
      searchData: "",
      searchQuery: "",
      newData: [],
      form: { reportsToShow: 0 },
      filteredReports: this.allReports
    };
  },

  computed: {
    ...mapGetters(["getUrl"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.allReports.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.accountNbr.toLowerCase().includes(v));
        });
      }
       else {
        return this.allReports;
      }
    },
  },
  methods: {
    reload() {
      this.$emit("reloadRequests");
    },
    filterArray() {
      const toShow = this.form.reportsToShow;
      const reports = this.allReports
      if(toShow === 0) {
        return this.filteredReports = reports
      }
      if(toShow === 1) {
        return this.filteredReports = reports.filter((r)=> r.defaulting )
      }
      if(toShow === 2) {
        return this.filteredReports = reports.filter((r)=> !r.defaulting )
      }
    },
    openModal(result) {
      this.cardReportData = result;
      this.viewCardReport = true;
    },
    closeModal() {
      this.viewCardReport = false;
    },
    resetState() {
      this.status = false;
      //  location.reload();
      //  return false;
    },
  },
};
</script>
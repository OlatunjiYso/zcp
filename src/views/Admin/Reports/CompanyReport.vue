<template>
  <div class="app-admin-section">
    <div class="app-admin-col-1">
      <Leftbar />
    </div>
    <div class="app-admin-col-2">
      <Loader v-show="loading" />
      <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div @click="previousPage" class="settings-icon"></div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{ getDate2 }}</div>
        </div>
      </div>
      <div class="content-header">
        {{ `Credit Card Report For ${companyReport.companyName || ''}` }}
      </div>
      <div class="content-sub">Here is a report on the credit cards issued</div>
      <div class="summary-flexbox">
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Cards Received</div>
              <div class="slide-card-value">
                {{ companyReport.cardsReceived }}
              </div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Cards Issued</div>
              <div class="slide-card-value">
                {{ companyReport.cardHolders }}
              </div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">UnIssued Cards</div>
              <div class="slide-card-value">
                {{ companyReport.cardsReceived - companyReport.cardHolders }}
              </div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Defaulters</div>
              <div class="slide-card-value">{{ 0 }}</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Accounts Opened</div>
              <div class="slide-card-value">{{ companyReport.accountHolders }}</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Status</div>
              <div class="slide-card-value">{{ Active }}</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
      </div>
      <div class="basic-table-card">
        <div class="table-header">
          <div class="content-header-2">Issued Cards</div>
          <router-link :to="`/admin/reporting/company/cards/${companyReport.companyId}`"
            ><div class="table-view-all">View all</div></router-link
          >
        </div>

        <table class="app-table">
          <thead>
            <tr class="app-table-row">
              <th class="app-table-header">Id</th>
              <th class="app-table-header">Full Name</th>
              <th class="app-table-header">Account No</th>
              <th class="app-table-header">ClientCode</th>
              <th class="app-table-header">Issued On</th>
              <th class="app-table-header">Defaulting</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in creditCardReports"
              :key="index"
              class="app-table-row"
            >
              <td class="app-table-data">{{ index + 1 }}</td>
              <td class="app-table-data">{{ item.fullName }}</td>
              <td class="app-table-data">{{ item.accountNo }}</td>
              <td class="app-table-data">{{ item.cardClientCode }}</td>
              <td class="app-table-data">{{ "dd-mm-yyyy" }}</td>
              <td class="app-table-data">{{ item.defaulting }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <div class="app-admin-col-3">
              <Rightbar />
            </div> -->
  </div>
</template>

<script>
import Common from "../../../views/common.js";
import Global from "../../../views/global.js";
import Leftbar from "../../../components/Admin/leftbar/leftbar";
import Rightbar from "../../../components/Admin/rightbar/rightbar";
import Loader from "../../../components/Loader/Loader";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    Loader,
  },
  mixins: [Common],
  data() {
    return {
      companyReport: {
        companyName: 'company',
        cardsReceived: 0,
        cardHolders: 0,
        accountHolders: 0,
      },
      creditCardReports: [],
      loading: false,
    };
  },
  async created() {
    const id = this.$route.params.id;
    await this.$store.dispatch("getRoles");
    await this.fetchCompanyReport(id);
    await this.fetchCompanyCreditCardReport(id);
  },
  computed: {
    ...mapGetters([
      "companyCardHolders",
      "getActivities",
      "getCompanies",
      "getRoles",
      "getUrl",
    ]),
  },
  methods: {
    async fetchReports() {
      const id = this.$route.params.id;
      this.loading = true;
      const fetchCompanyReport = axios.get(
        this.getUrl + "api/reports/" + this.$route.params.id
      );
      const fetchCompanyCreditCardReport = axios.get(
        `${this.getUrl}api/reports/creditcardreport/company/${id}`
      );
      const calls = [fetchCompanyReport, fetchCompanyCreditCardReport];
      const results = await Promise.all(calls);
      this.companyReport = results[0]?.data.companyReport;
      const reports = results[1].data?.reports;
      //taking just a few of credit card reports.
      this.creditCardReports = reports?.slice(0, 3);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
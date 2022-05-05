<template>
  <div class="app-admin-section">
    <div class="app-admin-col-1">
      <Leftbar />
    </div>
    <div class="app-admin-col-2">
      <Loader v-show="globalLoader" />
        <ReportList
          :loader="loader"
          :allReports="allReports"
        />
    </div>
  </div>
</template>


<script>
import Leftbar from '../../../components/Admin/leftbar/leftbar'
import ReportList from "./ReportList";
import axios from "axios";
import { mapGetters } from "vuex";
import common from "../../../views/common.js";
import Loader from "../../../components/Loader/Loader";
export default {
  mixins: [common],
  name: "Home",
  components: {
    Leftbar,
    ReportList,
    Loader,
  },
  data() {
    return {
      activeClass: "admin-active-top-link",
      allReports: [],
      loader: false,
      globalLoader: false,
    };
  },
  computed: {
    ...mapGetters(["getUrl", "getCardSetup"]),
    getDate: function () {
      var today = new Date();
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var date =
        today.getDate() +
        ", " +
        months[today.getMonth()] +
        " " +
        today.getFullYear();
      return date;
    },
  },
  async created() {
      this.globalLoader = true;
      await this.$store.dispatch("getCardSetup");
      await this.fetchCardSetup();
      this.globalLoader = false;
      this.fetchAllReports();;
  },
  methods: {
    async fetchAllReports() {
      const id = this.$route.params.id;
      this.loader = true;
      const result = await axios.get(this.getUrl + `api/reports/creditcardreport/company/${id}`);
      this.allReports = result.data?.reports;
      this.loader = false;
    }
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
<template>
  <div>
    <div class="content-header">CSD Approved Card Stock Requests</div>
    <div class="content-sub">
      Here are the requests that have been approved by the bank CSD
    </div>
    <Loading v-if="csdApprovedReqLoader" />
    <div v-else>
      <table class="app-table2" v-if="!resultQuery.length <= 0">
        <thead>
          <tr class="app-table2-row">
            <th class="app-table2-header">Id</th>
            <th class="app-table2-header">Date</th>
            <th class="app-table2-header">No of Card</th>
            <th class="app-table2-header">Type Of Card</th>
            <th class="app-table2-header">Card Limit</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(result, index) in resultQuery"
            :key="index"
            class="app-table2-row"
          >
            <td class="app-table2-data">{{ index + 1 }}</td>
            <td class="app-table2-data">{{ result.create_at }}</td>
            <td class="app-table2-data">{{ result.noOfCards }}</td>
            <td class="app-table2-data">{{ result.typeOfCard }}</td>
            <td class="app-table2-data">{{ result.cardLimit }}</td>
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
export default {
  props: ["csdApprovedReq", "csdApprovedReqLoader"],
  components: {
    Loader,
    Status,
    EmptyData,
    Loading,
  },
  data() {
    return {
      loader: false,
      status: false,
      state: null,
      message: null,
      searchQuery: "",
    };
  },
  computed: {
    ...mapGetters(["getUrl2"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.csdApprovedReq.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.accountNbr.toLowerCase().includes(v));
        });
      } else {
        return this.csdApprovedReq;
      }
    },
  },
  methods: {
    resetState() {
      this.status = false;
      location.reload();
      return false;
    },
  },
};
</script>
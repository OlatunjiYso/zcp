<template>
  <div>
    <div v-if="reprocessModalData != undefined"> 
      <ReprocessRequest
      v-show="reprocessView"
      :reprocessModalData="reprocessModalData"
      :closeModal="closeModal"
      :closeModalReload="closeModalReload"
    />
    </div>
    <div class="content-header">Rejected Card Stock Requests</div>
    <div class="content-sub">Here are the requests that were rejected by your management</div>
    <Loading v-if="rejectedReqLoader" />
    <div v-else>
      <table class="app-table2" v-if="!resultQuery.length <= 0">
        <thead>
          <tr class="app-table2-row">
            <th class="app-table2-header">Id</th>
            <th class="app-table2-header">Date</th>
            <th class="app-table2-header">No of Card</th>
            <th class="app-table2-header">Type of Card</th>
            <th class="app-table2-header">Card Limit</th>
            <th class="app-table2-header">Reason</th>
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
            <td class="app-table2-data">{{ result.create_at }}</td>
            <td class="app-table2-data">{{ result.noOfCards }}</td>
            <td class="app-table2-data">{{ result.typeOfCard }}</td>
            <td class="app-table2-data">{{ result.cardLimit }}</td>
            <td class="app-table2-data">{{ result.reason }}</td>
            <td class="app-table2-data">
              <div
                style="cursor: pointer"
                class="table-btn"
                @click="openReprocessModal(result)"
              >
                Reprocess<span class="table-button-icon"></span>
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
import ReprocessRequest from "./Reprocess.vue";

export default {
  props: ["rejectedReq", "rejectedReqLoader"],
  components: {
    Loader,
    Status,
    EmptyData,
    Loading,
    ReprocessRequest,
  },
  data() {
    return {
      searchQuery: "",
      loading: false,
      loader: false,
      status: false,
      state: null,
      message: null,
      reprocessView: false,
      reprocessModalData: {},
    };
  },
  computed: {
    ...mapGetters(["getUrl2"]),
    mfbRoles: function () {
      return this.getRoles.filter((x) => {
        return x.mfbOrBank == "mfb";
      });
    },
    resultQuery() {
      if (this.searchQuery) {
        return this.rejectedReq.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.accountNbr.toLowerCase().includes(v));
        });
      } else {
        return this.rejectedReq;
      }
    },
  },
  methods: {
    closeModal() {
      this.reprocessView = false;
    },
    closeModalReload() {
      this.reprocessView = false;
      location.reload();
      return false;
    },
    openReprocessModal(result) {
      this.reprocessModalData = {...result};
      this.reprocessModalData.rejectedBy = ' your Management'
      this.reprocessView = true;
    },
  },
};
</script>
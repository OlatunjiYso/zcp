<template>
  <div>
    <Loader v-show="loader" />
    <ViewDetails
      v-show="viewDetails"
      :closeModal="closeModal"
      :viewDetailsData="viewDetailsData"
    />
    <div class="content-header">Acknowledged Card Stock Request</div>
    <div class="content-sub">
      Here are the credit card stock that have been acknowledged by the
      MFB
    </div>
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
    </div>
    <Loading v-if="acknowledgedLoader" />
    <div v-else>
      <table class="app-table2" v-if="!resultQuery?.length <= 0">
        <thead>
          <tr class="app-table2-row">
            <th class="app-table2-header">Id</th>
            <th class="app-table2-header">Date</th>
            <!-- <th class="app-table2-header">Company</th> -->
            <th class="app-table2-header">No of Card</th>
            <th class="app-table2-header">Type Of Card</th>
            <th class="app-table2-header">Card Limit</th>
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
            <!-- <td class="app-table2-data">{{ "companyName" }}</td> -->
            <td class="app-table2-data">{{ result.noOfCards }}</td>
            <td class="app-table2-data">{{ result.typeOfCard }}</td>
            <td class="app-table2-data">{{ result.cardLimit }}</td>
            <td class="app-table2-data">
              <div
                @click="openModal(result)"
                style="cursor: pointer; color: red; text-decoration: underline"
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
import { mapGetters } from "vuex";
import EmptyData from "../../../components/EmptyData/EmptyData";
import Loading from "../../../components/Loading/Loading";
import ViewDetails from "./ViewDetails";
export default {
  props: ["acknowledgedRequests", "acknowledgedLoader"],
  components: {
    Loader,
    EmptyData,
    Loading,
    ViewDetails
  },
  data() {
    return {
      loader: false,
      searchQuery: "",
      viewDetails: false,
      viewDetailsData: "",
    };
  },
  computed: {
    ...mapGetters(["getUrl2"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.acknowledgedRequests.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.accountNbr.toLowerCase().includes(v));
        });
      } else {
        return this.acknowledgedRequests;
      }
    },
  },
  methods: {
    closeModal() {
      this.viewDetails = false;
    },
    openModal(result) {
      this.viewDetailsData = result;
      this.viewDetails = true;
    },
  },
};
</script>
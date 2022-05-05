<template>
  <div>
    <Loader v-show="loader" />
    <Status
      :state="state"
      :closeModal="closeModalReload"
      :message="message"
      :resetState="resetState"
      v-if="status"
    />
    <div class="app-modal-overlay" v-else>
      <div
        class="app-modal-div"
        style="width: 90%; height: 90%; overflow: auto"
      >
        <div>
          <div>
            <div class="app-modal-heading">
              <div class="app-modal-header">Reprocess Stock Request</div>
            </div>
            <div> 
            </div>
            <div>
              <p>This card stock request was earlier declined by {{reprocessModalData?.rejectedBy}}.  </p>
              <ul>
                <li> Type of card: {{reprocessModalData?.typeOfCard}} </li>
                <li> Number of card: {{reprocessModalData?.noOfCards}} </li>
                <li> Card Limit: {{reprocessModalData?.cardLimit}} </li>
                <li> Reason for declining: {{reprocessModalData?.reason}} </li>
              </ul>
            </div>
            <form @submit.prevent="sendRequest">
              <div class="form-flex">
                <div class="form-flex-col-3">
                  <label class="login-label"
                    >New Number of Cards<span style="color: red">*</span></label
                  >
                  <input
                    v-model="no_of_cards"
                    type="number"
                    min="1"
                    max="500"
                    class="app-text-field w-input"
                    required
                    placeholder="Type Here"
                  />
                </div>
                <div class="form-flex-col-3">
                  <label class="login-label"
                    >New Type of Card<span style="color: red">*</span>
                  </label>
                  <select
                    required
                    v-model="type_of_card"
                    style="marginbottom: 30px"
                    class="app-select w-select"
                    @change="setBounds(type_of_card)"
                  >
                    <option
                      v-for="(result, index) in allowedCreditCardTypes"
                      :key="index"
                      :value="result.cardProductCode"
                    >
                      {{ result.description }}
                    </option>
                  </select>
                </div>
                <div class="form-flex-col-3">
                  <label class="login-label"
                    >New Card Limit<span style="color: red">*</span>
                  </label>
                  <select
                    required
                    v-model="cardLimit"
                    style="marginbottom: 30px"
                    class="app-select w-select"
                  >
                    <option
                      v-for="(item, index) in computeCardLimits"
                      :key="index"
                      :value="item"
                    >
                      {{ item }}
                    </option>
                  </select>
                </div>
              </div>
              <br /><br />
              <button type="submit" class="app-form-button">Reprocess</button>
            </form>
          </div>
          <div @click="closeModal" class="app-modal-close"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import operationMixen from "../../operationMixen.js";
import Loader from "../../../components/Loader/Loader";
import Status from "../../../components/Status/Status";
import { mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";

export default {
  name:"ReprocessRequest",
  props: ["reprocessModalData", "closeModal", "closeModalReload"],
  components: {
    Loader,
    Status,
  },

  data() {
    return {
      loader: false,
      status: false,
      state: "success",
      message: null,
      no_of_cards: this.reprocessModalData?.noOfCards,
      type_of_card: this.reprocessModalData?.typeOfCard,
      reason: "",
      creditCardTypes: [],
      cardLimit: this.reprocessModalData?.cardLimit,
      cardLimits: [],
      lowerCardBound: 25000,
      upperCardBound: 300000,
    };
  },
    computed: {
    ...mapGetters(["getUrl2", "getUrl"]),
    allowedCreditCardTypes() {
      let filtered = this.creditCardTypes.filter(
        (card) =>
          !card.description?.includes("Staff") &&
          !card.description?.includes("USD") &&
          !card.description?.includes("ZENEX")
      );
      return filtered;
    },
    computeCardLimits() {
      const lowerBound = this.lowerCardBound;
      const upperBound = this.upperCardBound;
      const generatedList = [];
      let currentItem = lowerBound;
      while (currentItem < upperBound) {
        let incrementer = 25000;
        if (currentItem >= 500000) incrementer = 100000;
        if (currentItem >= 1000000) incrementer = 250000;
        generatedList.push(currentItem);
        currentItem += incrementer;
      }
      generatedList.push(upperBound);
      return generatedList;
    },
  },
  created() {
    this.fetchCreditCardTypes();
  },

  async mounted() {
    this.ismounted = true;
    const companyProduct = await axios.get(
      this.getUrl + "api/CardProductSetup"
    );

    if (companyProduct.data.length > 0) {
      this.isActiveBtn = true;
    } else {
      this.isActiveBtn = false;
    }
  },
  methods: {
    async fetchCreditCardTypes() {
      const response = await axios.get(
        this.getUrl2 + "api/Common/CreditCardType"
      );
      this.creditCardTypes = response.data;
    },
    clearForm() {
      this.no_of_cards = "";
      this.type_of_card = "";
    },
    setBounds(cardCode) {
      const selectedCard = this.creditCardTypes.find(
        (card) => card.cardProductCode == cardCode
      );
      if (!selectedCard || !selectedCard.description) {
        this.lowerCardLimit = 25000;
        this.upperCardLimit = 300000;
      }
      const cardBounds = this.computeCardBounds(selectedCard.description);
      this.lowerCardBound = cardBounds[0];
      this.upperCardBound = cardBounds[1];
    },
    computeCardBounds(cardDescription) {
      try {
        let lower = 22500;
        let upper = 300000;
        let amounts = cardDescription.split("(");
        amounts = amounts[amounts.length - 1];
        amounts = amounts.split(")");
        amounts = amounts[0];
        amounts = amounts.split(" - ");
        if (amounts.length < 2) {
          return [lower, upper];
        }
        lower = parseInt(amounts[0]);
        upper = parseInt(amounts[1]);
        return [lower, upper];
      } catch (error) {
        return [0, 0];
      }
    },
    async sendRequest() {
      this.loader = true;
      const user = JSON.parse(localStorage.getItem("user-mfb"));
      const company = await axios.get(
        this.getUrl + "api/companies/" + parseInt(user.companyId)
      );
      const formData = {
        id: this.reprocessModalData.id,
        userId: parseInt(user.id),
        companyId: parseInt(user.companyId),
        noOfCards: parseInt(this.no_of_cards),
        typeOfCard: this.type_of_card,
        cardLimit: this.cardLimit,
        productType: "Credit Card",
        workflowId: 1,
        workflowDescription: "string",
        branchNo: company.data.branch,
      };
      try {
        const response = await axios.post(
          this.getUrl2 + "api/CardStock/ReprocessrejectedRequest",
          formData
        );
        this.loader = false;
        this.state = "success";
        this.status = true;
        this.message = response.data.responseMessage;
        this.clearForm();
      } catch (error) {
        this.loader = false;
        this.status = true;
        this.state = "failed";
        this.message = error.response.data.responseMessage;
      }
    },
    resetState() {
      this.status = false;
    },
  },
};
</script>

<style scoped>
</style>
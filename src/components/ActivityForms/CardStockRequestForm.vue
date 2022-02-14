<template>
  <Loader v-show="loader" />
  <Status
    :state="state"
    :closeModal="closeAddReload"
    :message="message"
    :resetState="resetState"
    v-if="status"
  />
  <div class="content-header">Credit Card Stock Request</div>
  <form @submit.prevent="sendRequest">
    <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label"
          >Number of Cards<span style="color: red">*</span></label
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
          >Type of Card<span style="color: red">*</span>
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
          >Card Limit<span style="color: red">*</span>
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
    <button type="submit" class="app-form-button">Submit</button>
  </form>
</template>

<script>
import operationMixen from "../../views/operationMixen.js";
import Leftbar from "../Client/leftbar/leftbar";
import Rightbar from "../Client/rightbar/rightbar";
import Loader from "../Loader/Loader";
import Status from "../Status/Status2";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    Leftbar,
    Rightbar,
    Loader,
    Status,
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
  mixins: [operationMixen],
  data() {
    return {
      loader: false,
      status: false,
      state: "success",
      message: null,
      no_of_cards: "",
      type_of_card: "",
      reason: [],
      creditCardTypes: [],
      cardLimit: 2500,
      cardLimits: [],
      lowerCardBound: 25000,
      upperCardBound: 300000
    };
  },
  created() {
    this.fetchCreditCardTypes();
  },
  methods: {
    async fetchCreditCardTypes() {
      const response = await axios.get(
        this.getUrl2 + "api/Common/CreditCardType"
      );
      this.creditCardTypes = response.data;
    },
    specialCharVal($event) {
      if (!$event.key.match(/^[a-zA-Z]*$/)) {
        $event.preventDefault();
      }
    },
    clearForm() {
      this.no_of_cards = "";
      this.type_of_card = "";
    },
    resetState() {
      this.status = false;
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
        return [0, 0]
      }
    },
    async sendRequest() {
      this.loader = true;
      const user = JSON.parse(localStorage.getItem("user-mfb"));
      const company = await axios.get(
        this.getUrl + "api/companies/" + parseInt(user.companyId)
      );
      const companyProduct = await axios.get(
        this.getUrl + "api/CardProductSetup"
      );
      const product = await companyProduct.data.find((x) => {
        return x.companyId == parseInt(user.companyId);
      });
      const formData = {
        userId: parseInt(user.id),
        companyId: parseInt(user.companyId),
        noOfCards: parseInt(this.no_of_cards),
        typeOfCard: this.type_of_card,
        cardLimit: this.cardLimit,
        productType: product.cardProductCode,
        workflowId: 1,
        workflowDescription: "string",
        branchNo: company.data.branch,
      };
      try {
        const response = await axios.post(
          this.getUrl2 + "api/CardStock/makecardstockrequest",
          formData
        );
        if (response.status == 200) {
          console.log('Inside TRY 200')
          this.loader = false;
          this.state = "success";
          this.status = true;
          this.message = "Request submitted Sucessfully";
          this.clearForm();
        } else {
           console.log('Inside TRY ELSE')
          this.loader = false;
          this.status = true;
          this.state = "failed";
          this.message = response.data.responseMessage;
        }
      } catch (error) {
         console.log('Inside TRY cATCH', error.message)
        this.loader = false;
        this.status = true;
        this.state = "failed";
        this.message = "Error Occured Requesting Card Stock";
      }
    },
  },
};
</script>

<style scoped>
</style>
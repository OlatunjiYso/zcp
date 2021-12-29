<template>
  <Loader v-show="loader"/>
  <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
  <div class="content-header">Card Stock Request </div>
  <form @submit.prevent="sendRequest">
    <div class="form-flex">

      <div class="form-flex-col-3">
        <label class="login-label">Number of Cards<span style="color:red">*</span></label>
        <input v-model="no_of_cards"  type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Type of Card<span style="color:red">*</span></label>
        <select required v-model="type_of_card" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in typeofCard" :key="index" :value="result.cardProductCode">{{result.description}}</option>
        </select>
      </div>
    </div>
    <br><br>
    <button type="submit" class="app-form-button">Submit</button>
  </form>
</template>

<script>
import operationMixen from "../../views/operationMixen.js";
import Leftbar from "../Client/leftbar/leftbar";
import Rightbar from "../Client/rightbar/rightbar";
import Loader from "../Loader/Loader";
import Status from "../Status/Status2";
import {mapGetters} from "vuex";
import axios from "axios";

export default {


  components: {
    Leftbar,
    Rightbar,
    Loader,
    Status
  },
  computed:{
    ...mapGetters([ 'getUrl2', 'getUrl' ])
  },
  mixins: [operationMixen],
  data(){
    return{
      loader: false,
      status: false,
      state: null,
      message: null,
      no_of_cards: "",
      type_of_card: "",
      reason:[],
      typeofCard:[]
    }
  },
  created(){
this.findTypeOfCard()
  },
  methods: {
   async findTypeOfCard(){
        const response = axios.get(this.getUrl2 + 'api/Common/CreditCardType');
        this.typeofCard = response;
    },
          specialCharVal($event){

            if(!$event.key.match(/^[a-zA-Z]*$/))
            {
                $event.preventDefault();
            }
           
        },
    clearForm(){
      this.form.no_of_cards= "";
      this.form.type_of_card= "";
    },
    resetState(){
      this.status = false;
    },
    async sendRequest(){
      this.loader = true;
            const user = JSON.parse(localStorage.getItem("user-mfb"))
     const company = await axios.get(this.getUrl + 'api/companies/' + parseInt(user.companyId))
       const formData =     {
  "userId": parseInt(user.id),
  "companyId":parseInt(user.companyId),
  "noOfCards": this.no_of_cards,
  "typeOfCard": this.type_of_card,
  "productType": product.cardProductCode,
  "workflowId": 1,
  "workflowDescription": "string",
  "branchNo": parseInt(company.data.branch)
}
      try {
        const response = await axios.post(this.getUrl2 + 'api/CardStock/makecardstockrequest',formData)
        if(response.status == 200){
          this.loader = false;
          this.status = true;
          this.state = 'success';
          this.message = 'Request submitted Sucessfully'
          this.clearForm();
        }
        else{
          this.loader = false;
          this.status = true;
          this.state = 'failed';
          this.message = response.data.responseMessage
        }

      } catch (error) {
        console.log(error)
        this.loader = false;
        this.status = true;
        this.state = 'failed';
         this.message = error.response.data.responseMessage
      }

    },
  },
}
</script>

<style scoped>

</style>
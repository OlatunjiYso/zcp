<template>
  <Loader v-show="loader"/>
  <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
       <ViewDetails v-show="viewDetails" :closeModal="closeModal" :viewDetailsData="viewDetailsData" />
  <div class="content-header">Transaction Log</div>
  <form @submit.prevent="sendRequest">
    <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label">Account Number<span style="color:red">*</span></label>
        <input  minlength="10" maxlength="10" @focus="clearError" @blur = "searchForCard" v-model="form.accountNumber" type="text" class="app-text-field w-input" required placeholder="Type Here" />
        <p v-show="accError" style="color:red;font-size:12px">Invalid Account Number</p>
      </div>
       <div class="form-flex-col-3">
        <label class="login-label">Account Name<span style="color:red">*</span></label>
        <input readonly :value="form.accountName" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
            <div class="form-flex-col-3">
        <label class="login-label">Start Date<span style="color:red">*</span></label>
        <input v-model="form.startDate" type="date" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
                  <div class="form-flex-col-3">
        <label class="login-label">End Date<span style="color:red">*</span></label>
        <input v-model="form.endDate" type="date" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
    </div>
        <br><br>
    <button type="submit" class="app-form-button">Search</button>
  </form>
    <br><br>
    <div v-if="!transData.length <= 0">
   <table class="app-table2">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">Id</th>
                           <th class="app-table2-header">Ref</th>
                           <th class="app-table2-header">Amount</th>
                           <th class="app-table2-header">Currency</th>
                           <th class="app-table2-header">Date</th>
                           <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in transData" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.referenceNumber}}</td>
                            <td class="app-table2-data">{{result.transactionAmount}}</td>
                            <td class="app-table2-data">{{result.transactionCurrency}}</td> 
                            <td class="app-table2-data">{{result.transmissionDateAndTime}}</td>
                            <td class="app-table2-data">
                                   <div @click="openModal(result)" style="cursor:pointer" class="table-btn">View<span class="table-button-icon"></span></div>
                            </td> 
                        </tr>
                        
                    </tbody>
          
                </table>
                <br><br>
    </div>
</template>

<script>
import Leftbar from "../Client/leftbar/leftbar";
import Rightbar from "../Client/rightbar/rightbar";
import Loader from "../Loader/Loader";
import Status from "../Status/Status2";
import {mapGetters} from "vuex";
import axios from "axios";
import ViewDetails from './ViewActivity3'
export default {
  components: {
    Leftbar,
    Rightbar,
    Loader,
    Status,
    ViewDetails
  },
  computed:{
    ...mapGetters([ 'getUrl2','getUrl3', 'getUrl' ])
  },
  data(){
    return{
      loader: false,
      status: false,
      state: null,
      message: null,
      form:{
        "accountNumber": "",
        "accountName": "",
        "startDate": "",
        "endDate": "",
        "clientCode": null
      },
      reason:[],
      listDispute:[],
      cardData:'',
      accError:false,
      viewDetails: false,
      transData: [],
      viewDetailsData:''
    }
  },
  created(){
  },
  methods: {
            openModal(result){
                console.log(result)
   this.viewDetailsData = result
   this.viewDetails = true
  },
    closeModal(){
   this.viewDetails = false
  },
    clearForm(){
      this.form.accountNumber= "";
      this.form.last_6_digits_of_card= "";
      this.form.amount= "";
    },
    resetState(){
      this.status = false;
    },
    clearError(){
     this.accError = false
    },
       async searchForCard(e){
           if(this.form.accountNumber != ''){
                     const user = JSON.parse(localStorage.getItem("user-mfb"))
           this.loader = true
   const response = await axios.get(this.getUrl2 + 'api/CardRequest/cardbyaccountNo/'+  user.companyId + "/" + this.form.accountNumber)
   if(response.status == 200){
       if(response.data.length > 0){
 this.loader = false
   this.form.accountName = response.data[0].nameOnCard
   this.form.accountName = response.data[0].clientCode

}
         else{
       this.loader = false
       this.accError = true
         }

   }
   else{
       this.loader = false
       this.accError = true
         }
    }
    else{
        this.accError = true
    }
           },

    async sendRequest(){
      this.loader = true;
      const user = JSON.parse(localStorage.getItem("user-mfb"))
       const formData ={
            "companyId": user.companyId,
            "clientCode": this.form.clientCode,
            "userId": user.id,
            "startDate":  this.form.startDate,
            "endDate":  this.form.endDate
       }
      try {
        const response = await axios.post(this.getUrl2 + 'api/cardtransactionlog/transactions',formData)
        if(response.data.responseCode == "00"){
          this.loader = false;
          this.transData = response.data.transactionLog
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
         this.message = error.message
      }

    },
  },
}
</script>

<style scoped>

</style>
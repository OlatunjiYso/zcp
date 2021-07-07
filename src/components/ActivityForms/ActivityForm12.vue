<template>
  <Loader v-show="loader"/>
  <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
       <ViewDetails v-show="viewDetails" :closeModal="closeModal" :viewDetailsData="viewDetailsData" />
  <div class="content-header">Card Parameterization</div>
  <form @submit.prevent="sendRequest">
    <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label">Account Number<span style="color:red">*</span></label>
        <input maxlength="13" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" @focus="clearError" @blur = "searchForCard" v-model="form.accountNumber" type="text" class="app-text-field w-input" required placeholder="Type Here" />
        <p v-show="accError" style="color:red;font-size:12px">Invalid Account Number</p>
      </div>
       <div class="form-flex-col-3">
        <label class="login-label">Account Name<span style="color:red">*</span></label>
        <input readonly :value="form.accountName" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
         <div class="form-flex-col-3">
        <label class="login-label">Channel Type<span style="color:red">*</span></label>
        <select required v-model="form.parammeterType" style="marginBottom: 30px" class="app-select w-select">
             <option v-for="(item,index) in channels" :key="index" :value="item.id">{{item.name}}</option>           
            </select>
          </div>
    </div>
    <div v-if="form.parammeterType != ''">
            <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label">Daily Amount<span style="color:red">*</span></label>
        <input v-model.number="form.dailyAmount" type="number" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
       <div class="form-flex-col-3">
        <label class="login-label">Daily Count<span style="color:red">*</span></label>
        <input v-model.number="form.dailyCount" type="number" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
    </div>
      <!-- <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label">Monthly Amount<span style="color:red">*</span></label>
        <input v-model.number="form.monthlyAmount" type="number" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
       <div class="form-flex-col-3">
        <label class="login-label">Monthly Count<span style="color:red">*</span></label>
        <input  v-model.number="form.monthlyCount" type="number" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
    </div>   -->
    </div>

        <br><br>
    <button type="submit" class="app-form-button">Submit</button>
  </form>
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
      channels:[
        {
          id:1,
          name: 'ATM'
        },
        {
          id:2,
          name: 'POS/WEB '
        },
        {
          id:3,
          name: 'Cash Advance'
        },
        {
          id:4,
          name: 'Others'
        }
      ],
      loader: false,
      status: false,
      state: null,
      message: null,
      form:{
        "accountNumber": "",
        "accountName": "",
        "parammeterType": "",
        "dailyAmount": 0,
        "dailyCount": 0,
        "monthlyAmount": 0,
        "monthlyCount": 0,
        "clientCode": ""
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
   this.form.clientCode = response.data[0].clientCode

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
             "id": 0,
             "userId": user.id,
            "companyId": user.companyId,
            "clientCode": this.form.clientCode,
                    "channelId": parseInt(this.form.parammeterType),
                    "dailyAmount": parseInt(this.form.dailyAmount),
                    "dailyCount": parseInt(this.form.dailyCount),
                    "workflowId": 1
       }
      try {
        const response = await axios.post(this.getUrl2 + 'api/CardParameterization/initialorreprocessparameterization',formData)
        if(response.data.responseCode == "00"){
           this.loader = false;
          this.status = true;
          this.state = 'success';
          this.message = 'Request submitted Sucessfully'
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
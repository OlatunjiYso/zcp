<template>
  <Loader v-show="loader"/>
  <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
  <div class="content-header">Card Issuance</div>
  <form @submit.prevent="sendRequest">
    <div class="form-flex">

      <div class="form-flex-col-3">
        <label class="login-label">Full Name<span style="color:red">*</span></label>
        <input  type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
        <div class="form-flex-col-3">
        <label class="login-label">Email Address<span style="color:red">*</span></label>
        <input  type="email" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
       <div class="form-flex-col-3">
        <label class="login-label">Date of Birth<span style="color:red">*</span></label>
        <input  type="date" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
        <div class="form-flex-col-3">
        <label class="login-label">BVN<span style="color:red">*</span></label>
        <input  type="email" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
        <div class="form-flex-col-3">
        <label class="login-label">Phone Number<span style="color:red">*</span></label>
        <input  type="email" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
     
    </div>
    <br><br>
    <button type="submit" class="app-form-button">Create Account</button>
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
      form:{
        "companyId": 0,
        "userId": 0,
        "accountNumber": "",
        "accountName": "",
        "pickupBranch": "",
        "cardPan": "",
        "cityCode": "",
        "surname_change": "",
        "newNameOfCard": "",
        "reason":"",
        "activityBy": ""
      },
      reason:[]
    }
  },
  methods: {
          specialCharVal($event){

            if(!$event.key.match(/^[a-zA-Z]*$/))
            {
                $event.preventDefault();
            }
           
        },
    clearForm(){
      this.form.accountName= "";
      this.form.accountNumber= "";
      this.form.pickupBranch= "";
      this.form.cardPan= "";
      this.form.surname_change= "";
      this.form.newNameOfCard= "";
    },
    resetState(){
      this.status = false;
    },
    async sendRequest(){
      this.loader = true;
            const user = JSON.parse(localStorage.getItem("user-mfb"))
     const company = await axios.get(this.getUrl + 'api/companies/' + parseInt(user.companyId))
       const formData ={
        "userId": parseInt(user.id),
        "companyId": parseInt(user.companyId),
        "accountNumber": this.form.accountNumber,
        "accountName": this.form.accountName,
        "requestBranch": parseInt(company.data.branch),
        "pickupBranch": parseInt(this.form.pickupBranch),
        "cardPan": this.form.cardPan,
        "workflowId": 1,
        "reason": this.form.reason,
        "newNameOfCard": this.form.newNameOfCard,
         "activityBy": user.userName,
        "surname_change":this.form.surname_change,
       }
      try {
        const response = await axios.post(this.getUrl2 + 'api/CardReissue/MakeCardReissueRequest',[formData])
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
         this.message = error.message
      }

    },
  },
}
</script>

<style scoped>

</style>
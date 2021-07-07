<template>
  <div>
                <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeModalReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:90%; height:90%; overflow:auto;">
            <div>
      <div>
              <div class="app-modal-heading">
        <div class="app-modal-header">Reprocess Request</div>
      </div>
   <form @submit.prevent="sendRequest">
    <div class="form-flex">
          <div class="form-flex-col-3">
        <label class="login-label">Surname Change<span style="color:red">*</span></label>
        <input v-model="requestData.surname_change" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Account Number<span style="color:red">*</span></label>
        <input v-model="requestData.accountNumber" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Account Name<span style="color:red">*</span></label>
        <input v-model="requestData.accountName" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Pickup Branch<span style="color:red">*</span></label>
        <select required v-model="requestData.pickupBranch" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in branches" :key="index" :value="result.branchNo">{{result.branchName}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Card Pan<span style="color:red">*</span></label>
        <input v-model="requestData.cardPan" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Reason<span style="color:red">*</span></label>
        <select required v-model="requestData.reason" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in reasons" :key="index" :value="result.reasonId">{{result.reissueReason}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Activity By<span style="color:red">*</span></label>
        <input v-model="requestData.activityBy" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">New Name of Card<span style="color:red">*</span></label>
        <input v-model="requestData.newNameOfCard" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
    </div>
    <br><br>
    <button type="submit" class="app-form-button">Submit</button>
  </form>
      </div>
      <div @click= "closeModal" class="app-modal-close"></div>
    </div>
  </div>
                    </div>
  </div>
</template>

<script>
import operationMixen from "../../operationMixen.js";
import Loader from "../../../components/Loader/Loader";
import Status from "../../../components/Status/Status";
import {mapGetters} from "vuex";
import axios from "axios";
export default {
  props:['requestData','closeModal','closeModalReload'],
  components: {
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
    }
  },
  methods: {
          resetState(){
this.status = false;
    },
    clearForm(){
    this.requestData.accountName= "";
      this.requestData.accountNumber= "";
      this.requestData.pickupBranch= "";
      this.requestData.cardPan= "";
      this.requestData.surname_change= "";
      this.requestData.newNameOfCard= "";
      this.requestData.activityBy="";
    },
    resetState(){
      this.status = false;
    },
    async sendRequest(){
      this.loader = true;
            const user = JSON.parse(localStorage.getItem("user-mfb"))
     const company = await axios.get(this.getUrl + 'api/companies/' + parseInt(user.companyId))
       const formData ={
          "id": this.requestData.id,
        "userId": parseInt(user.id),
        "companyId": parseInt(user.companyId),
        "accountNumber": this.requestData.accountNumber,
        "accountName": this.requestData.accountName,
        "requestBranch": parseInt(company.data.branch),
        "pickupBranch": parseInt(this.requestData.pickupBranch),
        "cardPan": this.requestData.cardPan,
        "workflowId": 1,
        "reason": this.requestData.reason,
        "newNameOfCard": this.requestData.newNameOfCard,
         "activityBy": this.requestData.activityBy,
        "surname_change":this.requestData.surname_change,
       }
      try {
        const response = await axios.post(this.getUrl2 + '/api/CardReissue/ReprocessrejectedRequest',formData)
        if(response.status == 200){
          this.loader = false;
          this.status = true;
          this.state = 'success';
          this.message = 'Operation Sucessful'
          this.clearForm();
        }
        else{
          this.loader = false;
          this.status = true;
          this.state = 'failed';
          this.message = 'Operation Failed'
        }

      } catch (error) {
        console.log(error)
        this.loader = false;
        this.status = true;
        this.state = 'failed';
        this.message = 'Operation Failed'
      }

    },
  },
}
</script>

<style scoped>

</style>
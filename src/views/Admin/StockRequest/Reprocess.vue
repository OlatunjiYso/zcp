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
        <label class="login-label">Number of Cards<span style="color:red">*</span></label>
        <input v-model="no_of_cards"  type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
           <label class="login-label">Type of Card<span style="color:red">*</span></label>
        <select required v-model="type_of_card" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in reasons" :key="index" :value="result.reasonId">{{result.reissueReason}}</option>
        </select>
      </div>



    </div>
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
import moment from 'moment'
export default {
  name: "ActivityForm1",
  props:['requestData','closeModal','closeModalReload'],
  components: {
    Loader,
    Status
  },

  mixins: [operationMixen],
  data(){
    return{
      todayDate:  new Date().toISOString().split("T")[0],
      loader: false,
      status: false,
      state: null,
      message: null,
      form:{
        "productCode": "34567",
        "branchNo": "Abuja",
        "companyId": 9,
        "userId": 2,
        "title": "",
        "firstName": "",
        "middleName": "",
        "lastName": "",
        "gender": "",
        "maritalStatus": "",
        "mobileNo": "",
        "email": "",
        "dateOfBirth": "",
        "addressLine1": "",
        "addressLine2": "",
        "cityCode": "",
        "regionCode": "",
        "countryCode": "",
        "legalID": "",
        "idCardTypeCode": "",
        "documentIssueDate": "",
        "expiryDateOfDoc": "",
        "accountNbr": "",
        "nameOnCard": "",
        "socioProfCode": ""
      },
       ismounted:false,
       isActiveBtn: false
    }
  },
   computed:{
    ...mapGetters([ 'getUrl2', 'getUrl' ]),
        validateExpiry(){
      if(this.ismounted){
            const issueDate = new Date();
            const d = issueDate.setDate(issueDate.getDate() + 1);
       const a = new Date(d).toISOString().substr(0,10);

      return a;
            
      }
  }
   },
    async mounted() {
    this.ismounted = true
      const companyProduct = await axios.get(this.getUrl + 'api/CardProductSetup')
   
      if(companyProduct.data.length > 0 ){
        this.isActiveBtn = true;
      }
      else{
        this.isActiveBtn = false;
      }
  },
  methods: {
          resetState(){
this.status = false;
    },
    clearForm(){
      this.requestData.title= "";
      this.requestData.firstName= "";
      this.requestData.middleName= "";
      this.requestData.lastName= "";
      this.requestData.gender= "";
      this.requestData.maritalStatus= "";
      this.requestData.mobileNo= "";
      this.requestData.email= "";
      this.requestData.dateOfBirth= "";
      this.requestData.addressLine1= "";
      this.requestData.addressLine2= "";
      this.requestData.cityCode= "";
      this.requestData.regionCode= "";
      this.requestData.countryCode="";
      this.requestData.legalID= "";
      this.requestData.idCardTypeCode= "";
      this.requestData.documentIssueDate= "";
      this.requestData.expiryDateOfDoc="";
      this.requestData.accountNbr="";
      this.requestData.nameOnCard="";
      this.requestData.socioProfCode="";
    },
    resetState(){
      this.status = false;
    },
    async sendRequest(){
      this.loader = true;
            const user = JSON.parse(localStorage.getItem("user-mfb"))
     const company = await axios.get(this.getUrl + 'api/companies/' + parseInt(user.companyId))
      const companyProduct = await axios.get(this.getUrl + 'api/CardProductSetup')
     const product = await companyProduct.data.find(x => { return x.companyId == parseInt(user.companyId) })
       const formData ={
         "id": this.requestData.id,
        "productCode": product.cardProductCode,
        "branchNo": company.data.branch,
        "companyId": parseInt(user.companyId),
        "userId": parseInt(user.id),
        "title": this.requestData.title,
        "firstName": this.requestData.firstName,
        "middleName": this.requestData.middleName,
        "lastName": this.requestData.lastName,
        "gender": this.requestData.gender,
        "maritalStatus": this.requestData.maritalStatus,
        "mobileNo": this.requestData.mobileNo,
        "email": this.requestData.email,
        "dateOfBirth": moment(this.requestData.dateOfBirth).format('DD-MM-YYYY'),
        "addressLine1": this.requestData.addressLine1,
        "addressLine2": this.requestData.addressLine2,
        "cityCode": this.requestData.cityCode,
        "regionCode":this.requestData.regionCode,
        "countryCode": this.requestData.countryCode,
        "legalID": this.requestData.legalID,
        "idCardTypeCode": this.requestData.idCardTypeCode,
        "documentIssueDate": moment(this.requestData.documentIssueDate).format('DD-MM-YYYY'),
        "expiryDateOfDoc": this.requestData.idCardTypeCode == '02' || this.requestData.idCardTypeCode == '04' ? '06-10-3021' :  moment(this.requestData.expiryDateOfDoc).format('DD-MM-YYYY'),
        "accountNbr": this.requestData.accountNbr,
        "nameOnCard": this.requestData.nameOnCard,
        "socioProfCode": this.requestData.socioProfCode
      }
      try {
        const response = await axios.post(this.getUrl2 + 'api/CardRequest/ReprocessrejectedRequest',formData)
        if(response.status == 200){
          this.loader = false;
          this.status = true;
          this.state = 'success';
          this.message = 'Request submited Sucessfully'
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
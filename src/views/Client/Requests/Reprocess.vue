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
        <label class="login-label">Title<span style="color:red">*</span></label>
        <select v-model="requestData.title" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in titles" :key="index" :value="result.titleName">{{result.titleName}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">First Name<span style="color:red">*</span></label>
        <input v-model="requestData.firstName" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Middle Name<span style="color:red">*</span></label>
        <input v-model="requestData.middleName" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Last Name<span style="color:red">*</span></label>
        <input v-model="requestData.lastName" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Gender<span style="color:red">*</span></label>
        <select v-model="requestData.gender" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in gender" :key="index" :value="result">{{result}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Marital Status<span style="color:red">*</span></label>
        <select v-model="requestData.maritalStatus" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in maritalStatus" :key="index" :value="result.name">{{result.name}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Mobile No<span style="color:red">*</span></label>
        <input v-model="requestData.mobileNo" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Email Address<span style="color:red">*</span></label>
        <input v-model="requestData.email" type="email" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Date of Birth<span style="color:red">*</span></label>
        <input v-model="requestData.dateOfBirth" type="date" class="app-text-field w-input" required placeholder="Type Here" />
      </div>

      <div class="form-flex-col-3">
        <label class="login-label">Address Line 1<span style="color:red">*</span></label>
        <input v-model="requestData.addressLine1" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Address Line 2</label>
        <input v-model="requestData.addressLine2" type="text" class="app-text-field w-input" placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Country<span style="color:red">*</span></label>
        <select v-model="requestData.countryCode" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in countries" :key="index" :value="result.countryCode">{{result.counrtyName}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">State<span style="color:red">*</span></label>
        <select v-model="requestData.regionCode" @change="fetchStateCities($event)" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in states" :key="index" :value="result.code">{{result.name}}</option>
          <option value="0">Married</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">City<span style="color:red">*</span></label>
        <select v-model="requestData.cityCode" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in stateCities" :key="index" :value="result.code">{{result.name}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Legal ID Number<span style="color:red">*</span></label>
        <input v-model="requestData.legalID" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">ID Type<span style="color:red">*</span></label>
        <select v-model="requestData.idCardTypeCode" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in idCardType" :key="index" :value="result.code">{{result.description}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Issued Date<span style="color:red">*</span></label>
        <input v-model="requestData.documentIssueDate" type="date" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Expiry Date<span style="color:red">*</span></label>
        <input v-model="requestData.expiryDateOfDoc" type="date" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Account Number<span style="color:red">*</span></label>
        <input v-model="requestData.accountNbr" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Name on Card<span style="color:red">*</span></label>
        <input v-model="requestData.nameOnCard" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Socio Prof Code<span style="color:red">*</span></label>
        <select v-model="requestData.socioProfCode" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in socioProf" :key="index" :value="result.socioCode">{{result.description}}</option>
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
import Status from "../../../components/Status/Status2";
import {mapGetters} from "vuex";
import axios from "axios";
export default {
  name: "ActivityForm1",
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
      }
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
      const companyProduct = await axios.get(this.getUrl + '/api/CardProductSetup')
     const product = await companyProduct.data.find(x => { return x.companyId == parseInt(user.companyId) })
       const formData ={
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
        "dateOfBirth": this.requestData.dateOfBirth,
        "addressLine1": this.requestData.addressLine1,
        "addressLine2": this.requestData.addressLine2,
        "cityCode": this.requestData.cityCode,
        "regionCode":this.requestData.regionCode,
        "countryCode": this.requestData.countryCode,
        "legalID": this.requestData.legalID,
        "idCardTypeCode": this.requestData.idCardTypeCode,
        "documentIssueDate": this.requestData.documentIssueDate,
        "expiryDateOfDoc": this.requestData.expiryDateOfDoc,
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
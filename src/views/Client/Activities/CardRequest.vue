<template>
 <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
 <div class="admin-top-bar">
        <div class="admin-top-bar-left">
        <router-link to="activities"><div class="settings-icon"></div></router-link>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
      </div>
      </div>
               <div class="content-header">Instant Card Request</div>
      <form @submit.prevent="sendRequest">
              <div class="form-flex">
                         <div class="form-flex-col-3">
                <label class="login-label">Title<span style="color:red">*</span></label>
        <select v-model="form.title" style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(result, index) in titles" :key="index" :value="result.titleName">{{result.titleName}}</option>        
            </select>
          </div>
           <div class="form-flex-col-3">
                <label class="login-label">First Name<span style="color:red">*</span></label>
        <input v-model="form.firstName" type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
             <div class="form-flex-col-3">
                <label class="login-label">Middle Name<span style="color:red">*</span></label>
        <input v-model="form.middleName" type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
          <div class="form-flex-col-3">
                <label class="login-label">Last Name<span style="color:red">*</span></label>
        <input v-model="form.lastName" type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
          <div class="form-flex-col-3">
                <label class="login-label">Gender<span style="color:red">*</span></label>
        <select v-model="form.gender" style="marginBottom: 30px" class="app-select w-select">
            <option  v-for="(result, index) in gender" :key="index" :value="result">{{result}}</option>    
            </select>
          </div>
           <div class="form-flex-col-3">
                <label class="login-label">Marital Status<span style="color:red">*</span></label>
        <select v-model="form.maritalStatus" style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(result, index) in maritalStatus" :key="index" :value="result.name">{{result.name}}</option>           
            </select>
          </div>
            <div class="form-flex-col-3">
                <label class="login-label">Mobile No<span style="color:red">*</span></label>
        <input v-model="form.mobileNo" type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
            <div class="form-flex-col-3">
                <label class="login-label">Email Address<span style="color:red">*</span></label>
        <input v-model="form.email" type="email" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
           <div class="form-flex-col-3">
                <label class="login-label">Date of Birth<span style="color:red">*</span></label>
        <input v-model="form.dateOfBirth" type="date" class="app-text-field w-input" required placeholder="Type Here" />
          </div>

           <div class="form-flex-col-3">
                <label class="login-label">Address Line 1<span style="color:red">*</span></label>
        <input v-model="form.addressLine1" type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
            <div class="form-flex-col-3">
                <label class="login-label">Address Line 2</label>
        <input v-model="form.addressLine2" type="text" class="app-text-field w-input" placeholder="Type Here" />
          </div>
             <div class="form-flex-col-3">
                <label class="login-label">Country<span style="color:red">*</span></label>
        <select v-model="form.countryCode" style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(result, index) in countries" :key="index" :value="result.countryCode">{{result.counrtyName}}</option>         
            </select>
          </div>
           <div class="form-flex-col-3">
                <label class="login-label">State<span style="color:red">*</span></label>
        <select v-model="form.regionCode" @change="fetchStateCities($event)" style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(result, index) in states" :key="index" :value="result.code">{{result.name}}</option>    
                  <option value="0">Married</option>        
            </select>
          </div>
            <div class="form-flex-col-3">
                <label class="login-label">City<span style="color:red">*</span></label>
        <select v-model="form.cityCode" style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(result, index) in stateCities" :key="index" :value="result.code">{{result.name}}</option>     
            </select>
          </div>
           <div class="form-flex-col-3">
                <label class="login-label">Legal ID Number<span style="color:red">*</span></label>
                 <input v-model="form.legalID" type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
                     <div class="form-flex-col-3">
                <label class="login-label">ID Type<span style="color:red">*</span></label>
        <select v-model="form.idCardTypeCode" style="marginBottom: 30px" class="app-select w-select">
 <option  v-for="(result, index) in idCardType" :key="index" :value="result.code">{{result.description}}</option>       
            </select>
          </div>
          <div class="form-flex-col-3">
                <label class="login-label">Issued Date<span style="color:red">*</span></label>
        <input v-model="form.documentIssueDate" type="date" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
          <div class="form-flex-col-3">
                <label class="login-label">Expiry Date<span style="color:red">*</span></label>
        <input v-model="form.expiryDateOfDoc" type="date" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
          <div class="form-flex-col-3">
                <label class="login-label">Account Number<span style="color:red">*</span></label>
        <input v-model="form.accountNbr" type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
          <div class="form-flex-col-3">
                <label class="login-label">Name on Card<span style="color:red">*</span></label>
        <input v-model="form.nameOnCard" type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
                               <div class="form-flex-col-3">
                <label class="login-label">Socio Prof Code<span style="color:red">*</span></label>
        <select v-model="form.socioProfCode" style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(result, index) in socioProf" :key="index" :value="result.socioCode">{{result.description}}</option>        
            </select>
          </div>

          
      </div>
       <button type="submit" class="app-form-button">Submit</button>
      </form>
            </div>
            <div class="app-admin-col-3">
              <Rightbar />
            </div>
          </div>
</template>

<script>
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
import operationMixen from "../../operationMixen.js";
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status2'
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
      Loader,
     Status
  },
      computed:{
    ...mapGetters([ 'getUrl2' ])
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
    clearForm(){
    this.form.title= "";
    this.form.firstName= "";
    this.form.middleName= "";
    this.form.lastName= "";
    this.form.gender= "";
    this.form.maritalStatus= "";
    this.form.mobileNo= "";
    this.form.email= "";
    this.form.dateOfBirth= "";
    this.form.addressLine1= "";
    this.form.addressLine2= "";
    this.form.cityCode= "";
    this.form.regionCode= "";
    this.form.countryCode="";
    this.form.legalID= "";
    this.form.idCardTypeCode= "";
    this.form.documentIssueDate= "";
    this.form.expiryDateOfDoc="";
    this.form.accountNbr="";
    this.form.nameOnCard="";
    this.form.socioProfCode="";
    },
            resetState(){
this.status = false;
    },
        async sendRequest(){
       this.loader = true
         try {
           
             const response = await axios.post(this.getUrl2 + 'api/CardRequest/makecardrequest',[this.form])
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
a {
    text-decoration: none;
}
.activity-card-header {
  margin-bottom: 15px;
  color: #262626;
  font-size: 14px;
  font-weight: 700;
}
.activity-btn{
    background: #c00;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    color: white;
    width: 100px;
}
</style>
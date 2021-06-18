<template>
  <Loader v-show="loader"/>
  <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
  <div class="content-header">Instant Card Request</div>
  <br/><br/>
  <form @submit.prevent="sendJson">
      <label for="myfile">Bulk Upload</label>
<input class="bulk-upload" ref="myfiles" type="file" id="myfile" name="myfile" accept=".xls, .xlsx" required>
<br>
  <button type="submit" class="app-form-button">Submit</button>
  </form>

  <div class="app-divider"></div>
  <form @submit.prevent="sendRequest">
    <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label">Title<span style="color:red">*</span></label>
        <select v-model="form.title" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in titles" :key="index" :value="result.titleCode">{{result.titleName}}</option>
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
        <input v-model="form.lastName" @blur="populateCardName" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Gender<span style="color:red">*</span></label>
        <select v-model="form.gender" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in gender" :key="index" :value="result.code">{{result.name}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Marital Status<span style="color:red">*</span></label>
        <select v-model="form.maritalStatus" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in maritalStatus" :key="index" :value="result.code">{{result.name}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Mobile No<span style="color:red">*</span></label>
        <input minlength="13" maxlength="13" v-model="form.mobileNo" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Email Address<span style="color:red">*</span></label>
        <input v-model="form.email" type="email" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Date of Birth<span style="color:red">*</span></label>
        <input v-model="form.dateOfBirth" type="date" max="2005-12-31" class="app-text-field w-input" required placeholder="Type Here" />
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
        <input minlength="10" maxlength="10" v-model="form.accountNbr" type="text" class="app-text-field w-input" required placeholder="Type Here" />
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
</template>

<script>
import operationMixen from "../../views/operationMixen.js";
import Leftbar from "../Client/leftbar/leftbar";
import Rightbar from "../Client/rightbar/rightbar";
import Loader from "../Loader/Loader";
import Status from "../Status/Status2";
import {mapGetters} from "vuex";
import axios from "axios";
import {readExcel} from '../../importExcel.js'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: "ActivityForm1",

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
      uploadFile:null,
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
        "mobileNo": "234",
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
       arry:[]
    }
  },
  methods: {
    populateCardName(){
     this.form.nameOnCard = this.form.firstName + " " + this.form.lastName
    },
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
    async sendJson(){    
     var selectedFile = this.$refs.myfiles.files[0]
                    var reader = new FileReader();
                    reader.onload = function(event) {
                      var data = event.target.result;
                      var workbook = XLSX.read(data, {
                          type: 'binary'
                      });
                      workbook.SheetNames.forEach( async function(sheetName) {                  
                          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                          var json_object = JSON.parse(JSON.stringify(XL_row_object))
                          document.getElementById("jsonObject").innerHTML = json_object;

                       const newData = json_object.map( x => {
                         return{
                                   "productCode": x.productCode,
                                  "branchNo": x.branchNo,
                                  "companyId": parseInt(x.companyId),
                                  "userId": parseInt(x.userId),
                                  "title": x.title,
                                  "firstName": x.firstName,
                                  "middleName": x.middleName,
                                  "lastName": x.lastName,
                                  "gender": x.gender,
                                  "maritalStatus": x.maritalStatus,
                                  "mobileNo": x.mobileNo,
                                  "email": x.email,
                                  "dateOfBirth": x.dateOfBirth,
                                  "addressLine1": x.addressLine1,
                                  "addressLine2": x.addressLine2,
                                  "cityCode": x.cityCode,
                                  "regionCode":x.regionCode,
                                  "countryCode": x.countryCode,
                                  "legalID": x.legalID,
                                  "idCardTypeCode": x.idCardTypeCode,
                                  "documentIssueDate": x.documentIssueDate,
                                  "expiryDateOfDoc": x.expiryDateOfDoc,
                                  "accountNbr": x.accountNbr,
                                  "nameOnCard": x.nameOnCard,
                                  "socioProfCode": x.socioProfCode
                         }
                       })
                       const formData = newData
         try{
        const response = await axios.post('https://cors-zenith.herokuapp.com/https://webservicestest.zenithbank.com:8443/CardPortalOperations/api/CardRequest/makecardrequest',formData, {
                  headers: {
                      "Content-Type": "application/json"
                  }
              })
        if(response.data[0].responseCode == "00"){
            alert("Successful")
        }
        else{
         alert("Failed")
        }
      } catch (error) {
         alert("Failed")
      }
                        })
                    };

                    reader.onerror = function(event) {
                      console.error("File could not be read! Code " + event.target.error.code);
                    };

                    reader.readAsBinaryString(selectedFile);
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
        "title": this.form.title,
        "firstName": this.form.firstName,
        "middleName": this.form.middleName,
        "lastName": this.form.lastName,
        "gender": this.form.gender,
        "maritalStatus": this.form.maritalStatus,
        "mobileNo": this.form.mobileNo,
        "email": this.form.email,
        "dateOfBirth": moment(this.form.dateOfBirth).format('DD-MM-YYYY'),
        "addressLine1": this.form.addressLine1,
        "addressLine2": this.form.addressLine2,
        "cityCode": this.form.cityCode,
        "regionCode":this.form.regionCode,
        "countryCode": this.form.countryCode,
        "legalID": this.form.legalID,
        "idCardTypeCode": this.form.idCardTypeCode,
        "documentIssueDate": moment(this.form.documentIssueDate).format('DD-MM-YYYY'),
        "expiryDateOfDoc": moment(this.form.expiryDateOfDoc).format('DD-MM-YYYY'),
        "accountNbr": this.form.accountNbr,
        "nameOnCard": this.form.nameOnCard,
        "socioProfCode": this.form.socioProfCode
      }
      try {
        const response = await axios.post(this.getUrl2 + 'api/CardRequest/makecardrequest',[formData])
        if(response.data[0].responseCode == "00"){
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
          this.message = response.data[0].responseMessage
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
.bulk-upload{
  background:rgb(236, 236, 236);
  color: rgb(44, 44, 44);
  border: 1px dashed grey;
  padding: 40px;
  border-radius: 5px;
  text-align: center;
  margin: 10px 0 20px 0;
  transition: all .2s;
  cursor: pointer;
}
.bulk-upload:hover{
  border: 1px dashed rgb(132, 96, 96);
  background:rgb(255, 245, 245);
}
.app-divider{
  height: 2px;
  width: 100%;
  background: rgb(228, 228, 228);
  margin: 20px 0;
}
</style>
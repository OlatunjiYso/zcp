<template>
  <Loader v-show="loader"/>
  <Status :state="state"  :message = "message" :resetState="resetState" v-if="status"/>
  <div style="display:none" id="bulk-loader">
    <Loader/>
  </div>
          <div style="z-index : 999999;display:none" class="app-modal-overlay"  id="bulk-status-success">
    <div class="app-modal-div success" style="text-align:center">
    <div> <div class="alert-icon"></div> <div class="alert-message" >Request sent successfully</div> 
     <div @click="resetState2" style="margin-top:30px;cursor:pointer" class="app-modal-button">Close</div>
    </div> 
    </div>
  </div>

            <div style="z-index : 999999;display:none" class="app-modal-overlay" id="bulk-status-failed">
    <div class="app-modal-div success" style="text-align:center">            
     <div> 
            <div class="alert-icon failed"></div>
            <div class="alert-message" id="error-text">Operation Failed - Invalid File</div>
            <div @click="resetState3" style="margin-top:30px;cursor:pointer" class="app-modal-button">Try Again</div>
            </div>
    </div>
  </div>

  <div class="content-header">Instant Card Request</div>
  <br/>
   <div @click="isBulk = !isBulk" style="cursor:pointer;background:#c00;float:left;" class="table-btn">{{isBulk ? 'Single Upload' : 'Bulk Upload'}}<span class="table-button-icon"></span></div>
   <br/><br/><br/>
  <form @submit.prevent="sendJson" v-if="isBulk">
      <label for="myfile">Bulk Upload</label>
<input class="bulk-upload" ref="myfiles" type="file" id="myfile" name="myfile" accept=".xls, .xlsx" required>
<br>
  <button v-show ="isActiveBtn" type="submit" class="app-form-button">Submit</button>
  </form>
  <form @submit.prevent="sendRequest" v-else>
    <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label">Title<span style="color:red">*</span></label>
        <select required v-model="form.title" style="marginBottom: 30px" class="app-select w-select">
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
        <select required v-model="form.gender" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in gender" :key="index" :value="result.code">{{result.name}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Marital Status<span style="color:red">*</span></label>
        <select required v-model="form.maritalStatus" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in maritalStatus" :key="index" :value="result.code">{{result.name}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Mobile No<span style="color:red">*</span></label>
        <input  maxlength="13" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" v-model="form.mobileNo" type="text" class="app-text-field w-input" required placeholder="Type Here" />
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
        <select required v-model="form.countryCode" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in countries" :key="index" :value="result.countryCode">{{result.counrtyName}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">State<span style="color:red">*</span></label>
        <select required v-model="form.regionCode" @change="fetchStateCities($event)" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in states" :key="index" :value="result.code">{{result.name}}</option>       
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">City<span style="color:red">*</span></label>
        <select required v-model="form.cityCode" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in stateCities" :key="index" :value="result.code">{{result.name}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Legal ID Number<span style="color:red">*</span></label>
        <input v-model="form.legalID" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">ID Type<span style="color:red">*</span></label>
        <select required v-model="form.idCardTypeCode" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in idCardType" :key="index" :value="result.code">{{result.description}}</option>
        </select>
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Issued Date<span style="color:red">*</span></label>
        <input v-model="form.documentIssueDate" :max="todayDate" type="date" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Expiry Date<span style="color:red">*</span></label>
        <input v-model="form.expiryDateOfDoc" :min="newSorted" type="date" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Account Number<span style="color:red">*</span></label>
        <input  maxlength="13" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" v-model="form.accountNbr" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Name on Card<span style="color:red">*</span></label>
        <input v-model="form.nameOnCard" type="text" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Socio Prof Code<span style="color:red">*</span></label>
        <select required v-model="form.socioProfCode" style="marginBottom: 30px" class="app-select w-select">
          <option  v-for="(result, index) in socioProf" :key="index" :value="result.socioCode">{{result.description}}</option>
        </select>
      </div>


    </div>
    <button v-show ="isActiveBtn" type="submit" class="app-form-button">Submit</button>
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
  mixins: [operationMixen],
  data(){
    return{
      isBulk: false,
      todayDate:  new Date().toISOString().split("T")[0],
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
        "countryCode": "566",
        "legalID": "",
        "idCardTypeCode": "",
        "documentIssueDate": null,
        "expiryDateOfDoc": null,
        "accountNbr": "",
        "nameOnCard": "",
        "socioProfCode": ""
      },
       arry:[],
       ismounted:false,
       isActiveBtn: false
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
    computed:{
    ...mapGetters([ 'getUrl2', 'getUrl' ]),
    newSorted(){
      if(this.ismounted){
            const issueDate = new Date();
            const d = issueDate.setDate(issueDate.getDate() + 1);
      const momentDate =  moment(issueDate).format('DD-MM-YYYY');
       const a = new Date(d).toISOString().substr(0,10);

      return a;
            
      }

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
        resetState2(){
       document.getElementById("bulk-status-success").style.display = "none";
    },
            resetState3(){
       document.getElementById("bulk-status-failed").style.display = "none";
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
                       
                       
                         const user = JSON.parse(localStorage.getItem("user-mfb"))
                        const company = await axios.get('https://epmalive.africa.int.zenithbank.com/CardportalSecurityAPi/api/companies/' + parseInt(user.companyId))
                          const companyProduct = await axios.get('https://epmalive.africa.int.zenithbank.com/CardportalSecurityAPi/api/CardProductSetup')
                        const product = await companyProduct.data.find(x => { return x.companyId == parseInt(user.companyId) })

                       const newData = json_object.map( x => {
                         return{      
                                  "productCode": product.cardProductCode,
                                  "branchNo": company.data.branch,
                                  "companyId": parseInt(user.companyId),
                                  "userId": parseInt(user.id),
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

                             const newData2 = json_object.map( x => {
                         return{      
                                  "productCode": product.cardProductCode,
                                  "branchNo": company.data.branch,
                                  "companyId": parseInt(user.companyId),
                                  "userId": parseInt(user.id),
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
    
    var sorted_arr = newData.sort();
    var valResults = [];
    for (var i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1].accountNbr === sorted_arr[i].accountNbr) {
            valResults.push(sorted_arr[i].accountNbr);
           
        }
    }

        var sorted_arr2 = newData.sort();

      const newSorted =  sorted_arr2.map(s => {
          return {
           "documentIssueDate": new Date(s.documentIssueDate).toISOString().substr(0,10),
            "expiryDateOfDoc": new Date(s.expiryDateOfDoc).toISOString().substr(0,10)
          }
        })

    var valResults2 = [];
    for (var i = 0; i < newSorted.length - 1; i++) {
        if (newSorted[i].expiryDateOfDoc < newSorted[i].documentIssueDate) {
     
            valResults2.push(newSorted[i]);
        }
    }

   const formData = newData2

   if(valResults.length <= 0 ){

        if(valResults2.length <= 0){

              try{
         document.getElementById("bulk-loader").style.display = "block";
        const response = await axios.post('https://epmalive.africa.int.zenithbank.com/CardportalOperation/api/CardRequest/makecardrequest',formData, {
                  headers: {
                      "Content-Type": "application/json"
                  }
              })
        if(response.data[0].responseCode == "00"){
          document.getElementById("bulk-loader").style.display = "none";
           document.getElementById("bulk-status-success").style.display = "flex";
        }
        else{
          console.log("400")
           document.getElementById("bulk-loader").style.display = "none";
        document.getElementById("bulk-status-failed").style.display = "flex";
        }
      } catch (error) {
        console.log("500")
         document.getElementById("bulk-loader").style.display = "none";
         document.getElementById("bulk-status-failed").style.display = "flex";
      }
   }

      else{
     document.getElementById("bulk-status-failed").style.display = "flex";
     document.getElementById("error-text").innerHTML = "Expiry Date is less than Issue Date";
   }

   }
                      
   else{
     document.getElementById("bulk-status-failed").style.display = "flex";
     document.getElementById("error-text").innerHTML = "Multiple account number instants";
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
      const companyProduct = await axios.get(this.getUrl + 'api/CardProductSetup')
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
          this.message = 'Request submitted Sucessfully'
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
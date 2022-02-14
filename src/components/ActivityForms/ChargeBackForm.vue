<template>
  <Loader v-show="loader"/>
  <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
     <ViewDetails v-show="viewDetails" :closeModal="closeModal" :viewDetailsData="viewDetailsData" />
  <div class="content-header">Charge Back Request </div>
  <form @submit.prevent="sendRequest">
    <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label">Account Number<span style="color:red">*</span></label>
        <input  v-model="form.accountNumber" type="text" class="app-text-field w-input" id="" placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Last 6 Digits of Card<span style="color:red">*</span></label>
        <input maxlength="6" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" v-model="form.last_6_digits_of_card" type="text" class="app-text-field w-input" id="" placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Amount<span style="color:red">*</span></label>
        <input v-model="form.amount" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" type="text" class="app-text-field w-input" id="" placeholder="Type Here" />
      </div>
            <div class="form-flex-col-3">
        <label class="login-label">Start Date<span style="color:red">*</span></label>
        <input v-model="form.startDate" type="date" class="app-text-field w-input" id="" placeholder="Type Here" />
      </div>
    </div>
        <br><br>
    <button type="submit" class="app-form-button">Search</button>
  </form>
    <br><br>
    <div v-if="!disputeData.length <= 0">
   <table class="app-table2">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">.</th>
                           <th class="app-table2-header">Id</th>
                           <th class="app-table2-header">Account Id</th>
                           <th class="app-table2-header">Card Pan</th>
                           <th class="app-table2-header">Trans.Type</th>
                           <th class="app-table2-header">Source Amount</th>
                           <th class="app-table2-header"> Response</th>
                           <th class="app-table2-header">Channel</th>
                           <th class="app-table2-header">Date</th>
                           <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in disputeData" :key="index" class="app-table2-row">
                           <td class="app-table2-data"><input @click="selectDispute(result)" :id="`Dis${result.id}`" type="checkbox" value="test" /></td>
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.account_id}}</td>
                            <td class="app-table2-data">{{result.pan}}</td>
                            <td class="app-table2-data">{{result.tran_type}}</td> 
                            <td class="app-table2-data">{{result.source_node_amount_requested}}</td>
                            <td class="app-table2-data">{{result.rsp_code_req_rsp}}</td>  
                            <td class="app-table2-data">{{result.channel}}</td>  
                            <td class="app-table2-data">{{result.transactioN_LOCAL_DATE}}</td>
                            <td class="app-table2-data">
                                   <div @click="openModal(result)" style="cursor:pointer" class="table-btn">View<span class="table-button-icon"></span></div>
                            </td> 
                        </tr>
                        
                    </tbody>
          
                </table>
                <br><br>
                  <form @submit.prevent="initiateDispute" v-if="listDispute.length > 0">
    <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label">Transaction Date<span style="color:red">*</span></label>
        <input v-model="form2.transDate" type="date" class="app-text-field w-input" id="" placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Log Reason<span style="color:red">*</span></label>
        <input v-model="form2.logReason" type="text" class="app-text-field w-input" id="" placeholder="Type Here" />
      </div>
      <div class="form-flex-col-3">
        <label class="login-label">Comments<span style="color:red">*</span></label>
        <input v-model="form2.comment" type="text" class="app-text-field w-input" id="" placeholder="Type Here" />
      </div>
       <div class="form-flex-col-3">
        <label class="login-label">Number of Debit<span style="color:red">*</span></label>
        <input v-model="form2.noofdebits" type="number" class="app-text-field w-input" id="" placeholder="Type Here" />
      </div>

    </div>
        <br><br>
      <button @click="initiateDispute" class="app-form-button">Initiate Dispute</button>
  </form>

    </div>
</template>

<script>
import Leftbar from "../Client/leftbar/leftbar";
import Rightbar from "../Client/rightbar/rightbar";
import Loader from "../Loader/Loader";
import Status from "../Status/Status2";
import {mapGetters} from "vuex";
import moment from 'moment'
import axios from "axios";
import ViewDetails from './ViewDispute'
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
            viewDetails: false,
      transData: [],
      viewDetailsData:'',
      loader: false,
      status: false,
      state: null,
      message: null,
      form:{
        "accountNumber": "",
        "last_6_digits_of_card": "",
        "amount":"",
        "startDate": ""
      },
      form2:{
           "listdispute": "",
           "transDate": "",
            "logReason": "",
            "contact": "",
            "email": "",
            "comment": "",
            "noofdebits": 0,
            "receipt_present": false
      },
      reason:[],
      disputeData:[],
      listDispute:[],
      callerData:''
    }
  },
  async created(){
      const user = JSON.parse(localStorage.getItem("user-mfb"))
  const response = await axios.post(this.getUrl2 + 'api/DispenseErrorCaller/GetCallerId/' + user.companyId)
  this.callerData = response.data
  console.log(response.data)
  },
  methods: {
    clearForm(){
      this.form.accountNumber= "";
      this.form.last_6_digits_of_card= "";
      this.form.amount= "";
    },
    resetState(){
      this.status = false;
    },
    async initiateDispute(){
 this.loader = true;
       const formData =
 {
  "username": this.callerData.mfbCallerUsername,
  "password": this.callerData.mfbCallerPassword,
  "initiateDispenseRequest": {
    "listdispute": this.listDispute,
   "transDate": moment(this.form2.transDate).format('YYYY-MM-DD'),
   "logReason": this.form2.logReason,
    "comment": this.form2.comment,
    "noofdebits": parseInt(this.form2.noofdebits),
  }
}
      try {
        const response = await axios.post(this.getUrl2 + 'api/DispenseErrorCaller/InitiateDistpute',formData)
        if(response.data.responseCode == "00"){
           this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'Operation Sucessful'
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

 async selectDispute(result){
       var checkbox = document.getElementById(`Dis${result.id}`);
       const state = await this.listDispute.some(x => { return x.trans_id == result.trans_id })
       console.log(state)
      if (state == false && checkbox.checked == true){
    console.log("checked") ;
    this.listDispute.push({
                    "account_id": result.account_id,
                    "amount_requested": result.source_node_amount_requested,
                    "pan": result.pan,
                    "create_dt": result.datE_CREATE,
                    "in_req": result.in_req,
                    "flag": result.flag,
                    "source_node_sys_trace": result.source_node_sys_trace,
                    "tran_nr": result.tran_nr
    });
  }
  else{
      console.log("unchecked")
     const newIndex = this.listDispute.findIndex( x => { return x.trans_id == result.trans_id})

       await this.listDispute.splice(newIndex, 1); 
   
      }

    },


    async sendRequest(){
      this.loader = true;
       const formData ={
  "username": this.callerData.mfbCallerUsername,
  "password": this.callerData.mfbCallerPassword,
  "searchDispense": {
    "acctNo": this.form.accountNumber,
    "last_6_digits_of_card": this.form.last_6_digits_of_card,
    "startDate": moment(this.form.startDate).format('YYYY-MM-DD'),
    "amount": parseInt(this.form.amount)
  }

       }
      try {
        const response = await axios.post(this.getUrl2 + 'api/DispenseErrorCaller/SearchDistpute',formData)
        if(response.data.responseCode == "00"){
          this.loader = false;
          this.disputeData = response.data.data
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
                openModal(result){
                console.log(result)
   this.viewDetailsData = result
   this.viewDetails = true
  },
    closeModal(){
   this.viewDetails = false
  },
  },
}
</script>

<style scoped>

</style>
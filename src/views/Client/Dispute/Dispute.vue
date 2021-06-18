<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
                           <Loader v-show="loader"/>
  <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
   <ViewDetails v-show="viewDetails" :closeModal="closeModal" :viewDetailsData="viewDetailsData" />
 <div class="admin-top-bar">
        <div class="admin-top-bar-left">
        <router-link to="/client/activity-requests"><div class="settings-icon"></div></router-link>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
      </div>
      </div>
  <div class="content-header">Dispute Requests </div>
  <form @submit.prevent="sendRequest">
    <div class="form-flex">
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
    <div v-if="!disputeData.length <= 0">
   <table class="app-table2">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">S/N</th>
                           <th class="app-table2-header">Trans Id</th>
                           <th class="app-table2-header">Card Pan</th>
                           <th class="app-table2-header">Amount</th>
                           <th class="app-table2-header"> Contact</th>
                           <th class="app-table2-header">Trans Date</th>
                            <th class="app-table2-header">Status</th>
                             <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in disputeData" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.trans_id}}</td>
                            <td class="app-table2-data">{{result.pan}}</td>
                             <td class="app-table2-data">{{result.amount}}</td>
                            <td class="app-table2-data">{{result.contact}}</td>    
                            <td class="app-table2-data">{{result.trans_dt}}</td>
                             <td class="app-table2-data">{{result.status}}</td> 
                             <td class="app-table2-data">
                                   <div @click="openModal(result)" style="cursor:pointer" class="table-btn">View<span class="table-button-icon"></span></div>
                            </td> 
                        </tr>
                        
                    </tbody>
          
                </table>
    </div>
            </div>
             <!-- <div class="app-admin-col-3">
              <Rightbar />
            </div> -->
            </div>
</template>

<script>
import Leftbar from "../../../components/Client/leftbar/leftbar";
import Rightbar from "../../../components/Client/rightbar/rightbar";
import Loader from "../../../components/Loader/Loader";
import Status from "../../../components/Status/Status2";
import {mapGetters} from "vuex";
import axios from "axios";
import moment from 'moment'
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
    ...mapGetters([ 'getUrl3','getUrl2', 'getUrl' ])
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
        "startDate": "",
        "endDate": ""
      },
      reason:[],
      disputeData:[],
      callerData:''
    }
  },
    async created(){
  // const response = await axios.post(this.getUrl2 + 'api/DispenseErrorCaller/GetCallerId/' + result.id)
  // this.callerData = response.data
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
    async sendRequest(){
      this.loader = true;

     const formData = {
  "username": "WEB",
  "password": "WEB4321",
  "startDate":  moment(this.form.startDate).format('YYYY-MM-DD'),
  "endDate":  moment(this.form.endDate).format('YYYY-MM-DD'),
}
      try {
        const response = await axios.post(this.getUrl2 + 'api/DispenseErrorCaller/GetInitiatedDistpute',formData)
        
        if(response.data.responseCode == "00"){
          this.loader = false;
          this.disputeData = response.data.data.data
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
a{text-decoration: none;}
</style>
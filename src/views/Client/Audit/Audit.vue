<template>
            <div class="app-admin-section">
                  <Loader v-show="loader"/>
  <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
       <ViewDetails v-show="viewDetails" :closeModal="closeModal" :viewDetailsData="viewDetailsData" />
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
        <div class="app-admin-col-2">
        <div class="admin-top-bar">
        <div class="admin-top-bar-left">
         <router-link to="/client/activity-requests"><div class="settings-icon"></div></router-link>
        </div>
         <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{getDate}}</div>
        </div>
      </div>
  <div class="content-header">Audit</div>
  <form @submit.prevent="sendRequest">
    <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label">Select a User<span style="color:red">*</span></label>
        <select v-model="form.userId" style="marginBottom: 30px" class="app-select w-select">
             <option v-for="(item,index) in getCompanyUsers" :key="index" :value="item.id">{{item.firstName}} {{item.lastName}}</option>           
            </select>
          </div>
            <div class="form-flex-col-3">
        <label class="login-label">Start Date<span style="color:red">*</span></label>
        <input v-model="form.startDate" type="date" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
    </div>

    <button type="submit" class="app-form-button">Search</button>
  </form>

     <!-- <div class="app-divider"></div> -->

    <div v-if="!auditData.length <= 0">
         <!-- <div class="app-table-actions">
               <div class="app-table-search">
        
        </div>
          <form @submit.prevent="filterArray" className="app-table-select">
        <input v-model="startDate"  style="margin-right:20px;width:40%" type="date" className="app-modal-form-field w-input"   required/>
         <input v-model="endDate"  style="margin-right:20px;width:40%" type="date" className="app-modal-form-field w-input"   required/>
        <button type="submit" style="margin-right:20px;font-size:15px;cursor:pointer;height:40px;background:#1b1b1b" className="app-icon table-button filter"><span className="table-button-icon"></span></button> 
         <button @click="reload" style="font-size:15px;cursor:pointer;height:40px;" className="app-icon table-button filter"><span className="table-button-icon"></span></button> 
          </form>
      </div> -->
   <table class="app-table2">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">S/N</th>
                           <th class="app-table2-header">Activity Name</th>
                           <th class="app-table2-header">Activity Requests</th>
                           <th class="app-table2-header">Workflow Name</th>
                           <th class="app-table2-header">Date</th>
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in auditData" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.activityName}}</td>
                            <td class="app-table2-data"> <div @click="openModal(result.activityRequest)" style=" float: none;cursor:pointer" class="table-btn">View</div></td>
                            <td class="app-table2-data">{{result.workflowName}}</td> 
                            <td class="app-table2-data">{{result.create_at}}</td>
                        </tr>
                        
                    </tbody>
          
                </table>
                <br><br>
    </div>
        </div>
      <!-- <div class="app-admin-col-3">
              <Rightbar />
            </div> -->
</div>
</template>

<script>
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status2'
import {mapGetters} from "vuex";
import axios from "axios";
import ViewDetails from './ViewAudit'
import moment from 'moment'
export default {
  components: {
    Leftbar,
    Rightbar,
    Loader,
    Status,
    ViewDetails
  },
  data(){
    return{
      loader: false,
      status: false,
      state: null,
      message: null,
      form:{
        "userId": "",
        "startDate": "",
      },
      reason:[],
      listDispute:[],
      cardData:'',
      accError:false,
      viewDetails: false,
      auditData: [],
      viewDetailsData:'',
              startDate:'',
        endDate:'',
    }
  },
    computed:{
    ...mapGetters([ 'getUrl2','getCompanyUsers', 'getUrl' ])
  },
  created(){
      this.$store.dispatch('getCompanyUsers')
  },
  methods: {
          reload(){
  this.auditData = this.backupData
    },
    filterArray(){
      this.loading = true

      const a = new Date(this.startDate).toISOString().substr(0,10);
       const b = new Date(this.endDate).toISOString().substr(0,10);

    const filtered = this.auditData.filter( x => {
      const transDate = new Date(x.create_at).toISOString().substr(0,10)
      return transDate >= a && transDate <= b ;
    })
    this.auditData = filtered
    this.loading = false;
    },
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

    async sendRequest(){
      this.loader = true;
      const user = JSON.parse(localStorage.getItem("user-mfb"))
       const formData ={
            "companyId": user.companyId,
            "clientCode": this.form.clientCode,
            "userId": user.id,
            "startDate":  this.form.startDate,
            "endDate":  this.form.endDate
       }
      try {
        const response = await axios.get(this.getUrl2 + 'api/Audit/auditbyuserid/' + user.companyId + '/' + this.form.userId + '/' + moment(this.form.startDate).format('YYYY-MM-DD'))
          this.loader = false;
          this.auditData = response.data
          this.backupData = response.data

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
a{text-decoration: none;}
.app-divider{
  height: 2px;
  width: 100%;
  background: rgb(228, 228, 228);
  margin: 20px 0;
}
</style>
<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
        <div class="app-admin-col-2">
          <Loader v-show="globalLoader"/>
        <div class="admin-top-bar">
        <div class="admin-top-bar-left">
         <router-link to="/client/activity-requests"><div class="settings-icon"></div></router-link>
        <div  @click = "switchView('All')" class="admin-top-barlinks" :class="[ AllView ? activeClass : '']">All Stock Requests</div>
        <div v-show="checkPerm('Activity_Requests')" @click = "switchView('Approval')" class="admin-top-barlinks" :class="[ ApprovalView ? activeClass : '']">Pending Approval</div>
        <div v-show="checkPerm('Activity_Requests')" @click = "switchView('Acknowledge')" class="admin-top-barlinks" :class="[ AcknowledgeView ? activeClass : '']">Pending Acknowledgement</div>
        <div v-show="checkPerm('Make_Requests')" @click = "switchView('Rejected')" class="admin-top-barlinks" :class="[ RejectedView ? activeClass : '']">Rejected Requests</div>
        </div>
         <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{getDate}}</div>
        </div>
      </div>
       <div v-show="AllView">
        <All :AllLoader="AllLoader" :AllRequests="AllRequests" @updateRequests = "updateAllRequest" @reloadRequests = "reloadAllRequest"/> 
        </div>
        <div v-show="ApprovalView">
        <Approval :approvalLoader="approvalLoader" :ApprovalRequests="ApprovalRequests"/> 
        </div>
            <div v-show="AcknowledgeView">
           <Acknowledge :AcknowledgeLoader="AcknowledgeLoader" :AcknowledgeRequests="AcknowledgeRequests"/>       
            </div>
             <div v-show="RejectedView">
           <Rejected :RejectLoader="RejectLoader" :RejectRequests="RejectRequests"/>       
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
import Approval from './Approval'
import Acknowledge from './Acknowledge'
import All from './All'
import Rejected from './RejectedRequest'
import axios from 'axios'
import {mapGetters} from 'vuex'
import global from '../../../views/common.js'
import Loader from '../../../components/Loader/Loader'
export default {
  mixins:[global],
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    Approval,
    Acknowledge,
    All,
    Rejected,
    Loader
  },
  data(){
      return{
        selectedTab: '',
        AllView: true,
        ApprovalView: false,
        AcknowledgeView: false,
        RejectedView:false,
        activeClass:'admin-active-top-link',
        ApprovalRequests:[],
        AcknowledgeRequests:[],
        AllRequests:[],
        RejectRequests:[],
        AllLoader: false,
        approvalLoader: false,
        AcknowledgeLoader: false,
        RejectLoader: false,
        globalLoader:false
      }
  },
        computed:{
    ...mapGetters([ 'getUrl2', 'getCardSetup' ]),
    getDate: function(){
      var today = new Date();
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var date = today.getDate() + ', ' + months[today.getMonth()]+ ' ' +today.getFullYear()
      return date
    }
    },
  async created(){
     this.globalLoader = true;
     await this.$store.dispatch('getCardSetup')
            await this.$store.dispatch('getRoles')
      await this.getBranch()
      await this.fetchReason();
      await this.fetchCountries();
      await this.fetchStates();
      await this.fetchCities();
      await this.fetchTitles();
      await this.fetchMaritalStatus();
      await this.fetchCardType();
      await this.fetchSocioProf();
      await this.fetchReason();
      await this.fetchCardSetup();
      this.globalLoader = false;
            this.fetchAllRequests()
      this.fetchApprovalRequests();
      this.fetchAcknowledgeRequests();
      this.fetchRejectedRequests()
  }, 
methods:{
  reloadAllRequest(){
  this.fetchAllRequests()
  },
  updateAllRequest(result){
   this.AllRequests = result
  },
    async fetchAllRequests(){
        this.AllLoader = true
         const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + 'api/CardStock/all/'+companyId.companyId);
       const requests = result.data.map(x => { 
         return {
           ...x,
            branchNo : this.branches.length > 0 ? this.branches.find((entry)=>{return x.branchNo === entry.branchNo}).branchName : null,
            cityCode : this.cities.length > 0 ? this.cities.find((entry)=>{return x.cityCode === entry.code}).name : null,
             gender : this.gender.length > 0 ? this.gender.find((entry)=>{return x.gender === entry.code}).name : null,
            countryCode : this.countries.length > 0 ? this.countries.find((entry)=>{return x.countryCode === entry.countryCode}).counrtyName : null,
            regionCode : this.states.length > 0 ? this.states.find((entry)=>{return x.regionCode === entry.code}).name : null,
            idCardTypeCode : this.idCardType.length > 0 ? this.idCardType.find((entry)=>{return x.idCardTypeCode === entry.code}).description : null,
            maritalStatus : this.maritalStatus.length > 0 ? this.maritalStatus.find((entry)=>{return x.maritalStatus === entry.code}).name : null,
             productCode :  this.getCardSetup.length > 0 ? this.getCardSetup.find((entry)=>{return x.productCode === entry.cardProductCode}).description : null,
              socioProfCode : this.socioProf.length > 0 ? this.socioProf.find((entry)=>{return x.socioProfCode === entry.socioCode}).description : null,
               title : this.titles.length > 0 ? this.titles.find((entry)=>{return x.title === entry.titleCode}).titleName : null,
         }
        })
           this.AllRequests = requests;
         this.AllLoader = false;
  },

  async fetchApprovalRequests(){
        this.approvalLoader = true
         const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + 'api/CardStock/pendingApproval/'+companyId.companyId)
 const requests = result.data.map(x => { 
         return {
           ...x,
            branchNo : this.branches.length > 0 ? this.branches.find((entry)=>{return x.branchNo === entry.branchNo}).branchName : null,
            cityCode : this.cities.length > 0 ? this.cities.find((entry)=>{return x.cityCode === entry.code}).name : null,
             gender : this.gender.length > 0 ? this.gender.find((entry)=>{return x.gender === entry.code}).name : null,
            countryCode : this.countries.length > 0 ? this.countries.find((entry)=>{return x.countryCode === entry.countryCode}).counrtyName : null,
            regionCode : this.states.length > 0 ? this.states.find((entry)=>{return x.regionCode === entry.code}).name : null,
            idCardTypeCode : this.idCardType.length > 0 ? this.idCardType.find((entry)=>{return x.idCardTypeCode === entry.code}).description : null,
            maritalStatus : this.maritalStatus.length > 0 ? this.maritalStatus.find((entry)=>{return x.maritalStatus === entry.code}).name : null,
             productCode :  this.cardSetup.length > 0 ? this.cardSetup.find((entry)=>{return x.productCode === entry.cardProductCode}).description : null,
              socioProfCode : this.socioProf.length > 0 ? this.socioProf.find((entry)=>{return x.socioProfCode === entry.socioCode}).description : null,
               title : this.titles.length > 0 ? this.titles.find((entry)=>{return x.title === entry.titleCode}).titleName : null,
         }
        })
           this.ApprovalRequests = requests;
         this.approvalLoader = false
  },
    async fetchAcknowledgeRequests(){
          this.AcknowledgeLoader = true
           const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + 'api/CardStock/pendingacknowledgement/'+companyId.companyId)
 const requests = result.data.map(x => { 
         return {
           ...x,
            branchNo : this.branches.length > 0 ? this.branches.find((entry)=>{return x.branchNo === entry.branchNo}).branchName : null,
            cityCode : this.cities.length > 0 ? this.cities.find((entry)=>{return x.cityCode === entry.code}).name : null,
             gender : this.gender.length > 0 ? this.gender.find((entry)=>{return x.gender === entry.code}).name : null,
            countryCode : this.countries.length > 0 ? this.countries.find((entry)=>{return x.countryCode === entry.countryCode}).counrtyName : null,
            regionCode : this.states.length > 0 ? this.states.find((entry)=>{return x.regionCode === entry.code}).name : null,
            idCardTypeCode : this.idCardType.length > 0 ? this.idCardType.find((entry)=>{return x.idCardTypeCode === entry.code}).description : null,
            maritalStatus : this.maritalStatus.length > 0 ? this.maritalStatus.find((entry)=>{return x.maritalStatus === entry.code}).name : null,
             productCode :  this.cardSetup.length > 0 ? this.cardSetup.find((entry)=>{return x.productCode === entry.cardProductCode}).description : null,
              socioProfCode : this.socioProf.length > 0 ? this.socioProf.find((entry)=>{return x.socioProfCode === entry.socioCode}).description : null,
               title : this.titles.length > 0 ? this.titles.find((entry)=>{return x.title === entry.titleCode}).titleName : null,
         }
        })
           this.AcknowledgeRequests = requests;
               this.AcknowledgeLoader = false
  },
      async fetchRejectedRequests(){
          this.RejectLoader = true
           const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + 'api/CardStock/PendingRejectRequest/'+companyId.companyId)
     const requests = result.data.map(x => { 
         return {
           ...x,
             productCode :  this.cardSetup.length > 0 ? this.cardSetup.find((entry)=>{return x.productCode === entry.cardProductCode}).description : null,

         }
        })
           this.RejectRequests = requests
               this.RejectLoader = false
  },
    
    switchView( selected ){

        if(selected == "All"){
           this.AllView = true
         this.ApprovalView = false
         this.AcknowledgeView = false
           this.RejectedView = false
        }
        else if(selected == 'Approval') {
           this.AllView = false
         this.ApprovalView = true
         this.AcknowledgeView = false
           this.RejectedView = false
        }
        else if(selected == 'Acknowledge') {
          this.AllView = false
         this.ApprovalView = false
         this.AcknowledgeView = true
           this.RejectedView = false
        }
           else if(selected == 'Rejected') {
          this.AllView = false
         this.ApprovalView = false
         this.AcknowledgeView = false
          this.RejectedView = true
        }

    },

}
}
</script>
<style scoped>
a{text-decoration: none;}
</style>
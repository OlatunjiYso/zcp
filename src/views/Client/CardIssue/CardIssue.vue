<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
        <div class="app-admin-col-2">
        <div class="admin-top-bar">
        <div class="admin-top-bar-left">
        <router-link to="/client/activity-requests"><div class="settings-icon"></div></router-link>
        <div  @click = "switchView('All')" class="admin-top-barlinks" :class="[ AllView ? activeClass : '']">All Requests</div>
        <div v-show="checkPerm('Activity_Requests')" @click = "switchView('Approval')" class="admin-top-barlinks" :class="[ ApprovalView ? activeClass : '']">Pending Approval</div>
        <div v-show="checkPerm('Activity_Requests')" @click = "switchView('Acknowledge')" class="admin-top-barlinks" :class="[ AcknowledgeView ? activeClass : '']">Pending Acknowledgement</div>
        <div v-show="checkPerm('Make_Requests')" @click = "switchView('Rejected')" class="admin-top-barlinks" :class="[ RejectedView ? activeClass : '']">Rejected Requests</div>
        </div>
         <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{getDate}}</div>
        </div>
      </div>
       <div v-show="AllView">
        <All :AllLoader="AllLoader" :AllRequests="AllRequests"/> 
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
import operationMixen from "../../operationMixen.js";
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
import Approval from './Approval'
import Acknowledge from './Acknowledge'
import All from './All'
import Rejected from './RejectedRequest'
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
    mixins: [operationMixen],
  components: {
    Leftbar,
    Rightbar,
    Approval,
    Acknowledge,
    All,
    Rejected,
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
      }
  },
        computed:{
    ...mapGetters([ 'getUrl2']),
    getDate: function(){
      var today = new Date();
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var date = today.getDate() + ', ' + months[today.getMonth()]+ ' ' +today.getFullYear()
      return date
    }
    },
   mounted(){
      this.fetchAllRequests()
      this.fetchApprovalRequests();
      this.fetchAcknowledgeRequests();
      this.fetchRejectedRequests()
  }, 
methods:{
    async fetchAllRequests(){
        this.AllLoader = true
         const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + 'api/CardReissue/all/'+companyId.companyId);
   const request = result.data.map( x => {
       return {
            id: x.id,
            pickupBranch: this.branches.length > 0 ? this.branches.find(y =>{ return y.branchNo == x.pickupBranch }).branchName : null,
            reason: this.reasons.length > 0 ? this.reasons.find(y =>{ return y.reasonId == x.reason }).reissueReason : null,
            requestBranch:  this.branches.length > 0 ? this.branches.find(y =>{ return y.branchNo == x.requestBranch }).branchName : null,
            requestDate: x.requestDate,
            surname_change: x.surname_change,
            trans_id: x.trans_id,
            workflowId: x.workflowId,
            accountName: x.accountName,
            accountNumber: x.accountNumber,
            activityBy: x.activityBy,
            cardPan: x.cardPan,
            companyId: x.companyId,
            newNameOfCard: x.newNameOfCard,
            processedDate: x.processedDate,
       }

  })
           this.AllRequests = request;
         this.AllLoader = false;
  },

  async fetchApprovalRequests(){
        this.approvalLoader = true
         const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + 'api/CardReissue/PendingApprovalRequest/'+companyId.companyId)
    const request = result.data.map( x => {
       return {
             id: x.id,
           pickupBranch: this.branches.find(y =>{ return y.branchNo == x.pickupBranch }).branchName,
            reason: this.reasons.find(y =>{ return y.reasonId == x.reason }).reissueReason,
            requestBranch: this.branches.find(y =>{ return y.branchNo == x.requestBranch }).branchName,
            requestDate: x.requestDate,
            surname_change: x.surname_change,
            trans_id: x.trans_id,
            workflowId: x.workflowId,
            accountName: x.accountName,
            accountNumber: x.accountNumber,
            activityBy: x.activityBy,
            cardPan: x.cardPan,
            companyId: x.companyId,
            newNameOfCard: x.newNameOfCard,
            processedDate: x.processedDate,
       }

  })
           this.ApprovalRequests = request
         this.approvalLoader = false
  },
    async fetchAcknowledgeRequests(){
          this.AcknowledgeLoader = true
           const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + 'api/CardReissue/PendingAcknowlegement/'+companyId.companyId)
    const request = result.data.map( x => {
       return {
             id: x.id,
            pickupBranch: this.branches.find(y =>{ return y.branchNo == x.pickupBranch }).branchName,
            reason: this.reasons.find(y =>{ return y.reasonId == x.reason }).reissueReason,
            requestBranch: this.branches.find(y =>{ return y.branchNo == x.requestBranch }).branchName,
            requestDate: x.requestDate,
            surname_change: x.surname_change,
            trans_id: x.trans_id,
            workflowId: x.workflowId,
            accountName: x.accountName,
            accountNumber: x.accountNumber,
            activityBy: x.activityBy,
            cardPan: x.cardPan,
            companyId: x.companyId,
            newNameOfCard: x.newNameOfCard,
            processedDate: x.processedDate
       }

  })
           this.AcknowledgeRequests = request
               this.AcknowledgeLoader = false
  },
      async fetchRejectedRequests(){
          this.RejectLoader = true
           const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + 'api/CardReissue/PendingRejectRequest/'+companyId.companyId)
           this.RejectRequests = result.data
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

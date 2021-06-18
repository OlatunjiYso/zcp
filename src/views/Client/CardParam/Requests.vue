<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
        <div class="app-admin-col-2">
        <div class="admin-top-bar">
        <div class="admin-top-bar-left">
         <router-link to="/client/activity-requests"><div class="settings-icon"></div></router-link>
        <div @click = "switchView('All')" class="admin-top-barlinks" :class="[ AllView ? activeClass : '']">All Requests</div>
        <div v-show="checkPerm('Activity_Requests')" @click = "switchView('Approval')" class="admin-top-barlinks" :class="[ ApprovalView ? activeClass : '']">Pending Approval</div>
        <div  v-show="checkPerm('Make_Requests')" @click = "switchView('Rejected')" class="admin-top-barlinks" :class="[ RejectedView ? activeClass : '']">Rejected Requests</div>
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
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
import Approval from './Approval'
import Acknowledge from './Acknowledge'
import All from './All'
import Rejected from './RejectedRequest'
import axios from 'axios'
import {mapGetters} from 'vuex'
import global from '../../../views/operationMixen'
export default {
  mixins:[global],
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    Approval,
    Acknowledge,
    All,
    Rejected
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
        RejectLoader: false
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
     await this.$store.dispatch('getCardSetup')
      this.fetchAllRequests()
      this.fetchApprovalRequests();
      this.fetchRejectedRequests()
  }, 
methods:{
    async fetchAllRequests(){
        this.AllLoader = true
         const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + 'api/CardParameterization/'+companyId.companyId);

           this.AllRequests = result.data;
         this.AllLoader = false;
  },

  async fetchApprovalRequests(){
        this.approvalLoader = true
         const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + 'api/CardParameterization/pendingapprovals/'+companyId.companyId)

           this.ApprovalRequests = result.data
         this.approvalLoader = false
  },
      async fetchRejectedRequests(){
          this.RejectLoader = true
           const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + 'api/CardParameterization/fetchrejecteditems/'+companyId.companyId)
    
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
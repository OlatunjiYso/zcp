<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
        <div class="app-admin-col-2">
        <div class="admin-top-bar">
        <div class="admin-top-bar-left">
        <div class="settings-icon"></div>
        <div @click = "switchView('Approval')" class="admin-top-barlinks" :class="[ ApprovalView ? activeClass : '']">Pending Approval</div>
        <div @click = "switchView('Acknowledge')" class="admin-top-barlinks" :class="[ AcknowledgeView ? activeClass : '']">Pending Acknowledgement</div>
        </div>
         <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>
        <div v-show="ApprovalView">
        <Approval :ApprovalRequests="ApprovalRequests"/> 
        </div>
            <div v-show="AcknowledgeView">
           <Acknowledge :AcknowledgeRequests="AcknowledgeRequests"/>       
            </div>
    </div>
      <div class="app-admin-col-3">
              <Rightbar />
            </div>
</div>
</template>


<script>
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
import Approval from './Approval'
import Acknowledge from './Acknowledge'
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    Approval,
    Acknowledge
  },
  data(){
      return{
        selectedTab: '',
        ApprovalView: true,
        AcknowledgeView: false,
        activeClass:'admin-active-top-link',
        ApprovalRequests:[],
        AcknowledgeRequests:[]
      }
  },
  created(){
      this.fetchApprovalRequests();
      this.fetchAcknowledgeRequests()
  },
      computed:{
    ...mapGetters([ 'getUrl2' ])
    }, 
methods:{

  async fetchApprovalRequests(){
 const result = await axios.get(this.getUrl2 + '/api/CardRequest/pendingApproval/7')
           this.ApprovalRequests = result.data
  },
    async fetchAcknowledgeRequests(){
 const result = await axios.get(this.getUrl2 + 'api/CardRequest/pendingacknowledgement/7')
           this.AcknowledgeRequests = result.data
  },
    
    switchView( selected ){

        if(selected == "Approval"){
         this.ApprovalView = true
         this.AcknowledgeView = false
        }
        else if(selected == 'Acknowledge') {
         this.ApprovalView = false
         this.AcknowledgeView = true
        }

    },

}
}
</script>

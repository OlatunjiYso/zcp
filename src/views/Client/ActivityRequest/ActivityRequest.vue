<template>
  <div class="app-admin-section">
    <div class="app-admin-col-1">
      <Leftbar/>
    </div>
    <div class="app-admin-col-2">
      <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div @click="previousPage" class="settings-icon"></div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{getDate}}</div>
        </div>
      </div>
      <div class="content-header">Activity Requests</div>
      <div class="content-sub">Here are the activity requests on the system</div>
      <div class="summary-flexbox">
        <div class="content-slide-box" v-for="(item,index) in filterArray" :key="index">
          <div class="activity-info-card">
            <div class="activity-card-icon"></div>
            <div class="activity-card-header">{{item.name}}</div>
            <router-link :to="item.url">
              <div  class="activity-btn">Open</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="app-admin-col-3">
      <Rightbar/>
    </div> -->
  </div>
</template>

<script>
import Global from '../../../views/global.js'
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
import Loading from "../../../components/Loading/Loading";
import { mapGetters } from 'vuex'
export default {
  name: "Home",
  components: {
    Loading,
    Leftbar,
    Rightbar
  },
   mixins:[Global],
  data(){
  return{
    url:'/client/go',
    requests:[
      {
        id:1,
        name:"Card Requests",
        url:"/client/card-requests"
      },
       {
        id:11,
        name:"Card Reissue",
        url:"/client/card-issue"
      },
      {
        id:2,
        name:"Card Cancellation",
        url:"/client/card-cancellation"
      },
            {
        id:7,
        name:"Dispute Requests",
        url:"/client/dispute-requests"
      },
      {
        id:12,
        name:"Card Parameterization",
        url:"/client/card-param"
      },
       {
        id:6,
        name:"Pin Reissue",
        url:"/client/pin-reissue"
      },

    ],
    activities:[]
  }
  },
  computed:{
    ...mapGetters([ 'getActivities']),
    filterArray(){
    var matches = [];
    let a  = this.activities
    let b  = this.requests
    for ( var i = 0; i < this.activities.length; i++ ) {
        for ( var e = 0; e < this.requests.length; e++ ) {
            if ( this.activities[i].id == this.requests[e].id ) {
              matches.push(this.requests[e])
            }
            
        }
    }
    return matches;
      }
  },
  created(){
    const companyId = JSON.parse(localStorage.getItem("user-mfb"))
      this.$store.dispatch("fetchCompanyActivities",companyId.companyId).then( response => {
        this.activities = response.data
      })
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

.activity-btn {
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
<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
 <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div class="settings-icon"></div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
      </div>
      </div>
      <div class="content-header">Activities</div>
      <div class="content-sub">Here are the latest reports on the system</div>
      <div class="summary-flexbox">
        <div class="content-slide-box" v-for="(item, index) in activities_computed" :key="index">
          <div class="activity-info-card">
              <div class="activity-card-icon"></div>
               <div class="activity-card-header">{{item.title}}</div>
             <router-link :to="item.url"><div class="activity-btn">Open</div></router-link> 
          </div>
        </div>
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
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar
  },
  data(){
      return{
           activities:[
               {title :'Instant Card Request', url: "card-request"}, 
               {title :'Default Pin Generation', url: "pin-generation"},
               {title :'Pin Re-issue Request', url: "pin-reissue"},
               {title :'Card Parametization', url: "card-parametization"},
               {title :'Charge-back Request', url: "chargeback-request"}, 
               {title :'Card Cancellation', url: "/"}, 
               {title :'Card Activation', url: "card-activation"},
                {title :'Card Deactivation', url: "card-deactivation"},
                {title :'Transaction Log', url: "transaction-log"}
               ],
        last_search_string : "",
      }
  },
  computed:{
    activities_computed:function (){
      return this.activities;
    }
  }
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
.activity-btn{
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
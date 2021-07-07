<template>
  <Loader v-show="loader"/>
  <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
  <div class="app-admin-section">
    <div class="app-admin-col-1">
      <Leftbar/>
    </div>
    <div class="app-admin-col-2">
      <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <router-link to="/client/activities"><div class="settings-icon"></div></router-link>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{getDate}}</div>
        </div>
      </div>
        <ActivityForm1 v-if="form == 1" />
          <ActivityForm2 com="iii" :searchCard="searchCard" v-else-if="form == 2" />
        <ActivityForm3 v-else-if="form == 3" />
         <ActivityForm5 v-else-if="form == 5" />
          <ActivityForm6 v-else-if="form == 6" />
          <ActivityForm7 v-else-if="form == 7" />
         <ActivityForm8 v-else-if="form == 8" />
           <ActivityForm9 v-else-if="form == 9" />
           <ActivityForm11 v-else-if="form == 11" />
           <ActivityForm12 v-else-if="form == 12" />
         <ActivityForm14 v-else-if="form == 14" />
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
import {mapGetters} from 'vuex'
import ActivityForm1 from "../../../components/ActivityForms/ActivityForm1";
import ActivityForm2 from "../../../components/ActivityForms/ActivityForm2";
import ActivityForm3 from "../../../components/ActivityForms/ActivityForm3";
import ActivityForm5 from "../../../components/ActivityForms/ActivityForm5";
import ActivityForm6 from "../../../components/ActivityForms/ActivityForm6";
import ActivityForm7 from "../../../components/ActivityForms/ActivityForm7";
import ActivityForm8 from "../../../components/ActivityForms/ActivityForm8";
import ActivityForm9 from "../../../components/ActivityForms/ActivityForm9";
import ActivityForm11 from "../../../components/ActivityForms/ActivityForm11";
import ActivityForm12 from "../../../components/ActivityForms/ActivityForm12";
import ActivityForm14 from "../../../components/ActivityForms/ActivityForm14";
import Global from '../../global.js'
export default {
      mixins:[Global],
  components: {
    ActivityForm1,
    ActivityForm2,
    ActivityForm3,
    ActivityForm5,
    ActivityForm6,
    ActivityForm7,
    ActivityForm8,
    ActivityForm9,
    ActivityForm11,
    ActivityForm12,
    ActivityForm14,
    Leftbar,
    Rightbar,
      Loader,
     Status
  },
  created() {
    this.form = this.$route.params.slug;
    console.log("Form ",this.$route.params.slug);
  },
      computed:{
    ...mapGetters([ 'getUrl2' ])
    }, 
  data(){
      return{
        form : 0,
        loader: false,
        status: false,
        state: null,
        message: null,  

      }
  },
  methods: {

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
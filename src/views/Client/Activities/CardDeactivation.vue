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
        <router-link to="activities"><div class="settings-icon"></div></router-link>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
      </div>
      </div>
               <div class="content-header">Card Deactivation</div>
      <form @submit.prevent="sendRequest">
              <div class="form-flex">
           <div class="form-flex-col-3">
                <label class="login-label">Client Code<span style="color:red">*</span></label>
        <input v-model="form.clientCode" type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>

          
      </div>
       <button type="submit" class="app-form-button">Submit</button>
       
      </form>
            </div>
            <div class="app-admin-col-3">
              <Rightbar />
            </div>
          </div>
</template>

<script>
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
import operationMixen from "../../operationMixen.js";
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status2'
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
      Loader,
     Status
  },
      computed:{
    ...mapGetters([ 'getUrl2' ])
    }, 
  mixins: [operationMixen],
  data(){
      return{
        loader: false,
        status: false,
        state: null,
        message: null,  
          form:{
              "companyId": 0,
              "userId": 0,
              "clientCode": "8398389"
          }
      }
  },
  methods: {
    clearForm(){
    this.form.clientCode= "";
    },
            resetState(){
this.status = false;
    },
        async sendRequest(){
       this.loader = true
         try {
           
             const response = await axios.post(this.getUrl2 + 'api/cardactivatedeactivate/deactivation',this.form)
             if(response.status == 200){
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'Operation Sucessful'
               this.clearForm();
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
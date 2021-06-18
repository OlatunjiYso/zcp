<template>
  <div>
                <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeCallerReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:70%; height:90%; overflow:auto;">

              <div v-if="isSetup">
              <div class="app-modal-heading">
        <div class="app-modal-header">Caller Id Details</div>
      </div>
          <form>
               <div className="form-flex">
      <div className="form-flex-col">
         <label style="color:#a3a3a3; font-weight:500;font-size:13px" >MFB Name</label> 
        <input v-model="callerData.mfbName" readonly type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Account Number</label> 
        <input v-model="callerData.mfbAccount" readonly type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
         <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >MFB Pan</label> 
        <input v-model="callerData.mfbPan" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
          <div className="form-flex-col">
              <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Routing Code</label> 
        <input v-model="callerData.routingCode" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
        <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Caller Username</label> 
        <input v-model="callerData.mfbCallerUsername" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
        <div className="form-flex-col">
          <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Caller Password</label> 
        <input v-model="callerData.mfbCallerPassword" type="text" className="app-modal-form-field w-input"  placeholder="Type Here" required/>
        </div>
         <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Channel</label> 
         <select v-model="callerData.channels" id="roles" style="marginBottom: 30px" class="app-select w-select">
               <option selected>Select a Branch</option> 
             <option  v-for="(result, index) in channels" :key="index" :value="result">{{result}}</option>     
            </select>
        </div>
        
               </div>
        </form>
      </div>
        
      <div v-else>
              <div class="app-modal-heading">
        <div class="app-modal-header">Setup Caller Id</div>
      </div>
          <form @submit.prevent="sendRequest">
               <div className="form-flex">
      <div className="form-flex-col">
         <label style="color:#a3a3a3; font-weight:500;font-size:13px" >MFB Name</label> 
        <input v-model="companyData.name" readonly type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Account Number</label> 
        <input v-model="companyData.accountNumber" readonly type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
         <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >MFB Pan</label> 
        <input v-model="form.pan" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
          <div className="form-flex-col">
              <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Routing Code</label> 
        <input v-model="form.routingCode" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
         <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Channel</label> 
         <select v-model="form.channel" id="roles" style="marginBottom: 30px" class="app-select w-select">
               <option selected>Select a Branch</option> 
             <option  v-for="(result, index) in channels" :key="index" :value="result">{{result}}</option>     
            </select>
        </div>
        
               </div>

          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Setup Caller</button>
        </form>
      </div>
      <div @click= "closeModal" class="app-modal-close"></div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status'
export default {
    props:['companyData','closeModal','closeCallerReload', 'isSetup','callerData'],
        components:{
     Loader,
     Status
    },
  data(){
      return{
        isCompanyCreated: false,
        loader: false,
        status: false,
        state: null,
        message: null,
        companyId: "",
        form:{
          pan: "",
          routingCode: "",
          username: "",
          password: "",
          channel: "",
        },
        channels:['Web','Pos', 'Atm'],
        token:""
      }
  },
    computed:{
    ...mapGetters([
      'getUrl',
      'getUrl2',
      'getActivities',
      'getRoles'
    ]),
  },

  methods: {
   
    resetState(){
this.status = false;
    },
        GenerateToken(length){
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   this.token =  result.join(''); 
   return result.join('');
    },
        async sendRequest(){
          this.GenerateToken(8)
       this.loader = true
       const user = JSON.parse(localStorage.getItem("user"))
         const formData = {
                 "id": 0,
                "userId": parseInt(user.id),
                "companyId": this.companyData.id,
                "mfbAccount": this.companyData.accountNumber,
                "mfbPan": this.form.pan,
                "mfbName": this.companyData.name,
                "routingCode": this.form.routingCode,
                "mfbCallerUsername": this.companyData.accountNumber,
                "mfbCallerPassword": this.token,
                "channels": this.form.channel
         }

         try {
           
             const response = await axios.post(this.getUrl2 + 'api/DispenseErrorCaller/SetupCallerId',formData)

             if(response.status == 200){
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'Operation Sucessful'
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

<style>

</style>
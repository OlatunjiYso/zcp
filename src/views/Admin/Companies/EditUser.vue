<template>
  <div>
        <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeEditReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:70%; height:80%; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Update User</div>
      </div>
      <div>
          <form @submit.prevent="updateUser">
        <div className="form-flex">
      <div className="form-flex-col">
          <label style="color:#a3a3a3; font-weight:500;font-size:13px" >First Name</label> 
        <input :value="userData.firstName" id="firstName" type="text" className="app-modal-form-field w-input"  placeholder="First Name"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Last Name</label> 
        <input :value="userData.lastName" id="lastName" type="text" className="app-modal-form-field w-input"  placeholder="Last Name"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Email Address</label> 
        <input readonly :value="userData.email" id="emailAddress" type="email" className="app-modal-form-field w-input"  placeholder="Email Address"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Username</label> 
        <input readonly :value="userData.userName" id="userName" type="text" className="app-modal-form-field w-input"  placeholder="Username"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Phone Number</label> 
        <input  maxlength="13" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" :value="userData.tel" id="mobileNo" type="text" className="app-modal-form-field w-input"  placeholder="Phone Number"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Role</label> 
            <select required v-model="userData.role" style="marginBottom: 30px" class="app-select w-select">
            <option  v-for="(role, index) in mfbRoles" :key="index" :value="role.id">{{role.name}}</option>        
        </select>
         </div>
        </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Update User</button>
        </form>
      </div>
      <div @click= "closeEdit" class="app-modal-close"></div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status'
import {mapGetters} from 'vuex'
export default {
    props:['closeEdit','closeEditReload', 'userData'],
        components:{
     Loader,
     Status
    },
  data(){
      return{
         loader: false,
        status: false,
        state: null,
        message: null,
          roles:['Super Admin', 'Admin','Support'],
          activityArray:[],
          form: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            userName: '',
            mobileNo: '',
            rolesId: '',
            companyName:''
          }
      }
  },
        computed:{
    ...mapGetters([
      'getUrl',
      'getRoles',
    ]),
              mfbRoles: function(){
      return this.getRoles.filter(x => { return x.mfbOrBank == 'mfb' })
    }
  },
    created(){
   this.$store.dispatch("getRoles");
  
  },
  methods: {
            resetState(){
this.status = false;
    },
    async updateUser(){
       this.loader = true
    
         const formData = {
                  id: parseInt(this.userData.id),
                 userName: document.getElementById("userName").value,
                  companyId: parseInt(this.$route.params.id),
                  firstName: document.getElementById("firstName").value,
                  lastName: document.getElementById("lastName").value,
                  emailAddress: document.getElementById("emailAddress").value,
                  userName: document.getElementById("userName").value,
                  mobileNo: document.getElementById("mobileNo").value,
                  rolesId: parseInt(this.userData.role),
                  isActive: true,
         }
         try {
           
             const response = await axios.post(this.getUrl + 'api/companyusers/update',formData)
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
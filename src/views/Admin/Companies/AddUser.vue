<template>
  <div>
        <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:70%; height:80%; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Add User</div>
      </div>
      <div>
          <form @submit.prevent="createUser">
        <div className="form-flex">
      <div className="form-flex-col">
          <label style="color:#a3a3a3; font-weight:500;font-size:13px" >First Name</label> 
        <input v-model="form.firstName" type="text" className="app-modal-form-field w-input"  placeholder="First Name"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Last Name</label> 
        <input v-model="form.lastName" type="text" className="app-modal-form-field w-input"  placeholder="Last Name"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Email Address</label> 
        <input v-model="form.emailAddress" type="email" className="app-modal-form-field w-input"  placeholder="Email Address"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Username</label> 
        <input @focus="removeError" @blur="validateUsername" v-model="form.userName" type="text" className="app-modal-form-field w-input"  placeholder="Username"  required/>
       <p v-show="error" style="color:red;font-size:12px">This username has been taken already</p>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Phone Number</label> 
        <input  maxlength="13" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" v-model="form.mobileNo" type="text" className="app-modal-form-field w-input"  placeholder="Phone Number"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Role</label> 
            <select required  v-model="userRole" style="marginBottom: 30px" class="app-select w-select">
            <option  v-for="(role, index) in mfbRoles" :key="index" :value="role.id">{{role.name}}</option>        
        </select>
         </div>
        </div>
          <button v-show="error == false" type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Add User</button>
        </form>
      </div>
      <div @click= "closeAdd" class="app-modal-close"></div>
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
    props:['closeAdd', 'closeAddReload','users'],
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
            mobileNo: '234',
            rolesId: 0
          },
          userRole:null,
           error:false
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
            removeError(){
      this.error = false
    },
    async validateUsername(user){
       this.loader = true
   const response= await this.users.some( x =>{
      return x.userName == this.form.userName
    })
     this.loader = false
       console.log(response)
        if(response){
      this.error = true
    }
    else{
      this.error = false
    }
    },
    assignRole(result){
      this.userRole = result.target.value

    },
            resetState(){
this.status = false;
    },
    async createUser(){
     
       this.loader = true
       const companyId = JSON.parse(localStorage.getItem("user-mfb"))
         const formData = {
                  companyId: parseInt(this.$route.params.id),
                  firstName: this.form.firstName,
                  lastName: this.form.lastName,
                  emailAddress: this.form.emailAddress,
                  userName: this.form.userName,
                  mobileNo: this.form.mobileNo,
                  rolesId: parseInt(this.userRole)  ,
                  isActive: true,
         }
         try {
           
             const response = await axios.post(this.getUrl + 'api/companyusers',formData)
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
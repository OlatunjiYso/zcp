<template>
  <div>
        <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:40%; height:60%; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Add User</div>
      </div>
      <div>
        <form @submit.prevent="createUser">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Username</label> 
                   <p v-show="error" style="color:red;font-size:12px">This username has been taken already</p>
        <input @focus="removeError" @blur="validateUsername" v-model="form.userName" type="text" className="app-modal-form-field w-input"  placeholder="Username"  required/> 
         <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Role</label> 
        <select required v-model.number="form.roleId" style="marginBottom: 30px" class="app-select w-select">
            <option selected>Select a Role</option> 
            <option  v-for="(role, index) in bankRoles" :key="index" :value="role.id">{{role.name}}</option>        
        </select>
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
import {mapGetters} from 'vuex'
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status'
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
            userName: '',
            roleId: 0
          },
          error:false
      }
  },
      computed:{
    ...mapGetters([
      'getUrl',
      'getRoles'
    ]),
        bankRoles: function(){
      return this.getRoles.filter(x => { return x.mfbOrBank == 'Bank' })
    }
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
        resetState(){
this.status = false;
    },
    async createUser(){

       this.loader = true
         const formData = {
                 userName: this.form.userName,
                 rolesId: this.form.roleId,
         }
         try {
           
             const response = await axios.post(this.getUrl + 'api/adminusers',formData,
  //            {transformRequest: (data, headers) => {
  //   delete headers.common['Content-Type'];
  // }}
             )
             if(response.status == 200){
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'User added Sucessfully'
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
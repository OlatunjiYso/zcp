<template>
  <div>
        <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeAdd" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:30%; height:50%; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Update User</div>
      </div>
      <div>
          <form @submit.prevent="updateUser">
         <div className="form-flex">
      <div className="form-flex-col">
        <input v-model="form.firstName" type="text" className="app-modal-form-field w-input"  placeholder="First Name"  required/>
        </div>
         <div className="form-flex-col">
        <input v-model="form.lastName" type="text" className="app-modal-form-field w-input"  placeholder="Last Name"  required/>
        </div>
         <div className="form-flex-col">
        <input v-model="form.emailAddress" type="text" className="app-modal-form-field w-input"  placeholder="Email Address"  required/>
        </div>
         <div className="form-flex-col">
        <input v-model="form.userName" type="text" className="app-modal-form-field w-input"  placeholder="Username"  required/>
        </div>
         <div className="form-flex-col">
        <input v-model="form.mobileNo" type="text" className="app-modal-form-field w-input"  placeholder="Phone Number"  required/>
        </div>
         <div className="form-flex-col">
          <select v-model="form.roleId" style="marginBottom: 30px" class="app-select w-select">
               <option value="0">Select a Role</option> 
             <option  v-for="(role, index) in roles" :key="index" :value="index">{{role}}</option>        
            </select>
         </div>
        </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Update User</button>
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
export default {
    props:['closeAdd', 'userData'],
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
            rolesId: 0
          }
      }
  },
  methods: {
    async updateUser(){
       this.loader = true
         const formData = {
                                firstName: this.form.firstName,
                  lastName: this.form.lastName,
                  emailAddress: this.form.emailAddress,
                  userName: this.form.userName,
                  mobileNo: this.form.mobileNo,
                  rolesId: this.form.rolesId
         }
         try {
           
             const response = await axios.put(this.getUrl + 'api/companyusers',formData,
  //            {transformRequest: (data, headers) => {
  //   delete headers.common['Content-Type'];
  // }}
             )
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
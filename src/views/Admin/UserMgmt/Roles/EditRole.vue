<template>
  <div>
        <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeEditReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:50%; height:60%; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Update Role</div>
      </div>
      <div>
          <form @submit.prevent="updateRole">
              <div className="form-flex">
      <div className="form-flex-col">
         <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Role Name</label> 
        <input :value="editData.name" type="text" className="app-modal-form-field w-input" id="permname"  placeholder="Role Name"  required/>
      </div>
       <div className="form-flex-col">
          <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Description</label> 
        <input :value="editData.description" type="text" className="app-modal-form-field w-input" id="description"  placeholder="Description"  required/>
       </div>
         <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Mfb or Bank (Update: {{editData.mfbOrBank}})</label> 
         <select v-model="form.mfbOrBank" style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(result, index) in permType" :key="index" :value="result">{{result}}</option>     
            </select>
        </div>
         <div className="form-flex-col">
            <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Permission</label> 
          <select @change="addtoArray($event)" class="app-select w-select">
               <option selected>Select Permission</option> 
             <option  v-for="(perm, index) in getPermissions" :key="index" :value="perm.id">{{perm.name}}::{{perm.id}}</option>        
            </select>
         </div>
              </div>
       <div v-for="(perm, index) in permAray" :key="index" style= "margin-right:20px;margin-bottom:20px;background: #ededed;padding:10px; border-radius:5px; display:inline-block;color:#696969;font-size: 13px">
                 {{perm}} <span @click="removePerm(index)"  style="cursor: pointer; font-weight: bold; color:red; margin-left:10px">X</span> </div>
          <button type="submit" style="display:block;cursor:pointer" class="app-modal-button">Update Role</button>
        </form>
      </div>
      <div @click= "closeEdit" class="app-modal-close"></div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import Loader from '../../../../components/Loader/Loader'
import Status from '../../../../components/Status/Status'
export default {
    props:['closeEdit','closeEditReload', 'editData', 'permAray'],
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
          form: {
            name: '',
            description: '',
            mfbOrBank: ""
          },
            permType: ['mfb','Bank']
      }
  },
      computed:{
    ...mapGetters([
      'getUrl',
      'getRoles',
      'getPermissions'
    ])
  },
  methods: {
      addtoArray(result){
       let permValue = parseInt(result.target.value)
       this.permAray.push(permValue)
   },

  removePerm(index){
    this.permAray.splice(index, 1);    
  },
        resetState(){
this.status = false;
    },
    async updateRole(){
       this.loader = true
         const formData = {
              id:this.editData.id,
              name: document.getElementById("permname").value,
              description: document.getElementById("description").value,
               mfbOrBank: this.form.mfbOrBank == "" ? this.editData.mfbOrBank : this.form.mfbOrBank,
              permissions: this.permAray,
              isActive: true
         }
         try {
           
         const response = await axios.post(this.getUrl + 'api/roles/update',formData)
             if(response.status == 200){
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'Role updated Sucessfully'
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
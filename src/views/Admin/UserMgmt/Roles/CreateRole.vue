<template>
  <div>
        <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:50%; height:50%; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Add Role</div>
      </div>
      <div>
          <form @submit.prevent="createRole">
              <div className="form-flex">
      <div className="form-flex-col">
        <input v-model="form.name" type="text" className="app-modal-form-field w-input"  placeholder="Role Name"  required/>
      </div>
       <div className="form-flex-col">
        <input v-model="form.description" type="text" className="app-modal-form-field w-input"  placeholder="Description"  required/>
       </div>
         <div className="form-flex-col">
          <select @change="addtoArray($event)" class="app-select w-select">
               <option selected>Select Permission</option> 
             <option  v-for="(perm, index) in getPermissions" :key="index" :value="perm.id">{{perm.name}}::{{perm.id}}</option>        
            </select>
         </div>
              </div>
       <div v-for="(perm, index) in permAray" :key="index" style= "margin-right:20px;margin-bottom:20px;background: #ededed;padding:10px; border-radius:5px; display:inline-block;color:#696969;font-size: 13px">
                 {{perm}} <span @click="removePerm(index)"  style="cursor: pointer; font-weight: bold; color:red; margin-left:10px">X</span> </div>
          <button type="submit" style="display:block;cursor:pointer" class="app-modal-button">Add Role</button>
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
import Loader from '../../../../components/Loader/Loader'
import Status from '../../../../components/Status/Status'
export default {
    props:['closeAdd','closeAddReload'],
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
          permAray:[],
          form: {
            name: '',
            description: ''
          }
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
    async createRole(){
       this.loader = true
         const formData = {
                 name: this.form.name,
              description: this.form.description,
              permissions: this.permAray,
              isActive: true
         }
         try {
           
         const response = await axios.post(this.getUrl + 'api/roles',formData,
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
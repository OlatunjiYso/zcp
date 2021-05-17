<template>
  <div>
        <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:50%; height:50%; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Add Permission</div>
      </div>
      <div>
          <form @submit.prevent="createPerm">
              <div className="form-flex">
      <div className="form-flex-col">
        <input v-model="form.name" type="text" className="app-modal-form-field w-input"  placeholder="Permission Name"  required/>
      </div>
       <div className="form-flex-col">
        <input v-model="form.description" type="text" className="app-modal-form-field w-input"  placeholder="Description"  required/>
       </div>
              </div>
    
          <button type="submit" style="display:block;cursor:pointer" class="app-modal-button">Add Permission</button>
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
        resetState(){
this.status = false;
    },
    async createPerm(){
       this.loader = true
         const formData = {
                 name: this.form.name,
              description: this.form.description,
              isActive: true
         }
         try {
           
         const response = await axios.post(this.getUrl + 'api/permissions',formData,
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
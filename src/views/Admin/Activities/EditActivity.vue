<template>
  <div>
    <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeEditReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:40%; height:55%; overflow:auto;" >
      <div class="app-modal-heading">
        <div class="app-modal-header">Update Activity</div>
      </div>
      <div>
          <form @submit.prevent="updateActivity">
               <div className="form-flex">
      <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Activity Name</label> 
        <input :value="editData.name" type="text" className="app-modal-form-field w-input"  placeholder="Type here" id="name"  required/>
        </div>
         <div className="form-flex-col">
              <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Description</label> 
        <input :value="editData.description" type="text" className="app-modal-form-field w-input"  placeholder="Type here" id="description"  required/>
        </div>
          <div className="form-flex-col">
         <label style="display:inline-block;margin-right:10px;color:#a3a3a3; font-weight:500;font-size:13px" for="cash">Requires Maker-Checker ? </label> 
         <input  :checked="editData.requireMakerChecker" style="display:inline-block" type="checkbox" id="markerChecker" >
        </div>
               </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Update Activity</button>
      
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
    props:['closeModal','closeEditReload','editData'],
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
             form: {
                 name: this.editData.name,
                 description: '',
                 markerChecker: false
             }
      }
  },
  computed:{
    ...mapGetters([
      'getUrl'
    ])
  },
  methods: {
     async updateActivity(){
       this.loader = true
         const formData = {
                 id: this.editData.id,
                 name: document.getElementById("name").value,
                 description: document.getElementById("description").value,
                 requireMakerChecker: document.getElementById("markerChecker").checked,
                 isActive: true
         }
         try {
           
             const response = await axios.post(this.getUrl + 'api/activities/update',formData)
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
       resetState() {
   this.status = false
    },
  },
}
</script>

<style scoped>
input[type=checkbox] {
    transform: scale(1.2);
}
</style>
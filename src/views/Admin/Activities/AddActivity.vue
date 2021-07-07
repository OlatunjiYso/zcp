<template>
  <div>
    <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeModalReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:40%; height:55%; overflow:auto;" >
      <div class="app-modal-heading">
        <div class="app-modal-header">Create Activity</div>
      </div>
      <div>
          <form @submit.prevent="createActivity">
               <div className="form-flex">
      <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Activity Name</label> 
        <input v-model="form.name" type="text" className="app-modal-form-field w-input"  placeholder="Type here"  required/>
        </div>
         <div className="form-flex-col">
              <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Description</label> 
        <input v-model="form.description" type="text" className="app-modal-form-field w-input"  placeholder="Type here"  required/>
        </div>
          <div className="form-flex-col">
         <label style="display:inline-block;margin-right:10px;color:#a3a3a3; font-weight:500;font-size:13px" for="cash">Requires Maker-Checker ? </label> 
         <input  v-model="form.markerChecker"  style="display:inline-block" type="checkbox" id="cash" name="cash">
        </div>
               </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Create Activity</button>
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
    props:['closeModal','closeModalReload'],
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
                 name:'',
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
     async createActivity(){
       this.loader = true
         const formData = {
                 name: this.form.name,
                 description: this.form.description,
                 requireMakerChecker: this.form.markerChecker,
                 isActive: true
         }
         try {
           
             const response = await axios.post(this.getUrl + 'api/activities',formData,
  //            {transformRequest: (data, headers) => {
  //   delete headers.common['Content-Type'];
  // }}
             )
             if(response.status == 200){
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'Activity Created'
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

</style>
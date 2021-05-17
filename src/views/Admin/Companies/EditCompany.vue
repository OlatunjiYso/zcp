<template>
  <div>
                <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeEditReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:70%; height:90%; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Update Company</div>
      </div>
      <div>
          <form @submit.prevent="updateCompany">
               <div className="form-flex">
      <div className="form-flex-col">
        <input  :value="editData.name" type="text" className="app-modal-form-field w-input"  placeholder="MFB Name" id="name" required/>
        </div>
         <div className="form-flex-col">
        <input :value="editData.accountNumber" type="text" className="app-modal-form-field w-input"  placeholder="Account Number" id="accountNumber"  required/>
        </div>
         <div className="form-flex-col">
        <input readonly :value="editData.companyCode" type="text" className="app-modal-form-field w-input"  placeholder="Company Code" id="companyCode"  required/>
        </div>
          <div className="form-flex-col">
        <input :value="editData.emailAddress" type="text" className="app-modal-form-field w-input"  placeholder="Email Address" id="emailAddress"  required/>
        </div>
        <div className="form-flex-col">
        <input :value="editData.phoneNumber" type="text" className="app-modal-form-field w-input"  placeholder="Phone Number" id="phoneNumber"  required/>
        </div>
        <div className="form-flex-col">
        <input :value="editData.address" type="text" className="app-modal-form-field w-input"  placeholder="Address" id="address"  required/>
        </div>
         <div className="form-flex-col">
        <input :value="editData.branch" type="text" className="app-modal-form-field w-input"  placeholder="Branch" id="branch"  required/>
        </div>
               </div>
        <div class="app-modal-heading">
        <div class="app-modal-header">Assigned Activities</div>
      </div>
               <div className="form-flex">
                         <div className="form-flex-col-x" v-for="(perm, index) in editActivities" :key="index">      
             <label :for="perm.name"><input disabled="disabled" checked="checked" style="margin-right:20px" :id="`A${perm.id}`" type="checkbox" value="test" />{{perm.name}}::{{perm.id}}</label>
        </div>
               </div>
      <br>
                       <div class="app-modal-heading">
        <div class="app-modal-header">Add Activities</div>
      </div>
               <div className="form-flex">
                         <div className="form-flex-col-x" v-for="(perm, index) in getActivities" :key="index">      
             <label :for="perm.name"><input @click="addToActivity(perm, index)" style="margin-right:20px" :id="`A${perm.id}`" type="checkbox" value="test" />{{perm.name}}::{{perm.id}}</label>
        </div>
               </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Update Company</button>
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
    props:['closeModal','closeEditReload','editData', 'editActivities'],
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
          activities:[],
          activityArray:[],
        form:{
          name: "",
          companyCode: "",
          address: "",
          emailAddress: "",
          phoneNumber: "",
          accountNumber: "",
          branch: "",
        }
      }
  },
      computed:{
    ...mapGetters([
      'getUrl',
      'getActivities',
    ])
  },
  created(){
    this.$store.dispatch("getActivities");
  },
  methods: {
        resetState(){
this.status = false;
    },
        async updateCompany(){
       this.loader = true
         const formData = {
          id: this.editData.id,
          name: document.getElementById("name").value,
          companyCode: document.getElementById("companyCode").value,
          address: document.getElementById("address").value,
          emailAddress: document.getElementById("emailAddress").value,
          phoneNumber: document.getElementById("phoneNumber").value,
          accountNumber: document.getElementById("accountNumber").value,
          branch: document.getElementById("branch").value,
         }

         try {
           
             const response = await axios.post(this.getUrl + 'api/companies/update',formData)
             if(response.status == 200){
                  this.addActivities(response.data.id);
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
           async addActivities(companyId){
                 const response2 = await axios.post(this.getUrl + 'api/companyactivities/update', {
                 activitiesId: this.activityArray,
                companyId: parseInt(companyId),
                isActive: true
                      })

               if(response2.status == 200){    
                  console.log("Actvities created")
                  this.addProduct(companyId)
                }

             else{
               this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = 'Operation Failed'
             }
      },
 async addToActivity(activity, index){
        let Avalue = await parseInt(activity.id)
        console.log(`A${activity.id}`)
      var checkbox = document.getElementById(`A${activity.id}`);
       const state = await this.activityArray.some(activity => { return activity == Avalue })
       console.log(state)
      if (state == false && checkbox.checked == true){
    console.log("checked") ;
    this.activityArray.push(Avalue);
  }
  else{
      console.log("unchecked")
     const newIndex = this.activityArray.findIndex( result => { return result == Avalue})

       await this.activityArray.splice(newIndex, 1); 
       console.log("finised unchecked " + newIndex) 
      }

      },
  },
}
</script>

<style>

</style>
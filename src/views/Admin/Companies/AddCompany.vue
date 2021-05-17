<template>
  <div>
                <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeModalReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:70%; height:90%; overflow:auto;">
            <div v-if="isCompanyCreated">
                    <div class="app-modal-heading">
        <div class="app-modal-header">Add User</div>
      </div>
          <form @submit.prevent="addUser">
        <div className="form-flex">
      <div className="form-flex-col">
        <input v-model="form2.firstName" type="text" className="app-modal-form-field w-input"  placeholder="First Name"  required/>
        </div>
         <div className="form-flex-col">
        <input v-model="form2.lastName" type="text" className="app-modal-form-field w-input"  placeholder="Last Name"  required/>
        </div>
         <div className="form-flex-col">
        <input v-model="form2.emailAddress" type="text" className="app-modal-form-field w-input"  placeholder="Email Address"  required/>
        </div>
         <div className="form-flex-col">
        <input v-model="form2.userName" type="text" className="app-modal-form-field w-input"  placeholder="Username"  required/>
        </div>
         <div className="form-flex-col">
        <input v-model="form2.mobileNo" type="text" className="app-modal-form-field w-input"  placeholder="Phone Number"  required/>
        </div>
         <div className="form-flex-col">
          <select id="roles" style="marginBottom: 30px" class="app-select w-select">
               <option selected>Select a Role</option> 
             <option  v-for="(role, index) in getRoles" :key="index" :value="role.id">{{role.name}}</option>     
            </select>
         </div>
        </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Add User</button>
        </form>
      </div>
      <div v-else>
              <div class="app-modal-heading">
        <div class="app-modal-header">Add Company</div>
      </div>
          <form @submit.prevent="createCompany">
               <div className="form-flex">
      <div className="form-flex-col">
        <input v-model="form.name" type="text" className="app-modal-form-field w-input"  placeholder="MFB Name"  required/>
        </div>
         <div className="form-flex-col">
        <input v-model="form.accountNumber" type="text" className="app-modal-form-field w-input"  placeholder="Account Number"  required/>
        </div>
         <div className="form-flex-col">
        <input v-model="form.companyCode" type="text" className="app-modal-form-field w-input"  placeholder="Company Code"  required/>
        </div>
          <div className="form-flex-col">
        <input v-model="form.emailAddress" type="text" className="app-modal-form-field w-input"  placeholder="Email Address"  required/>
        </div>
        <div className="form-flex-col">
        <input v-model="form.phoneNumber" type="text" className="app-modal-form-field w-input"  placeholder="Phone Number"  required/>
        </div>
        <div className="form-flex-col">
        <input v-model="form.address" type="text" className="app-modal-form-field w-input"  placeholder="Address"  required/>
        </div>
         <div className="form-flex-col">
        <input v-model="form.branch" type="text" className="app-modal-form-field w-input"  placeholder="Branch"  required/>
        </div>
        <div className="form-flex-col">
        <input v-model="form.productName" type="text" className="app-modal-form-field w-input"  placeholder="Card Product Name"  required/>
        </div>
        <div className="form-flex-col">
        <input v-model="form.productCode" type="text" className="app-modal-form-field w-input"  placeholder="Card Product Code"  required/>
        </div>
               </div>
                 <div class="app-modal-heading">
        <div class="app-modal-header">Assign Activities</div>
      </div>
               <div className="form-flex">
                         <div className="form-flex-col-x" v-for="(perm, index) in getActivities" :key="index">      
             <label :for="perm.name"><input @click="addToActivity(perm, index)" style="margin-right:20px" :id="`A${perm.id}`" type="checkbox" value="test" />{{perm.name}}::{{perm.id}}</label>
        </div>
               </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Add Company</button>
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
        isCompanyCreated: false,
        loader: false,
        status: false,
        state: null,
        message: null,
        activities:['Instant Card Request', 'Default Pin Generation','Pin Re-issue Request','Charge-back Request', 'Card Cancellation', 'Card Activation/Deactivation'],
        activityArray:[],
        companyId: "",
        form:{
          name: "",
          companyCode: "",
          address: "",
          emailAddress: "",
          phoneNumber: "",
          accountNumber: "",
          branch: "",
          productName:"",
          productCode:""
        },
         form2: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            userName: '',
            mobileNo: '',
            rolesId: 0
          }
      }
  },
    computed:{
    ...mapGetters([
      'getUrl',
      'getActivities',
      'getRoles'
    ])
  },
      created(){
    this.$store.dispatch("getActivities");
    this.$store.dispatch("getRoles");
  },
  methods: {
    resetState(){
this.status = false;
    },
        async createCompany(){
       this.loader = true
         const formData = {
                  name: this.form.name,
          companyCode: this.form.companyCode,
          address: this.form.address,
          emailAddress: this.form.emailAddress,
          phoneNumber: this.form.phoneNumber,
          accountNumber: this.form.accountNumber,
          branch: this.form.branch,
         }


         try {
           
             const response = await axios.post(this.getUrl + 'api/companies',formData)

             if(response.status == 200){
               console.log("Company created")
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
                 const response2 = await axios.post(this.getUrl + 'api/companyactivities', {
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
       async addProduct(companyId){
                  const response3 = await axios.post(this.getUrl + 'api/CardProductSetup', {
                companyId: parseInt(companyId),
                productName: this.form.productName,
                cardProductCode: this.form.productCode,
                isActive: true
                      })
                      
               if(response3.status == 200){ 
                  console.log("Company created")
                this.companyId = companyId
               this.isCompanyCreated = true   
              this.loader = false;
             }

             else{
               this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = 'Operation Failed'
             }
      },
     async addUser(){
          this.loader = true
         const formData = {
                  companyId: parseInt(this.companyId),
                  firstName: this.form2.firstName,
                  lastName: this.form2.lastName,
                  emailAddress: this.form2.emailAddress,
                  userName: this.form2.userName,
                  mobileNo: this.form2.mobileNo,
                  rolesId: parseInt(document.getElementById("roles").value),
                  isActive: true
         }
         try {
           
             const response = await axios.post(this.getUrl + 'api/companyusers',formData)
             if(response.status == 200){
                console.log("User Added")
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
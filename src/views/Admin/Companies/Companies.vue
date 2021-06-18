<template>
            <div class="app-admin-section">
              <div v-show="AddCompanyModal">
              <AddMFB  :closeModal="closeModal" :closeModalReload="closeModalReload" />
          </div>
          <div v-show="EditModal">
              <EditMFB :companyCardSetup="companyCardSetup" :editActivities="activities" :closeModal="closeEdit" :closeEditReload="closeEditReload" :editData="editData"/>
          </div>
            <div v-show="CallerModal">
              <CallerModal :isSetup="isSetup" :callerData="callerData" :companyData="companyData"  :closeModal="closeCaller" :closeCallerReload="closeCaller" />
          </div>
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
 <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div class="settings-icon"></div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>
      <div class="content-header">Companies</div>
      <div class="content-sub">Here are the latest report on Paysure Agency</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
            <input type="text" class="app-input-search w-input" maxlength="256" name="name" data-name="Name" placeholder="Search..." id="name"/>
          </div>
        </div>
        <div class="app-table-buttons">
            <!-- <div @click="openCaller" style="cursor:pointer;background:#1b1b1b" className="table-button filter">Setup Caller Id<span className="table-button-icon"></span></div> -->
          <div @click="openModal" style="cursor:pointer" className="table-button filter">Add New Company<span className="table-button-icon"></span></div>
        </div>
      </div>
      <Loading v-if="getLoading"/>
        <div v-else>
              <table class="app-table2" v-if="!getCompanies.length <= 0">
                                  <thead>
                                      <tr class="app-table2-row">
                                        <!-- <th class="app-table2-header">.</th> -->
                                         <th class="app-table2-header">S/N</th>
                                      <th class="app-table2-header">Name</th>
                                      <th class="app-table2-header">Code</th>
                                      <th class="app-table2-header">Email Address</th>
                                       <th class="app-table2-header">Phone Number</th>
                                       <th class="app-table2-header">Account Number</th>
                                      <th class="app-table2-header"></th>
                                       <th class="app-table2-header"></th>
                                       <th class="app-table2-header"></th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr v-for="(result, index) in getCompanies" :key="index" class="app-table2-row">
                                      <!-- <td class="app-table2-data"><input @click="selectCompany(result)" :id="`SC${result.id}`" type="checkbox" value="test" /></td> -->
                                    <td class="app-table2-data">{{index + 1}}</td>
                                  <td class="app-table2-data">{{result.name}}</td>
                                      <td class="app-table2-data"> {{result.companyCode}} </td>
                                        <td class="app-table2-data">{{result.emailAddress}}</td>
                      
                                        <td class="app-table2-data">{{result.phoneNumber}}</td>
                                        <td class="app-table2-data">{{result.accountNumber}}</td>
                                              <td class="app-table2-data">
                      <div @click="openCaller(result)" style="background:#c00;cursor:pointer" class="table-btn">Caller Id<span class="table-button-icon"></span></div>
                            </td>
                                         <!-- <td class="app-table2-data">
                         <router-link :to="`/admin/requests/${result.id}`"><div style="background:#c00;cursor:pointer" class="table-btn">Requests<span class="table-button-icon"></span></div></router-link>   
                            </td> -->
                                         <td class="app-table2-data">
                            <div @click="openEdit(result)" style="cursor:pointer" class="table-btn">Update<span class="table-button-icon"></span></div>
                            </td>
                                  </tr>     
                                                                                               
                                  </tbody>
                                  </table> 
      <EmptyData v-else/>
      </div>
            </div>
            <!-- <div class="app-admin-col-3">
              <Rightbar />
            </div> -->
          </div>
</template>

<script>
import Leftbar from '../../../components/Admin/leftbar/leftbar'
import Rightbar from '../../../components/Admin/rightbar/rightbar'
import AddMFB from './AddCompany'
import EditMFB from './EditCompany'
import axios from 'axios'
import {mapGetters} from 'vuex'
import EmptyData from '../../../components/EmptyData/EmptyData'
import Loading from '../../../components/Loading/Loading'
import CallerModal from './SetupCallerId'
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    AddMFB,
    EditMFB,
    EmptyData,
    Loading,
    CallerModal
  },
  data(){
    return{
      AddCompanyModal: false,
      EditModal:false,
      editData:'',
      activities:[],
      companyCardSetup:"",
      CallerModal:false,
      companyData:"",
      callerData:"",
      isSetup: false
    }
  },
  computed:{
  ...mapGetters([
     'getLoading',
    'getUrl',
    'getUrl2',
    'getCompanies',
  ])
  },
    created(){
   this.$store.dispatch("getCompanies");
  },
  methods: {       
       selectCompany(result){
      var checkbox = document.getElementById(`SC${result.id}`);
      if (checkbox.checked == true){
         console.log("check")
    this.companyData = result
  }
  else{
    console.log("uncheck")
     this.companyData = ""
      }

      },
     closeCaller(){
         this.CallerModal = false 
       },
       closeCallerReload(){
         this.CallerModal = false 
         location.reload();
         return false; 
       },
       closeModal(){
         this.AddCompanyModal = false 
       },
       closeModalReload(){
         this.AddCompanyModal = false 
         location.reload();
         return false; 
       },
        openModal(){    
           this.AddCompanyModal = true
       },
       async openCaller(result){
           const response = await axios.post(this.getUrl2 + 'api/DispenseErrorCaller/GetCallerId/' + result.id)
           if(response.status == 200 && response.data.companyId){
           this.callerData = response.data
           this.CallerModal = true,
           this.isSetup = true
           }
           else{
           this.companyData = result
           this.CallerModal = true 
           this.isSetup = false   
           }
       },
        async openEdit(result){

             const response = await axios.get(this.getUrl + 'api/companies/CompanyAcivities/' + result.id)
         const response2 = await axios.get(this.getUrl + 'api/CardProductSetup')
             let cardSetup = response2.data
             const y = cardSetup.find(x => { return x.companyId ==  result.id})
             this.companyCardSetup = y
              this.activities = response.data
            this.editData = result
           this.EditModal = true

       },
        closeEdit(){
           this.EditModal = false
       },
         closeEditReload(){
           this.EditModal = false
            location.reload();
         return false;
       },
      async getActivitiesById(id){
    
         try {
           
             const response = await axios.post(this.getUrl + 'api/companies/CompanyAcivities/' + id)
             if(response.status == 200){
              this.activities = response.data
             }
             else{
              return false
             }

         } catch (error) {
              console.log(error)
            
         }

    },
  },
}
</script>
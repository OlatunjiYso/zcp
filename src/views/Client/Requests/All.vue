<template>
  <div>
       <Loader v-show="loader"/>
     <Status :state="state"  :message = "message" :resetState="resetState" v-if="status"/>
       <ViewDetails v-show="viewDetails" :closeModal="closeModal" :viewDetailsData="viewDetailsData" />
 <div class="content-header">All Card Requests</div>
      <div class="content-sub">Here are the all the card requests</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
          <input v-model="searchQuery" type="text" class="app-input-search w-input" placeholder="Search..." id="name">
          </div>
        </div>
          <form @submit.prevent="filterArray" className="app-table-select">
        <input v-model="startDate"  style="margin-right:20px;width:40%" type="date" className="app-modal-form-field w-input"   required/>
         <input v-model="endDate"  style="margin-right:20px;width:40%" type="date" className="app-modal-form-field w-input"   required/>
        <button type="submit" style="margin-right:20px;font-size:15px;cursor:pointer;height:40px;background:#1b1b1b" className="app-icon table-button filter"><span className="table-button-icon"></span></button> 
         <button @click="reload" style="font-size:15px;cursor:pointer;height:40px;" className="app-icon table-button filter"><span className="table-button-icon"></span></button> 
          </form>
      </div>
           <Loading v-if="AllLoader"/>
           <div v-else>
                     <table class="app-table2" v-if="!resultQuery.length <= 0">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">Id</th>
                           <th class="app-table2-header">Date</th>
                          <th class="app-table2-header">Name on Card</th>
                          <th class="app-table2-header">Account Number</th>
                           <th class="app-table2-header">Card Product Code</th>
                           <th class="app-table2-header">Status</th>
                           <th class="app-table2-header"></th> 
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in resultQuery" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.create_at}}</td>
                            <td class="app-table2-data">{{result.nameOnCard}}</td>
                            <td class="app-table2-data">{{result.accountNbr}}</td> 
                            <td class="app-table2-data">{{result.productCode}}</td>
                            <th class="app-table2-data">{{ result.workflowId == 1 ? "Needs Approval" : 
                                result.workflowId == 2 ? "Awaiting processing" : 
                                result.workflowId == 3 ? "Approved" :
                                 result.workflowId == 4 ? "Awaiting processing" :
                                  result.workflowId == 5 ? "Processed and Shipped" :
                                   result.workflowId == 6 ? "Needs Acknowledgement" :
                                   result.workflowId == 0 ? "Rejected" : "null"
                                }}</th>
                              <td class="app-table2-data">
                                   <div @click="openModal(result)" style="cursor:pointer" class="table-btn">View<span class="table-button-icon"></span></div>
                            </td> 
                          
                        </tr>
                        
                    </tbody>
          
                </table>
                    <EmptyData v-else/>
           </div>

  </div>
</template>

<script>
import axios from 'axios'
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status2'
import {mapGetters} from 'vuex'
import EmptyData from '../../../components/EmptyData/EmptyData'
import Loading from '../../../components/Loading/Loading'
import ViewDetails from './ViewDetails'
export default {
  props:['AllRequests','AllLoader'],
          components:{
     Loader,
     Status,
     EmptyData,
     Loading,
     ViewDetails
    },
  data(){
    return{
         loading:false,
         loader: false,
        status: false,
        state: null,
        message: null,
                viewDetails: false,
        viewDetailsData:"",
        searchData:"",
        searchQuery: '',
        startDate:'',
        endDate:'',
        newData:[]
    }
  },

        computed:{
    ...mapGetters([
      'getUrl2',
    ]),
    resultQuery(){
      if(this.searchQuery){
      return this.AllRequests.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.accountNbr.toLowerCase().includes(v))
      })
      }else{
        return this.AllRequests;
      }
    },
  },
  methods: {
    reload(){
  this.$emit('reloadRequests')
    },
    filterArray(){
      this.loading = true

      const a = new Date(this.startDate).toISOString().substr(0,10);
       const b = new Date(this.endDate).toISOString().substr(0,10);

    const filtered = this.resultQuery.filter( x => {
      const transDate = new Date(x.create_at).toISOString().substr(0,10)
      return transDate >= a && transDate <= b ;
    })
    this.$emit("updateRequests", filtered) ;
    this.loading = false;
    },
          openModal(result){
   this.viewDetailsData = result
   this.viewDetails = true
  },
  closeModal(){
   this.viewDetails = false
  },
     resetState(){
this.status = false;
              location.reload();
         return false; 
    },
  async  Approve(result){
       this.loader = true
       const user = JSON.parse(localStorage.getItem("user-mfb"))
         const formData = {
              "requestId": [result.id],
              "companyId": parseInt(user.companyId),
              "workflowId": 2,
              "userId": parseInt(user.id)
            }
         try {
           
             const response = await axios.post(this.getUrl2 + 'api/CardRequest/approveoracknowledge',formData)
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
            
    }
  },
}
</script>
<template>
  <div>
       <Loader v-show="loader"/>
     <Status :state="state"  :message = "message" :resetState="resetState" v-if="status"/>
 <div class="content-header">All Card Parameterization Requests</div>
      <div class="content-sub">Here are the all the card requests</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
             <input v-model="searchQuery" type="text" class="app-input-search w-input" placeholder="Account Number" id="name">
          </div>
        </div>
        <!-- <div class="app-table-buttons">
          <a href="#" class="table-button">Sort <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Filter <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Actions <span class="table-button-icon"></span></a>
        </div> -->
      </div>
           <Loading v-if="AllLoader"/>
           <div v-else>
                     <table class="app-table2" v-if="!resultQuery.length <= 0">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">Id</th>
                           <th class="app-table2-header">Date</th>
                          <th class="app-table2-header">Account Number</th>
                          <th class="app-table2-header">Client Code</th>
                           <th class="app-table2-header">Parameter Type</th>
                           <th class="app-table2-header">Daily Amount/Count</th>
                           <!-- <th class="app-table2-header">Monthly Amount/Count</th> -->
                           <th class="app-table2-header">Status</th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in resultQuery" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.createdAt}}</td>
                            <td class="app-table2-data">{{result.accountNo}}</td>
                            <td class="app-table2-data">{{result.clientCode}}</td> 
                            <td class="app-table2-data">{{result.channelId}}</td>
                            <td class="app-table2-data">{{result.dailyAmount}} - {{result.dailyCount}}</td>
                            <!-- <td class="app-table2-data">{{result.monthlyAmount}} - {{result.monthlyCount}}</td> -->
                            <th class="app-table2-data">{{ result.workflowId == 1 ? "Needs Approval" : 
                                result.workflowId == 2 ? "Awaiting processing" : 
                                result.workflowId == 3 ? "Approved" :
                                 result.workflowId == 4 ? "Awaiting processing" :
                                  result.workflowId == 5 ? "Processed and Shipped" :
                                   result.workflowId == 6 ? "Needs Acknowledgement" :
                                   result.workflowId == 0 ? "Rejected" : "null"
                                }}</th>
                          
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
export default {
  props:['AllRequests','AllLoader'],
          components:{
     Loader,
     Status,
     EmptyData,
     Loading
    },
  data(){
    return{
         loading:false,
         loader: false,
        status: false,
        state: null,
        message: null,
        searchQuery: '',
    }
  },
        computed:{
    ...mapGetters([
      'getUrl2',
    ]),
            resultQuery(){
      if(this.searchQuery){
      return this.AllRequests.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.accountNo.toLowerCase().includes(v))
      })
      }else{
        return this.AllRequests;
      }
    },

    newRequest:function(){
   return this.AllRequests.map( x => {
       return {
           id: x.id,
           create_at: x.create_at,
           nameOnCard: x.nameOnCard,
           accountNbr: x.accountNbr,
           productName:this.cardSetup.find(y =>{ return y.cardProductCode == x.productCode }),
           productCode: x.productCode,
           workflowId: x.workflowId
       }
   }) 
    }
  },
  methods: {
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
<template>
  <div>
       <Loader v-show="loader"/>
     <Status :state="state"  :message = "message" :resetState="resetState" v-if="status"/>
 <div class="content-header">Pending Card Reissue</div>
      <div class="content-sub">Here are the requests that need approval</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
 <input v-model="searchQuery" type="text" class="app-input-search w-input" placeholder="Client Code" id="name">         
          </div>
        </div>
        <!-- <div class="app-table-buttons">
          <a href="#" class="table-button">Sort <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Filter <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Actions <span class="table-button-icon"></span></a>
        </div> -->
      </div>
           <Loading v-if="approvalLoader"/>
           <div v-else>
                     <table class="app-table2" v-if="!resultQuery.length <= 0">
                    <thead>
                         <tr class="app-table2-row">
                                                    <th class="app-table2-header">S/N</th>
                           <th class="app-table2-header">Client Code</th>
                          <th class="app-table2-header">Request Date</th>
                           <th class="app-table2-header">Processed Date</th>
                             <th class="app-table2-header">Reason</th>  
                            <th class="app-table2-header"></th>
                             <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in resultQuery" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.clientCode}}</td> 
                            <td class="app-table2-data">{{result.requestDate}}</td>
                            <td class="app-table2-data">{{result.processedDate}}</td>
                            <th class="app-table2-data"> <input v-model="reason[result.id]" type="text" class="app-input-search w-input" placeholder="Type here" id="name"></th>
                             <td class="app-table2-data">
                                   <div @click="Approve(result)" style="cursor:pointer" class="table-btn">Approve<span class="table-button-icon"></span></div>
                            </td> 
                             <td class="app-table2-data">
                                   <div @click="Decline(result)" style="cursor:pointer;background:#c00000" class="table-btn">Decline<span class="table-button-icon"></span></div>
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
export default {
  props:['ApprovalRequests','approvalLoader'],
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
        reason:[],
        searchQuery: '',
    }
  },
        computed:{
    ...mapGetters([
      'getUrl2',
    ]),
            resultQuery(){
      if(this.searchQuery){
      return this.ApprovalRequests.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.clientCode.toLowerCase().includes(v))
      })
      }else{
        return this.ApprovalRequests;
      }
    },
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
              "userId": parseInt(user.id),
              "clientCode": result.clientCode,
              "reason": this.reason[result.id]
            }
         try {
           
             const response = await axios.post(this.getUrl2 + 'api/CardCancellation/approvecardcancellation',formData)
            if(response.status == 200 && response.data == true){
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'Request Approved Successfully'
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
      async  Decline(result){
       this.loader = true
       const user = JSON.parse(localStorage.getItem("user-mfb"))
        const formData = {
              "requestId": [result.id],
              "companyId": parseInt(user.companyId),
              "workflowId": 0,
              "userId": parseInt(user.id),
              "clientCode": result.clientCode,
              "reason": this.reason[result.id]
            }
         try {
           
             const response = await axios.post(this.getUrl2 + 'api/CardCancellation/rejectcardcancellation',formData)
            if(response.status == 200 && response.data == true){
               this.loader = false;
               this.status = true;
               this.state = 'success';
 this.message = 'Request Denied Successfully'             }
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
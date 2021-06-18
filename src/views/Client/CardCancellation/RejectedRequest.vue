<template>
  <div>
                    <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeModalReload" :message = "message" :resetState="resetState" v-if="status"/>
 <div class="content-header">Rejected Card Reissue Requests</div>
      <div class="content-sub">Here are the requests that were rejected</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
            <form id="email-form" name="email-form" data-name="Email Form"><input type="text" class="app-input-search w-input" maxlength="256" name="name" data-name="Name" placeholder="Search..." id="name"></form>
          </div>
        </div>
        <!-- <div class="app-table-buttons">
          <a href="#" class="table-button">Sort <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Filter <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Actions <span class="table-button-icon"></span></a>
        </div> -->
      </div>
           <Loading v-if="RejectLoader"/>
           <div v-else>
                     <table class="app-table2" v-if="!RejectRequests.length <= 0">
                    <thead>
                        <tr class="app-table2-row">
                          <th class="app-table2-header">S/N</th>
                            <th class="app-table2-header">Client Code</th>
                          <th class="app-table2-header">Request Date</th>
                           <th class="app-table2-header">Processed Date</th>
                             <th class="app-table2-header">Status</th>  
                            <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in RejectRequests" :key="index" class="app-table2-row">
                             <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.clientCode}}</td> 
                            <td class="app-table2-data">{{result.requestDate}}</td>
                            <td class="app-table2-data">{{result.processedDate}}</td>
                            <th class="app-table2-data">{{ result.workflowId == 1 ? "Needs Approval" : 
                                result.workflowId == 2 ? "Awaiting processing" : 
                                result.workflowId == 3 ? "Approved" :
                                 result.workflowId == 4 ? "Awaiting processing" :
                                  result.workflowId == 5 ? "Processed and Shipped" :
                                   result.workflowId == 6 ? "Needs Acknowledgement" :
                                   result.workflowId == 0 ? "Rejected" : "null"
                                }}</th>
                             <td class="app-table2-data">
                                   <div @click="sendRequest(result)" style="cursor:pointer" class="table-btn">Reprocess<span class="table-button-icon"></span></div>
                            </td> 
                        </tr>
                        
                    </tbody>
          
                </table>
                    <EmptyData v-else/>
           </div>

  </div>
</template>

<script>
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status2'
import {mapGetters} from 'vuex'
import EmptyData from '../../../components/EmptyData/EmptyData'
import Loading from '../../../components/Loading/Loading'
import axios from "axios";
export default {
  props:['RejectRequests','RejectLoader'],
          components:{
     Loader,
     Status,
     EmptyData,
     Loading,
    },
  data(){
    return{
         requestData: "",
         loading:false,
         loader: false,
        status: false,
        state: null,
        message: null,
        reprocessView: false,
    
    }
  },
        computed:{
    ...mapGetters([
      'getUrl2',
    ]),
  },
  methods: {
      resetState(){
    this.status =false
             location.reload();
         return false;
      },
          async sendRequest(result){
       this.loader = true
       const user = JSON.parse(localStorage.getItem("user-mfb"))
          const form = {
              "id": result.id,
              "companyId": user.companyId,
              "userId": user.id,
              "clientCode": result.clientCode,
              "workflowId": 1,
          }
         try {
           
             const response = await axios.post(this.getUrl2 + 'api/CardCancellation/initialcardandreprocess',form)
             if(response.data.responseCode == "00"){
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'Operation Sucessful'
             }
             else if(response.data.responseCode == "01"){
               this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = response.data.responseMessage
             }

         } catch (error) {
              console.log(error)
               this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = 'Operation Failed'
         }
            
      },
           closeModal(){
         this.reprocessView = false 
       },
       closeModalReload(){
         this.reprocessView = false 
         location.reload();
         return false; 
       }, 
   openModal(result){
  this.requestData = result
  this.reprocessView = true;
   }
  },
}
</script>
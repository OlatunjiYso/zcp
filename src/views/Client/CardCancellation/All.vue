<template>
  <div>
     <ViewDetails v-show="viewDetails" :closeModal="closeModal" :viewDetailsData="viewDetailsData" />
 <div class="content-header">All Request</div>
      <div class="content-sub">Here are the all the card cancellation request</div>
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
           <Loading v-if="AllLoader"/>
           <div v-else>
                     <table class="app-table2" v-if="!AllRequests.length <= 0">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">S/N</th>
                           <th class="app-table2-header">Account Number</th>
                          <th class="app-table2-header">Request Date</th>
                           <th class="app-table2-header">Processed Date</th>
                             <th class="app-table2-header">Status</th>   
                               <th class="app-table2-header"></th>                  
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in AllRequests" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.accountNo}}</td> 
                            <td class="app-table2-data">{{result.requestDate}}</td>
                            <td class="app-table2-data">{{result.requestDate}}</td>
                            <th class="app-table2-data">{{ result.workflowId == 1 ? "Needs Approval" : 
                                result.workflowId == 2 ? "Awaiting processing" : 
                                result.workflowId == 3 ? "Approved" :
                                 result.workflowId == 4 ? "Awaiting processing" :
                                  result.workflowId == 5 ? "Processed and Shipped" :
                                   result.workflowId == 6 ? "Needs Acknowledgement" :
                                   result.workflowId == 0 ? "Rejected" : "null"
                                }}</th>
                                 <!-- <td class="app-table2-data">
                                   <div @click="openModal(result)" style="cursor:pointer" class="table-btn">View<span class="table-button-icon"></span></div>
                            </td>  -->
                          
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
        viewDetailsData:""
    }
  },
        computed:{
    ...mapGetters([
      'getUrl2',
    ]),
  },
  methods: {
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
 
  },
}
</script>
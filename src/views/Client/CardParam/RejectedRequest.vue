<template>
  <div>
<ReprocessRequest v-show="reprocessView" :requestData="requestData" :closeModal="closeModal" :closeModalReload="closeModalReload"/>
 <div class="content-header">Rejected Card Requests</div>
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
                           <th class="app-table2-header">Id</th>
                           <th class="app-table2-header">Date</th>
                          <th class="app-table2-header">Account Number</th>
                          <th class="app-table2-header">Client Code</th>
                           <th class="app-table2-header">Parameter Type</th>
                           <th class="app-table2-header">Daily Amount/Count</th>
                           <!-- <th class="app-table2-header">Monthly Amount/Count</th> -->
                            <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in RejectRequests" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.createdAt}}</td>
                            <td class="app-table2-data">{{result.accountNo}}</td>
                            <td class="app-table2-data">{{result.clientCode}}</td> 
                            <td class="app-table2-data">{{result.channelId}}</td>
                            <td class="app-table2-data">{{result.dailyAmount}} - {{result.dailyCount}}</td>
                            <!-- <td class="app-table2-data">{{result.monthlyAmount}} - {{result.monthlyCount}}</td> -->
                             <td class="app-table2-data">
                                   <div @click="openModal(result)" style="cursor:pointer" class="table-btn">Reprocess<span class="table-button-icon"></span></div>
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
import ReprocessRequest from './Reprocess'

export default {
  props:['RejectRequests','RejectLoader'],
          components:{
     Loader,
     Status,
     EmptyData,
     Loading,
     ReprocessRequest
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
        RejectRequests2:[{
    "id": 19,
    "companyId": 13,
    "title": "MR",
    "firstName": "John",
    "middleName": "Ekal",
    "lastName": "Mutumbie",
    "gender": "Male",
    "maritalStatus": "MARRIED",
    "mobileNo": "07082079883",
    "email": "aliasgbolly@gmail.com",
    "dateOfBirth": "2021-05-18",
    "addressLine1": "Lagos",
    "addressLine2": "Lagos",
    "cityCode": "99371",
    "regionCode": "019",
    "countryCode": "044",
    "legalID": "8924894",
    "idCardTypeCode": "02",
    "documentIssueDate": "2021-05-12",
    "expiryDateOfDoc": "2021-05-18",
    "accountNbr": "0229377919",
    "nameOnCard": "John Mutumbie",
    "branchNo": "114",
    "socioProfCode": "006",
    "uniqueReference": null,
    "productCode": "520",
    "workflowId": 7,
    "clientCode": null,
    "create_at": "0001-01-01T00:00:00"
  }]
    }
  },
        computed:{
    ...mapGetters([
      'getUrl2',
    ]),
  },
  methods: {
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
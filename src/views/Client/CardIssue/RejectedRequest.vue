<template>
  <div>
<ReprocessRequest v-show="reprocessView" :requestData="requestData" :closeModal="closeModal" :closeModalReload="closeModalReload"/>
 <div class="content-header">Rejected Card Reissue Requests</div>
      <div class="content-sub">Here are the requests that were rejected</div>
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
           <Loading v-if="RejectLoader"/>
           <div v-else>
                     <table class="app-table2" v-if="!resultQuery.length <= 0">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">S/N</th>
                           <th class="app-table2-header">Account Name</th>
                          <th class="app-table2-header">Account Number</th>
                          <th class="app-table2-header">Card Pan</th>
                           <th class="app-table2-header">New Name</th>
                           <th class="app-table2-header">Request Date</th>
                           <th class="app-table2-header">Reason</th>
                            <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in resultQuery" :key="index" class="app-table2-row">
                              <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.accountName}}</td>
                            <td class="app-table2-data">{{result.accountNumber}}</td>
                            <td class="app-table2-data">{{result.cardPan}}</td> 
                            <td class="app-table2-data">{{result.newNameOfCard}}</td>
                            <td class="app-table2-data">{{result.requestDate}}</td>
                            <td class="app-table2-data">{{result.reason}}</td>
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
      searchQuery: '',
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
            resultQuery(){
      if(this.searchQuery){
      return this.RejectRequests.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.accountNumber.toLowerCase().includes(v))
      })
      }else{
        return this.RejectRequests;
      }
    },
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
<template>
  <div>
<ReprocessRequest v-show="reprocessView" :requestData="requestData" :closeModal="closeModal" :closeModalReload="closeModalReload"/>
 <div class="content-header">Rejected Card Stock Requests</div>
      <div class="content-sub">Here are the requests that were rejected</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
 <input v-model="searchQuery" type="text" class="app-input-search w-input" placeholder="Account Number" id="name">          </div>
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
                            <th class="app-table2-header">Id</th>
                           <th class="app-table2-header">Date</th>
                          <th class="app-table2-header">No of Card</th>
                          <th class="app-table2-header">Type of Card</th>
                           <th class="app-table2-header">Product Type</th>
                           <th class="app-table2-header">Reason</th>
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
        reprocessView: false
    }
  },
        computed:{
    ...mapGetters([
      'getUrl2',
    ]),
        resultQuery(){
      if(this.searchQuery){
      return this.RejectRequests.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.accountNbr.toLowerCase().includes(v))
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
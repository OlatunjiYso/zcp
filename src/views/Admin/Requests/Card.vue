<template>
  <div>
     <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
 <div class="content-header">Card Requests</div>
      <div class="content-sub">Here are the latest report on Paysure Agency</div>
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
      <Loading v-if="loading"/>
        <div v-else>
        <table class="app-table2" v-if="!Requests.length <= 0">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">Id</th>
                           <th class="app-table2-header">Date</th>
                          <th class="app-table2-header">Name on Card</th>
                          <th class="app-table2-header">Account Number</th>
                           <th class="app-table2-header">Card Type</th>
                           <th class="app-table2-header">Card Product Code</th>
                           <th class="app-table2-header">Status</th>
                           
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in Requests" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{result.id}}</td>
                            <td class="app-table2-data">{{result.create_at}}</td>
                            <td class="app-table2-data">{{result.nameOnCard}}</td>
                            <td class="app-table2-data">{{result.accountNbr}}</td> 
                            <td class="app-table2-data">-</td>
                            <td class="app-table2-data">{{result.productCode}}</td>  
                            <th class="app-table2-data">{{ result.workflowId == 1 ? "Needs Approval" : "null"}}</th>
                            
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
  props:['Requests', 'loading'],
    components:{
     Loader,
     Status,
     EmptyData,
     Loading
    },
  data(){
    return{
         loader: false,
        status: false,
        state: null,
        message: null,
    }
  },
        computed:{
    ...mapGetters([
      'getUrl2',
    ])
  },
  methods: {
  
  },
}
</script>
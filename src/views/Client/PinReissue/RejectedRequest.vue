<template>
  <div>
 <div class="content-header">Rejected Pin Reissue Requests</div>
      <div class="content-sub">Here are the requests that were rejected</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
             <input v-model="searchQuery" type="text" class="app-input-search w-input" placeholder="Client Code" id="name">          </div>
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
                            <th class="app-table2-header">Client Code</th>
                          <th class="app-table2-header">Request Date</th>
                           <th class="app-table2-header">Processed Date</th>
                             <th class="app-table2-header">Reason</th>  
                            <!-- <th class="app-table2-header"></th> -->
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in resultQuery" :key="index" class="app-table2-row">
                             <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.clientCode}}</td> 
                            <td class="app-table2-data">{{result.requestDate}}</td>
                            <td class="app-table2-data">{{result.processedDate}}</td>
                            <th class="app-table2-data">{{ result.reason}}</th>
                             <!-- <td class="app-table2-data">
                                   <div @click="sendRequest(result)" style="cursor:pointer" class="table-btn">Reprocess<span class="table-button-icon"></span></div>
                            </td>  -->
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
                searchQuery: '',
    
    }
  },
        computed:{
    ...mapGetters([
      'getUrl2',
    ]),
            resultQuery(){
      if(this.searchQuery){
      return this.RejectRequests.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.clientCode.toLowerCase().includes(v))
      })
      }else{
        return this.RejectRequests;
      }
    },
  },
  methods: {
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
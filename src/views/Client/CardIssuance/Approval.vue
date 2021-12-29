<template>
  <div>
       <Loader v-show="loader"/>
     <Status :state="state"  :message = "message" :resetState="resetState" v-if="status"/>
        <ViewDetails v-show="viewDetails" :closeModal="closeModal" :viewDetailsData="viewDetailsData" />
 <div class="content-header">Pending Card Requests</div>
      <div class="content-sub">Here are the requests that need approval</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
 <input v-model="searchQuery" type="text" class="app-input-search w-input" placeholder="Account Number" id="name">         
  </div>
        </div>
        <div className="app-table-select">
              <input required placeholder="Reason" v-show="multiAction" v-model="reason[0]"  style="margin-right:20px;width:40%" type="text" className="app-modal-form-field w-input"/>
        <button v-show="multiAction" @click="sendApprove" style="margin-right:20px;font-size:15px;cursor:pointer;height:40px;background:#c00;" className="table-button filter">Approve</button> 
         <button  v-show="multiAction" @click="sendDecline" style="font-size:15px;cursor:pointer;height:40px;background:#1b1b1b;" className="table-button filter">Decline</button> 

        </div>
      </div>
           <Loading v-if="approvalLoader"/>
           <div v-else>
                     <table class="app-table2" v-if="!resultQuery.length <= 0">
                    <thead>
                        <tr class="app-table2-row">
                          <th class="app-table2-header">
                              <input  @click="selectAll" id="select-all" type="checkbox" value="test" />
                          </th>
                           <th class="app-table2-header">Id</th>
                           <th class="app-table2-header">Date</th>
                          <th class="app-table2-header">Name on Card</th>
                          <th class="app-table2-header">Account Number</th>
                           <th class="app-table2-header">Card Product Code</th>
                            <th class="app-table2-header">Reason</th>
                            <th class="app-table2-header"></th>
                             <th class="app-table2-header"></th>
                             <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in resultQuery" :key="index" class="app-table2-row">
                              <td class="app-table2-data"><input @click="addSingle(result)" :id="`ReqA${result.id}`" type="checkbox" value="test" /></td>
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.create_at}}</td>
                            <td class="app-table2-data">{{result.nameOnCard}}</td>
                            <td class="app-table2-data">{{result.accountNbr}}</td> 
                            <td class="app-table2-data">{{result.productCode}}</td>
                             <td class="app-table2-data">
                               <input v-show="singleAction" v-model="reason[result.id]" type="text" class="app-input-search w-input" placeholder="Type here" id="name" required>
                            </td> 
                           <td class="app-table2-data">
                                   <div @click="openModal(result)"  style="cursor:pointer;color:red;text-decoration:underline" >View<span class="table-button-icon"></span></div>
                            </td> 
                              <td class="app-table2-data">
                                   <div  v-show="singleAction" @click="sendApprove(result)" style="cursor:pointer" class="table-btn">Approve<span class="table-button-icon"></span></div>
                            </td> 
                             <td class="app-table2-data">
                                   <div v-show="singleAction" @click="sendDecline(result)" style="cursor:pointer;background:#c00" class="table-btn">Decline<span class="table-button-icon"></span></div>
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
  props:['ApprovalRequests','approvalLoader'],
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
        searchQuery: '',
        newReq:[],
        multiAction: false,
        singleAction: true,
        reason: [],
        viewDetails: false,
        viewDetailsData:"",
    }
  },
        computed:{
    ...mapGetters([
      'getUrl2',
    ]),
        resultQuery(){
      if(this.searchQuery){
      return this.ApprovalRequests.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.accountNbr.toLowerCase().includes(v))
      })
      }else{
        return this.ApprovalRequests;
      }
    },
  },
  
  methods: {
      closeModal(){
   this.viewDetails = false
  },
              openModal(result){
   this.viewDetailsData = result
   this.viewDetails = true
  },
    checkBtnState(){
         if(this.newReq.length <= 0){
           console.log("empty", this.newReq.length)
                  this.multiAction = false
             this.singleAction = true
            }
            else{
                console.log("not empty",this.newReq.length)
              this.multiAction = true
             this.singleAction = false
            }
    },
         async selectAll(){
      var checkbox = document.getElementById("select-all"); 
     this.newReq = []
    if (checkbox.checked == true){
   for(var i = 0; i < this.ApprovalRequests.length; i++) {
    this.newReq.push(parseInt(this.ApprovalRequests[i].id));
      document.getElementById(`ReqA${this.ApprovalRequests[i].id}`).checked = true;
  }
        this.checkBtnState()
          }
  else{
     this.newReq = []
     for(var i = 0; i < this.ApprovalRequests.length; i++) {
      document.getElementById(`ReqA${this.ApprovalRequests[i].id}`).checked = false;
  }
        this.checkBtnState()
      }

      },
        async addSingle(req, index){
        let Avalue = await parseInt(req.id)
      var checkbox = document.getElementById(`ReqA${req.id}`);
       const state = await this.newReq.some(x => { return x == Avalue })
       console.log(state)
      if (state == false && checkbox.checked == true){
    this.newReq.push(Avalue);
     this.checkBtnState()
  }
  else{
     const newIndex = this.newReq.findIndex( result => { return result == Avalue})
       await this.newReq.splice(newIndex, 1); 
       this.checkBtnState()
      }

      },
    pushRequest(id){
    this.newReq.push(id)
    },
    sendApprove(result){
       this.loader = true
       if(this.singleAction == true){
        this.pushRequest(result.id)
        this.Approve(result)
       }
       else{
         this.Approve()
       }
    },
    sendDecline(result){
             this.loader = true
        if(this.singleAction == true){
        this.pushRequest(result.id)
        this.Decline(result)
       }
       else{
        this.Decline()
       }
    },
  async  Approve(result){

        const user = JSON.parse(localStorage.getItem("user-mfb"))
         const formData = {
              "requestId": this.newReq,
              "companyId": parseInt(user.companyId),
              "workflowId": 2,
              "userId": parseInt(user.id),
              "reason": result ? this.reason[result.id] : this.reason[0],
              "clientCode": "null"
            }
         try {
           
             const response = await axios.post(this.getUrl2 + 'api/CardRequest/approveoracknowledge',formData)
             if(response.data.responseCode == "00"){
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'Request Approved Successfully'
             }
             else{
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
      async  Decline(result){

            const user = JSON.parse(localStorage.getItem("user-mfb"))
         const formData = {
               "requestId": this.newReq,
              "companyId": parseInt(user.companyId),
              "workflowId": 0,
              "userId": parseInt(user.id),
              "reason": result ? this.reason[result.id] : this.reason[0],
              "clientCode": "null"
         }
         try {
           
             const response = await axios.post(this.getUrl2 + 'api/CardRequest/RejectCardRequest',formData)
            if(response.data.responseCode == "00"){
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'Request Denied Successfully'
             }
             else{
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
         resetState(){
this.status = false;
              location.reload();
         return false; 
    },
  },
}
</script>
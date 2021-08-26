<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
       <Loader v-show="loader"/>
     <Status :state="state"  :message = "message" :resetState="resetState" v-if="status"/>
 <div class="admin-top-bar">
        <div class="admin-top-bar-left">
       <div @click="previousPage" class="settings-icon"></div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{getDate2}}</div>
      </div>
      </div>
  <div class="content-header">Card Status</div>
      <div class="content-sub">Check the status of a card</div>
      <div>
        <div>
          <form @submit.prevent="searchCardAdmin">
             <div class="form-flex-col-3" style="display:inline-block">
        <label class="login-label">Select a Company<span style="color:red">*</span></label>
        <select required v-model="companyId" style="marginBottom: 30px" class="app-select w-select">
           <option v-for="(item,index) in getCompanies" :key="index" :value="item.id">{{item.name}}</option>            
            </select>
          </div>
       <input required  maxlength="10" v-model="accountNbr" v-on:keyup="searchForCard" style="display:inline-block;width:40%" type="text" class="app-input-search w-input" placeholder="Search by Account Number">
       <button type="submit" style="margin-top:-15px;margin-left:20px;font-size:15px;cursor:pointer;height:40px;background:#1b1b1b" className="app-icon table-button filter"><span className="table-button-icon"></span></button>        
          </form>
          
          </div>
        <!-- <div class="app-table-buttons">
          <a href="#" class="table-button">Sort <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Filter <span class="table-button-icon"></spa      `an></a>
          <a href="#" class="table-button">Actions <span class="table-button-icon"></span></a>
        </div> -->
      </div>
           <Loading v-if="loading"/>
           <div v-else>
                     <table class="app-table2" v-if="!cardData.length <= 0">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">Id</th>
                           <th class="app-table2-header">Date</th>
                          <th class="app-table2-header">Name on Card</th>
                          <th class="app-table2-header">Account Number</th>
                           <th class="app-table2-header">Product Type</th>
                           <th class="app-table2-header">Client Code</th>
                            <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in cardData" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.create_at}}</td>
                            <td class="app-table2-data">{{result.nameOnCard}}</td>
                            <td class="app-table2-data">{{result.accountNbr}}</td> 
                            <td class="app-table2-data">{{result.productCode}}</td>  
                            <td class="app-table2-data">{{result.clientCode}}</td>  
                             <td class="app-table2-data">
                            <div @click="CheckStatus(result)" style="cursor:pointer" class="table-btn">Card Status<span class="table-button-icon"></span></div>
                            </td> 
                        </tr>
                        
                    </tbody>
          
                </table>
                    <EmptyData v-else/>
           </div>
             <!-- <div class="app-admin-col-3">
              <Rightbar />
            </div> -->
            </div>
            </div>
</template>

<script>
import Global from '../../../views/global.js'
import Leftbar from "../../../components/Admin/leftbar/leftbar";
import Rightbar from "../../../components/Admin/rightbar/rightbar";
import Loader from "../../../components/Loader/Loader";
import Status from "../../../components/Status/Status2";
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  components: {
    Leftbar,
    Rightbar,
    Loader,
    Status
    
  },
      mixins:[Global],
  data(){
    return{
         loading:false,
         loader: false,
        status: false,
        state: null,
        message: null,
        testData:[{
            id: '1',
            create_at: "12/02/21",
            nameOnCard: 'Mutumbie John',
            accountNbr: "0229282818",
            productName: "Credit",
            productCode: "889",
            clientCode: "93930"
        }],
        accountNbr:'',
        cardData:[],
        cardSetup:[],
        companyId:0
    }
  },

  created(){
   this.$store.dispatch('getCardSetup')
     this.$store.dispatch('getCompanies')
  },
        computed:{
    ...mapGetters([
      'getUrl2',
      'getCardSetup',
      'getCompanies'
    ])
  },
  methods: {
     resetState(){
this.status = false;
    },
   async searchForCard(e){
        const user = JSON.parse(localStorage.getItem("user"))
   if (e.keyCode === 13) {
           this.loading = true
   const response = await axios.get(this.getUrl2 + 'api/CardRequest/cardbyaccountNo/'+  this.companyId + "/" + this.accountNbr)
   if(response.status == 200){
     const requests = response.data.map(x => { 
         return {
           ...x,
             productCode :  this.getCardSetup.length > 0 ? this.getCardSetup.find((entry)=>{return x.productCode === entry.cardProductCode}).description : null
         }
        })
   this.loading = false
   this.cardData = requests
   }
   else{
       this.loading = false
   }
         }
    },
        async searchCardAdmin(e){
      const user = JSON.parse(localStorage.getItem("user-mfb"))
         this.loading = true
 const response = await axios.get(this.getUrl2 + 'api/CardRequest/cardbyaccountNo/'+  this.companyId + "/" + this.accountNbr)
 if(response.status == 200){
  const requests = response.data.map(x => { 
    return {
      ...x,
        productCode :  this.getCardSetup.length > 0 ? this.getCardSetup.find((entry)=>{return x.productCode === entry.cardProductCode}).description : null
    }
   })
this.loading = false
this.cardData = requests
 }
 else{
     this.loading = false
 }
  },
            async CheckStatus(result){
                   if( result.clientCode.length > 3){
       this.loader = true
       const user = JSON.parse(localStorage.getItem("user"))
          const form = {
              "companyId": this.companyId,
              "userId": user.id,
              "clientCode": result.clientCode == null ? "null" : result.clientCode
          }
         try {
           
             const response = await axios.post(this.getUrl2 + 'api/CardRequest/cardstatus',form)
             if(response.data.responseCode == "00"){
                             this.cardData = []
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'Operation Sucessful'
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
                this.message = error.message
         }
           }
              else{
                  this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = "This card does not have a valid client code"
              }
            
      },
 
  },
}
</script>
<style scoped>
a{text-decoration: none;}
</style>
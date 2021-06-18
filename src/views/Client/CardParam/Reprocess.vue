<template>
  <div>
                <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeModalReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:90%; height:90%; overflow:auto;">
            <div>
      <div>
              <div class="app-modal-heading">
        <div class="app-modal-header">Reprocess Request</div>
      </div>
  <form @submit.prevent="sendRequest">
    <div class="form-flex">
         <div class="form-flex-col-3">
        <label class="login-label">Parameter Type<span style="color:red">*</span></label>
        <select v-model="requestData.channelId" style="marginBottom: 30px" class="app-select w-select">
             <option v-for="(item,index) in channels" :key="index" :value="item.id">{{item.name}}</option>            
            </select>
          </div>
    </div>
    <div>
            <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label">Daily Amount<span style="color:red">*</span></label>
        <input v-model.number="requestData.dailyAmount" type="number" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
       <div class="form-flex-col-3">
        <label class="login-label">Daily Count<span style="color:red">*</span></label>
        <input v-model.number="requestData.dailyCount" type="number" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
    </div>
      <!-- <div class="form-flex">
      <div class="form-flex-col-3">
        <label class="login-label">Monthly Amount<span style="color:red">*</span></label>
        <input v-model.number="requestData.monthlyAmount" type="number" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
       <div class="form-flex-col-3">
        <label class="login-label">Monthly Count<span style="color:red">*</span></label>
        <input  v-model.number="requestData.monthlyCount" type="number" class="app-text-field w-input" required placeholder="Type Here" />
      </div>
    </div>   -->
    </div>

        <br><br>
    <button type="submit" class="app-form-button">Submit</button>
  </form>
      </div>
      <div @click= "closeModal" class="app-modal-close"></div>
    </div>
  </div>
                    </div>
  </div>
</template>

<script>
import operationMixen from "../../operationMixen.js";
import Loader from "../../../components/Loader/Loader";
import Status from "../../../components/Status/Status";
import {mapGetters} from "vuex";
import axios from "axios";
export default {
  name: "ActivityForm1",
  props:['requestData','closeModal','closeModalReload'],
  components: {
    Loader,
    Status
  },
  computed:{
    ...mapGetters([ 'getUrl2', 'getUrl' ])
  },
  mixins: [operationMixen],
  data(){
    return{
      loader: false,
      status: false,
      state: null,
      message: null,
            channels:[
        {
          id:1,
          name: 'ATM'
        },
        {
          id:2,
          name: 'POS/WEB '
        },
        {
          id:3,
          name: 'Cash Advance'
        },
        {
          id:4,
          name: 'Others'
        }
      ],
    }
  },
  methods: {
          resetState(){
this.status = false;
    },
    clearForm(){
    },
    resetState(){
      this.status = false;
    },
    async sendRequest(){
      this.loader = true;
      const user = JSON.parse(localStorage.getItem("user-mfb"))
       const formData ={
             "id": this.requestData.id,
             "userId": user.id,
            "companyId": user.companyId,
            "clientCode": this.requestData.clientCode,
                    "channelId": this.requestData.channelId,
                    "dailyAmount": parseInt(this.requestData.dailyAmount),
                    "dailyCount": parseInt(this.requestData.dailyCount),
                    "workflowId": 1
       }
      try {
        const response = await axios.post(this.getUrl2 + 'api/CardParameterization/initialorreprocessparameterization',formData)
        if(response.status == 200){
          this.loader = false;
          this.status = true;
          this.state = 'success';
          this.message = 'Operation Sucessful'
          this.clearForm();
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
  },
}
</script>

<style scoped>

</style>
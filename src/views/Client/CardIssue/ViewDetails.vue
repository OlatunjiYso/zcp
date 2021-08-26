<template>
          <div class="app-modal-overlay">
      <div class="app-modal-div" style="width:90%; height:90%; overflow:auto;" >
      <div class="app-modal-heading">
        <div class="app-modal-header">Request Details</div>
      </div>
      <div class="details-flex">
          <div class="details-div">
            <div class="details-header">Request ID</div>
            <div class="details-value">{{viewDetailsData.id}}</div>
          </div>
        </div>
        <div class="details-flex">
          <div class="details-div">
            <div class="details-header">Trans ID</div>
            <div class="details-value">{{viewDetailsData.trans_id}}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Request Date</div>
            <div class="details-value">{{viewDetailsData.requestDate}}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Processed Date</div>
            <div class="details-value">{{viewDetailsData.processedDate}}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Account Name</div>
            <div class="details-value">{{viewDetailsData.accountName}}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Account Number</div>
            <div class="details-value">{{viewDetailsData.accountNumber}}</div>
          </div>
          <div class="details-div">
            <div class="details-header">New Card Name</div>
            <div class="details-value">{{viewDetailsData.newNameOfCard}}</div>
          </div>
          <div class="details-div">
            <div class="details-header">Surname Change</div>
            <div class="details-value">{{viewDetailsData.surname_change}}</div>
          </div>
           <div class="details-div">
            <div class="details-header">Card Pan</div>
            <div class="details-value">{{viewDetailsData.cardPan}}</div>
          </div>
           <div class="details-div">
            <div class="details-header">Reason</div>
            <div class="details-value">{{viewDetailsData.reason}}</div>
          </div>
           <div class="details-div">
            <div class="details-header">Activity By</div>
            <div class="details-value">{{viewDetailsData.activityBy}}</div>
          </div>
           <div class="details-div">
            <div class="details-header">Request Branch</div>
            <div class="details-value">{{viewDetailsData.requestBranch}}</div>
          </div>
            <div class="details-div">
            <div class="details-header">Pickup Branch</div>
            <div class="details-value">{{viewDetailsData.pickupBranch}}</div>
          </div>
                      <div class="details-div">
            <div class="details-header">Status</div>
            <div class="details-value">{{viewDetailsData.workflowId == 1 ? "Needs Approval" : 
                                viewDetailsData.workflowId == 2 ? "Awaiting processing" : 
                                viewDetailsData.workflowId == 3 ? "Approved" :
                                   viewDetailsData.workflowId == 0 ? "Rejected" : "null"
                                }}</div>
          </div>
        </div>
      <div @click="closeModal" class="app-modal-close"></div>
    </div>
  </div>

</template>


<script>
export default {
  props:['closeModal','viewDetailsData'],
  data(){
    return{

    }
  },
 
}
</script>
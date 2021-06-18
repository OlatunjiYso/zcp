<template>
          <div class="app-modal-overlay">
      <div class="app-modal-div" style="width:70%; height:70%; overflow:auto;" >
      <div class="app-modal-heading">
        <div class="app-modal-header">Activities</div>
      </div>
            <div class="details-header">{{viewDetailsData}}</div>
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
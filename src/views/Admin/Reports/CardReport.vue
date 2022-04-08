<template>
  <div class="app-modal-overlay">
    <div class="app-modal-div" style="width: 90%; height: 90%; overflow: auto">
      <div class="app-modal-heading">
        <div class="app-modal-header">Report Details</div>
      </div>
      <div class="details-flex">
        <div
          class="details-div"
          v-for="(value, propertyName, index) in cardReportData"
          :key="index"
        >
          <div class="details-header">{{ propertyName }}</div>
          <div class="details-value">{{ value }}</div>
        </div>
      </div>
      <div @click="closeModal" class="app-modal-close"></div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["closeModal", "cardReportData"],
  data() {
    return {};
  },
};
</script>
<template>
  <div class="loader-class">
    <h4 class="info"> {{infoLine1}} <br/> {{infoLine2}} </h4>
    <img src="../../assets/images/loader-png.gif" alt="" class="loader-img" />
  </div>
</template>
<script> 
export default {
  props: [
    "infoLine1",
    "infoLine2"
  ],
}
</script>
<style scoped>
.loader-class {
  display: flex;
  flex-direction: column;
  background: rgba(134, 134, 134, 0.95);
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 999999;
}
.loader-img {
  width: 150px;
}
.info {
    color: rgb(59, 55, 55);
}
</style>
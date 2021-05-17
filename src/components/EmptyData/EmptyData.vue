<template>
  <div>
              <div class="emptyData-div">
        <div class="emptyData-icon"></div>
        <div class="emptyData-text">
          Oops! No Record Found.
        </div>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.emptyData-div{

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 50px;
}
.emptyData-icon {
  font-family: 'ionicons';
  font-size: 150px;
  color: #c9c9c9;
  margin-top: 50px;
}

.emptyData-text {
    margin-top: 70px;
  font-size: 17px;
  color: #c9c9c9;
  font-weight: 600;
}
</style>
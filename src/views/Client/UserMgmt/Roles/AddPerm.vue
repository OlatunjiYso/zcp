<template>
  <div>
                    <div class="app-modal-overlay">
      <div class="app-modal-div">
      <div class="app-modal-heading">
        <div class="app-modal-header">Add Permission</div>
      </div>
      <div>
          <form>
          <select @change="addtoArray($event)" style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(perm, index) in permissions" :key="index" :value="perm">{{perm}}</option>        
            </select>
           <div v-for="(perm, index) in permArray" :key="index" style= "margin-right:20px;margin-bottom:20px;background: #ededed;padding:10px; border-radius:5px; display:inline-block;color:#696969;font-size: 13px">
                 {{perm}} <span @click="removePerm(index)"  style="cursor: pointer; font-weight: bold; color:red; margin-left:10px">X</span> </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Add Permission</button>
        </form>
      </div>
      <div @click= "closeModal" class="app-modal-close"></div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
    props:['closeModal'],
  data(){
      return{
          permissionModal: false,
          permissions:['view-overview', 'manage-mfb','manage-requests','manage-users'],
          permArray:[]
      }
  },
  methods: {
        addtoArray(result){

       this.permArray.push(result.target.value)
   },

  removePerm(index){
    permArray.splice(index, 1);    
  }
  },
}
</script>

<style>

</style>
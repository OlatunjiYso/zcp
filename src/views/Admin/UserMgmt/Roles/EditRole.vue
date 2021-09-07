<template>
  <div>
        <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeEditReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:80%; height:90vh; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Update Role</div>
      </div>
      <div>
          <form @submit.prevent="updateRole">
              <div className="form-flex">
      <div className="form-flex-col">
         <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Role Name</label> 
        <input :value="editData.name" type="text" className="app-modal-form-field w-input" id="permname"  placeholder="Role Name"  required/>
      </div>
       <div className="form-flex-col">
          <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Description</label> 
        <input :value="editData.description" type="text" className="app-modal-form-field w-input" id="description"  placeholder="Description"  required/>
       </div>
         <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Mfb or Bank (Update: {{editData.mfbOrBank}})</label> 
         <select v-model="form.mfbOrBank" style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(result, index) in permType" :key="index" :value="result">{{result}}</option>     
            </select>
        </div>
         <div className="form-flex-col">
            <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Permission</label> 
          <select @change="addtoArray($event)" class="app-select w-select">
               <option selected>Select Permission</option> 
             <option  v-for="(perm, index) in getPermissions" :key="index" :value="perm.id">{{perm.name}}</option>        
            </select>
         </div>
              </div>
       <div v-for="(perm, index) in permissions_extra" :key="index" style= "margin-right:20px;margin-bottom:20px;background: #ededed;padding:10px; border-radius:5px; display:inline-block;color:#696969;font-size: 13px">
                 {{perm.name}} <span @click="removePerm(index)"  style="cursor: pointer; font-weight: bold; color:red; margin-left:10px">X</span> </div>


                         <!-- <div class="app-modal-heading">
        <div class="app-modal-header">Assigned Permission</div>
      </div>
               <div className="form-flex">
                         <div className="form-flex-col-x" v-for="(perm, index) in permissions_extra" :key="index">      
             <label :for="perm.name"><input disabled="disabled" checked="checked" style="margin-right:20px" :id="`C2${perm}`" type="checkbox" value="test" />{{perm.name}}</label>
        </div>
               </div>
      <br>
                       <div class="app-modal-heading">
        <div class="app-modal-header">Add Permission</div>
      </div>
       <label><input @click="selectAll" style="margin-right:20px" id="select-all-role2" type="checkbox" />Select All</label>
               <div className="form-flex">
                         <div className="form-flex-col-x" v-for="(perm, index) in getPermissions" :key="index">      
             <label :for="perm.name"><input  @click="addToActivity(perm, index)" style="margin-right:20px" :id="`E2${perm.id}`" type="checkbox" value="test" />{{perm.name}}</label>
        </div>
               </div> -->


          <button type="submit" style="display:block;cursor:pointer" class="app-modal-button">Update Role</button>
        </form>
      </div>
      <div @click= "closeEdit" class="app-modal-close"></div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import Loader from '../../../../components/Loader/Loader'
import Status from '../../../../components/Status/Status'
export default {
    props:['closeEdit','closeEditReload', 'editData', 'permAray'],
        components:{
     Loader,
     Status
    },
  data(){
      return{
         loader: false,
        status: false,
        state: null,
        message: null,
          roles:['Super Admin', 'Admin','Support'],
          form: {
            name: '',
            description: '',
            mfbOrBank: ""
          },
            permType: ['mfb','Bank'],
            editPermArray:[]
      }
  },
      computed:{
    ...mapGetters([
      'getUrl',
      'getRoles',
      'getPermissions'
    ]),

    permissions_extra(){
     const permArray = this.permAray.map( x => {
        return {
          id: x,
          name: this.getPermissions.length > 0 ? this.getPermissions.find( y => { return y.id === x}).name : null
        }
      })

      return permArray;
    },

    regulatePermission(){
      const newperm = this.getPermissions.length > 0 ?  this.getRoles.map( x => {
        return {
          id: x.id,
          name: x.name,
          mfbOrBank: x.mfbOrBank,
          checked: this.permAray.some( y => { y === x.id })
        }
      }) : null

      return newperm;
    }


  },
  methods: {

      selectAll(){
      var checkbox = document.getElementById("select-all-role2");
      
     this.permAray = []
          if (checkbox.checked == true){
for(var i = 0; i < this.getPermissions.length; i++) {

    console.log("checked") ;
      this.permAray.push(parseInt(this.getPermissions[i].id));
      document.getElementById(`E2${this.getPermissions[i].id}`).checked = true;
  }
          }
  else{
      console.log("unchecked")
     this.permAray = []
     for(var i = 0; i < this.getPermissions.length; i++) {
      document.getElementById(`E2${this.getPermissions[i].id}`).checked = false;
  }
      }

      },
      async addToActivity(activity, index){
        let Avalue = await parseInt(activity.id)
      var checkbox = document.getElementById(`E2${activity.id}`);
       const state = await this.permAray.some(activity => { return activity == Avalue })
       console.log(state)
      if (state == false && checkbox.checked == true){
    console.log("checked") ;
    this.permAray.push(Avalue);
  }
  else{
      console.log("unchecked")
     const newIndex = this.permAray.findIndex( result => { return result == Avalue})

       await this.permAray.splice(newIndex, 1); 
       console.log("finised unchecked " + newIndex) 
      }

      },
      addtoArray(result){
       let permValue = parseInt(result.target.value)
      const check = this.permAray.some(activity => { return activity === permValue })
       if(check){
         return;
       }
       else{
         this.permAray.push(permValue)
       }
       
   },

  removePerm(index){
    this.permAray.splice(index, 1);    
  },
        resetState(){
this.status = false;
    },
    async updateRole(){
       this.loader = true
       const user = JSON.parse(localStorage.getItem("user"))
         const formData = {
              id:this.editData.id,
              name: document.getElementById("permname").value,
              description: document.getElementById("description").value,
               mfbOrBank: this.form.mfbOrBank == "" ? this.editData.mfbOrBank : this.form.mfbOrBank,
              permissions: this.permAray,
              isActive: true,
               userId: parseInt(user.id)
                 
         }
         try {
           
         const response = await axios.post(this.getUrl + 'api/roles/update',formData)
             if(response.status == 200){
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'Role updated Sucessfully'
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

<style>

</style>
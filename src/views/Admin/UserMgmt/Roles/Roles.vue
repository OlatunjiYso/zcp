<template>
<div>
      <div v-show="AddRoleModal">
              <CreateRole :closeAdd="closeAdd" :closeAddReload="closeAddReload"/>
          </div>
              <div v-show="EditRoleModal">
              <EditRole :closeEdit="closeEdit" :closeEditReload="closeEditReload" :editData="editData" :permAray="permAray"/>
          </div>
<div class="content-header">Manage Roles</div>
      <div class="content-sub">Here are the list of roles available</div>
               <div class="app-table-actions">
                    <div class="app-table-search">
                        <input  type="text" class="app-input-search w-input" placeholder="Search..." id="name" />
                    </div>
                    <div class="app-table-buttons">
                    <div @click="openAdd" style="cursor:pointer" class="table-view-all">Create Role<span class="table-button-icon"></span></div>
                    </div>
                </div>

 <div v-if="!getRoles.length <= 0">
              <table class="app-table2">
                                  <thead>
                                      <tr class="app-table2-row">
                                         <th class="app-table2-header">Id</th>
                                      <th class="app-table2-header">Role</th>
                                      <th class="app-table2-header">Description</th>
                                      <th class="app-table2-header"></th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr v-for="(result, index) in getRoles" :key="index" class="app-table2-row">
                                    <td class="app-table2-data">{{result.id}}</td>
                                  <td class="app-table2-data">{{result.name}}</td>
                                      <td class="app-table2-data"> {{result.description}} </td>
                                        <td class="app-table2-data">
              <div  @click="openEdit(result)" style="cursor:pointer" class="table-btn">Update Role<span class="table-button-icon"></span></div>
                            </td>
                                  </tr>     
                                                                                               
                                  </tbody>
                                  </table> 
        </div>
      <Loading v-else/>                           
      </div>
    </template>

    <script>
import { mapGetters } from 'vuex'
import EmptyData from '../../../../components/EmptyData/EmptyData'
import CreateRole from './CreateRole'
import EditRole from './EditRole'
import Loading from '../../../../components/Loading/Loading'
export default {
  name: "Home",
  components: {
    EmptyData,
    CreateRole,
    EditRole,
    Loading
  },
  data(){
    return{
     AddRoleModal: false,
      EditRoleModal: false,
      editData: '',
      permAray:[]
    }
  },
  computed: {
    ...mapGetters([
      'getRoles'
    ])
  },
  created(){
   this.$store.dispatch("getRoles");
  },
  methods: {
     closeAdd(){
           this.AddRoleModal = false
       },
       closeAddReload(){
           this.AddRoleModal = false
           location.reload();
         return false; 
       },
        openAdd(){
           this.AddRoleModal = true
       },

         closeEdit(){
           this.EditRoleModal = false
  
       },
         closeEditReload(){
           this.EditRoleModal = false
            location.reload();
         return false; 
  
       },
        openEdit(result){
          this.editData = result
          this.permAray = result.permissions.map(function(item) { return item["id"]; });
           this.EditRoleModal = true
       }
  },
}
</script>
    <style scoped>
    a {
      text-decoration: none;
    }
    </style>
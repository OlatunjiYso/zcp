<template>
<div>
    <div v-show="AddUserModal">
              <AddUser :closeAdd="closeAdd" :closeAddReload="closeAddReload"/>
          </div>
              <div v-show="EditUserModal">
              <EditUser :closeEdit="closeEdit" :userData="userData" :closeEditReload="closeEditReload"/>
          </div>
<div class="content-header">Manage Users</div>
      <div class="content-sub">Here are the list of roles available</div>
          <div class="app-table-actions">
        <div class="app-table-search">
        <input v-model="searchQuery" type="text" class="app-input-search w-input" placeholder="Search" id="name">
          </div>
              <div class="app-table-buttons">
          <div v-show="checkPermAdmin('SuperAdmin_Management')" @click="openAdd" style="cursor:pointer" className="table-button filter">Add New User<span className="table-button-icon"></span></div>
        </div>
      </div>
    
      <Loading v-if="getLoading"/>
        <div v-else>
              <table class="app-table2" v-if="!resultQuery.length <= 0">
                                  <thead>
                                      <tr class="app-table2-row">
                                         <th class="app-table2-header">Id</th>
                                      <th class="app-table2-header">Username</th>
                                      <th class="app-table2-header">Role</th>
                                      <th class="app-table2-header"></th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr v-for="(result, index) in resultQuery" :key="index" class="app-table2-row">
                                    <td class="app-table2-data">{{index + 1}}</td>
                                  <td class="app-table2-data">{{result.userName}}</td>
                                      <td class="app-table2-data"> {{result.rolesName}} </td>
                            <td class="app-table2-data">
                            <div @click="openEdit(result)" style="cursor:pointer" class="table-btn">Manage User<span class="table-button-icon"></span></div>
                            </td>
                                  </tr>     
                                                                                               
                                  </tbody>
                                  </table> 
      <EmptyData v-else/>
   </div>
      </div>
    </template>

<script>
import AddUser from './AddUser'
import EditUser from './EditUser'
import { mapGetters } from 'vuex'
import EmptyData from '../../../components/EmptyData/EmptyData'
import Loading from '../../../components/Loading/Loading'
import Global from '../../../views/global.js'
export default {
  name: "Home",
      mixins:[Global],
  components: {
    AddUser,
    EditUser,
    EmptyData,
    Loading
  },
  data(){
    return{
      AddUserModal: false,
      EditUserModal: false,
      userData: '',
       searchQuery: '',

    }
  },
    computed: {
    ...mapGetters([
       'getLoading',
      'getAdminUsers'
    ]),
            resultQuery(){
      if(this.searchQuery){
      return this.getAdminUsers.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.userName.toLowerCase().includes(v))
      })
      }else{
        return this.getAdminUsers;
      }
    },
  },
  async created(){
    await this.$store.dispatch("getRoles");
   this.$store.dispatch("getAdminUsers");
  },
  methods: {
     closeAdd(){
           this.AddUserModal = false
       },
       closeAddReload(){
           this.AddUserModal = false
           location.reload();
         return false; 
       },
        openAdd(){
           this.AddUserModal = true
       },
                closeEdit(){
           this.EditUserModal = false
       },
         closeEditReload(){
           this.EditUserModal = false
            location.reload();
         return false;
       },
        openEdit(result){
          this.userData = result
           this.EditUserModal = true
       }
  },
}
</script>
<template>
  <div>    
            <div v-show="permissionModal">
              <AddPerm  :closeModal="closeModal"/>
          </div>
      <div class="app-admin-section">

          
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
            <div class="admin-top-bar">
        <div class="admin-top-bar-left">
         <router-link style="text-decoration: none" to="/user-management"><div class="settings-icon"></div></router-link> 
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>

      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="content-header">Manage Role</div>
          <div class="content-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, </div>
        </div>
         <div class="app-table-buttons">
          <div  class="table-view-all">Save Chaages</div>
        </div>
      </div>

      <div class="basic-table-card">
        <div class="content-header-2">Details</div>
        <div class="content-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, </div>
        <div class="role-descrip-div">
          <div class="role-descrip-div-col-1">
            <div class="form-block-2 w-form">
              <form id="email-form" name="email-form" data-name="Email Form">
                  <input value="" type="text" class="app-text-field w-input" placeholder="Role" id="name"/></form>
            </div>
          </div>
          <div class="role-descrip-div-col-2">
            <div class="form-block-2 w-form">
              <form id="email-form" name="email-form" data-name="Email Form">
                  <input value="" type="text" class="app-text-field w-input"  placeholder="Description" id="name-2"/></form>
            </div>
          </div>
        </div>
      </div>

      <div class="basic-table-card">
      <div class="table-header">
                  <div class="content-header-2">Permission</div>
                  <div @click="openModal" class="table-view-all">Add Permission</div>
                </div>
                 <div v-if="permissions.length > 0">
               <div v-for="(perm, index) in permissions" :key="index" style= "margin-right:20px;margin-bottom:20px;background: #ededed;padding:10px; border-radius:5px; display:inline-block;color:#696969;font-size: 13px">
                 {{perm}} <span  style="cursor: pointer; font-weight: bold; color:red; margin-left:10px">X</span>
               </div> 
    </div>  
              <EmptyData v-else/>           
              </div>
    </div>
      <div class="app-admin-col-3">
              <Rightbar />
            </div>
</div>
</div>
</template>

<script>
import Leftbar from '../../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../../components/Client/rightbar/rightbar'
import AddPerm from './AddPerm'
import EmptyData from "../../../../components/EmptyData/EmptyData"
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    AddPerm,
    EmptyData
  },
  data(){
      return{
          permissionModal: false,
          permissions:['view-overview', 'manage-mfb','manage-requests','manage-users']
      }
  },
  methods: {
       closeModal(){
           this.permissionModal = false
       },
        openModal(){
            console.log("clicked")
           this.permissionModal = true
       }
  },
}
</script>

<style>

</style>
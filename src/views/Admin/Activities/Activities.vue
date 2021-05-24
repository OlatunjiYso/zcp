<template>
            <div class="app-admin-section">
              <div v-show="AddActivity">
              <AddActivity  :closeModal="closeModal" :closeModalReload="closeModalReload"/>
          </div>
            <div v-show="EditActivity">
              <EditActivity  :closeModal="closeEdit" :closeEditReload="closeEditReload" :editData="editData"/>
          </div>
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
 <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div class="settings-icon"></div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>
<div class="content-header">Activities</div>
      <div class="content-sub">Here are the list of activities available</div>
               <div class="app-table-actions">
                    <div class="app-table-search">
                        <input  type="text" class="app-input-search w-input" placeholder="Search..." id="name" />
                    </div>
                    <div class="app-table-buttons">
                      <div @click="openModal" style="cursor:pointer" class="table-view-all">Create Activity<span class="table-button-icon"></span></div>
                    </div>
                </div>
                
       <div v-if="!getActivities.length <= 0">
              <table class="app-table2">
                                  <thead>
                                      <tr class="app-table2-row">
                                         <th class="app-table2-header">Id</th>
                                      <th class="app-table2-header">Activity</th>
                                      <th class="app-table2-header">Description</th>
                                      <th class="app-table2-header">Marker-Checker</th>
                                      <th class="app-table2-header"></th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr v-for="(result, index) in getActivities" :key="index" class="app-table2-row">
                                    <td class="app-table2-data">{{index + 1}}</td>
                                  <td class="app-table2-data">{{result.name}}</td>
                                      <td class="app-table2-data"> {{result.description}} </td>
                                        <td class="app-table2-data">{{result.requireMakerChecker}}</td>
                                        <td class="app-table2-data">
                            <div @click="openEdit(result)" style="cursor:pointer" class="table-btn">Update<span class="table-button-icon"></span></div>
                            </td>
                                  </tr>     
                                                                                               
                                  </tbody>
                                  </table> 
       </div>
      <Loading v-else/>
      </div>
            <div class="app-admin-col-3">
              <Rightbar />
            </div>
          </div>
</template>

<script>
import Leftbar from '../../../components/Admin/leftbar/leftbar'
import Rightbar from '../../../components/Admin/rightbar/rightbar'
import AddActivity from './AddActivity'
import EditActivity from './EditActivity'
import { mapGetters } from 'vuex'
import EmptyData from '../../../components/EmptyData/EmptyData'
import Loading from '../../../components/Loading/Loading'
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    AddActivity,
    EditActivity,
    EmptyData,
    Loading
  },
  data(){
    return{
      AddActivity: false,
      EditActivity:false,
      editData:""
    }
  },
  computed: {
    ...mapGetters([
      'getActivities'
    ])
  },
  created(){
   this.$store.dispatch("getActivities");
  },
  methods: {
           closeModal(){
           this.AddActivity = false
       },
       closeModalReload(){
           this.AddActivity = false
         location.reload();
         return false; 
       },
        openModal(){
           this.AddActivity = true
       },
          openEdit(result){
          this.editData = result
           this.EditActivity = true
       },
                closeEdit(){
           this.EditActivity = false
       },
         closeEditReload(){
           this.EditActivity = false
            location.reload();
         return false;
       }
  },
}
</script>
    <style scoped>
    a {
      text-decoration: none;
    }
    </style>
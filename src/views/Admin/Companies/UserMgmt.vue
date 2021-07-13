<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
            <div class="admin-top-bar">
        <div class="admin-top-bar-left">
         <router-link to="/admin/companies"> <div class="settings-icon"></div></router-link>
          <div @click = "switchView('user')" class="admin-top-barlinks" :class="[ userView ? activeClass : '']">User</div>
          <!-- <div @click = "switchView('roles')" class="admin-top-barlinks" :class="[ rolesView ? activeClass : '']">Roles</div> -->
        </div>
         <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{getDate2}}</div>
        </div>
      </div>
        <div v-show="userView">
        <User/> 
        </div>
            <!-- <div v-show="rolesView">
           <Roles/>       
            </div> -->
    </div>
      <!-- <div class="app-admin-col-3">
              <Rightbar />
            </div> -->
</div>
</template>


<script>
import Global from '../../global.js'
import Leftbar from '../../../components/Admin/leftbar/leftbar'
import Rightbar from '../../../components/Admin/rightbar/rightbar'
import User from './Users.vue'
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    User
  },
        mixins:[Global],
  data(){
      return{
        selectedTab: '',
        userView: true,
        rolesView: false,
       activeClass:'admin-active-top-link'
      }
  },
methods:{
    
    switchView( selected ){
      

        if(selected == "user"){
     
         this.userView = true
         this.rolesView = false
        }
        else if(selected == 'roles') {
             this.userView = false
         this.rolesView = true
        }

    },

}
}
</script>

<style scoped>
a{text-decoration: none;}
</style>
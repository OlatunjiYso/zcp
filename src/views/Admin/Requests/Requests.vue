<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
            <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <router-link to="/admin/companies"><div class="settings-icon"></div></router-link>
          <!-- <div @click = "switchView('card')" class="admin-top-barlinks" :class="[ cardView ? activeClass : '']">Card</div>
          <div @click = "switchView('user')" class="admin-top-barlinks" :class="[ userView ? activeClass : '']">User</div> -->
        </div>
         <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>
        <div v-show="cardView">
        <Card :loading="loading" :Requests ="Requests"/> 
        </div>
            <!-- <div v-show="userView">
           <User/>       
            </div> -->
    </div>
      <div class="app-admin-col-3">
              <Rightbar />
            </div>
</div>
</template>


<script>
import axios from 'axios'
import Leftbar from '../../../components/Admin/leftbar/leftbar'
import Rightbar from '../../../components/Admin/rightbar/rightbar'
import Card from './Card'
import User from './User'
import {mapGetters} from 'vuex'
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    Card,
    User
  },
  data(){
      return{
        loading:false,
        selectedTab: '',
        cardView: true,
        userView: false,
         activeClass:'admin-active-top-link',
         Requests:[]
      }
  },
  created(){
    this.fetchRequests();
  },
          computed:{
    ...mapGetters([
      'getUrl2',
    ])
  },
methods:{
      async fetchRequests(){
        this.loading = true;
 const result = await axios.get(this.getUrl2 + '/api/CardRequest/all/' + this.$route.params.id)
           this.Requests = result.data
           this.loading = false
  },
    switchView( selected ){

        if(selected == "card"){
            console.log('cardView')
         this.cardView = true
         this.userView = false
        }
        else if(selected == 'user') {
             this.cardView = false
         this.userView = true
        }

    },

}
}
</script>


<style scoped>
a{text-decoration:none;}
</style>
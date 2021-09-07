import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
          message:"Hii",
          componentLoaded: false,
          role:"",
          role2:"",
          branches:[]
        }
    },
     async created(){
      await this.$store.dispatch('getCardSetup')
        const result = await axios.get(this.getUrl2 + 'api/Common/Branch')
        this.branches = result.data
      await this.$store.dispatch('getRoles')
      if(localStorage.getItem('user-mfb')){
              const user = JSON.parse(localStorage.getItem('user-mfb'))
      const roleName = this.getRoles.length > 0 ?  this.getRoles.find(x => { return x.id == user.rolesId }).name : null
     this.role = roleName;
      }
      else if(localStorage.getItem('user')){
        const user2 = JSON.parse(localStorage.getItem('user'))
        const roleName2 = this.getRoles.length > 0 ? this.getRoles.find(x => { return x.id == user2.rolesId}).name : null
       this.role2 = roleName2;
      }

    },
    mounted() {
      this.componentLoaded = true
    },
    computed:{
    ...mapGetters(['getCardSetup', 'getUrl','getUrl2','getPermissions','getAdminPermissions', 'getRoles']),
    getDate: function(){
      if(!this.componentLoaded){
        return null
      }
      const user = JSON.parse(localStorage.getItem('user-mfb'))
      var today = new Date();
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      var date = 'Welcome ' + user.firstName + ' ' + user.lastName + ' ' + '|' + ' ' + this.role + ' ' + '|' + ' ' + today.getDate() + ', ' + months[today.getMonth()]+ ' ' +today.getFullYear()
      return date
    },
    getDate2: function(){
      if(!this.componentLoaded){
        return null
      }
      const user = JSON.parse(localStorage.getItem('user'))
      var today = new Date();
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      var date = 'Welcome ' + user.userName + ' ' + '|' + ' ' + this.role2 + ' ' + '|' + ' ' + today.getDate() + ', ' + months[today.getMonth()]+ ' ' +today.getFullYear()
      return date
    }
    }, 
    methods: {
      previousPage(){
         this.$router.go(-1);
      },
      async searchCard(e){
        const user = JSON.parse(localStorage.getItem("user-mfb"))
           this.loading = true
   const response = await axios.get(this.getUrl2 + 'api/CardRequest/cardbyaccountNo/'+  user.companyId + "/" + this.accountNbr)
   if(response.status == 200){
    const requests = response.data.map(x => { 
      return {
        ...x,
          productCode :  this.getCardSetup.length > 0 ? this.getCardSetup.find((entry)=>{return x.productCode === entry.cardProductCode}).description : null
      }
     })
this.loading = false
this.cardData = requests
   }
   else{
       this.loading = false
   }
    },

      checkPermAdmin(result){
         const response = this.getAdminPermissions.some( x=>{ return x.name == result })
         return response 
      },
    checkPerm(result){
      const response = this.getPermissions.some( x=>{ return x.name == result })
      return response 
     },
    },
  }

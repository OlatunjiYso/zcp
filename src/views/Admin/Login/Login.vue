<template>
   <Loader v-show="loader"/>
    <Status :state="state" :message = "message" :resetState="resetState" v-if="status"/>
   <div class="app-login-section">
    <div class="app-login-col-1">
      <div class="app-login-bg-cover">
        <div class="app-login-logo"><img src="../../../assets/images/logo-colored.svg" loading="lazy" width="120" alt="" class="app-logo-img"></div>
      </div>
    </div>
    <div class="app-login-col-2">
      <h2 class="login-header">Welcome</h2>
      <div class="login-sub">Kindly fill in your credentials to login into your account.</div>
      <div >
        <form @submit.prevent="Login">
          <div class="app-login-form-group">
            <label for="Email-address" class="login-label">User Name</label>
            <input v-model="form.userName" type="text" class="app-login-text-field w-input"  placeholder="john.doe" required></div>
          <div class="app-login-form-group">
            <label for="password" class="login-label">Pin & Token</label>
            <input v-model="form.password" type="password" class="app-login-text-field w-input" placeholder="xxxxxxxxxxxxx" required>
            </div>
             <button type="submit" class="app-login-button" :disabled="this.isAttemptingLogin">{{this.isAttemptingLogin ? "Logging you in ...":"Login into Account" }}</button>
        </form>
      </div>
      <div class="app-login-divider"></div>
      <div class="app-login-notice">
        <div class="app-login-notice-col-1"></div>
        <div class="app-login-notice-col-2">Experiencing any problem with loging into your account ? Kindly contact the super admin to help resolve your issues.</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status2'
export default {
    props:['closeAdd'],
        components:{
     Loader,
     Status
    },
  data(){
      return{
        isAttemptingLogin: false,
         loader: false,
        status: false,
        state: null,
        message: null,
          roles:['Super Admin', 'Admin','Support'],
          activityArray:[],
          form: {
            userName: '',
            password: ''
          },
          token:""
      }
  },
      computed:{
    ...mapGetters([
      'getUrl',
      'getRoles'
    ])
  },
  methods: {
        resetState(){
this.status = false;
    },
    
    GenerateToken(length){
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));}
   this.token =  result.join(''); 
   return result.join('');
    },

    testLogin(){
              const d1 = new Date ();
const d2 = new Date ( d1 );

d2.setMinutes ( d1.getMinutes() + 2 ); 
          
      let testData= {
  "responseCode": "01",
  "responseMessage": "There is already an open DataReader associated with this Connection which must be closed first.",
  "id": 3,
  "userName": "cynthia.jon-olawuyi",
  "rolesId": 40,
  "permissions": [{"name":"SuperAdmin_Management"},{"name":"Admin_Onboarding"},{"name":"Admin_User_Management"}]
}

     this.GenerateToken(50);
     localStorage.setItem('et', d2)
       localStorage.setItem('token', this.token)   
        localStorage.setItem('user', JSON.stringify(testData))    
       this.$router.push('/admin/overview')
    },
      async Login(){
      this.GenerateToken(50);
       this.loader = true;
       this.isAttemptingLogin = true;
         const formData = {
                 userName: this.form.userName,
                 password: this.form.password,
         }
        const d1 = new Date ();
const d2 = new Date ( d1 );
d2.setHours ( d1.getHours() + 2 ); //two hour from now
         try {
           
             const response = await axios.post(this.getUrl + 'api/Login/banklogin',formData
             )
             if(response.status == 200 && response.data.userName != null){
                localStorage.setItem('et', d2)
              await localStorage.setItem('token', this.token)
              await localStorage.setItem('user', JSON.stringify(response.data))
            

               this.loader = false;
                this.isAttemptingLogin = true;
                window.location = "/admin/overview";
              //  this.$router.push('/admin/overview')
             }
             else{
              this.isAttemptingLogin = false;
               this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = "Invalid Credentials"
             }

         } catch (error) {
              console.log(error)
               this.isAttemptingLogin = false;
               this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = 'System Error'
         }
            
      },
  },
}
</script>

<style>

</style>
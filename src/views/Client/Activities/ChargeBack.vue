<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
 <div class="admin-top-bar">
        <div class="admin-top-bar-left">
        <router-link to="activities"><div class="settings-icon"></div></router-link>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
      </div>
      </div>
               <div class="content-header">Charge Back Request</div>
      <form>
              <div class="form-flex">
          <div class="form-flex-col">
               <label class="login-label">MFB Settlement Account Number</label>
        <input type="number" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
           <div class="form-flex-col">
                <label class="login-label">Last 4 digits of the cardholder’s PAN</label>
        <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
            <div class="form-flex-col">
                <label class="login-label">Amount of Transaction.</label>
        <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
           <div class="form-flex-col">
                <label class="login-label">Date of Transaction</label>
        <input type="date" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
          <div class="form-flex-col">
                <label class="login-label">Transaction Channel</label>
        <select style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(perm, index) in channels" :key="index" :value="perm">{{perm}}</option>        
            </select>
          </div>
           <div class="form-flex-col">
                <label class="login-label">Number of Reversal</label>
        <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
      </div>
       <button type="submit" class="app-form-button">Submit</button>
      </form>
            </div>
            <div class="app-admin-col-3">
              <Rightbar />
            </div>
          </div>
</template>

<script>
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar
  },
  data(){
      return{
        channels: ['ATM', 'POS', 'WEB'],
      }
  }
}
</script>

<style scoped>
a {
    text-decoration: none;
}
.activity-card-header {
  margin-bottom: 15px;
  color: #262626;
  font-size: 14px;
  font-weight: 700;
}
.activity-btn{
    background: #c00;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    color: white;
    width: 100px;
}
</style>
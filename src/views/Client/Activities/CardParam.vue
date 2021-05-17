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
               <div class="content-header">Card Parametization</div>
      <form>
              <div class="form-flex">
          <div class="form-flex-col">
               <label class="login-label">Customer Name</label>
        <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
           <div class="form-flex-col">
                <label class="login-label">Account Number</label>
        <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
           <div class="form-flex-col">
                <label class="login-label">Card Brand</label>
        <select style="marginBottom: 30px" class="app-select w-select"> 
             <option  v-for="(perm, index) in cardBrand" :key="index" :value="perm">{{perm}}</option>        
            </select>
          </div>
          <div class="form-flex-col">
                <label class="login-label">Card Type</label>
        <select style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(perm, index) in cardType" :key="index" :value="perm">{{perm}}</option>        
            </select>
          </div>
            <div class="form-flex-col">
                <label class="login-label">Currency</label>
        <select style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(perm, index) in currency" :key="index" :value="perm">{{perm}}</option>        
            </select>
          </div>
              </div>
               <label class="login-label">Increase Parameters</label>
          <div class="form-flex">
               
          <div class="form-flex-col">
          <label for="cash">Cash </label> <input type="checkbox" id="cash" name="cash" value="cash">
          <br>
          <div class="form-flex">
             <div class="form-flex-col">
             <label for="cash">Daily Amount</label>
          <input type="text" class="app-text-field w-input" required placeholder="Type Here" />   
             </div>

               <div class="form-flex-col">
             <label for="cash">Count</label>
          <input type="text" class="app-text-field w-input" required placeholder="Type Here" />   
             </div>
          </div>
         
          </div>
           <div class="form-flex-col">
          <label for="cash">Transfer </label> <input type="checkbox" id="cash" name="cash" value="cash">
          <br>
          <div class="form-flex">
             <div class="form-flex-col">
             <label for="cash">Daily Amount</label>
          <input type="text" class="app-text-field w-input" required placeholder="Type Here" />   
             </div>

               <div class="form-flex-col">
             <label for="cash">Count</label>
          <input type="text" class="app-text-field w-input" required placeholder="Type Here" />   
             </div>
          </div>
         
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
           cardBrand: ['Mastercard', 'Visa', 'Verve'],
           cardType: ['Debit', 'Prepaid', 'Credit'],
           currency: ['NGN','USD'],
           param: ['Daily Count', 'Monthly Count']
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
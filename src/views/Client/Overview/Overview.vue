<template>
            <div class="app-admin-section">
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
      <div class="content-header">Dashboard Overview</div>
      <div class="content-sub">Here are the latest reports on the system</div>
      <div class="summary-flexbox">
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Users</div>
              <div class="slide-card-value">5</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Activities</div>
              <div class="slide-card-value">7</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">User Requests</div>
              <div class="slide-card-value">10,000</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Card Requests</div>
              <div class="slide-card-value">40,000</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
      </div>
      <div class="basic-table-card">
        <div class="table-header">
          <div class="content-header-2">Users</div>
          <div class="table-view-all">View all</div>
        </div>
        
        <table class="app-table">
            <thead>
              <tr class="app-table-row">
              <th class="app-table-header">Username</th>
              <th class="app-table-header">Email Address</th>
              <th class="app-table-header">Phone Number</th>
              <th class="app-table-header">Roles</th>
              <th class="app-table-header">Last seen</th>
              <th class="app-table-header">Status</th>
            </tr>
            </thead>

            <tbody>
             <tr  class="app-table-row">
              <td class="app-table-data">Jonny</td>
             <td class="app-table-data">johndoe@zenithbank.com</td>
             <td class="app-table-data">09073364526</td>
             <td class="app-table-data">Super Admin</td>
             <td class="app-table-data">22/03/21</td>
              <td class="app-table-data table-active">Active</td> 
             
           </tr>
           <tr  class="app-table-row">
            <td class="app-table-data">Jonny</td>
           <td class="app-table-data">johndoe@zenithbank.com</td>
           <td class="app-table-data">09073364526</td>
           <td class="app-table-data">Super Admin</td>
           <td class="app-table-data">22/03/21</td>
            <td class="app-table-data table-active">Active</td> 
           
         </tr>
         <tr  class="app-table-row">
          <td class="app-table-data">Jonny</td>
         <td class="app-table-data">johndoe@zenithbank.com</td>
         <td class="app-table-data">09073364526</td>
         <td class="app-table-data">Super Admin</td>
         <td class="app-table-data">22/03/21</td>
          <td class="app-table-data table-active">Active</td> 
         
       </tr>
       <tr  class="app-table-row">
        <td class="app-table-data">Jonny</td>
       <td class="app-table-data">johndoe@zenithbank.com</td>
       <td class="app-table-data">09073364526</td>
       <td class="app-table-data">Super Admin</td>
       <td class="app-table-data">22/03/21</td>
        <td class="app-table-data table-active">Active</td> 
       
     </tr>
            </tbody>
            
            
            </table>
      </div>
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
}
</script>
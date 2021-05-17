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
                    <div class="content-header">Transaction Log</div>
      <div class="content-sub">Here are the latest report on Paysure Agency</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
            <input type="text" class="app-input-search w-input" maxlength="256" name="name" data-name="Name" placeholder="Search..." id="name"/>
          </div>
        </div>

      </div>
        <table class="app-table2">
                    <thead>
                        <tr class="app-table2-row">
                                      <th className="app-table2-header">Ref.ID</th>
                                      <th className="app-table2-header">Trans.Details</th>
                                      <th className="app-table2-header">Amount</th>
                                    <th className="app-table2-header">Trans-Status</th>
                                    <th className="app-table2-header">Trans.Date</th>

                        </tr>
                    </thead>
            
                        <tbody>
                             <tr class="app-table2-row">
                            <td class="app-table2-data">Ref-8438989</td>
                            <td class="app-table2-data">Webpay-/3893983/Purchase/</td>
                            <td class="app-table2-data">M20,000</td>
                            <td class="app-table2-data">Success</td>
                            <td class="app-table2-data">22/03/21</td>
                        </tr>


                    </tbody>
          
                </table>
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
<template>
<div>
 <div class="content-header">User Requests</div>
      <div class="content-sub">Here are the latest report on Paysure Agency</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
            <form id="email-form" name="email-form" data-name="Email Form"><input type="text" class="app-input-search w-input" maxlength="256" name="name" data-name="Name" placeholder="Search..." id="name"></form>
            <div class="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div class="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
        <div class="app-table-buttons">
          <a href="#" class="table-button">Sort <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Filter <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Actions <span class="table-button-icon"></span></a>
        </div>
      </div>
        <table class="app-table2">
                    <thead>
                        <tr class="app-table2-row">
                            <th class="app-table2-header">User Name</th>
                            <th class="app-table2-header">Email Address</th>
                            <th class="app-table2-header">Phone Number</th>
                            <th class="app-table2-header">User Role</th>
                            <th class="app-table2-header">Status</th>                        
                        </tr>
                    </thead>
            
                        <tbody>
                         <tr v-for="(result, index) in 6" :key="index" class="app-table2-row">
                            <td class="app-table2-data">Ajibola Daniel</td>
                            <td class="app-table2-data">daniel@hazelpay.com</td>
                            <td class="app-table2-data">07082074393</td>
                            <td class="app-table2-data">Support</td>
                            <td class="app-table2-data table-pending">Pending</td> 
                            
                        </tr>
                       
                    </tbody>
          
                </table>
      </div>
    </template>
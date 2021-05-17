<template>
<div>
 <div class="content-header">Card Requests</div>
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
                             <th class="app-table2-header">Card Type</th>
                            <th class="app-table2-header">Card Product Code</th>
                            <th class="app-table2-header">Quantity</th>
                            <th class="app-table2-header">Batch ID/Code</th>
                             <th class="app-table2-header">Status</th>
                              <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in 6" :key="index" class="app-table2-row">

                            <td class="app-table2-data">Debit</td>
                            <td class="app-table2-data">PR-3726</td>
                            <td class="app-table2-data">300</td>
                            <td class="app-table2-data">83A</td> 
                            <td class="app-table2-data">Pending</td> 
                             <td class="app-table2-data">
                                     <select  style="margin-top: 15px"  class="app-select w-select">
                                    <option selected>Actions</option>
                                     <option value= 2>Acknowledge</option>
                                     <option value= 2>Acknowledge</option>
          
                                    </select>
                            </td> 
                        </tr>
                        
                    </tbody>
          
                </table>
      </div>
    </template>
<template>
<div>
<div class="content-header">Manage Roles</div>
      <div class="content-sub">Here are the list of roles available</div>
               <div class="app-table-actions">
                    <div class="app-table-search">
                        <input  type="text" class="app-input-search w-input" placeholder="Search..." id="name" />
                    </div>
                    <div class="app-table-buttons">
                       <router-link to="/create-role"><div style="cursor:pointer" class="table-view-all">Create Role<span class="table-button-icon"></span></div></router-link> 
                    </div>
                </div>

      <table class="app-table2">
                                  <thead>
                                      <tr class="app-table2-row">
                                      <th class="app-table2-header">Role</th>
                                      <th class="app-table2-header">Description</th>
                                      <th class="app-table2-header"></th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                            <tr class="app-table2-row">
                                  <td class="app-table2-data">Super Admin</td>
                                      <td class="app-table2-data"> Ability to perform all actions </td>
                                      <td class="app-table2-data" style="font-weight: bold, cursor: pointer">
                                        <router-link  to= "/edit-role/8"><div>Manage Role <span class="app-icon"></span></div></router-link>
                                      </td>
                                  </tr>     
                                   <tr class="app-table2-row">
                                  <td class="app-table2-data">Super Admin</td>
                                      <td class="app-table2-data"> Ability to perform all actions </td>
                                      <td class="app-table2-data" style="font-weight: bold, cursor: pointer">
                                        <router-link  to= "/edit-role/8"><div>Manage Role <span class="app-icon"></span></div></router-link>
                                      </td>
                                  </tr>     
                                   <tr class="app-table2-row">
                                  <td class="app-table2-data">Super Admin</td>
                                      <td class="app-table2-data"> Ability to perform all actions </td>
                                      <td class="app-table2-data" style="font-weight: bold, cursor: pointer">
                                        <router-link  to= "/edit-role/8"><div>Manage Role <span class="app-icon"></span></div></router-link>
                                      </td>
                                  </tr>     
                                   <tr class="app-table2-row">
                                  <td class="app-table2-data">Super Admin</td>
                                      <td class="app-table2-data"> Ability to perform all actions </td>
                                      <td class="app-table2-data" style="font-weight: bold, cursor: pointer">
                                        <router-link  to= "/edit-role/8"><div>Manage Role <span class="app-icon"></span></div></router-link>
                                      </td>
                                  </tr>                                                               
                                  </tbody>
                                  </table>

      </div>
    </template>

    <style scoped>
    a {
      text-decoration: none;
    }
    </style>
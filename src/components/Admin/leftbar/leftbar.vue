<template>
    <div>
      <div class="app-admin-brand"></div>
    <router-link to="/admin/overview">
     <div class="admin-col-link-div">
        <div class="admin-col-1-links active-link"></div>
        <div class="admin-col-link-text active-link">Dashboard</div>
      </div>
    </router-link> 
    <router-link to="/admin/companies">
       <div class="admin-col-link-div">
        <div class="admin-col-1-links"></div>
        <div class="admin-col-link-text">Companies</div>
      </div>
    </router-link>
     <!-- <router-link to="requests">
        <div class="admin-col-link-div">
        <div class="admin-col-1-links"></div>
        <div class="admin-col-link-text">Requests</div>
      </div>
     </router-link> -->
     <router-link to="/admin/activities">
       <div class="admin-col-link-div">
        <div class="admin-col-1-links"></div>
        <div class="admin-col-link-text">Activities</div>
      </div>
     </router-link>
      <router-link to="/admin/user-management">
             <div class="admin-col-link-div">
        <div class="admin-col-1-links"></div>
        <div class="admin-col-link-text">User<br>Management</div>
      </div> 
      </router-link>

      <div class="admin-col-logout"><span class="text-span-3"></span> Logout</div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
a { text-decoration: none;}
</style>
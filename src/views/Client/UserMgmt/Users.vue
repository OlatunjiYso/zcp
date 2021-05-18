<template>
  <div>
    <div v-show="AddUserModal">
      <AddUser :closeAdd="closeAdd"/>
    </div>
    <div v-show="EditUserModal">
      <EditUser :closeEdit="closeEdit" :userData="userData"/>
    </div>
    <div class="content-header">Manage Users</div>
    <div class="content-sub">Here are the list of roles available</div>
    <div class="app-table-actions">
      <div class="app-table-search">
        <input id="name" v-model="last_search_string" class="app-input-search w-input" placeholder="Search..."
               type="text"/>
      </div>
      <div class="app-table-buttons">
        <div className="table-button filter" style="cursor:pointer" @click="openAdd">Add New User<span
            className="table-button-icon"></span></div>
      </div>
    </div>

    <div v-if="getCompanyUsers.length > 0">
      <table class="app-table2">
        <thead>
        <tr class="app-table2-row">
          <th class="app-table2-header">Id</th>
          <th class="app-table2-header">First Name</th>
          <th class="app-table2-header">Last Name</th>
          <th class="app-table2-header">Email Address</th>
          <th class="app-table2-header">Username</th>
          <th class="app-table2-header">Phone Number</th>
          <th class="app-table2-header">Role</th>
          <th class="app-table2-header"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(result, index) in getCompanyUsers" :key="index" class="app-table2-row">
          <td class="app-table2-data">{{ result.id }}</td>
          <td class="app-table2-data">{{ result.firstName }}</td>
          <td class="app-table2-data"> {{ result.lastName }}</td>
          <td class="app-table2-data"> {{ result.emailAddress }}</td>
          <td class="app-table2-data"> {{ result.userName }}</td>
          <td class="app-table2-data"> {{ result.mobileNo }}</td>
          <td class="app-table2-data"> {{ result.rolesId }}</td>
          <td class="app-table2-data">
            <div class="table-btn" style="cursor:pointer" @click="openEdit(result)">Update User<span
                class="table-button-icon"></span></div>
          </td>
        </tr>

        </tbody>
      </table>
    </div>
    <EmptyData v-else/>

  </div>
</template>

<script>
import Leftbar from '../../../components/Admin/leftbar/leftbar'
import Rightbar from '../../../components/Admin/rightbar/rightbar'
import AddUser from './AddUser'
import EditUser from './EditUser'
import {mapGetters} from 'vuex'
import EmptyData from '../../../components/EmptyData/EmptyData'

export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    AddUser,
    EditUser,
    EmptyData
  },
  data() {
    return {
      AddUserModal: false,
      EditUserModal: false,
      userData: '',
      last_search_string: "",
    }
  },
  computed: {
    ...mapGetters([
      'getCompanyUsers'
    ])
  },
  created() {
    this.$store.dispatch("getAdminUsers");
  },
  methods: {
    closeAdd() {
      this.AddUserModal = false
    },
    openAdd() {
      this.AddUserModal = true
    },
    closeEdit() {
      this.EditUserModal = false
    },
    openEdit(result) {
      this.userData = result
      this.EditUserModal = true
    }
  },
}
</script>
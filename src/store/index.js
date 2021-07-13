import { createStore }  from 'vuex'
import axios from'axios'

export default createStore({
  state: {
    url: 'https://webservicestest.zenithbank.com:8443/CardPortalSecurityApi/',
    url2: 'https://webservicestest.zenithbank.com:8443/CardPortalOperations/',
    url3: 'https://newwebservicetest.zenithbank.com/disputeresolutionthirdpartyapiapi/Dispute/',
    activities: [],
    adminUsers:[],
    companies:[],
    roles:[],
    companyUsers:["1"],
    currentDate: "",
    activeUser:{ companyId : 1},
    loader: false,
    loading:false,
    cardSetup: [],
    permissions: localStorage.getItem("user-mfb")? JSON.parse(localStorage.getItem("user-mfb")).permissions : '',
    AdminPermissions: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).permissions : '',
    currentNav: localStorage.getItem("c-CN")? parseInt(JSON.parse(localStorage.getItem('c-CN'))) : 1,
    currentAdminNav: localStorage.getItem('c-AN') ? parseInt(JSON.parse(localStorage.getItem('c-AN'))) : 1
  },
  getters:{
    getCurrentAdminNav(state){
      return state.currentAdminNav
    },
    getCurrentNav(state){
      return state.currentNav
    },
    getAdminPermissions(state){
      return state.AdminPermissions
     },
    getPermissions(state){
     return state.permissions
    },
    getCardSetup(state){
      return state.cardSetup
    },
    getLoading(state){
      return state.loading
    },
   getUrl(state){
     return state.url;
   },
   getUrl2(state){
    return state.url2;
  },
  getUrl3(state){
    return state.url3;
  },
   getActivities(state){
     return state.activities
   },
   getAdminUsers(state){
    return state.adminUsers
  },
  getCompanies(state){
    return state.companies
  },
  getRoles(state){
    return state.roles
  },
  getCompanyUsers(state){
    return state.companyUsers
  },
  },
  mutations: {
    setAdminNav(state, payload){
      state.currentAdminNav = payload
    },
    setNav(state, payload){
      state.currentNav = payload
    },
    setCompUsers(state, payload){
      state.companyUsers = payload;
    },
    setCardSetup(state, payload){
      state.cardSetup = payload;
    },
    setActivities(state, payload){
      state.activities = payload;
    },
    setAdminUsers(state, payload){
      state.adminUsers = payload;
    },
    setCompanies(state, payload){
      state.companies = payload;
    },
    setRoles(state, payload){
      state.roles = payload;
    },
    setPermissions(state, payload){
      state.permissions = payload;
    },
  },
  actions: {
    getPermissions({commit, state}){
      commit('setPermission')
    },
    Logout(){
     localStorage.removeItem('user-mfb')
     localStorage.removeItem('token-mfb')
     localStorage.removeItem('user')
     localStorage.removeItem('token')
    },
    async getCardSetup({commit, state}){
     const result = await axios.get(state.url + 'api/CardProductSetup/FetchCardProductCodeForsetup')
      commit('setCardSetup', result.data)
    },

   async getActivities({commit, state}){
      const result = await axios.get(state.url + 'api/activities',
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
      commit('setActivities', result.data)
    },

    async getAdminUsers({commit, state}){
      state.loading = true
      const result = await axios.get(state.url + 'api/adminusers',
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
        state.loading = false
       const users = result.data
       const adminUsers = users.map(user => { 
         return {
            id: user.id,
            userName: user.userName,
            rolesName : state.roles.find((entry)=>{return user.rolesId === entry.id}).name,
            rolesId: user.rolesId,
            created_at : user.created_at
         }
        })
       
      commit('setAdminUsers', adminUsers)
    },

    async getCompanies({commit, state}){
      state.loading = true
      const result = await axios.get(state.url + 'api/companies',
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
        state.loading = false
      commit('setCompanies', result.data)
    },

    async getRoles({commit, state}){
      state.loading = true
      const result = await axios.get(state.url + 'api/roles',
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
        state.loading = false
      commit('setRoles', result.data)
    },

    async getPermissions({commit, state}){
      state.loading = true
      const result = await axios.get(state.url + 'api/permissions',
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
        state.loading = false
      commit('setPermissions', result.data)
    },

    async getCompanyUsers({commit,state}, companyId){

      const result = await axios.get(state.url + 'api/companies/CompanyUsers/' + companyId,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
      commit('setCompUsers', result.data)
      
    },

      attemptLogin (context,payload){
         return axios.get(process.env.VUE_APP_CardPortalSecurityApi_URL + 'api/companyusers',
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCompanyUsers(context,companyId){

          return axios.get(process.env.VUE_APP_CardPortalSecurityApi_URL + 'api/companies/CompanyUsers/' + companyId,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },
      fetchCompanyActivities(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalSecurityApi_URL + 'api/companies/CompanyAcivities/'  + companyId,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },
      fetchActivities(context){
          return axios.get(process.env.VUE_APP_CardPortalSecurityApi_URL + 'api/activities',
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },
      fetchRoles(context){
          return axios.get(process.env.VUE_APP_CardPortalSecurityApi_URL + 'api/roles',
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },
      fetchCompanyCardRequests(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `api/CardRequest/all/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCompanyPendingApproval(context,companyId){
        return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `api/CardRequest/pendingApproval/${companyId}`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    },

    fetchCompanyPendingAcknowledgement(context,companyId){
      return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `api/CardRequest/pendingacknowledgement/${companyId}`,
          {
              headers: {
                  "Content-Type": "application/json"
              }
          }
      )
  },

  fetchCompanyRejected(context,companyId){
    return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `api/CardRequest/PendingRejectRequest/${companyId}`,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
},

      getClientDashboardData(context,companyId){
        return Promise.all([
            context.dispatch("fetchCompanyUsers",companyId),
            context.dispatch("fetchCompanyActivities",companyId),
            context.dispatch("fetchCompanyCardRequests",companyId),
            context.dispatch("fetchCompanyPendingApproval",companyId),
            context.dispatch("fetchCompanyPendingAcknowledgement",companyId),
            context.dispatch("fetchCompanyRejected",companyId),
            context.dispatch("fetchRoles"),
        ]);
      }

  },
  modules: {
  }
})

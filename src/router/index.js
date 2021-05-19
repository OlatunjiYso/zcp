import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Client/Login/Login.vue'
import Overview from '../views/Client/Overview/Overview.vue'
import Requests from '../views/Client/Requests/Requests.vue'
import UserMgmt from '../views/Client/UserMgmt/UserMgmt.vue'
import CreateRole from '../views/Client/UserMgmt/Roles/CreateRole.vue'
import EditRole from '../views/Client/UserMgmt/Roles/EditRole.vue'
import Activities from '../views/Client/Activities/Activities.vue'
import CardRequest from '../views/Client/Activities/CardRequest.vue'
import PinGeneration from '../views/Client/Activities/PinGeneration.vue'
import PinReIssue from '../views/Client/Activities/PinReIssue.vue'
import CardParam from '../views/Client/Activities/CardParam.vue'
import ChargeBack from '../views/Client/Activities/ChargeBack.vue'
import TransactionLog from '../views/Client/Activities/TransactionLog.vue'
import CardDeactivation from '../views/Client/Activities/CardDeactivation.vue'
import CardActivation from '../views/Client/Activities/CardActivation.vue'
import CardStatus from '../views/Client/Activities/CardStatus.vue'
import ActivityForm from "../views/Client/Activities/ActivityForm";




import Login2 from '../views/Admin/Login/Login.vue'
import Overview2 from '../views/Admin/Overview/Overview.vue'
import Companies2 from '../views/Admin/Companies/Companies.vue'
import Requests2 from '../views/Admin/Requests/Requests.vue'
import UserMgmt2 from '../views/Admin/UserMgmt/UserMgmt.vue'
import CreateRole2 from '../views/Admin/UserMgmt/Roles/CreateRole.vue'
import EditRole2 from '../views/Admin/UserMgmt/Roles/EditRole.vue'
import Activities2 from '../views/Admin/Activities/Activities.vue'



const routes = [
  {
    path: '/client/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/client/overview',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/client/requests',
    name: 'Requests',
    component: Requests
  },
  {
    path: '/client/activities',
    name: 'Activities',
    component: Activities
  },
  {
    path: '/client/create-role',
    name: 'CreateRole',
    component: CreateRole
  },
  {
    path: '/client/edit-role/:id',
    name: 'EditRole',
    component: EditRole
  },
  {
    path: '/client/user-management',
    name: 'UserMgmt',
    component: UserMgmt
  },
  {
    path: '/client/card-request',
    name: 'CardRequest',
    component: CardRequest
  },
  {
    path: '/client/activity-form/:slug',
    name: 'ActivityForm',
    component: ActivityForm
  },
  {
    path: '/client/pin-generation',
    name: 'PinGeneration',
    component: PinGeneration
  },
  {
    path: '/client/pin-reissue',
    name: 'PinReIssue',
    component: PinReIssue
  },
  {
    path: '/client/card-parametization',
    name: 'CardParam',
    component: CardParam
  },
  {
    path: '/client/chargeback-request',
    name: 'ChargeBack',
    component: ChargeBack
  },
  {
    path: '/client/transaction-log',
    name: 'TransactionLog',
    component: TransactionLog
  },
  {
    path: '/client/card-activation',
    name: 'CardActivation',
    component: CardActivation
  },
  {
    path: '/client/card-deactivation',
    name: 'CardDeactivation',
    component: CardDeactivation
  },
  {
    path: '/client/card-status',
    name: 'CardStatus',
    component: CardStatus
  },


  {
    path: '/admin/login',
    name: 'Login2',
    component: Login2
  },
  {
    path: '/admin/overview',
    name: 'Overview2',
    component: Overview2
  },
  {
    path: '/admin/companies',
    name: 'Companies2',
    component: Companies2
  },
  {
    path: '/admin/requests/:id',
    name: 'Requests2',
    component: Requests2
  },
  {
    path: '/admin/activities',
    name: 'Activities2',
    component: Activities2
  },
  {
    path: '/admin/create-role',
    name: 'CreateRole2',
    component: CreateRole2
  },
  {
    path: '/admin/edit-role/:id',
    name: 'EditRole2',
    component: EditRole2
  },
  {
    path: '/admin/user-management',
    name: 'UserMgmt2',
    component: UserMgmt2
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

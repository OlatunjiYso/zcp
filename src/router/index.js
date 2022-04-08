import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Client/Login/Login.vue'
import Overview from '../views/Client/Overview/Overview.vue'
import Requests from '../views/Client/Requests/Requests.vue'
import UserMgmt from '../views/Client/UserMgmt/UserMgmt.vue'
import Activities from '../views/Client/Activities/Activities.vue'
import ActivityForm from "../views/Client/Activities/ActivityForm";
import ActivityRequest from "../views/Client/ActivityRequest/ActivityRequest";
import CardIssue from "../views/Client/CardIssue/CardIssue";
import CardCancel from "../views/Client/CardCancellation/CardCancel";
import Dispute from "../views/Client/Dispute/Dispute";
import CardParam from "../views/Client/CardParam/Requests";
import PinReissue from "../views/Client/PinReissue/PinReissue";
import Audit from '../views/Client/Audit/Audit.vue'
import CardStatus from '../views/Client/CardStatus/CardStatus'
import CardStockRequest from '../views/Client/StockRequest/Requests'
import AccountHolders from '../views/Client/AccountHolders/Index.vue'


import Login2 from '../views/Admin/Login/Login.vue'
import Overview2 from '../views/Admin/Overview/Overview.vue'
import Companies2 from '../views/Admin/Companies/Companies.vue'
import Requests2 from '../views/Admin/Requests/Requests.vue'
import UserMgmt2 from '../views/Admin/UserMgmt/UserMgmt.vue'
import CreateRole2 from '../views/Admin/UserMgmt/Roles/CreateRole.vue'
import Activities2 from '../views/Admin/Activities/Activities.vue'
import ActivityRequest2 from '../views/Admin/ActivityRequests/ActivityRequests'
import Audit2 from '../views/Admin/Audit/Audit.vue'
import CardStatus2 from '../views/Admin/CardStatus/CardStatus'
import CardStockRequest2 from '../views/Admin/StockRequest/Requests'
import CompanyUsers from '../views/Admin/Companies/UserMgmt'
import Reporting2 from '../views/Admin/Reports/Reporting.vue';
import CompanyReport2 from '../views/Admin/Reports/CompanyReport.vue';
import CardReportList2 from '../views/Admin/Reports/CardReportList.vue';

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect : '/client/login'
  },
  {
    path: '/client/login',
    name: 'Login',
    component: Login,
    meta: { requiresMfbGuest: true }
  },
  {
    path: '/client/overview',
    name: 'Overview',
    component: Overview,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/audit',
    name: 'Audit',
    component: Audit,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/card-requests',
    name: 'Requests',
    component: Requests,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/card-issue',
    name: 'CardIssue',
    component: CardIssue,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/card-param',
    name: 'CardParam',
    component: CardParam,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/pin-reissue',
    name: 'PinReissue',
    component: PinReissue,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/card-cancellation',
    name: 'CardCancel',
    component: CardCancel,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/dispute-requests',
    name: 'Dispute',
    component: Dispute,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/activity-requests',
    name: 'ActivityRequest',
    component: ActivityRequest,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/activities',
    name: 'Activities',
    component: Activities,
    meta: { requiresMfbAuth: true }
  },

  {
    path: '/client/user-management',
    name: 'UserMgmt',
    component: UserMgmt,
    meta: { requiresMfbAuth: true }
  },

  {
    path: '/client/activity-form/:slug',
    name: 'ActivityForm',
    component: ActivityForm,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/card-status',
    name: 'CardStatus',
    component: CardStatus,
    meta: { requiresMfbAuth: true }
  },
{
  path: '/client/card-stock-request',
    name: 'CardStockRequest',
    component: CardStockRequest,
    meta: { requiresMfbAuth: true }
},
{
  path: '/client/account-holders',
    name: 'AccountHolders',
    component: AccountHolders,
    meta: { requiresMfbAuth: true }
},








  {
    path: '/admin/:name/users/:id',
    name: 'CompanyUsers',
    component: CompanyUsers,
    meta: { requiresAdminAuth: true }
  },

  {
    path: '/admin/card-status',
    name: 'CardStatus2',
    component: CardStatus2,
    meta: { requiresAdminAuth: true }
  },

  {
    path: '/admin/audit',
    name: 'Audit2',
    component: Audit2,
    meta: { requiresAdminAuth: true }
  },

  {
    path: '/admin/login',
    name: 'Login2',
    component: Login2,
    meta: { requiresAdminGuest: true }
  },
  {
    path: '/admin/overview',
    name: 'Overview2',
    component: Overview2,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/companies',
    name: 'Companies2',
    component: Companies2,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/requests/:id',
    name: 'Requests2',
    component: Requests2,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/activities',
    name: 'Activities2',
    component: Activities2,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/activity-requests',
    name: 'ActivityRequest2',
    component: ActivityRequest2,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/create-role',
    name: 'CreateRole2',
    component: CreateRole2,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/user-management',
    name: 'UserMgmt2',
    component: UserMgmt2,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/card-stock-request',
      name: 'CardStockRequest2',
      component: CardStockRequest2,
      meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/reporting',
      name: 'Reporting2',
      component: Reporting2,
      meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/reporting/company/:id',
      name: 'CompanyReport2',
      component: CompanyReport2,
      meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/reporting/company/cards/:id',
      name: 'CardReportList2',
      component: CardReportList2,
      meta: { requiresAdminAuth: true }
  } 

]




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach((to, from, next) => {
  const admin_token = localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAdminAuth)) {
    if (admin_token) {
      next();
    }
    else {    
      next({path: '/admin/login'});
    }
  } else {    
    next();
  }
});

router.beforeEach((to, from, next) => {
  const mfb_token = localStorage.getItem('token-mfb');
  if (to.matched.some((record) => record.meta.requiresMfbAuth)) {
    if (mfb_token) {
      next();
    }
   else {    
    next({path: '/client/login'});
  }
}else {    
  next();
}
});

router.beforeEach((to, from, next) => {
  const admin_token = localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAdminGuest)) {
    if (admin_token) {
     next({path: '/admin/overview'});
    }
    else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const mfb_token = localStorage.getItem('token-mfb');
  if (to.matched.some((record) => record.meta.requiresMfbGuest)) {
    if (mfb_token) {
      next({path: '/client/overview'});
    }
    else {
      next();
    }
  } else {
    next();
  }
});

export default router

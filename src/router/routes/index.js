import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Avocatoo Dashboard'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/login',
    component: lazy(() => import('../../views/Auth/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    },
    exact: true
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/Auth/ForgotPassowrd')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    },
    exact: true
  },
  {
    path: '/reset-password/:hash',
    component: lazy(() => import('../../views/Auth/ResetPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    },
    exact: true
  },
  {
    path: '/activate/hash/:hash',
    component: lazy(() => import('../../views/Auth/ActivateAccount')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    },
    exact: true
  },
  {
    path: '/home',
    component: lazy(() => import('../../views/Home/Home')),
    exact: true
  },
  {
    path: '/support',
    component: lazy(() => import('../../views/Home/Home')),
    exact: true
  },
  {
    path: '/users',
    component: lazy(() => import('../../views/Users/UsersList')),
    exact: true
  },
  {
    path: '/users/client',
    component: lazy(() => import('../../views/Clients/ClientsList')),
    exact: true
  },
  {
    path: '/users/lp',
    component: lazy(() => import('../../views/Lp/LpList')),
    exact: true
  },
  {
    path: '/user/:id',
    component: lazy(() => import('../../views/AccountView/')),
    exact: true
  },
  {
    path: '/users/admin',
    component: lazy(() => import('../../views/Admin/AdminsList')),
    exact: true
  },
  {
    path: '/posts',
    component: lazy(() => import('../../views/Home/Home')),
    exact: true
  },
  {
    path: '/categories',
    component: lazy(() => import('../../views/Category/Category')),
    exact: true
  },
  {
    path: '/questions',
    component: lazy(() => import('../../views/Home/Home')),
    exact: true
  },
  {
    path: '/tickets',
    component: lazy(() => import('../../views/Home/Home')),
    exact: true
  },
  {
    path: '/stats/audience',
    component: lazy(() => import('../../views/Home/Home')),
    exact: true
  },
  {
    path: '/stats/questions',
    component: lazy(() => import('../../views/Home/Home')),
    exact: true
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Misc/Errors/Error')),
    exact: true,
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }

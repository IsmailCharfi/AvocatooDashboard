import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Avocatoo Dashboard'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home/Home'))
  },
  {
    path: '/second-page',
    component: lazy(() => import('../../views/Home/SecondPage'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Auth/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/Auth/ForgotPassowrd')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/reset-password/:hash',
    component: lazy(() => import('../../views/Auth/ResetPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Misc/Errors/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }

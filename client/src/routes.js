// Guards
import Layout from './components/layouts/Layout'
import AlertPopup from './components/layouts/AlertPopup'

// Pages
import Home from './pages'
import User from './pages/user'

import HeaderAppBar from './components/layouts/Layout'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        element: (
          <>
            <AlertPopup />
            <Home />
          </>
        ),
      },
    
      {
        path: 'user',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <User />
          </>
        ),
      },
    //   {
    //     path: 'hospital',
    //     element: (
    //       <>

    //         <HeaderAppBar />
    //         <AlertPopup />
    //         <Hospital />
    //       </>
    //     ),
    //   },
    //   {
    //     path: 'clinic',
    //     element: (
    //       <>
    //         <HeaderAppBar />
    //         <AlertPopup />
    //         <Hospital />
    //       </>
    //     ),
    //   },
    //   {
    //     path: 'diagnostic',
    //     element: (
    //       <>
    //         <HeaderAppBar />
    //         <AlertPopup />
    //         <Hospital />
    //       </>
    //     ),
    //   },
    ],
  },
]

export default routes;
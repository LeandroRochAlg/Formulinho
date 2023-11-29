import React from 'react'
import {RouterProvider, Outlet} from 'react-router-dom';
import AppRouters from './Router';


function App() {
  return (
    <>
      <RouterProvider router={AppRouters}/>
    </>
  )
}

export default App

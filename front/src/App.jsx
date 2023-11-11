import React from 'react'
import {RouterProvider, Outlet} from 'react-router-dom';
import AppRouters from './Router';
import { AnimatePresence } from 'framer-motion';


function App() {
  return (
    <>
    <AnimatePresence initial={false}>
      <RouterProvider router={AppRouters}/>
    </AnimatePresence>
    <Outlet/>
    </>
  )
}

export default App

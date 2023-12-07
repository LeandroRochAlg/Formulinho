import React from 'react'
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import PrivateRoutes from './routers/PrivateRoutes';
import PublicRoutes from './routers/PublicRoutes';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/system/*" element={<PrivateRoutes />} />
          <Route path="/auth/*" element={<PublicRoutes />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

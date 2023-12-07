import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "./routers/PublicRoutes.jsx";
import PrivateRoutes from "./routers/PrivateRoutes.jsx";
import NotFoundPage from "./pages/errors/Page404.jsx";

const App = () => {

  return (
    <Router>
        <Routes>
          <Route path="/auth/*" element={<PublicRoutes />} />
          <Route path="/system/*" element={<PrivateRoutes />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
  );
};

export default App;

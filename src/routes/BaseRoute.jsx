import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routing from "./routing"
//import PrivateRoute from "./PrivateRoute";

const BaseRoute = () => (
  <Router>
    <Routes>
      {routing.public.map(({ exact, path, element }, index) => (
        <Route key={index} exact={exact} path={path} element={element} />
      ))}
     {/* <Route element={<PrivateRoute />}>
     {routing.private.map(({ exact, path, element }, index) => (
        <Route
          key={index}
          exact={exact}
          path={path}
          component={element}
        />
      ))}
     </Route> */}
    </Routes>
  </Router>
);

export default BaseRoute;

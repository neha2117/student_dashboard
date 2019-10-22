import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "../Components/auth/login";
import Dashboard from "../Components/dashboard/studentDashboard";
import StudentData from "../Components/studentInfo/studentInfo";

const Routes = (
  <Router>
    <Route path={"/"} component={Auth} exact />
    <Route path={"/dashboard"} component={Dashboard} exact />
    <Route path={"/dashboard/:id"} component={StudentData} exact />
  </Router>
);
export default Routes
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import PatientInfoForm from "./components/PatientInfoForm";
import Wrapper from "./Wrapper";

import "./scss/App.scss";
import "./antd-mobile.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/landing">
          <LandingPage />
        </Route>
        <Route path="/patientinfo">
          <Wrapper
            navTitle="Patient Information"
            leftArrowText="Home"
            leftArrowRoute="/"
          >
            <PatientInfoForm />
          </Wrapper>
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

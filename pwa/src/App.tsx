import React from "react";
import "./scss/App.scss";
import "./antd-mobile.css";

import Login from "./components/Login";
import PatientInfoForm from './components/PatientInfoForm'

const App = () => {
  return (
    <>
      <Login />
      <PatientInfoForm/>
    </>
  );
};

export default App;

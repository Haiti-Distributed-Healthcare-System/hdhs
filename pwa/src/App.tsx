import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import LandingPage from './components/LandingPage'
import Wrapper from './Wrapper'
import PatientInfoForm from './components/PatientInfoForm'
import DiagnosisForm from './components/DiagnosisForm'

import './scss/App.scss'
import './antd-mobile.css'

const App: React.FunctionComponent = () => {
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
                <Route path="/diagnosis">
                    <Wrapper
                        navTitle="Diagnosis"
                        leftArrowText="Patient Info"
                        leftArrowRoute="/patientinfo"
                    >
                        <DiagnosisForm />
                    </Wrapper>
                </Route>
                <Route path="/">
                    <Login />
                </Route>
            </Switch>
        </Router>
    )
}

export default App

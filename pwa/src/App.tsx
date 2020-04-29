import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { StoreProvider } from 'easy-peasy'
import store from './state/store'

import Login from './components/Login'
import LandingPage from './components/LandingPage'
import Wrapper from './Wrapper'
import PatientInfoForm from './components/PatientInfoForm'
import PatientSearch from './components/PatientSearch'
import DiagnosisForm from './components/DiagnosisForm'

import './scss/App.scss'
import './antd-mobile.css'
<<<<<<< HEAD
import TreatmentForm from './components/TreatmentForm'

const App: React.FunctionComponent = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/landing">
                    <TreatmentForm />
                </Route>
                <Route path="/patientinfo">
=======
import DebugShowEasyPeasy from './components/DebugShowEasyPeasy'

const App: React.FunctionComponent = () => {
    return (
        <StoreProvider store={store}>
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/landing">
                        <LandingPage />
                    </Route>
                    <Route path="/search">
                        <Wrapper
                            navTitle="Patient Search"
                            leftArrowText="Home"
                            leftArrowRoute="/landing"
                        >
                            <PatientSearch />
                        </Wrapper>
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
>>>>>>> origin/dev
                    <Wrapper
                        navTitle="Diagnosis"
                        leftArrowText="Patient Info"
                        leftArrowRoute="/patientinfo"
                    >
                        <DiagnosisForm />
                    </Wrapper>
                </Route>
                    <Route path="/easy-peasy">
                        <DebugShowEasyPeasy />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </StoreProvider>
    )
}

export default App

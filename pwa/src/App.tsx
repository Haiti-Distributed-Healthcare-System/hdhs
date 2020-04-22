import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { StoreProvider } from 'easy-peasy'
import store from './state/store'

import Login from './components/Login'
import LandingPage from './components/LandingPage'
import Wrapper from './Wrapper'
import PatientInfoForm from './components/PatientInfoForm'

import './scss/App.scss'
import './antd-mobile.css'

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
                    <Route path="/patientinfo">
                        <Wrapper
                            navTitle="Patient Information"
                            leftArrowText="Home"
                            leftArrowRoute="/"
                        >
                            <PatientInfoPlaceholder />
                        </Wrapper>
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

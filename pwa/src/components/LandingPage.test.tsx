import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import LandingPage from './LandingPage'

test('renders landing buttons', () => {
    const landingComponent = render(
        <Router>
            <LandingPage />
        </Router>,
    )
    const lookupButtonElement = landingComponent.getByText(/Patient Lookup/i)
    const newPatientButtonElement = landingComponent.getByText(/New Patient/i)
    expect(lookupButtonElement).toBeInTheDocument()
    expect(newPatientButtonElement).toBeInTheDocument()
})

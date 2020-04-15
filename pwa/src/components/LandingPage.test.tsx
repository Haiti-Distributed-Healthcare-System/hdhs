import React from 'react'
import { render } from '@testing-library/react'
import LandingPage from './LandingPage'

test('renders learn react link', () => {
    const { getByText } = render(<LandingPage />)
    const lookupButtonElement = getByText(/Patient Lookup/i)
    const newPatientButtonElement = getByText(/New Patient/i)
    expect(lookupButtonElement).toBeInTheDocument()
    expect(newPatientButtonElement).toBeInTheDocument()
})

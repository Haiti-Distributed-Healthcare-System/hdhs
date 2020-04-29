import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders login element', () => {
    const { getByText } = render(<App />)
    const linkElement = getByText(/Login/i)
    expect(linkElement).toBeInTheDocument()
})

import React from 'react'
import { render, fireEvent, prettyDOM } from '@testing-library/react'
import PatientSearch from './PatientSearch'

describe('search component initalization', () => {
    test('it should have a search bar', () => {
        const searchComponent = render(<PatientSearch />)
        const searchBar = searchComponent.getByPlaceholderText(
            'Patient Name',
        ) as HTMLInputElement
        expect(searchBar).toBeInTheDocument()
    })
})

// test('', () => {
//     const searchComponent = render(<PatientSearch />)
// })
// test('', () => {
//     const searchComponent = render(<PatientSearch />)
// })
// test('', () => {
//     const searchComponent = render(<PatientSearch />)
// })
// test('', () => {
//     const searchComponent = render(<PatientSearch />)
// })
// test('', () => {
//     const searchComponent = render(<PatientSearch />)
// })

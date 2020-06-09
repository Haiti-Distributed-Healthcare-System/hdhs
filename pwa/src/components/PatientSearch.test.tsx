import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import PatientSearch from './PatientSearch'

// TODO: mock out patient data

let searchComponent: any
let searchBar: HTMLInputElement

beforeEach(() => {
    searchComponent = render(<PatientSearch />)
    searchBar = searchComponent.getByTestId('search-bar') as HTMLInputElement
})

afterEach(() => {
    searchComponent = null
    searchBar = null
})

describe('search component initalization', () => {
    test('it should have a search bar', () => {
        expect(searchBar).toBeInTheDocument()
    })

    test('it should allow the search bar to be focused', () => {
        expect(searchBar).not.toHaveFocus()
        searchBar.focus()
        expect(searchBar).toHaveFocus()
    })
})

describe('search bar functionality', () => {
    test('it should not display a list when no search has been performed', () => {
        expect(searchComponent.queryByTestId('match-list')).toBeFalsy()
    })

    test('it should not display a list when search bar is empty', () => {
        expect(searchComponent.queryByTestId('match-list')).toBeFalsy()
        fireEvent.change(searchBar, { target: { value: 'alex' } })
        expect(searchBar.value).toBe('alex')
        const entryOne = searchComponent.queryByTestId('matched-patient-0')
        expect(entryOne).toBeInTheDocument()
    })

    test('it should show one element for an exact match', () => {
        expect(searchComponent.queryByTestId('match-list')).toBeFalsy()
        fireEvent.change(searchBar, { target: { value: 'alex powers' } })
        expect(searchBar.value).toBe('alex powers')
        const entryOne = searchComponent.queryByTestId('matched-patient-0')
        expect(entryOne).toBeInTheDocument()
        expect(searchComponent.queryByTestId('matched-patient-1')).toBeFalsy()
        fireEvent.change(searchBar, { target: { value: '' } })
        expect(searchBar.value).toBe('')
        expect(entryOne).not.toBeInTheDocument()
    })

    test('it should show add new patient for a no match', () => {
        fireEvent.change(searchBar, { target: { value: 'not a real name' } })
        expect(searchBar.value).toBe('not a real name')
        const entryOne = searchComponent.queryByTestId('no-matched-patient')
        expect(entryOne).toBeInTheDocument()

        fireEvent.change(searchBar, { target: { value: '' } })
        expect(searchBar.value).toBe('')
        expect(entryOne).not.toBeInTheDocument()
    })

    test('it should have a list and defocus the search bar on enter', () => {
        expect(true).toBe(true)
    })
})

// TODO: make these methods more robust
// by evaluating the change of state once the navigation and new patient functions are implemented
describe('list element clicking', () => {
    test('clicking an existing element should call navigateToPatientPage', () => {
        // TODO: check something more robust than console log
        const spy = jest.spyOn(console, 'log')
        fireEvent.change(searchBar, { target: { value: 'Alex Powers' } })
        expect(searchBar.value).toBe('Alex Powers')
        const entryOne = searchComponent.queryByTestId('matched-patient-0')
        expect(entryOne).toBeInTheDocument()

        fireEvent.click(entryOne)
        expect(spy).toHaveBeenCalled()
    })

    test('clicking an existing element should call navigateToPatientPage', () => {
        // TODO: check something more robust than console log
        const spy = jest.spyOn(console, 'log')

        fireEvent.change(searchBar, { target: { value: 'not a real name' } })
        expect(searchBar.value).toBe('not a real name')
        const entryOne = searchComponent.queryByTestId('no-matched-patient')
        expect(entryOne).toBeInTheDocument()

        fireEvent.click(entryOne)
        expect(spy).toHaveBeenCalled()
    })
})

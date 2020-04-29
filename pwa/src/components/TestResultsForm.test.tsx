import React from 'react'
import { render, fireEvent, getByTestId } from '@testing-library/react'
import TestResultsForm from './TestResultsForm'

const testText = [
    'HCG \\(Pregnancy\\)',
    'Blood Sugar',
    'UA \\(Urine Analysis\\)',
]

const testID = ['pregnancy-test', 'blood-sugar-test', 'ua-test']

test('renders the form', () => {
    const dom = render(<TestResultsForm />)
    expect(dom.getByTestId('test-results-form-wrapper')).toBeTruthy()
})

test('renders each test option as a checkbox and is able to be checked / unchecked', () => {
    const { getByText, getByTestId } = render(<TestResultsForm />)

    testText.forEach((testName) => {
        const re = new RegExp(testName, 'gi')
        const field = getByText(re)
        expect(field).toBeInTheDocument()
    })

    testID.forEach((testID) => {
        const checkboxItem = getByTestId(testID)
        expect(checkboxItem).toHaveClass('am-checkbox-item')

        const checkBox = checkboxItem.getElementsByTagName('span')[0]
        expect(checkBox).not.toHaveClass('am-checkbox-checked')
        const checkBoxInput = checkboxItem.getElementsByClassName(
            'am-checkbox-input',
        )[0]
        fireEvent.click(checkBoxInput)
        expect(checkBox).toHaveClass('am-checkbox-checked')
    })
})

test('pregnancy-results div is only displayed if pregnancy test is selected', () => {})

test('blood-sugar-results div is only displayed if blood sugar test is selected', () => {})

test('ua-results div is only displayed if UA test is selected', () => {})

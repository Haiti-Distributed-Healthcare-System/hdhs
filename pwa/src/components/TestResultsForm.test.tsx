import React from 'react'
import {
    render,
    fireEvent,
    getByTestId,
    queryByTestId,
} from '@testing-library/react'
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

test('pregnancy-results div is only displayed if pregnancy test is selected', () => {
    const { getByTestId, queryByTestId } = render(<TestResultsForm />)

    // ensure the pregnancy-results div is not displayed
    const re = new RegExp('^pregnancy-results$', 'gi')
    expect(queryByTestId(re)).toBeFalsy()

    // check the pregnancy-test checkbox
    const checkboxItem = getByTestId('pregnancy-test')
    expect(checkboxItem).toHaveClass('am-checkbox-item')
    const checkBoxInput = checkboxItem
        .getElementsByTagName('span')[0]
        .getElementsByClassName('am-checkbox-input')[0]
    fireEvent.click(checkBoxInput)

    // ensure the pregnancy-results div is displayed
    expect(getByTestId(re)).toBeTruthy()
})

test('pregnancy results is displayed as a checkbox and is able to be checked / unchecked', () => {})

test('blood-sugar-results div is only displayed if blood sugar test is selected', () => {
    const { getByTestId, queryByTestId } = render(<TestResultsForm />)

    // ensure the blood-sugar-results div is not displayed
    const re = new RegExp('^blood-sugar-results$', 'gi')
    expect(queryByTestId(re)).toBeFalsy()

    // check the blood-sugar-test checkbox
    const checkboxItem = getByTestId('blood-sugar-test')
    expect(checkboxItem).toHaveClass('am-checkbox-item')
    const checkBoxInput = checkboxItem
        .getElementsByTagName('span')[0]
        .getElementsByClassName('am-checkbox-input')[0]
    fireEvent.click(checkBoxInput)

    // ensure the blood-sugar-results div is displayed
    expect(getByTestId(re)).toBeTruthy()
})

test('blood sugar results fields is a number input box', () => {})

test('ua-results div is only displayed if UA test is selected', () => {
    const { getByTestId, queryByTestId } = render(<TestResultsForm />)

    // ensure the ua-results div is not displayed
    const re = new RegExp('^ua-results$', 'gi')
    expect(queryByTestId(re)).toBeFalsy()

    // check the ua-test checkbox
    const checkboxItem = getByTestId('ua-test')
    expect(checkboxItem).toHaveClass('am-checkbox-item')
    const checkBoxInput = checkboxItem
        .getElementsByTagName('span')[0]
        .getElementsByClassName('am-checkbox-input')[0]
    fireEvent.click(checkBoxInput)

    // ensure the ua-results div is displayed
    expect(getByTestId(re)).toBeTruthy()
})

test('ua test results are rendered as number input boxes', () => {})

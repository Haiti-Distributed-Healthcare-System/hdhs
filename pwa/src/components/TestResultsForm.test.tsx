import React from 'react'
import {
    render,
    fireEvent,
    getByTestId,
    queryByTestId,
    within,
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

    // Uncheck the checkbox
    fireEvent.click(checkBoxInput)

    // ensure the pregnancy-results div is no longer displayed
    expect(queryByTestId(re)).toBeFalsy()
})

test('pregnancy results is displayed as a checkbox and is able to be checked / unchecked', () => {
    const { getByTestId, queryByTestId } = render(<TestResultsForm />)

    // check the pregnancy-test checkbox to display the pregnancy-results div
    const checkBoxInput = getByTestId('pregnancy-test')
        .getElementsByTagName('span')[0]
        .getElementsByClassName('am-checkbox-input')[0]
    fireEvent.click(checkBoxInput)

    // ensure negative and positive checkboxes are initilaly displayed unchecked
    const negativeRadioButtonDiv = getByTestId('pregnancy-results-negative')
    const positiveRadioButtonDiv = getByTestId('pregnancy-results-positive')
    const negativeRadioButton = negativeRadioButtonDiv.getElementsByTagName(
        'span',
    )[0]
    const positiveRadioButton = positiveRadioButtonDiv.getElementsByTagName(
        'span',
    )[0]
    expect(negativeRadioButton).not.toHaveClass('am-radio-checked')
    expect(positiveRadioButton).not.toHaveClass('am-radio-checked')

    // select "Negative"
    fireEvent.click(negativeRadioButtonDiv)

    // ensure negative is checked and positive is unchecked
    expect(negativeRadioButton).toHaveClass('am-radio-checked')
    expect(positiveRadioButton).not.toHaveClass('am-radio-checked')

    // select "Positive"
    fireEvent.click(positiveRadioButtonDiv)

    // ensure negative is unchecked and positive is checked
    expect(negativeRadioButton).not.toHaveClass('am-radio-checked')
    expect(positiveRadioButton).toHaveClass('am-radio-checked')
})

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

    // uncheck the checkbox
    fireEvent.click(checkBoxInput)

    // ensure the blood-sugar-results div is no longer displayed
    expect(queryByTestId(re)).not.toBeTruthy()
})

test('blood sugar results fields is a number input box', () => {
    const { getByTestId } = render(<TestResultsForm />)

    // check the blood-sugar-test checkbox to display the blood-sugar-results div
    const checkBoxInput = getByTestId('blood-sugar-test')
        .getElementsByTagName('span')[0]
        .getElementsByClassName('am-checkbox-input')[0]
    fireEvent.click(checkBoxInput)

    // ensure result field is displayed as a number input box
    expect(getByTestId('blood-sugar-results-val')).toBeTruthy()
    expect(getByTestId('blood-sugar-results-val')).toHaveAttribute(
        'type',
        'text',
    )
})

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

    // uncheck the checkbox
    fireEvent.click(checkBoxInput)

    // ensure the ua-results div is no longer displayed
    expect(queryByTestId(re)).not.toBeTruthy()
})

test('ua test results are rendered as number input boxes', () => {
    const { getByTestId, queryByTestId } = render(<TestResultsForm />)
    const uaResultFieldID = [
        'glucose-results-val',
        'nitrites-results-val',
        'protein-results-val',
        'leukocytes-results-val',
    ]

    // check the ua-test checkbox  to display the ua-results div
    const checkBoxInput = getByTestId('ua-test')
        .getElementsByTagName('span')[0]
        .getElementsByClassName('am-checkbox-input')[0]
    fireEvent.click(checkBoxInput)

    // ensure each result field is displayed as a number input box
    uaResultFieldID.forEach((field) => {
        expect(getByTestId(field)).toBeTruthy()
        expect(getByTestId(field)).toHaveAttribute('type', 'text')
    })
})

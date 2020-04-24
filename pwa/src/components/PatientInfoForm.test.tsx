import React from 'react'
import { render, fireEvent, prettyDOM } from '@testing-library/react'
import PatientInfoForm from './PatientInfoForm'
import { StoreProvider } from 'easy-peasy'
import store from '../state/store'

test('female-only div is only displayed if the sex is selected as female', async () => {
    const femaleOnlyFormFields = ['Pregnant?', 'LMP', 'Wants Planning?']

    const dom = render(
        <StoreProvider store={store}>
            <PatientInfoForm />
        </StoreProvider>,
    )

    // ensure the female-only div is not displayed
    femaleOnlyFormFields.forEach((fieldText) => {
        expect(dom.queryByText(fieldText)).toBeNull()
    })

    // click the radio button for 'female'
    const femaleButton = dom.getByTestId('female-button')
    fireEvent.click(femaleButton)

    femaleOnlyFormFields.forEach((fieldText) => {
        expect(dom.queryByText(fieldText)).toBeTruthy()
    })
})

test('sets visit input', () => {
    const dom = render(
        <StoreProvider store={store}>
            <PatientInfoForm />
        </StoreProvider>,
    )
    const firstVisitYesInput = dom.queryByTestId('first-visit-Yes')
    const checkBox = firstVisitYesInput.getElementsByTagName('span')[0]

    expect(checkBox).not.toHaveClass('am-radio-checked')
    fireEvent.click(firstVisitYesInput)
    expect(checkBox).toHaveClass('am-radio-checked')
})

test('sets pregnant input', () => {
    const dom = render(
        <StoreProvider store={store}>
            <PatientInfoForm />
        </StoreProvider>,
    )
    const femaleButton = dom.getByTestId('female-button')
    fireEvent.click(femaleButton)

    const pregnantYesInput = dom.queryByTestId('pregnant-Yes')
    const checkBox = pregnantYesInput.getElementsByTagName('span')[0]

    expect(checkBox).not.toHaveClass('am-radio-checked')
    fireEvent.click(pregnantYesInput)
    expect(checkBox).toHaveClass('am-radio-checked')
})

test('sets planning input', () => {
    const dom = render(
        <StoreProvider store={store}>
            <PatientInfoForm />
        </StoreProvider>,
    )
    const femaleButton = dom.getByTestId('female-button')
    fireEvent.click(femaleButton)

    const planningYesInput = dom.queryByTestId('planning-Yes')
    const checkBox = planningYesInput.getElementsByTagName('span')[0]

    expect(checkBox).not.toHaveClass('am-radio-checked')
    fireEvent.click(planningYesInput)
    expect(checkBox).toHaveClass('am-radio-checked')
})

test('sets albendazole input', () => {
    const dom = render(
        <StoreProvider store={store}>
            <PatientInfoForm />
        </StoreProvider>,
    )
    const femaleButton = dom.getByTestId('female-button')

    const albendazoleYesInput = dom.queryByTestId('albendazole-Yes')
    const checkBox = albendazoleYesInput.getElementsByTagName('span')[0]

    expect(checkBox).not.toHaveClass('am-radio-checked')
    fireEvent.click(albendazoleYesInput)
    expect(checkBox).toHaveClass('am-radio-checked')
})

test('renders the Patient Info Form fields', () => {
    const formFields = [
        'First Name',
        'First Name',
        'Last Name',
        'Last Name',
        'Sex',
        'Birth',
        'Age',
        'Phone',
        'Town',
        'Visit',
        'Nickname',
        'BP',
        'Temp',
        'Pulse',
        'Weight',
        'Height',
        'Z-Score',
        'Albendazole',
        'Alergies',
        'Medicines',
        'Chief Complaint',
        'History',
        'Exam',
    ]

    const { getByText } = render(
        <StoreProvider store={store}>
            <PatientInfoForm />
        </StoreProvider>,
    )

    formFields.forEach((fieldText) => {
        const re = new RegExp(fieldText, 'gi')
        expect(getByText(re)).toBeInTheDocument()
    })
})

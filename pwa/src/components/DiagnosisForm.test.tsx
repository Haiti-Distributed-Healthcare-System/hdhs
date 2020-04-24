import React from 'react'
import {
    render,
    fireEvent,
    getByTestId,
    queryByTestId,
} from '@testing-library/react'
import DiagnosisForm from './DiagnosisForm'

/*

Diagnosis Fields are stored in DiagnosisFields.json in the format:

{
    "diagnoses" : [
        {
            "name": "Name",
            "id": "id",
            "text-input-title": "Title",
            "text-input-type": "type" (i.e. number)
            "group-title": "Group Title",
            "group": [
                { "name": "Name1", "id": "id1" },
                { "name": "Name2", "id": "id2" }
            ]
        },
        {...}
    ]
}
*/

import * as data from './DiagnosisFields.json'
const diagnosisFields = data.diagnoses

test('renders the form', async () => {
    const dom = render(<DiagnosisForm />)
    expect(dom.getByTestId('diagnosis-form-wrapper')).toBeTruthy()
})

test('renders each diagnoses.name data field', () => {
    const { getByText } = render(<DiagnosisForm />)

    diagnosisFields.forEach((diagnosis) => {
        if (diagnosis.name != null) {
            const re = new RegExp(diagnosis.name, 'gi')
            const field = getByText(re)
            expect(field).toBeInTheDocument()
        }
    })
})

test(' each diagnoses.name has a corresponding checkbox and is able to be checked/unchecked', () => {
    const { getByTestId, getByText } = render(<DiagnosisForm />)

    diagnosisFields.forEach((diagnosis) => {
        if (diagnosis.name != null && diagnosis.id != null) {
            // const dom = render(<DiagnosisForm />)
            const re = new RegExp(diagnosis.id, 'gi')
            // const checkboxItem = dom.queryByTestId(re)
            const checkboxItem = getByTestId(re)
            expect(checkboxItem).toHaveClass('am-checkbox-item')

            // TODO: ensure it can be checked /unchecked
            // TOTO / help: not sure what to element to click in order to actually trigger the checkbox being checked
            // This is very similar to the radio button tests in PatientInfoForm

            const checkBox = checkboxItem.getElementsByTagName('span')[0]
            expect(checkBox).not.toHaveClass('am-checkbox-checked')

            // none of these seem to make the checkbox be checked
            fireEvent.click(checkboxItem)
            fireEvent.click(checkBox)
            const checkBoxInner = checkboxItem.getElementsByClassName(
                'am-checkbox-inner',
            )[0]
            fireEvent.click(checkBoxInner)
            fireEvent.click(getByText(diagnosis.name))
            expect(checkBox).toHaveClass('am-checkbox-checked')
        }
    })
})

test('renders each diagnoses.text-input-title data field as a text entry field', () => {
    const { getByTestId } = render(<DiagnosisForm />)

    diagnosisFields.forEach((diagnosis) => {
        if (
            diagnosis['text-input-title'] != null &&
            diagnosis['text-input-title'] != null
        ) {
            const re = new RegExp(diagnosis['text-input-id'], 'gi')
            const field = getByTestId(re)
            expect(field).toBeInTheDocument()
            // TODO: ensure that this is a text field
        }
    })
})

test('renders each diagnoses.group-title data field as a header', () => {})

test('renders each diagnoses.group entry in the same list element', () => {})

test('renders each diagnoses.[el].name data field as a checkbox', () => {})

test(' each diagnoses.[el].name data is able to be checked/unchecked', () => {})

test('finds and element with each group.[el].id in the DOM', () => {})

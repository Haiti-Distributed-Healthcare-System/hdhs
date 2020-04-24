import React from 'react'
import { render, fireEvent, getByTestId } from '@testing-library/react'
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
    const { getByText, getByTestId } = render(<DiagnosisForm />)

    diagnosisFields.forEach((diagnosis) => {
        if (diagnosis.name != null) {
            const re = new RegExp(diagnosis.id, 'gi')
            const field = getByTestId(re)
            expect(field).toHaveClass('am-checkbox-item')

            // TODO: ensure it can be checked /unchecked
        }
    })
})

test('finds and element with each id in the DOM', () => {})

test('renders each diagnoses.text-input-title data field as a text entry field', () => {})

test('each diagnoses.text-input-title data field is able to recieve text input', () => {})

test('renders each diagnoses.group-title data field as a header', () => {})

test('renders each diagnoses.group entry in the same list element', () => {})

test('renders each diagnoses.[el].name data field as a checkbox', () => {})

test(' each diagnoses.[el].name data is able to be checked/unchecked', () => {})

test('finds and element with each group.[el].id in the DOM', () => {})

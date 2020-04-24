import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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

test('renders the form', async () => {
    const dom = render(<DiagnosisForm />)
    expect(dom.getByTestId('diagnosis-form-wrapper')).toBeTruthy()
})

test('renders each diagnoses.name data field as a checkbox', () => {})

test(' each diagnoses.name data is able to be checked/unchecked', () => {})

test('finds and element with each id in the DOM', () => {})

test('renders each diagnoses.text-input-title data field as a text entry field', () => {})

test('each diagnoses.text-input-title data field is able to recieve text input', () => {})

test('renders each diagnoses.group-title data field as a header', () => {})

test('renders each diagnoses.group entry in the same list element', () => {})

test('renders each diagnoses.[el].name data field as a checkbox', () => {})

test(' each diagnoses.[el].name data is able to be checked/unchecked', () => {})

test('finds and element with each group.[el].id in the DOM', () => {})

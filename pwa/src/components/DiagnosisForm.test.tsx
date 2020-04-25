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
            const re = new RegExp(diagnosis.id, 'gi')
            const checkboxItem = getByTestId(re)
            expect(checkboxItem).toHaveClass('am-checkbox-item')

            const checkBox = checkboxItem.getElementsByTagName('span')[0]
            expect(checkBox).not.toHaveClass('am-checkbox-checked')
            const checkBoxInput = checkboxItem.getElementsByClassName(
                'am-checkbox-input',
            )[0]
            fireEvent.click(checkBoxInput)
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
            expect(field).toHaveAttribute('type', 'text')
        }
    })
})

test('renders each diagnoses.group-title data field as a header', () => {
    const { getByText } = render(<DiagnosisForm />)
    diagnosisFields.forEach((diagnosis) => {
        if (diagnosis['group-title'] != null && diagnosis.group != null) {
            const re = new RegExp(`\^${diagnosis['group-title']}\$`, 'gi')
            const field = getByText(re)
            expect(field).toBeInTheDocument()
            expect(field).toHaveClass('am-list-header')
        }
    })
})

test('renders each diagnoses.group entry in the same list element', () => {
    // TODO:
    // get the list element that contains one of the group id's
    // get the elements contained in the list
    // ensure that each of the group elements is in the list
})

test('renders each diagnoses.[el] as a checkbox that can be checked/unchecked', () => {
    const { getByTestId } = render(<DiagnosisForm />)
    diagnosisFields.forEach((diagnosis) => {
        if (diagnosis.group != null) {
            diagnosis.group.forEach((groupElement) => {
                const re = new RegExp(groupElement.id, 'gi')
                const groupCheckboxItem = getByTestId(re)
                expect(groupCheckboxItem).toBeInTheDocument()
                expect(groupCheckboxItem).toHaveClass('am-checkbox-item')

                const checkBox = groupCheckboxItem.getElementsByTagName(
                    'span',
                )[0]
                expect(checkBox).not.toHaveClass('am-checkbox-checked')
                const checkBoxInput = groupCheckboxItem.getElementsByClassName(
                    'am-checkbox-input',
                )[0]
                fireEvent.click(checkBoxInput)
                expect(checkBox).toHaveClass('am-checkbox-checked')
            })
        }
    })
})

import React from 'react'
import { Collapse } from 'antd-mobile';
import { render, fireEvent } from '@testing-library/react'
import TreatmentForm from './TreatmentForm'
import * as data from './TreatmentFields.json'

/*

Treatment Fields are stored in TreatmentFields.json in the format:

{
    "treatments" : [
        {
            "id": "multivitamins",
            "group-title": "Multivitamins",
            "group": [
                { "name": "Multivitamins - Childrens", "id": "vitamin-childrens" },
                { "name": "Multivitamins - Adult", "id": "vitamin-adult" },
                { "name": "Multivitamins - Prenatal", "id": "vitamin-prenatal" }
            ]
        },
        {...}
    ]
}
*/

const treatmentFields = data.treatments

test('renders the form', async () => {
    const dom = render(<TreatmentForm />)
    expect(dom.getByTestId('treatment-form-wrapper')).toBeTruthy()
})

test('renders each treatment.name data field', () => {
    const { getByText } = render(<TreatmentForm />)

    treatmentFields.forEach((treatmentType) => {
        if (treatmentType['group-title'] != null) {
            const re = new RegExp(treatmentType['group-title'], 'gi')
            const field = getByText(re)
            expect(field).toBeInTheDocument()
        }
    })
})

test('renders each diagnoses.text-input-title data field as a text entry field', () => {
    const { getByTestId, getByText } = render( <TreatmentForm /> )

    treatmentFields.forEach((treatment) => {

        if (
            treatment['text-input-title'] != null &&
            treatment['text-input-id'] != null
        ) {
            const re = new RegExp(`\^${treatment['text-input-id']}\$`, 'gi')
            const field = getByTestId(re)
            expect(field).toBeInTheDocument()
            expect(field).toHaveAttribute('type', 'text')
        }

        // To account for nested text fields in the misc. tab
        if (treatment.group != null && treatment.id != null) {
            fireEvent.click(getByText(treatment['group-title']))
            if (
                treatment['text-input-title'] != null &&
                treatment['text-input-id'] != null
            ) {
                const re = new RegExp(`\^${treatment['text-input-id']}\$`, 'gi')
                const field = getByTestId(re)
                expect(field).toBeInTheDocument()
                expect(field).toHaveAttribute('type', 'text')
            }
        }
    })
})

test('expands each diagnoses.group accordion and checks functionality of checkboxes', () => {
    const { getByTestId, getByText } = render(<TreatmentForm />)
    treatmentFields.forEach((treatment) => {
        if (treatment.group != null && treatment.id != null) {
            // Expand the accordion
            fireEvent.click(getByText(treatment['group-title']))

            treatment.group.forEach((groupElement) => {
                if (groupElement.id != null && groupElement.name != null) {
                    const re = new RegExp(`\^${groupElement.id}\$`, 'gi')
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
                }
            })
        }
    })
})

import React, { ReactElement } from 'react'
import { List, Checkbox, InputItem, WhiteSpace } from 'antd-mobile'
import '../scss/DiagnosisForm.scss'
import * as data from './DiagnosisFields.json'

const CheckboxItem = Checkbox.CheckboxItem

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

const diagnosisFields = data.diagnoses

export default function DiagnosisForm(): ReactElement {
    return (
        <div id="diagnosis-form-wrapper" data-testid="diagnosis-form-wrapper">
            {diagnosisFields.map((field) => {
                const formElements: ReactElement[] = []

                if (field.name != null) {
                    formElements.push(
                        <CheckboxItem
                            id={field.id}
                            data-testid={field.id}
                            key={field.id}
                        >
                            {field.name}
                        </CheckboxItem>,
                    )
                }

                if (
                    field['text-input-title'] != null &&
                    field['text-input-id'] != null
                ) {
                    formElements.push(
                        <List renderHeader={() => field['text-input-title']}>
                            <InputItem
                                id={field['text-input-id']}
                                data-testid={field['text-input-id']}
                                type={
                                    field['text-input-type'] == 'number'
                                        ? 'number'
                                        : 'text'
                                }
                                maxLength={
                                    field['text-input-id'] == 'pregnancy-weeks'
                                        ? 2
                                        : null
                                }
                            />
                        </List>,
                    )
                }

                if (field.group != null) {
                    const groupElements: ReactElement[] = []

                    // add each group element to the internalElement array
                    field.group.forEach((ele: any) => {
                        groupElements.push(
                            <CheckboxItem
                                id={ele.id}
                                data-testid={ele.id}
                                key={ele.id}
                            >
                                {ele.name}
                            </CheckboxItem>,
                        )
                    })

                    // Render the entire list with the internal elements
                    if (field['group-title'] != null) {
                        formElements.push(
                            <List
                                renderHeader={() => field['group-title']}
                                data-testid={field.id}
                            >
                                {groupElements}
                            </List>,
                        )
                    }

                    formElements.push(<WhiteSpace size="lg" />)
                }

                return <> {formElements} </>
            })}
        </div>
    )
}

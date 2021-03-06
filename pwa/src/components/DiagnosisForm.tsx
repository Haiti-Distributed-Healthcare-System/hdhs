import React, { ReactElement } from 'react'
import { List, Checkbox, InputItem, WhiteSpace } from 'antd-mobile'
import '../scss/DiagnosisForm.scss'
import * as data from './DiagnosisFields.json'

/*

Diagnosis Fields are stored in DiagnosisFields.json in the format:

{
    "diagnoses" : [
        {
            "name": "Name",
            "id": "id",
            "text-input-title": "Title",
            "text-input-id": "id" for `id` and `data-testid` attributes
            "text-input-type": "type" (i.e. number)
            "max-length": 3
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

const CheckboxItem = Checkbox.CheckboxItem
const diagnosisFields = data.diagnoses

export default function DiagnosisForm(): ReactElement {
    return (
        <div id="diagnosis-form-wrapper" data-testid="diagnosis-form-wrapper">
            {diagnosisFields.map((field) => {
                const formElements: ReactElement[] = []

                if (field.name != null) {
                    formElements.push(
                        <List>
                            <CheckboxItem
                                id={field.id}
                                data-testid={field.id}
                                key={field.id}
                            >
                                {field.name}
                            </CheckboxItem>
                        </List>,
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
                                key={field['text-input-id']}
                                type={
                                    field['text-input-type'] === 'number'
                                        ? 'number'
                                        : 'text'
                                }
                                maxLength={
                                    field['max-length']
                                        ? field['max-length']
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
                        if (ele.id != null && ele.name != null) {
                            groupElements.push(
                                <CheckboxItem
                                    id={ele.id}
                                    data-testid={ele.id}
                                    key={ele.id}
                                >
                                    {ele.name}
                                </CheckboxItem>,
                            )
                        }
                    })

                    // Render the entire list with the internal elements
                    if (field['group-title'] != null && field.id !== null) {
                        formElements.push(
                            <List
                                renderHeader={() => field['group-title']}
                                data-testid={field.id}
                            >
                                {groupElements}
                                <WhiteSpace
                                    className="list-whitespace"
                                    size="lg"
                                />
                            </List>,
                        )
                    }
                }

                return <> {formElements} </>
            })}
        </div>
    )
}

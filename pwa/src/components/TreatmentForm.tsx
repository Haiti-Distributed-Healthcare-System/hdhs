import React, { ReactElement } from 'react'
import { TextareaItem, Accordion, Checkbox, List, InputItem, WhiteSpace  } from 'antd-mobile'
import '../scss/Login.scss'
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

const CheckboxItem = Checkbox.CheckboxItem;
const treatmentFields = data.treatments

export default function TreatmentForm(): ReactElement {
    return (
        <div id="treatment-form-wrapper" data-testid="treatment-form-wrapper">
            {treatmentFields.map((field) => {
                const formElements: ReactElement[] = []
                    
                if (field['text-input-title'] != null && field['text-input-id'] != null) {
                    formElements.push(
                        <List renderHeader={() => field['text-input-title']}>
                            <InputItem
                                id={field['text-input-id']}
                                data-testid={field['text-input-id']}
                                key={field['text-input-id']}
                                type={'text'}
                                maxLength={null
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

                        if (ele['text-input-title'] != null && ele['text-input-id'] != null) {
                            groupElements.push(
                                    <TextareaItem
                                        id={ele['text-input-id']}
                                        placeholder={ele['text-input-title']}
                                        data-testid={ele['text-input-id']}
                                        key={ele['text-input-id']}
                                        maxLength={null}
                                    />
                            )
                        }
                    })

                    // Render the entire list with the internal elements
                    if (field['group-title'] != null && field.id !== null) {
                        formElements.push(
                            <div>
                                <Accordion data-testid={field.id}>
                                <Accordion.Panel 
                                    header={field['group-title']}
                                >
                                    {groupElements}
                                </Accordion.Panel>
                                </Accordion>
                            </div>
                        )
                    }
                }

                return <> {formElements} </>
            })}
        </div>
    )
}
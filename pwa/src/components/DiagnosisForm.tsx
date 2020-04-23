import React, { ReactElement, useState } from 'react'
import { List, Checkbox, TextareaItem, WhiteSpace, Radio } from 'antd-mobile'
import '../scss/DiagnosisForm.scss'
import * as data from './DiagnosisFields.json'

const CheckboxItem = Checkbox.CheckboxItem
const RadioItem = Radio.RadioItem

/*

Diagnosis Fields are stored in DiagnosisFields.json in the format:

{
    "diagnoses" : [
        {
            "name":"",
            "group-title":"",
            "group":[],
            "radio-buttons": {
                "radio-buttons-title":"",
                "radio-buttons":[

                ]

            },
            "text-input-title":""
        }
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
                        <CheckboxItem id={field.id} key={field.id}>
                            {field.name}
                        </CheckboxItem>,
                    )
                }

                if (field['text-input-title'] != null) {
                    formElements.push(
                        <List renderHeader={() => field['text-input-title']}>
                            <TextareaItem autoHeight id={field.id} />
                        </List>,
                    )
                }

                if (field.group != null) {
                    const groupElements: ReactElement[] = []

                    // add each group element to the internalElement arrat
                    field.group.forEach((ele: any) => {
                        groupElements.push(
                            <CheckboxItem id={ele.id} key={ele.id}>
                                {ele.name}
                            </CheckboxItem>,
                        )
                    })

                    // Render the entire list with the internal elements
                    if (field['group-title'] != null) {
                        formElements.push(
                            <List renderHeader={() => field['group-title']}>
                                {groupElements}
                            </List>,
                        )
                    }

                    formElements.push(<WhiteSpace size="lg" />)
                }

                // TODO: radio buttons displayed this way are indented badly
                if (field['radio-buttons'] != null) {
                    {
                        field['radio-buttons']['radio-buttons'].map((i) =>
                            formElements.push(
                                <RadioItem
                                    data-testid={i.id}
                                    id={i.id}
                                    key={i.name}
                                    name={i.name}
                                    // checked={sex === i.value}
                                    // onClick={() => setSex(i.value)}
                                >
                                    {i.name}
                                </RadioItem>,
                            ),
                        )
                    }
                }

                return <> {formElements} </>
            })}
        </div>
    )
}

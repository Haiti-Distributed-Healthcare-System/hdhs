import React, { ReactElement, useState } from 'react'
import { List, Checkbox, TextareaItem, WhiteSpace } from 'antd-mobile'
import '../scss/DiagnosisForm.scss'
import * as data from './DiagnosisFields.json'

const CheckboxItem = Checkbox.CheckboxItem

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

var diagnosisFields = data.diagnoses

export default function Form(): ReactElement {
    return (
        <div>
            <List renderHeader={() => 'Patient Diagnosis'}>
                {diagnosisFields.map((field) => {
                    const formElements: ReactElement[] = []

                    if (field.name != null) {
                        formElements.push(
                            <CheckboxItem
                                id={`${field.name.toLowerCase()}-button`}
                            // key={field.name}
                            // name={field.name.toLowerCase()}
                            >
                                {field.name}
                            </CheckboxItem>,
                        )
                    }

                    if (field['text-input-title'] != null) {
                        formElements.push(
                            <List
                                renderHeader={() => field['text-input-title']}
                            >
                                <TextareaItem
                                    autoHeight
                                    id={field['text-input-title'].toLowerCase()}
                                />
                            </List>,
                        )
                    }

                    if (field.group != null) {
                        if(field["group-title"] != null){
                            formElements.push(
                                <List
                                renderHeader={() => field['group-title']}
                                >
                                </List>
                            )
                        }
                        field.group.forEach((ele) => {
                            formElements.push(
                                <CheckboxItem
                                    id={`${ele.toLowerCase()}-checkbox`}
                                    key={ele.toLowerCase()}
                                >
                                    {ele}
                                </CheckboxItem>)

                        })
                        formElements.push(<WhiteSpace size="lg"/>)
                    }

                    return <> {formElements} </>
                })}
            </List>
        </div>
    )
}

import React, { ReactElement, useState } from "react";
import { List, Checkbox, TextareaItem } from 'antd-mobile';
import "../scss/DiagnosisForm.scss";
import * as data from './DiagnosisFields.json';

const CheckboxItem = Checkbox.CheckboxItem;

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

var diagnosisFields = data.diagnoses;

export default function Form(): ReactElement {

    return (
        <div>

            <List renderHeader={() => 'Patient Diagnosis'}>
                {diagnosisFields.map((field) => (
                    ((field.name == null) ? <></> :
                        <CheckboxItem
                            id={`${field.name.toLowerCase()}-button`}
                            key={field.name}
                            name="sex"
                        >
                            {field.name}
                        </CheckboxItem>
                    )

                    // ((field["text-input-title"] == null) ? null : 
                    //     <List renderHeader={() => field["text-input-title"]}>
                    //         <TextareaItem autoHeight id= {field["text-input-title"].toLowerCase()} />
                    //     </List>
                    // )

                ))}
            </List>
        </div>
    )
}

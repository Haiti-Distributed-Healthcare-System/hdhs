import React, { ReactElement, useState } from "react";
import { List, Checkbox, Flex } from 'antd-mobile';
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

            <List renderHeader={() => 'CheckboxItem demo'}>
                {diagnosisFields.map((i) => (
                    // TOOD: how do I add conditionals here?
                    // i.e. `if (i.name != null){}`
                    ((i.name == null) ? <></> : 
                        <CheckboxItem
                        id={`${i.name.toLowerCase()}-button`}
                        key={i.name}
                        name="sex"
                        >
                        {i.name}
                        </CheckboxItem>
                    )
                  ))}
            </List>
        </div>
    )
}

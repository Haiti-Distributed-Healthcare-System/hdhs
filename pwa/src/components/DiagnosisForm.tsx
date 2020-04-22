import React, { ReactElement, useState } from "react";
import { List, Checkbox, Flex } from 'antd-mobile';
import "../scss/DiagnosisForm.scss";
import * as data from './DiagnosisFields.json';

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

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
// var diagnosisFields = require('./DiagnosisFields.json');
// import * as data from './DiagnosisFields.json';

var diagnosisFields = data.diagnoses;

var fieldComponents = [];

function createFields() {
    diagnosisFields.forEach((diagnosisField) => {
        // Create the corresponding element and push it to the array of fields
    });
}

export default function Form(): ReactElement {

    return (
        <div>

            <List renderHeader={() => 'CheckboxItem demo'}>
                {diagnosisFields.map((i) => (
                    // TOOD: how do I add conditionals here?
                    <CheckboxItem
                      id={`${i.name.toLowerCase()}-button`}
                      key={i.name}
                      name="sex"
                    >
                      {i.name}
                    </CheckboxItem>
                  ))}
            </List>
        </div>
    )
}

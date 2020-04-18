import React, { ReactElement, useState } from 'react'
import { List, Checkbox, TextareaItem, Button, Radio, WhiteSpace } from 'antd-mobile'
// import '../scss/Login.scss'

const CheckboxItem = Checkbox.CheckboxItem;

let DiagnosisData = [
  "Asthma",
  "Anemia",
  "Allergies",
  "Depression",
  "Diabetes",
  "Pterygium", "Cataract", "Dry Eye", "Conjunctivitis",
  "Fever",
  "Filariasis",
  "Gastritis", "GERD",
  "Gastroenteritis", "Dysentery", "Possible Cholera",
  "Headache",
  "Hernia",
  "Hypertension", "Stroke", "Angina", "CHF",
  "Healthy",
  "Musculoskeletal Pain",
  "Otitis", "Pneumonia", "Sinusitis",
  "URI",
  "Pregnancy",
  "Atopic Derm",
  "Impetigo",
  "Possible STD",
  "Possible TB",
  "Possible Parasites",
  "UTI",
  "Vaginitis",
  "Needs to see Dentist",
  "Needs to see Eye Doctor",
  "Surgical Candidate"

]

const data = [
  { value: 0, label: 'Ph.D.' },
  { value: 1, label: 'Bachelor' },
  { value: 2, label: 'College diploma' },
];

const onChange = (val :number) => {
  console.log(val);
}

export default function Form(): ReactElement {
  return (
    <div id='diagnosis-wrapper'>
      <List renderHeader={() => 'CheckboxItem demo'}>
        {data.map(i => (
          <CheckboxItem key={i.value} onChange={() => onChange(i.value)}>
            {i.label}
            <TextareaItem title="Enter Text">

            </TextareaItem>
          </CheckboxItem>
        ))}
      </List>
    </div>
  )
}
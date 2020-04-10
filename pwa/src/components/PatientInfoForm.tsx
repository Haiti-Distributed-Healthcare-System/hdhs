import React, { ReactElement, useState } from 'react'
import { DatePicker, InputItem, List, TextareaItem, Button, Radio } from 'antd-mobile'
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import '../scss/Login.scss'

const RadioItem = Radio.RadioItem;


export default function Form(): ReactElement {
  // State Hooks for Radio Buttons
  // useState returns a value, and a function to set that value
  const [sex, setSex] = useState()                      // Default: null
  const [albendazole, setAlbendazole] = useState(0)     // Default: No
  const [visit, setVisit] = useState(0)                 // Default: No
  const [pregnant, setPregnant] = useState(0)           // Default: No
  const [planning, setPlanning] = useState(0)           // Default: No

    // Data for Radio Buttons
    const sexValues = [
      { value: 0, label: 'Male' },
      { value: 1, label: 'Female' }
    ]
  
    const radioYesNo = [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ];

  const onSubmit = () => {
    // This shows how to access the values of the form
    const firstNameField: HTMLInputElement = document.getElementById('firstname') as HTMLInputElement
    const lastNameField: HTMLInputElement = document.getElementById('lastname') as HTMLInputElement
    const nicknameField: HTMLInputElement = document.getElementById('nickname') as HTMLInputElement
    const complaintField1: HTMLInputElement = document.getElementById('complaint1') as HTMLInputElement
    const complaintField2: HTMLInputElement = document.getElementById('complaint2') as HTMLInputElement
    const complaintField3: HTMLInputElement = document.getElementById('complaint3') as HTMLInputElement

    console.log("First name:", firstNameField.value)
    console.log("Last name:", lastNameField.value)
    console.log("Nickname:", nicknameField.value)
    console.log("Complaints: ", complaintField1.value + " " + complaintField2.value + " " + complaintField3.value)
    console.log("Wants Planning?: " + planning)
  }

  return (
    <div id='patient-info-wrapper'>
      <TextareaItem
        title="First Name"
        placeholder="First Name"
        autoHeight
        id="firstname"
      />

      <TextareaItem
        title="Last Name"
        placeholder="Last Name"
        id="lastname"
        autoHeight
      />

      <TextareaItem
        title="Nickname"
        placeholder="Nickname"
        id="nickname"
        autoHeight
      />

      <List renderHeader={() => 'Sex'}>
        {sexValues.map(i => (
          <RadioItem key={i.value} checked={sex === i.value} onChange={() => setSex(i.value)}>
            {i.label}
          </RadioItem>
        ))}
      </List>

      <DatePicker
        mode="date"
        locale={enUs}
        title="Birth Date"
        extra="Birth Date"
        data-seed="birthDate"
      >
        <List.Item arrow="horizontal">Birth Date</List.Item>
        {/* TODO: figure out how to access this value */}
      </DatePicker>

      <InputItem
        type="number"
        id='age'
      >Age </InputItem>

      <InputItem
        type="number"
        clear
        id='phone'
      >Phone</InputItem>

      <TextareaItem
        title="Town"
        placeholder="town"
        id="town"
        autoHeight
      />

      <List renderHeader={() => 'Visit?'}>
        {radioYesNo.map(i => (
          <RadioItem key={i.value} checked={visit === i.value} onChange={() => setVisit(i.value)}>
            {i.label}
          </RadioItem>
        ))}
      </List>

      {/* Only display the female-only div if the patient is female */}
      {sex ?
        <div id='female-only'>
          <List renderHeader={() => 'Pregnant?'}>
            {radioYesNo.map(i => (
              <RadioItem key={i.value} checked={pregnant === i.value} onChange={() => setPregnant(i.value)}>
                {i.label}
              </RadioItem>
            ))}
          </List>

          <InputItem
            title="G"
            type="number"
            id='gravida'
          />
          <InputItem
            title="P"
            type="number"
            id='para'
          />
          <InputItem
            title="A"
            type="number"
            id='abortus'
          />
          <TextareaItem
            title="LMP"
            id='lmp'
          />
          <List renderHeader={() => 'Wants Planning?'}>
            {radioYesNo.map(i => (
              <RadioItem key={i.value} checked={planning === i.value} onChange={() => setPlanning(i.value)}>
                {i.label}
              </RadioItem>
            ))}
          </List>
        </div>
        : null
      }

      <InputItem
        type="number"
        id='weight'
      >Weight (kg)</InputItem>

      <InputItem
        type="number"
        id='height'
      >Height (cm)</InputItem>

      <InputItem
        type="number"
        id='bp'
      >BP</InputItem>

      <InputItem
        type="number"
        id='temp'
      >Temp (F)</InputItem>

      <InputItem
        type="number"
        id='pulse'
      >Pulse</InputItem>

      <InputItem
        type="number"
        id='z-score'
      >Z-Score</InputItem>

      <List renderHeader={() => 'Albendazole?'}>
        {radioYesNo.map(i => (
          <RadioItem key={i.value} checked={albendazole === i.value} onChange={() => setAlbendazole(i.value)}>
            {i.label}
          </RadioItem>
        ))}
      </List>

      <List renderHeader={() => 'Alergies'}>
        <TextareaItem
          autoHeight
          id='alergies'
        />
      </List>
      {/* TODO: this would be nice as a dynamic entry */}

      <List renderHeader={() => 'Medicines'}>
        <TextareaItem
          autoHeight
          id='medicines'
        />
      </List>

      <List renderHeader={() => 'Chief Complaint'}>
        <TextareaItem
          placeholder="1."
          // autoHeight
          rows={2}
          id='complaint1'
        />
        <TextareaItem
          placeholder="2."
          rows={2}
          id='complaint2'
        />
        <TextareaItem
          placeholder="3."
          rows={2}
          id='complaint3'
        />
      </List>

      <List renderHeader={() => 'History'}>
        <TextareaItem
          autoHeight
          id='history'
        />
      </List>

      <List renderHeader={() => 'Exam'}>
        <TextareaItem
          autoHeight
          id='exam'
        />
      </List>

      <Button onClick={onSubmit} >Submit</Button>

    </div>
  )
}

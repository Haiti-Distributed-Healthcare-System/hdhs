import React, { ReactElement, useState } from 'react'
import {DatePicker, InputItem, List, TextareaItem, Button, Radio} from 'antd-mobile'
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import '../scss/Login.scss'
const RadioItem = Radio.RadioItem;


export default function Form(): ReactElement {
    // useState returns a value, and a function to set that value
    const [displayFemaleOptions, setDisplayFemaleOptions] = useState(0)
    const [sex, setSex] = useState() // Default: null
    const [albendazole, setAlbendazole] = useState(0) // Default: No
    const [visit, setVisit] = useState(0) // Default: No
    const [pregnant, setPregnant] = useState(0) // Default: No
    const [planning, setPlanning] = useState(0) // Default: No


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

    // Data for Radio Buttons
    const sexValues = [
        {value: 0, label: 'Male'},
        {value: 1, label: 'Female'}
    ]

    const radioYesNo = [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
    ];

    // const onChangePlanning = (value :number) => { //todo change type here
    //     setPlanning(value)
    // };

    // const changeSex = (value :number) => {
    //   setSex(value)
    //   if (value) {
    //     // Male = 0 - do not display female-only div
    //     setDisplayFemaleOptions(0)
    //   } else {
    //     setDisplayFemaleOptions

    //   }
    // }

    return (
      <div id='patient-info-wrapper'>
        <TextareaItem
        title="First Name"
        placeholder="First Name"
        data-seed="firstName"
        autoHeight
        id="firstname"
        />

        <TextareaItem
        title="Last Name"
        placeholder="Last Name"
        data-seed="lastName"
        id="lastname"
        // whats the difference between id and data seed?
        autoHeight
        />

        <TextareaItem
        title="Nickname"
        placeholder="optional"
        data-seed="nickname"
        id="nickname"
        autoHeight
        />

        <List renderHeader={() => 'Sex'}>
            {sexValues.map(i => (
                <RadioItem key={i.value} checked={sex  === i.value} onChange={() => setSex(i.value)}>
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
            type="money"
            moneyKeyboardAlign="left"
            clear
            id = 'age'
        >Age </InputItem>

        <InputItem
            type="money"
            moneyKeyboardAlign="left"
            clear
            id = 'phone'
        >Phone</InputItem>

        <List renderHeader={() => 'Visit?'}>
            {radioYesNo.map(i => (
                <RadioItem key={i.value} checked={visit  === i.value} onChange={() => setVisit(i.value)}>
                    {i.label}
                </RadioItem>
            ))}
        </List>

        {/* Only display the following div if the patient is female */}
        {sex ?
          <div id='female-only'>
              <List renderHeader={() => 'Pregnant?'}>
                  {radioYesNo.map(i => (
                      <RadioItem key={i.value} checked={pregnant  === i.value} onChange={() => setPregnant(i.value)}>
                          {i.label}
                      </RadioItem>
                  ))}
              </List>

              <TextareaItem
                  title="G"
                  id = 'gravida'
              />
              <TextareaItem
                  title="P"
                  id = 'para'
              />
              <TextareaItem
                  title="A"
                  id = 'abortus'
              />
              <TextareaItem
                  title="LMP"
                  id = 'lmp'
              />
              <List renderHeader={() => 'Wants Planning?'}>
                  {radioYesNo.map(i => (
                      <RadioItem key={i.value} checked={planning  === i.value} onChange={() => setPlanning(i.value)}>
                          {i.label}
                      </RadioItem>
                  ))}
              </List>
          </div>
          : null
        }

        {/* TODO these don't technically need to be in their own <List/> */}

        <List>
            <InputItem
            type="money"
            moneyKeyboardAlign="left"
            clear
            id = 'weight'
            >Weight (kg)</InputItem>

            <InputItem
            type="money"
            moneyKeyboardAlign="left"
            clear
            id = 'height'
            >Height (cm)</InputItem>

            <InputItem
            type="money"
            moneyKeyboardAlign="left"
            clear
            id = 'temp'
            >Temp (F)</InputItem>

            <InputItem
            type="money"
            moneyKeyboardAlign="left"
            clear
            id = 'pulse'
            >Pulse</InputItem>
            {/* TODO: figure out how to access these values from the money keyboard */}
        </List>

        <List renderHeader={() => 'Albendazole?'}>
            {radioYesNo.map(i => (
                <RadioItem key={i.value} checked={albendazole  === i.value} onChange={() => setAlbendazole(i.value)}>
                    {i.label}
                </RadioItem>
            ))}
        </List>

        <List renderHeader={() => 'Chief Complaint'}>
            <TextareaItem
                placeholder="1."
                // autoHeight
                rows={2}
                id = 'complaint1'
            />
            <TextareaItem
                placeholder="2."
                rows={2}
                id = 'complaint2'
            />
            <TextareaItem
                placeholder="3."
                rows={2}
                id = 'complaint3'
            />
        </List>
            <Button onClick={onSubmit} >Submit</Button>

    </div>
    )
}

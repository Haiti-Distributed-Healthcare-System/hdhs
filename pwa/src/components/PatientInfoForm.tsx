import React, { ReactElement } from 'react'
import {DatePicker, InputItem, List, TextareaItem, Button} from 'antd-mobile'
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import '../scss/Login.scss'
import { render } from '@testing-library/react';

// const nowTimeStamp = Date.now();
// const now = new Date(nowTimeStamp);

export default function Form(): ReactElement {
    // // useState returns a value, and a function to set that value
    // const [name, setName] = useState()

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
    }

    return (
      
    <>
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
        {/* these don't technically need to be in their own <List/> */}

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

    </>
    )
}

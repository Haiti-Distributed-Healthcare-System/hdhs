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
      const firstNameField: HTMLInputElement = document.getElementById('firstname') as HTMLInputElement
      const lastNameField: HTMLInputElement = document.getElementById('lastname') as HTMLInputElement
      const nicknameField: HTMLInputElement = document.getElementById('nickname') as HTMLInputElement
      const weightField: HTMLInputElement = document.getElementById('weight') as HTMLInputElement
      console.log("First name:", firstNameField.value)
      console.log("Last name:", lastNameField.value)
      console.log("Nickname:", nicknameField.value)
      console.log("Weight:", weightField.value)
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

        <List>
            <InputItem
              type="money"
              moneyKeyboardAlign="left"
              clear
              id = 'weight'
            >Weight (kg)</InputItem>
            {/* TODO: figure out how to access this value */}
        </List>
        <List renderHeader={() => 'Chief Complaint'}>
          <TextareaItem
            placeholder="1."
            // autoHeight
            rows={2}
          />
          <TextareaItem
            placeholder="2."
            rows={2}
          />
          <TextareaItem
            placeholder="3."
            rows={2}
          />
        </List>
        <Button onClick={onSubmit} >Submit</Button>

    </>
    )
}

import React, { ReactElement, useState } from 'react'
import {DatePicker, InputItem, List, TextareaItem, Button} from 'antd-mobile'
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import '../scss/Login.scss'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export default function Form(): ReactElement {
    // useState returns a value, and a function to set that value
    const [name, setName] = useState()

    const onSubmit = () => {
      const firstNameField: HTMLInputElement = document.getElementById('firstname') as HTMLInputElement
      console.log("First name:", firstNameField.value)
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
          autoHeight
        />

        <TextareaItem
          title="Nickname"
          placeholder="optional"
          data-seed="nickname"
          autoHeight
        />

        <DatePicker
          mode="date"
          locale={enUs}
          title="Birth Date"
          extra="Birth Date"
        >
          <List.Item arrow="horizontal">Birth Date</List.Item>
        </DatePicker>

        <List>
            <InputItem
              type="money"
              defaultValue="100"
              moneyKeyboardAlign="left"
              clear
            />
        </List>
        <Button onClick={onSubmit} >Submit</Button>

    </>
    )
}

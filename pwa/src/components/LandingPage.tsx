import React, { ReactElement } from 'react'
import {WhiteSpace, Button, Icon} from 'antd-mobile'

import '../scss/Login.scss'

export default function Login(): ReactElement {
  const patientLookup = () => {
    console.log("Clicked Patient Lookup")
  }

  const newPatient = () => {
    console.log("Clicked New Patient")
  }
  return (
    <>
      <Button onClick={patientLookup} icon="search">Patient Lookup</Button><WhiteSpace />
      <Button onClick={newPatient} icon="plus">New Patient</Button><WhiteSpace />
    </>
  )
}

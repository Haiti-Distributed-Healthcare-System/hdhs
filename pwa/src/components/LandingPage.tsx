import React, { ReactElement } from 'react'
import {WhiteSpace, Button} from 'antd-mobile'

import '../scss/LandingPage.scss'

export default function Login(): ReactElement {
  const patientLookup = () => {
    console.log("Clicked Patient Lookup")
  }

  const newPatient = () => {
    console.log("Clicked New Patient")
  }
  return (
    <>
      <div id="buttonFlex">
        <Button onClick={patientLookup} icon="search">Patient Lookup</Button>
        <WhiteSpace />
      </div>
      <br/>
      <div id="buttonFlex">
        <Button onClick={newPatient} icon="plus">New Patient</Button>
        <WhiteSpace />
      </div>
    </>
  )
}

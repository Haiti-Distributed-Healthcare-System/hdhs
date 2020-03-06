import React, { ReactElement } from 'react'
import {InputItem, Card, Button} from 'antd-mobile'
import '../scss/Login.scss'

export default function Login(): ReactElement {
  return (
    <>
      <div id="loginWrapper">
        <div id="loginGrid">
            <div id="iconCard">
              <div id="imgWrap">
                <img src="/logoIcon512.jpg"></img>
              </div>
            </div>
            <InputItem placeholder="username"/>
            <InputItem placeholder="password"/>
            <div id="buttonFlex">
              <Button>Login</Button>
            </div>
        </div>
      </div>
    </>
  )
}

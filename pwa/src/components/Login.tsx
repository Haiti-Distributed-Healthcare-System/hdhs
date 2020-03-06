import React, { ReactElement } from 'react'
import {InputItem, Button} from 'antd-mobile'
import '../scss/Login.scss'

export default function Login(): ReactElement {
  return (
    <>
      <div id="loginWrapper">
        <div id="loginGrid">
            <div id="iconCard">
              <div id="imgWrap">
                <img src="/logoIcon512.jpg" alt="CHI Logo"></img>
              </div>
            </div>
            <InputItem placeholder="username"/>
            <InputItem placeholder="password" type="password"/>
            <div id="buttonFlex">
              <Button>Login</Button>
            </div>
        </div>
      </div>
    </>
  )
}

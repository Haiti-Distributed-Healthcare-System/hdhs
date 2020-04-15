import React, { ReactElement } from 'react'
import useApi from '../hooks/useApi'
import { InputItem, Button } from 'antd-mobile'
import '../scss/Login.scss'

export default function Login(): ReactElement {
    const { response, error, isLoading } = useApi('')

    return (
        <>
            <div id="loginWrapper">
                <div id="loginGrid">
                    <div id="iconCard">
                        <div id="imgWrap">
                            <img src="/logoIcon512.jpg" alt="CHI Logo"></img>
                        </div>
                    </div>
                    <InputItem placeholder="username" />
                    <InputItem placeholder="password" type="password" />
                    <div id="buttonFlex">
                        <Button>Login</Button>
                    </div>
                </div>
            </div>
            <p>Loading API Fetch: {isLoading.toString()}</p>
            {response && <p>API Fetch Result: {JSON.stringify(response)}</p>}
        </>
    )
}

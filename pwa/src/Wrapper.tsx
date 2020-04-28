import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { useHistory } from 'react-router-dom'

import './scss/Wrapper.scss'

type WrapperProps = {
    navTitle?: string
    leftArrowText?: string
    leftArrowRoute?: string
    children: React.ReactNode
}

const Wrapper: React.FunctionComponent<WrapperProps> = (
    props: WrapperProps,
) => {
    const { navTitle, leftArrowText, leftArrowRoute } = props
    const hist = useHistory()
    const needNavBar = navTitle || leftArrowText || leftArrowRoute
    const leftContentArr = leftArrowText
        ? [<Icon key={1} type="left" />, `${leftArrowText}`]
        : []
    const leftRoute = leftArrowRoute ? `${leftArrowRoute}` : '/'

    return (
        <div id="primary-wrapper">
            <div id="wrapper-contents">
                {needNavBar && (
                    <NavBar
                        id="nav-bar"
                        mode="light"
                        onLeftClick={(): void => hist.push(leftRoute)}
                        leftContent={leftContentArr}
                    >
                        {`${navTitle}`}
                    </NavBar>
                )}
                {props.children}
            </div>
        </div>
    )
}

export default Wrapper

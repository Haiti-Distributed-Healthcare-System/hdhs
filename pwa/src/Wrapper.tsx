import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { useHistory } from 'react-router-dom'

import './scss/Wrapper.scss'

type WrapperProps = {
    navTitle?: string
    leftArrowText?: string
    leftArrowRoute?: string
    rightArrowText?: string
    rightArrowRoute?: string
    children: React.ReactNode
}

const Wrapper: React.FunctionComponent<WrapperProps> = (
    props: WrapperProps,
) => {
    const hist = useHistory()
    const {
        navTitle,
        leftArrowText,
        leftArrowRoute,
        rightArrowText,
        rightArrowRoute,
    } = props
    const needNavBar =
        navTitle ||
        leftArrowText ||
        leftArrowRoute ||
        rightArrowText ||
        rightArrowRoute
    const leftRoute = leftArrowRoute ? `${leftArrowRoute}` : '/'
    const rightRoute = rightArrowRoute ? `${rightArrowRoute}` : '/'
    const leftContentArr = leftArrowText
        ? [<Icon key={1} type="left" />, `${leftArrowText}`]
        : []
    const rightContentArr = rightArrowText
        ? [
              <div
                  onClick={(): void => hist.push(rightRoute)}
                  key={2}
                  style={{ display: 'flex' }}
              >
                  <div style={{ paddingTop: '.1em' }}>{rightArrowText}</div>
                  <Icon type="right" />
              </div>,
          ]
        : []

    return (
        <div id="primary-wrapper">
            <div id="wrapper-contents">
                {needNavBar && (
                    <div
                        style={{
                            position: 'fixed',
                            zIndex: 100000,
                            top: 0,
                            marginBottom: '4em',
                            width: '55em',
                        }}
                    >
                        <NavBar
                            id="nav-bar"
                            mode="light"
                            onLeftClick={(): void => hist.push(leftRoute)}
                            leftContent={leftContentArr}
                            rightContent={rightContentArr}
                        >
                            {`${navTitle}`}
                        </NavBar>
                    </div>
                )}
                <div style={{ marginTop: '3em' }}>{props.children}</div>
            </div>
        </div>
    )
}

export default Wrapper

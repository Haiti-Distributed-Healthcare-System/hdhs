import React, { ReactElement } from 'react'
import { WhiteSpace, Button } from 'antd-mobile'
import { UserAddOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

import '../scss/LandingPage.scss'

export default function LandingPage(): ReactElement {
    let history = useHistory()

    // TODO: these onClick functions could be mocked in a unit test
    /* istanbul ignore next */
    const newPatient = () => {
        console.log('Clicked New Patient')
    }
    return (
        <div id="landing-wrapper">
            <div className="button-flex">
                <Button onClick={() => history.push('/search')} icon="search">
                    Patient Lookup
                </Button>
                <WhiteSpace />
            </div>
            <br />
            <div className="button-flex">
                <Button icon={<UserAddOutlined />} onClick={newPatient}>
                    New Patient
                </Button>
                <WhiteSpace />
            </div>
        </div>
    )
}

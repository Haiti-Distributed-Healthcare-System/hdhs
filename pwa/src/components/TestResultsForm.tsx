import React, { ReactElement, useState } from 'react'
import { Checkbox, List } from 'antd-mobile'
import '../scss/DiagnosisForm.scss'

const CheckboxItem = Checkbox.CheckboxItem

export default function TestResultsForm(): ReactElement {
    // State Hooks used for result div visibility
    const [pregnancyTest, setPregnancyTest] = useState(0) // Default: null
    const [bloodSugarTest, setBloodSugarTest] = useState(0) // Default: null
    const [ua, setUA] = useState(0) // Default: null

    return (
        <>
            <CheckboxItem
                id="pregnancy_test"
                data-testid="pregnancy_test"
                onChange={() => setPregnancyTest(pregnancyTest ? 0 : 1)}
            >
                HCG (Pregnancy) Test Performed
            </CheckboxItem>
            {pregnancyTest ? (
                <div id="pregnancy_results">
                    <List renderHeader={() => 'HCG (Pregnancy) Results'}></List>
                </div>
            ) : null}

            <CheckboxItem
                checked={bloodSugarTest}
                id="blood_sugar_test"
                data-testid="blood_sugar_test"
                onChange={() => setBloodSugarTest(bloodSugarTest ? 0 : 1)}
            >
                Blood Sugar Test Performed
            </CheckboxItem>
            {bloodSugarTest ? (
                <div id="blood_sugar_results">
                    <List renderHeader={() => 'Blood Sugar Results'}></List>
                </div>
            ) : null}

            <CheckboxItem
                id="ua_test"
                data-testid="ua_test"
                onChange={() => setUA(ua ? 0 : 1)}
            >
                UA (Urine Analysis) Test Performed
            </CheckboxItem>
            {ua ? (
                <div id="ua_results">
                    <List renderHeader={() => 'UA Results'}></List>
                </div>
            ) : null}
        </>
    )
}

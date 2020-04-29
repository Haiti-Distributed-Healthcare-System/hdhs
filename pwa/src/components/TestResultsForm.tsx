import React, { ReactElement, useState } from 'react'
import { Checkbox, List, Radio, WhiteSpace, InputItem } from 'antd-mobile'
import '../scss/TestResultsForm.scss'

const RadioItem = Radio.RadioItem
const CheckboxItem = Checkbox.CheckboxItem

export default function TestResultsForm(): ReactElement {
    // State Hooks used for result div visibility
    const [pregnancyTest, setPregnancyTest] = useState(0) // Default: 0 (unchecked)
    const [pregnancyTestPositive, setPregnancyTestPositive] = useState(
        null as number,
    ) // Default: null
    const [bloodSugarTest, setBloodSugarTest] = useState(0) // Default: 0 (unchecked)
    const [ua, setUA] = useState(0) // Default: 0 (unchecked)

    // Data for Radio Buttons
    const radioPosNeg = [
        { value: 0, label: 'Negative' },
        { value: 1, label: 'Positive' },
    ]

    return (
        <div id="test-results-form-wrapper">
            <CheckboxItem
                id="pregnancy_test"
                data-testid="pregnancy_test"
                onChange={() => setPregnancyTest(pregnancyTest ? 0 : 1)}
            >
                HCG (Pregnancy) Test Performed
            </CheckboxItem>
            {pregnancyTest ? (
                <div id="pregnancy_results">
                    <List renderHeader={() => 'HCG (Pregnancy) Results'}>
                        {radioPosNeg.map((i) => (
                            <RadioItem
                                key={i.value}
                                data-testid={`pregnancy_results-${i.label.toLowerCase}`}
                                name="pregnancy_results_radio"
                                checked={pregnancyTestPositive === i.value}
                                onClick={() =>
                                    setPregnancyTestPositive(i.value)
                                }
                            >
                                {i.label}
                            </RadioItem>
                        ))}
                        <WhiteSpace className="list-whitespace" size="lg" />
                    </List>
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
                    <List renderHeader={() => 'Blood Sugar Results'}>
                        <InputItem
                            type="number"
                            id="blood_sugar_results_val"
                            placeholder="mg/dL" // TOOD: unsure if the unit is mg/dL or mmol/L, could leave this out
                            maxLength={3}
                        ></InputItem>
                    </List>
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
                    <List renderHeader={() => 'UA Results'}>
                        {/* TODO: I am unsure about the range/type of these fields */}
                        <InputItem type="number" id="glucose_results_val">
                            Glucose
                        </InputItem>
                        <InputItem type="number" id="nitrites_results_val">
                            Nitrites
                        </InputItem>
                        <InputItem type="number" id="protein_results_val">
                            Protein
                        </InputItem>
                        <InputItem type="number" id="leukocytes_results_val">
                            Leukocytes
                        </InputItem>
                    </List>
                </div>
            ) : null}
        </div>
    )
}

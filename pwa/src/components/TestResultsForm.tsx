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
    ) // Default: null (none selected)
    const [bloodSugarTest, setBloodSugarTest] = useState(0) // Default: 0 (unchecked)
    const [ua, setUA] = useState(0) // Default: 0 (unchecked)

    // Data for Radio Buttons
    const radioPosNeg = [
        { value: 0, label: 'Negative' },
        { value: 1, label: 'Positive' },
    ]

    return (
        <div
            id="test-results-form-wrapper"
            data-testid="test-results-form-wrapper"
        >
            <List>
                {' '}
                <CheckboxItem
                    id="pregnancy-test"
                    data-testid="pregnancy-test"
                    onChange={() => setPregnancyTest(pregnancyTest ? 0 : 1)}
                    title="HCG (Pregnancy) Test Performed"
                >
                    HCG (Pregnancy) Test Performed
                </CheckboxItem>
                {pregnancyTest ? (
                    <div id="pregnancy-results" data-testid="pregnancy-results">
                        <List renderHeader={() => 'HCG (Pregnancy) Results'}>
                            {radioPosNeg.map((i) => (
                                <RadioItem
                                    key={i.value}
                                    data-testid={
                                        `pregnancy-results-` +
                                        i.label.toLowerCase()
                                    }
                                    name="pregnancy-results-radio"
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
                    id="blood-sugar-test"
                    data-testid="blood-sugar-test"
                    onChange={() => setBloodSugarTest(bloodSugarTest ? 0 : 1)}
                >
                    Blood Sugar Test Performed
                </CheckboxItem>
                {bloodSugarTest ? (
                    <div
                        id="blood-sugar-results"
                        data-testid="blood-sugar-results"
                    >
                        <List renderHeader={() => 'Blood Sugar Results'}>
                            <InputItem
                                type="number"
                                id="blood-sugar-results-val"
                                placeholder="mg/dL" // TOOD: unsure if the unit is mg/dL or mmol/L, could leave this out
                                maxLength={3}
                            ></InputItem>
                            <WhiteSpace className="list-whitespace" size="lg" />
                        </List>
                    </div>
                ) : null}
                <CheckboxItem
                    id="ua-test"
                    data-testid="ua-test"
                    onChange={() => setUA(ua ? 0 : 1)}
                >
                    UA (Urine Analysis) Test Performed
                </CheckboxItem>
                {ua ? (
                    <div id="ua-results" data-testid="ua-results">
                        <List renderHeader={() => 'UA Results'}>
                            {/* TODO: I am unsure about the range/type of these fields */}
                            <InputItem id="glucose-results-val">
                                Glucose
                            </InputItem>
                            <InputItem id="nitrites-results-val">
                                Nitrites
                            </InputItem>
                            <InputItem id="protein-results-val">
                                Protein
                            </InputItem>
                            <InputItem id="leukocytes-results-val">
                                Leukocytes
                            </InputItem>
                        </List>
                    </div>
                ) : null}
            </List>
        </div>
    )
}

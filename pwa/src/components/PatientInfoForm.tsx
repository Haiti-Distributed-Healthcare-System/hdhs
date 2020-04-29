import React, { ReactElement, useState } from 'react'
import { useStoreActions } from '../state/storeIndex'
import { SEX } from '../state/enums'
import {
    InputItem,
    List,
    TextareaItem,
    Button,
    Radio,
    WhiteSpace,
} from 'antd-mobile'
import '../scss/PatientInfoForm.scss'

const RadioItem = Radio.RadioItem

export default function Form(): ReactElement {
    // State Hooks for Radio Buttons
    // useState returns a value, and a function to set that value
    const [sex, setSex] = useState(null as number) // Default: null
    const [albendazole, setAlbendazole] = useState(0) // Default: No
    const [firstVisit, setFirstVisit] = useState(0) // Default: No
    const [pregnant, setPregnant] = useState(0) // Default: No
    const [planning, setPlanning] = useState(0) // Default: No
    const [bloodPressureValue, setBloodPressureValue] = useState('')
    const updateCentralState = useStoreActions(
        (actions) => actions.patientInfoFormModel.updateFields,
    )

    // Data for Radio Buttons
    const sexValues = [
        { value: 0, label: 'Male' },
        { value: 1, label: 'Female' },
    ]

    const radioYesNo = [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
    ]

    /* istanbul ignore next */
    const onSubmit = () => {
        const firstNameField: HTMLInputElement = document.getElementById(
            'firstname',
        ) as HTMLInputElement
        const lastNameField: HTMLInputElement = document.getElementById(
            'lastname',
        ) as HTMLInputElement
        const nicknameField: HTMLInputElement = document.getElementById(
            'nickname',
        ) as HTMLInputElement
        const birthdateField: HTMLInputElement = document.getElementById(
            'birthdate',
        ) as HTMLInputElement
        const age: HTMLInputElement = document.getElementById(
            'age',
        ) as HTMLInputElement
        const phone: HTMLInputElement = document.getElementById(
            'phone',
        ) as HTMLInputElement
        const town: HTMLInputElement = document.getElementById(
            'town',
        ) as HTMLInputElement
        const gravida: HTMLInputElement = document.getElementById(
            'gravida',
        ) as HTMLInputElement
        const para: HTMLInputElement = document.getElementById(
            'para',
        ) as HTMLInputElement
        const abortus: HTMLInputElement = document.getElementById(
            'abortus',
        ) as HTMLInputElement
        const lmp: HTMLInputElement = document.getElementById(
            'lmp',
        ) as HTMLInputElement
        const weight: HTMLInputElement = document.getElementById(
            'weight',
        ) as HTMLInputElement
        const height: HTMLInputElement = document.getElementById(
            'height',
        ) as HTMLInputElement
        const temp: HTMLInputElement = document.getElementById(
            'temp',
        ) as HTMLInputElement
        const pulse: HTMLInputElement = document.getElementById(
            'pulse',
        ) as HTMLInputElement
        const zScore: HTMLInputElement = document.getElementById(
            'z-score',
        ) as HTMLInputElement
        const allergies: HTMLInputElement = document.getElementById(
            'allergies',
        ) as HTMLInputElement
        const medicines: HTMLInputElement = document.getElementById(
            'medicines',
        ) as HTMLInputElement
        const complaintField1: HTMLInputElement = document.getElementById(
            'complaint1',
        ) as HTMLInputElement
        const complaintField2: HTMLInputElement = document.getElementById(
            'complaint2',
        ) as HTMLInputElement
        const complaintField3: HTMLInputElement = document.getElementById(
            'complaint3',
        ) as HTMLInputElement
        const history: HTMLInputElement = document.getElementById(
            'history',
        ) as HTMLInputElement
        const exam: HTMLInputElement = document.getElementById(
            'exam',
        ) as HTMLInputElement
        updateCentralState({
            firstName: firstNameField.value,
            lastName: lastNameField.value,
            nickname: nicknameField.value,
            sex: sex ? SEX.female : SEX.male,
            birthDate: new Date(birthdateField.value),
            age: parseInt(age.value),
            phone: phone.value,
            town: town.value,
            firstVisit: firstVisit,
            pregnant: pregnant,
            G: sex ? parseInt(gravida.value) : null,
            P: sex ? parseInt(para.value) : null,
            A: sex ? parseInt(abortus.value) : null,
            LMP: sex ? new Date(lmp.value) : null,
            wantsPlanning: planning,
            weight: parseFloat(weight.value),
            height: parseFloat(height.value),
            bloodPressure: bloodPressureValue,
            temperature: parseFloat(temp.value),
            pulse: parseFloat(pulse.value),
            zScore: parseFloat(zScore.value),
            albendazole: albendazole,
            allergies: allergies.value,
            medicines: medicines.value,
            chiefComplaint: [
                complaintField1.value,
                complaintField2.value,
                complaintField3.value,
            ],
            history: history.value,
            exam: exam.value,
        })
    }

    const validateAndSetBloodPressure = (value: string) => {
        const newChar = value.slice(-1)
        if (newChar.match(/[0-9]|\/|^$/) && value.length < 8) {
            setBloodPressureValue(value)
        }
    }

    return (
        <div id="patient-info-wrapper">
            <TextareaItem
                title="First Name"
                placeholder="First Name"
                autoHeight
                id="firstname"
            />

            <TextareaItem
                title="Last Name"
                placeholder="Last Name"
                id="lastname"
                autoHeight
            />

            <TextareaItem
                title="Nickname"
                placeholder="Nickname"
                id="nickname"
                autoHeight
            />

            <List renderHeader={() => 'Sex'}>
                {sexValues.map((i) => (
                    <RadioItem
                        data-testid={`${i.label.toLowerCase()}-button`}
                        id={`${i.label.toLowerCase()}-button`}
                        key={i.value}
                        name="sex"
                        checked={sex === i.value}
                        onClick={() => setSex(i.value)}
                    >
                        {i.label}
                    </RadioItem>
                ))}
            </List>

            <WhiteSpace />

            <InputItem placeholder="YYYY-MM-DD" id="birthdate" maxLength={10}>
                Birth Date
            </InputItem>

            <InputItem type="number" placeholder="Age" id="age" maxLength={3}>
                Age{' '}
            </InputItem>

            <InputItem type="number" placeholder="Phone" id="phone">
                Phone
            </InputItem>

            <TextareaItem
                title="Town"
                placeholder="Town"
                id="town"
                autoHeight
            />

            <List renderHeader={() => 'First Visit?'}>
                {radioYesNo.map((i) => (
                    <RadioItem
                        key={i.value}
                        data-testid={`first-visit-${i.label}`}
                        name="visit"
                        checked={firstVisit === i.value}
                        onClick={() => setFirstVisit(i.value)}
                    >
                        {i.label}
                    </RadioItem>
                ))}
            </List>

            {/* Only display the 'female-only' div if the patient is female */}
            {sex ? (
                <div id="female-only">
                    <WhiteSpace />
                    <List renderHeader={() => 'Pregnant?'}>
                        {radioYesNo.map((i) => (
                            <RadioItem
                                data-testid={`pregnant-${i.label}`}
                                key={i.value}
                                name="pregnant"
                                checked={pregnant === i.value}
                                onClick={() => setPregnant(i.value)}
                            >
                                {i.label}
                            </RadioItem>
                        ))}
                    </List>

                    <InputItem
                        title="G"
                        type="number"
                        id="gravida"
                        placeholder="0"
                    >
                        G
                    </InputItem>

                    <InputItem
                        title="P"
                        type="number"
                        id="para"
                        placeholder="0"
                    >
                        P
                    </InputItem>

                    <InputItem
                        title="A"
                        type="number"
                        id="abortus"
                        placeholder="0"
                    >
                        A
                    </InputItem>

                    <InputItem placeholder="YYYY-MM-DD" id="lmp" maxLength={10}>
                        LMP
                    </InputItem>

                    <List renderHeader={() => 'Wants Planning?'}>
                        {radioYesNo.map((i) => (
                            <RadioItem
                                data-testid={`planning-${i.label}`}
                                key={i.value}
                                name="planning"
                                checked={planning === i.value}
                                onClick={() => setPlanning(i.value)}
                            >
                                {i.label}
                            </RadioItem>
                        ))}
                    </List>
                </div>
            ) : null}

            <WhiteSpace />

            <InputItem
                type="number"
                placeholder="Weight"
                id="weight"
                maxLength={3}
            >
                Weight (kg)
            </InputItem>

            <InputItem
                type="number"
                placeholder="Height"
                id="height"
                maxLength={3}
            >
                Height (cm)
            </InputItem>

            <InputItem
                placeholder="Blood Pressure"
                id="bp"
                value={bloodPressureValue}
                onChange={validateAndSetBloodPressure}
            >
                BP
            </InputItem>

            <InputItem type="number" placeholder="Temp" id="temp" maxLength={3}>
                Temp (F)
            </InputItem>

            <InputItem
                type="number"
                placeholder="Pulse"
                id="pulse"
                maxLength={3}
            >
                Pulse
            </InputItem>

            <InputItem type="number" placeholder="Z-Score" id="z-score">
                Z-Score
            </InputItem>

            <List renderHeader={() => 'Albendazole?'}>
                {radioYesNo.map((i) => (
                    <RadioItem
                        data-testid={`albendazole-${i.label}`}
                        key={i.value}
                        checked={albendazole === i.value}
                        onClick={() => setAlbendazole(i.value)}
                    >
                        {i.label}
                    </RadioItem>
                ))}
            </List>

            <List renderHeader={() => 'Allergies'}>
                <TextareaItem autoHeight id="allergies" />
            </List>

            <List renderHeader={() => 'Medicines'}>
                <TextareaItem autoHeight id="medicines" />
            </List>

            <List renderHeader={() => 'Chief Complaint'}>
                <TextareaItem
                    placeholder="1."
                    // autoHeight
                    autoHeight
                    id="complaint1"
                />
                <TextareaItem placeholder="2." autoHeight id="complaint2" />
                <TextareaItem placeholder="3." autoHeight id="complaint3" />
            </List>

            <List renderHeader={() => 'History'}>
                <TextareaItem autoHeight id="history" />
            </List>

            <List renderHeader={() => 'Exam'}>
                <TextareaItem autoHeight id="exam" />
            </List>

            <WhiteSpace />

            <div className="submit-button">
                <List>
                    <Button data-testid="submit-button" onClick={onSubmit}>
                        Submit
                    </Button>
                </List>
            </div>
        </div>
    )
}

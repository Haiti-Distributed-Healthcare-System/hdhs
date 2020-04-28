import React, { ReactElement, useState } from 'react'

import { SearchBar, WhiteSpace, List } from 'antd-mobile'

import '../scss/PatientSearch.scss'
import Patient from '../state/models/patient.model'

const patientsSeed: Array<Patient> = [
    { pk_patient_id: 1, first_name: 'Alex', last_name: 'Powers' },
    { pk_patient_id: 2, first_name: 'Meghan', last_name: 'McLaughlin' },
    { pk_patient_id: 3, first_name: 'Ben', last_name: 'Mitchinson' },
    { pk_patient_id: 4, first_name: 'Zain', last_name: 'Khan' },
    { pk_patient_id: 5, first_name: 'Hans', last_name: 'Johnson' },
]

export default function PatientSearch(): ReactElement {
    const [matches, setMatches] = useState([])
    const [patients] = useState(patientsSeed)
    const [searchValue, setSearchValue] = useState('')

    // TODO: replace this logic
    // this could potentially use Fuse.js or fuzzy database queries
    const searchForName = (value: string): void => {
        setSearchValue(value)
        if (value) {
            const listOfMatches = patients.filter((element: Patient) => {
                return `${element.first_name} ${element.last_name}`
                    .toLowerCase()
                    .includes(value.toLowerCase())
            })
            setMatches(listOfMatches)
        } else {
            setMatches([])
        }
    }

    const addNewPatient = (): void => {
        console.log('NO PATIENT FOUND, ADDING A NEW ONE')
    }

    const navigateToPatientPage = (patient: Patient): void => {
        console.log(`Navigating to patient ${JSON.stringify(patient)}`)
    }

    return (
        <div>
            <SearchBar
                data-testid="search-bar"
                placeholder="Patient Name"
                maxLength={30}
                cancelText="Cancel"
                onChange={(value: string): void => searchForName(value)}
            />
            <WhiteSpace />
            {searchValue ? (
                <div>
                    <List data-test-id="match-list">
                        {matches.map((matchElement: Patient, index: number) => (
                            <List.Item
                                data-testid={`matched-patient-${index}`}
                                key={matchElement.pk_patient_id}
                                onClick={(): void =>
                                    navigateToPatientPage(matchElement)
                                }
                            >{`${matchElement.first_name} ${matchElement.last_name}`}</List.Item>
                        ))}
                        {matches.length === 0 && (
                            <List.Item
                                data-testid="no-matched-patient"
                                onClick={(): void => addNewPatient()}
                            >
                                Add New Patient
                            </List.Item>
                        )}
                    </List>
                </div>
            ) : null}
        </div>
    )
}

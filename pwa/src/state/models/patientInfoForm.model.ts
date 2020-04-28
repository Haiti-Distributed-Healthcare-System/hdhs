import { Action, action } from 'easy-peasy'
import { SEX, YN } from '../enums'

interface PatientInfoFormFields {
    firstName?: string
    lastName?: string
    nickname?: string
    sex?: SEX
    birthDate?: Date
    age?: number
    phone?: string
    town?: string
    firstVisit?: YN
    pregnant?: YN
    G?: number
    P?: number
    A?: number
    LMP?: Date
    wantsPlanning?: YN
    weight?: number
    height?: number
    bloodPressure?: string
    temperature?: number
    pulse?: number
    zScore?: number
    albendazole?: YN
    allergies?: string
    medicines?: string
    chiefComplaint?: string[]
    history?: string
    exam?: string
}

export interface PatientInfoFormModel {
    fields: PatientInfoFormFields
    updateFields: Action<PatientInfoFormModel, PatientInfoFormFields>
}

/* istanbul ignore next */
// Form submission requests validated in integration test
const patientInfoFormModel: PatientInfoFormModel = {
    fields: {},
    updateFields: action((state, formObject) => {
        state.fields = formObject
    }),
}

export default patientInfoFormModel

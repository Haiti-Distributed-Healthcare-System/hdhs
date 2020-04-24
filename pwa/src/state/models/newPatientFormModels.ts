import { Action, action } from 'easy-peasy'
import { SEX, Y_N } from '../enums'

interface PatientInfoFormFields {
    firstName?: string
    lastName?: string
    nickname?: string
    sex?: SEX
    birthDate?: Date
    age?: number
    phone?: string
    town?: string
    firstVisit?: Y_N
    pregnant?: Y_N
    G?: number
    P?: number
    A?: number
    LMP?: Date
    wantsPlanning?: Y_N
    weight?: number
    height?: number
    bloodPressure?: string
    temperature?: number
    pulse?: number
    zScore?: number
    albendazole?: Y_N
    alergies?: string
    medicines?: string
    chiefComplaint?: string[]
    history?: string
    exam?: string
}

export interface PatientInfoFormModel {
    fields: PatientInfoFormFields
    updateFields: Action<PatientInfoFormModel, PatientInfoFormFields>
}

const patientInfoFormModel: PatientInfoFormModel = {
    fields: {},
    updateFields: action((state, formObject) => {
        console.log('updating with: ', formObject)
        console.log('state pre', state)
        state.fields = formObject
        console.log('state post', state)
    }),
}

export default patientInfoFormModel

import { Action, action } from 'easy-peasy'
import { SEX, YN } from '../enums'

interface PatientInfoFormFields {
    first_name?: string
    last_name?: string
    nickname?: string
    gender?: SEX
    birthdate?: Date
    age?: number
    phone?: string
    town?: string
    first_visit?: YN
    ob_pregnant?: YN
    ob_gravida?: number
    ob_para?: number
    ob_abortus?: number
    ob_last_menstrual_period?: Date
    ob_wants_planning?: YN
    weight_in_lbs?: number
    height_in_inches?: number
    bp_systolic_blood_pressure?: number
    bp_diastolic_blood_pressure?: number
    temp_in_fahrenheit?: number
    pulse_rate?: number
    // TODO: Can't find zScore proper name?
    zScore?: number
    albendazole_given?: YN
    known_med_allergies?: string
    meds_currently_taken?: string
    chief_complaint?: string
    history_of_present_illness?: string
    exam_comments?: string
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

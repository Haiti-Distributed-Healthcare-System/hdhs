import React, { ReactElement } from 'react'
import { useStoreState } from '../state/storeIndex'

export default function DebugShowEasyPeasy(): ReactElement {
    const patientInfoFormData = useStoreState(
        (state) => state.patientInfoFormModel.fields,
    )

    console.log(patientInfoFormData)

    return <div>patientInfoFormData: {JSON.stringify(patientInfoFormData)}</div>
}

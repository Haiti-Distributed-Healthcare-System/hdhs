/* istanbul ignore file */
import { createTypedHooks } from 'easy-peasy'

import patientInfoFormModel from './models/patientInfoForm.model'

export const storeModels = {
    patientInfoFormModel,
}

export const {
    useStore,
    useStoreState,
    useStoreActions,
    useStoreDispatch,
} = createTypedHooks<typeof storeModels>()

export default storeModels

/* istanbul ignore file */

import { createStore, persist } from 'easy-peasy'
import storeIndex from './storeIndex'

const store = createStore(persist(storeIndex))

export default store

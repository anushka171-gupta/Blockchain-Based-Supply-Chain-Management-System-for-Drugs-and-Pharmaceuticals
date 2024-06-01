const actions = {
  init: 'INIT',
  addManufacturer: 'ADD_MANUFACTURER',
  addRetailer: 'ADD_RETAILER',
  addWholesaler: 'ADD_WHOLESALER',
  addMedicalStore: 'ADD_MEDICALSTORE',
  addPatient: 'ADD_PATIENT',
}

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,
  role: 'unknown',
  loading: true,
}

const reducer = (state, action) => {
  const { type, data } = action 
  switch(type) {
      case actions.init:
          return { ...state, ...data } 
      case actions.addManufacturer:
          return { state: { ...state, role: 'manufacturer'} } 
      case actions.addRetailer:
          return { state: { ...state, role: 'retailer'} } 
      case actions.addWholesaler:
          return { state: { ...state, role: 'wholesaler'} } 
      case actions.addMedicalStore:
          return { state: { ...state, role: 'medicalstore'} } 
      case actions.addPatient:
          return { state: { ...state, role: 'patient'} } 
      default:
          throw new Error('Undefined reducer action type')
  }
}

export { actions, initialState, reducer }
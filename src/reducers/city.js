import * as actionTypes from '../actions/action-types'

const initialState = {
  isPending: false,
  city: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CITY_BY_NAME_SUCCESS: {
      return {
        ...state,
        isPending: false,
        ...action.payload,
      }
    }
    default:
      return state
  }
}

import * as actionTypes from './action-types'

export const getCityByNameSuccess = payload => ({
  type: actionTypes.GET_CITY_BY_NAME_SUCCESS,
  payload,
})

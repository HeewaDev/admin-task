import {
  ITEM_CREATE_FAIL,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
} from '../constants/itemConstants'

// Get all items from a categroy
export const itemListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { loading: true, items: [] }
    case ITEM_LIST_SUCCESS:
      return {
        loading: false,
        items: action.payload,
      }
    case ITEM_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// CREATE NEW CATEGORY
export const itemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_CREATE_REQUEST:
      return { loading: true }
    case ITEM_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      }
    case ITEM_CREATE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

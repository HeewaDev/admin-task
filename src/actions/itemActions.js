import axios from 'axios'
import {
  ITEM_CREATE_FAIL,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
} from '../constants/itemConstants'

// list all items
export const listItems = (categoryID) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(`/api/item/${categoryID}`, config)

    dispatch({
      type: ITEM_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ITEM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// create new item
export const createItem = ({ name, image, categoryID, price }) => async (
  dispatch
) => {
  try {
    dispatch({ type: ITEM_CREATE_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `/api/item/${categoryID}`,
      { name, image, categoryID, price },
      config
    )

    dispatch({
      type: ITEM_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ITEM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

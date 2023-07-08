import axios from 'axios'
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from '../constants/categoryConstants'

// list all store
export const listCategories = (storeID) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(`/api/category/${storeID}`, config)

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// create new category
export const createCategory = ({ name, image, storeID }) => async (
  dispatch
) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `/api/category/${storeID}`,
      { name, image, storeID },
      config
    )

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

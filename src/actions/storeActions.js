import axios from 'axios'
import {
  STORE_CREATE_FAIL,
  STORE_CREATE_REQUEST,
  STORE_CREATE_SUCCESS,
  STORE_LIST_FAIL,
  STORE_LIST_REQUEST,
  STORE_LIST_SUCCESS,
} from '../constants/storeConstants'

// list all store
export const listStores = () => async (dispatch) => {
  try {
    dispatch({ type: STORE_LIST_REQUEST })
    const { data } = await axios.get('/api/stores')

    dispatch({
      type: STORE_LIST_SUCCESS,
      payload: Array.from(data),
    })
  } catch (error) {
    dispatch({
      type: STORE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
// create new store
export const createStore = ({ name, logo }) => async (dispatch) => {
  try {
    dispatch({ type: STORE_CREATE_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('/api/stores', { name, logo }, config)

    dispatch({
      type: STORE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STORE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

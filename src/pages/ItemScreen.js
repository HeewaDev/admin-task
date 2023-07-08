import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'

import { listItems, createItem } from '../actions/itemActions'

const ItemScreen = ({ match }) => {
  const dispatch = useDispatch()
  const categoryID = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)
  const [message, setMessage] = useState('')

  const fileEl = useRef(null)

  const { loading, items, error } = useSelector((state) => state.itemList)
  const { success } = useSelector((state) => state.itemCreate)

  useEffect(() => {
    dispatch(listItems(categoryID))
  }, [dispatch, match, categoryID, success])

  // file uploader hander
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
    } catch (error) {
      console.error(error)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (!name || !image) {
      setMessage('Please fill all the fields')
    } else {
      dispatch(
        createItem({
          name,
          price,
          image,
          categoryID,
        })
      )

      setName('')
      setImage('')
      setPrice(0)
      fileEl.current.value = ''
    }
  }

  return (
    <div className='main-content'>
      <div className='col-left'>
        <button
          className='back-button'
          onClick={() => {
            window.history.back()
          }}
        >
          Back
        </button>
        <h1>Items</h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2 style={{ color: 'red' }}>{error}</h2>
        ) : (
          <div className='items'>
            {items.map((item) => (
              <div key={item.id} className='item-card'>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <h2>{item.price} IQD</h2>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='col-right'>
        <form onSubmit={submitHandler}>
          {message && <h4 style={{ color: 'red' }}>{message}</h4>}
          <h2>Create a new item</h2>
          <div className='input-field'>
            <label htmlFor='name'>Item name:</label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter item name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='input-field'>
            <label htmlFor='price'>Price (IQD):</label>
            <input
              type='number'
              name='price'
              id='price'
              placeholder='Enter price'
              value={price}
              min={0}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className='input-field'>
            <label htmlFor='file'>Image</label>
            <input
              type='file'
              name='logo'
              id='file'
              ref={fileEl}
              onChange={uploadFileHandler}
            />
          </div>
          <button className='btn primary' type='submit'>
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default ItemScreen

import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'
import { Link } from 'react-router-dom'
import { listCategories, createCategory } from '../actions/categoryActions'

const CategoryScreen = ({ match }) => {
  const dispatch = useDispatch()
  const storeID = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  const fileEl = useRef(null)

  const { loading, categories, error } = useSelector(
    (state) => state.categoryList
  )
  const { success } = useSelector((state) => state.categoryCreate)

  useEffect(() => {
    dispatch(listCategories(storeID))
  }, [dispatch, match, storeID, success])

  // file uploader hander
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    // setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      // setUploading(false)
    } catch (error) {
      console.error(error)
      // setUploading(false)
    }
  }

  // submit hander
  const submitHandler = (e) => {
    e.preventDefault()
    if (!name || !image) {
      setMessage('Please fill all the fields')
    } else {
      dispatch(
        createCategory({
          name,
          image,
          storeID,
        })
      )

      setName('')
      setImage('')
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
        <h1>Categories</h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2 style={{ color: 'red' }}>{error}</h2>
        ) : (
          <div className='category'>
            {categories.map((category) => (
              <Link
                to={`/item/${category.id}`}
                key={category.id}
                className='category-card'
              >
                <div className='image-container'>
                  <img src={category.image} alt={category.name} />
                  <div className='after'></div>
                </div>
                {/* <img src={category.image} alt={category.name} /> */}

                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={submitHandler}>
        {message && <h4 style={{ color: 'red' }}>{message}</h4>}
        <h2>Create a new category</h2>
        <div className='input-field'>
          <label htmlFor='name'>Category:</label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Enter Category'
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          Create New Category
        </button>
      </form>
    </div>
  )
}

export default CategoryScreen

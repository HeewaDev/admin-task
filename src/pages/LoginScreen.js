import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userAction'

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { loading, error, userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (userInfo) {
      history.push('/store')
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div
      className='main-content'
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        marginTop: '4rem',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div className='col-left'>
        <h1>Lezzoo Admin Panel</h1>
        <p style={{ maxWidth: '400px', lineHeight: '1.5' }}>
          You have to log in as an administrator in order to be able to see and
          edit the content.
        </p>
      </div>
      <div className='col-right'>
        <form onSubmit={submitHandler} style={{ marginTop: '0' }}>
          <h2>Login</h2>
          <div className='input-field'>
            <label htmlFor='email'>email:</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='input-field'>
            <label htmlFor='price'>Password:</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='btn primary' type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginScreen

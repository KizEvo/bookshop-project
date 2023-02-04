import Form from 'react-bootstrap/Form'
import Logo from './Logo'
import FormRow from './FormRow'
import Alert from './Alert'
import { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const LoginForm = () => {
  const [values, setValues] = useState(initialState)
  const navigate = useNavigate()

  const { isLoading, showAlert, displayAlert, registerUser, loginUser, user } =
    useAppContext()

  const navigateForgotPassword = () => {
    navigate('/forgot-password')
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }
    const currentUser = { name, email, password }
    if (isMember) {
      loginUser(currentUser)
    } else {
      registerUser(currentUser)
    }
    setValues({ ...values, name: '', email: '', password: '' })
  }

  const onClickTestAdminButtonHandler = () => {
    const testAdmin = {
      email: 'testAdmin@gmail.com',
      password: 'testAdminSecret123',
    }

    loginUser(testAdmin)
  }

  useEffect(() => {
    let isCanceled = false
    if (user && !isCanceled) {
      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/user')
      }
    }

    return () => {
      isCanceled = true
    }
  }, [user, navigate])

  return (
    <>
      <div className='form form-background m-auto shadow'>
        <Form onSubmit={onSubmit}>
          <Logo />
          {showAlert && <Alert />}
          {/* Email Here */}
          <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
            placeholder='Email'
          />
          {/* Name Here */}
          {!values.isMember && (
            <FormRow
              type='text'
              name='name'
              value={values.name}
              handleChange={handleChange}
              placeholder='Name'
            />
          )}
          {/* Password Here */}
          <FormRow
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
            placeholder='Password'
          />
          <div className='d-flex flex-column my-3 gap-3'>
            <button
              className='btn btn-primary'
              type='submit'
              disabled={isLoading}
            >
              {values.isMember ? 'Login' : 'Sign up '}
            </button>
            <button
              type='button'
              className='btn btn-info'
              onClick={onClickTestAdminButtonHandler}
              disabled={isLoading}
            >
              Test Admin
            </button>
          </div>
        </Form>

        <p>
          {values.isMember ? 'Not a member yet ?' : 'Already a member ?'}
          <button
            className='register-login-change-button'
            disabled={isLoading}
            onClick={toggleMember}
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
        <p>
          Forgot your password ?
          <button
            className='register-login-change-button'
            disabled={isLoading}
            onClick={navigateForgotPassword}
          >
            Reset Password
          </button>
        </p>
      </div>
    </>
  )
}
export default LoginForm

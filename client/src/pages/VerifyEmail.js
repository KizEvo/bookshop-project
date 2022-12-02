import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import img from '../assets/verify-success.svg'
import useQuery from '../utils/query'

const VerifyEmail = () => {
  const [error, setError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(false)
  const navigate = useNavigate()
  const query = useQuery()

  const handleClick = async () => {
    setButtonDisable(true)
    try {
      await axios.post('/api/v1/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      })
      setIsSuccess(true)
      setTimeout(() => {
        navigate('/register')
      }, 3000)
    } catch (error) {
      setError(true)
    }
  }

  if (error) {
    return (
      <>
        <div className='row text-center full-screen align-items-center'>
          <div className='col-xl'>
            <h3>
              Error! Double check your verification email
            </h3>
            <div>
              <NavLink to='/register' className='btn btn-primary mt-3'>
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='row text-center full-screen align-items-center'>
        <div className='col-xl'>
          {isSuccess ? (
            <h1>Email Verification Successfully! Redirecting...</h1>
          ) : (
            <h1>Click the button below to complete email verification</h1>
          )}
          <div>
            <button
              className='btn btn-primary'
              disabled={buttonDisable}
              onClick={handleClick}
            >
              Verify Email
            </button>
          </div>
          <img
            src={img}
            alt='verify-success'
            className='verify-success-image mt-5'
          ></img>
        </div>
      </div>
    </>
  )
}
export default VerifyEmail

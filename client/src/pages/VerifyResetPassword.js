import { useEffect, useState } from 'react'
import { FormRow, Alert } from '../components'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import useQuery from '../utils/query'

const VerifyResetPassword = () => {
  const [values, setValues] = useState({ password: '' })
  const [isFinished, setIsFinished] = useState(false)
  const navigate = useNavigate()
  const { isLoading, displayAlert, showAlert, verifyResetPasswordUser } =
    useAppContext()
  const query = useQuery()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const token = query.get('token')
    const email = query.get('email')
    const { password } = values
    if (!token || !email || !password) {
      displayAlert()
      return
    }
    const newPassword = { token, email, password }
    verifyResetPasswordUser(newPassword)
    setValues({ ...values, password: '' })
    setIsFinished(true)
  }

  useEffect(() => {
    let isCanceled = false
    if(!isCanceled){
    setTimeout(() => {
      if (isFinished) {
        navigate('/register')
      }
    }, 3000)
  }
  return () => isCanceled = true
  }, [isFinished, navigate])

  return (
    <div className='row text-center full-screen align-items-center'>
      <div className='container'>
        <div className='form form-background m-auto'>
          <h3>Enter your new password</h3>
          {showAlert && <Alert />}
          <Form onSubmit={onSubmit}>
            <FormRow
              type='password'
              name='password'
              value={values.password}
              handleChange={handleChange}
              placeholder='Password'
            ></FormRow>
            <button className='btn btn-primary mt-3' disabled={isLoading}>
              Confirm
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default VerifyResetPassword

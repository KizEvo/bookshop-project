import Form from 'react-bootstrap/Form'
import FormRow from '../components/FormRow'
import { useState } from 'react'
import { useAppContext } from '../context/appContext'
import { Alert } from '../components'

const ForgotPassword = () => {
  const [values, setValues] = useState({ email: '' })
  const { forgotPasswordUser, displayAlert, showAlert, isLoading } =
    useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { email } = values
    if (!email) {
      displayAlert()
      return
    }
    const currentUser = { email }
    forgotPasswordUser(currentUser)
  }

  return (
    <div className='row text-center full-screen align-items-center'>
      <div className='container'>
        <div className='form form-background m-auto'>
          <h3>Reset Password</h3>
          {showAlert && <Alert />}
          <Form onSubmit={onSubmit}>
            <FormRow
              type='email'
              name='email'
              value={values.email}
              handleChange={handleChange}
              placeholder='Email'
            ></FormRow>
            <button className='btn btn-primary mt-3' disabled={isLoading}>
              Send Email
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default ForgotPassword

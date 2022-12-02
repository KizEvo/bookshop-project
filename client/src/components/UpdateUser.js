import { useAppContext } from '../context/appContext'
import { FormRow, Alert } from '../components'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'

const UpdateUser = () => {
  const { user, showAlert, isLoading, displayAlert, updateUser } =
    useAppContext()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [location, setLocation] = useState(user?.location)
  const [shippingLocation, setShippingLocation] = useState(
    user?.shippingLocation
  )
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName || !location || !shippingLocation) {
      displayAlert()
      return
    }
    const newUser = { name, email, lastName, location, shippingLocation }
    updateUser(newUser)
  }

  return (
      <Form onSubmit={handleSubmit}>
        {showAlert && <Alert />}
        <h3>User info</h3>
        <div className='d-flex flex-md-row flex-column gap-2'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
            placeholder='Name'
          ></FormRow>
          <FormRow
            type='text'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
          ></FormRow>
          <FormRow
            type='text'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          ></FormRow>
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
            placeholder='Location'
          ></FormRow>
        </div>
        <h3>Shipping info</h3>
        <FormRow
          type='text'
          name='shippingLocation'
          value={shippingLocation}
          handleChange={(e) => setShippingLocation(e.target.value)}
          placeholder='Address'
        ></FormRow>
        <p className='mt-2 text-muted'>
          * This will also update your email account when login
        </p>
        <button className='btn btn-primary' disabled={isLoading}>
          Update Info
        </button>
      </Form>
  )
}
export default UpdateUser

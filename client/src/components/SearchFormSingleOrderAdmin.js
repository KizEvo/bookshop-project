import { useState } from 'react'
import { useAppContext } from '../context/appContext'
import Alert from './Alert'

const SearchFormSingleOrderAdmin = () => {
  const { getSingleOrderAdmin, showAlert, isLoading } = useAppContext()

  const [invalidOrderId, setInValidOrderId] = useState(false)
  const [enteredOrderId, setEnterOrderId] = useState('')

  const formSubmitHandler = (e) => {
    e.preventDefault()

    const trimmedEnteredOrderId = enteredOrderId.trim()

    if (trimmedEnteredOrderId.length !== 24) {
      setInValidOrderId(true)
      setEnterOrderId('')
      setTimeout(() => {
        setInValidOrderId(false)
      }, 3000)
      return
    }
    getSingleOrderAdmin(trimmedEnteredOrderId)
    setEnterOrderId('')
  }

  const orderIdInputHandler = (e) => {
    setEnterOrderId(e.target.value)
  }

  const invalidOrderIdMessage = 'Please provide the correct Order ID format'

  return (
    <div className='container form-background p-5'>
      {showAlert && <Alert />}
      {invalidOrderId && (
        <p className='bg-danger text-white text-center border rounded mb-4 p-2'>
          {invalidOrderIdMessage}
        </p>
      )}
      <form
        className='d-flex flex-column gap-5 flex-md-row justify-content-md-center align-items-md-center'
        onSubmit={formSubmitHandler}
      >
        <label htmlFor='search-single-order'>
          <span className='h4'>Search for an Order</span>
        </label>
        <input
          type='text'
          id='search-single-order'
          className='flex-fill px-2 py-1 border rounded'
          placeholder='Order id...'
          value={enteredOrderId}
          onChange={orderIdInputHandler}
        />
        <button className='btn btn-primary px-5' disabled={invalidOrderId}>
          Search
        </button>
      </form>
    </div>
  )
}
export default SearchFormSingleOrderAdmin

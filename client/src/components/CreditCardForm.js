import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Alert from './Alert'
import useValidationCreditCard from '../hooks/useValidationCreditCard'

const CreditCardForm = () => {
  const {
    totalPriceOfProductsInCart,
    createOrder,
    isLoading,
    showAlert,
    alertType,
  } = useAppContext()

  const { valueValidate: cardNumberValidate, formatValue: cardNumberFormat } =
    useValidationCreditCard()
  const { valueValidate: expireDateValidate, formatValue: expireDateFormat } =
    useValidationCreditCard()
  const { valueValidate: cvcValidate, formatValue: cvcFormat } =
    useValidationCreditCard()

  const navigate = useNavigate()

  const cardNumberHandler = useCallback(
    (e) => {
      cardNumberFormat(e, {
        maxLengthForInputField: 16,
        newValue: ' ',
        maxLengthToAddNewValue: '.{1,4}',
      })
    },
    [cardNumberFormat]
  )

  const expireDateHandler = useCallback(
    (e) => {
      expireDateFormat(e, {
        maxLengthForInputField: 4,
        newValue: '/',
        maxLengthToAddNewValue: '.{1,2}',
      })
    },
    [expireDateFormat]
  )

  const cvcValidateHandler = useCallback(
    (e) => {
      cvcFormat(e, {
        maxLengthForInputField: 3,
        newValue: '',
        maxLengthToAddNewValue: '.{1,2}',
      })
    },
    [cvcFormat]
  )

  const formSubmitHandler = (e) => {
    e.preventDefault()
    createOrder()
  }

  const buttonHandldDisable = () => {
    if (isLoading) return true

    if (alertType === 'success') return true

    if (
      cardNumberValidate.length >= 16 &&
      expireDateValidate.length >= 5 &&
      cvcValidate.length >= 3
    )
      return false
    else return true
  }

  useEffect(() => {
    if (alertType === 'success') {
      setTimeout(() => {
        navigate('/user')
      }, 4000)
    }
  }, [alertType, navigate])

  return (
    <form
      className='form form-background d-flex flex-column gap-3 h6'
      onSubmit={formSubmitHandler}
    >
      {showAlert && <Alert />}
      <div className='h5'>
        Payment total: <span className='h5'>${totalPriceOfProductsInCart}</span>
      </div>
      <div className='d-flex flex-column gap-1'>
        <label htmlFor='credit-card-card-number'>Card Number</label>
        <input
          id='credit-card-card-number'
          type='text'
          value={cardNumberValidate}
          maxLength='19'
          placeholder='xxxx xxxx xxxx xxxx'
          className='p-2'
          onChange={cardNumberHandler}
        />
      </div>
      <div className='d-flex gap-3'>
        <div className='d-flex flex-column gap-1'>
          <label htmlFor='credit-card-expire-date'>Expire date</label>
          <input
            id='credit-card-expire-date'
            type='text'
            value={expireDateValidate}
            maxLength='5'
            placeholder='Date'
            className='p-2'
            onChange={expireDateHandler}
          />
        </div>
        <div className='d-flex flex-column gap-1'>
          <label htmlFor='credit-card-expire-date'>CVC</label>
          <input
            id='credit-card-expire-date'
            type='text'
            value={cvcValidate}
            maxLength='5'
            placeholder='3-digit numbers'
            className='p-2'
            onChange={cvcValidateHandler}
          />
        </div>
      </div>
      <button className='btn btn-primary my-3' disabled={buttonHandldDisable()}>
        Order
      </button>
    </form>
  )
}
export default CreditCardForm

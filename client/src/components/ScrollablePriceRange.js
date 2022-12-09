import { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import useDebounce from '../hooks/useDebounce'

const maxPriceValue = 100

const ScrollablePriceRange = () => {
  const { getSearchProductInput } = useAppContext()
  const [priceValue, setPriceValue] = useState(maxPriceValue)

  const debounceSearch = useDebounce(priceValue, 700)

  const handlePriceChange = (e) => {
    setPriceValue(e.target.value)
  }

  useEffect(() => {
    const query = { price: debounceSearch }
    getSearchProductInput(query)
  }, [debounceSearch])

  return (
    <div>
      <h5 className='fw-bolder'>Price range</h5>
      <label htmlFor='product-user-range' className='form-range w-75 m-3'>
        <div>0$ to {priceValue}$</div>
      </label>
      <input
        type='range'
        className='form-range w-75'
        min='0'
        max='100'
        onChange={handlePriceChange}
        id='product-user-range'
      ></input>
    </div>
  )
}
export default ScrollablePriceRange

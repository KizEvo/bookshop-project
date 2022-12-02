import { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import useDebounce from '../hooks/useDebounce'

const FilterForm = () => {
  const { getSearchProductInput } = useAppContext()
  const [priceValue, setPriceValue] = useState(50)

  const debounceSearch = useDebounce(priceValue, 700)

  const handlePriceChange = (e) => {
    setPriceValue(e.target.value)
  }

  useEffect(() => {
    const query = { price: debounceSearch }
    getSearchProductInput(query)
  }, [debounceSearch])

  return (
    <div className='disable-filter-form'>
      <div className='d-flex flex-column justify-content-between product-filter-container'>
        <div>
          <hr />
          <h5 className='fw-bolder'>Price range</h5>
          <label
            htmlFor='product-user-range'
            className='form-range w-75 m-3'
          >
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
        <div>
          <hr />
          <h5 className='fw-bolder'>Genres</h5>
        </div>
        <div>
          <hr />
          <h5 className='fw-bolder'>Welcome,</h5>
          <p>*user here*</p>
        </div>
      </div>
    </div>
  )
}
export default FilterForm

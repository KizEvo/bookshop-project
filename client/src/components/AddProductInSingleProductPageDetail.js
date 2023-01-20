import { useState } from 'react'

const AddProductInSingleProductPageDetail = () => {
  const [numberOfItem, setNumberOfItem] = useState(1)

  const buttonHandler = () => {
    console.log(numberOfItem)
  }

  return (
    <div className='d-flex'>
      <input
        className='form-control text-center ps-4 me-3'
        type='number'
        value={numberOfItem}
        min='1'
        style={{ maxWidth: '5rem' }}
        onChange={(e) => setNumberOfItem(e.target.value)}
      />
      <button
        className='btn btn-outline-dark flex-shrink-0'
        onClick={buttonHandler}
      >
        Add to cart
      </button>
    </div>
  )
}
export default AddProductInSingleProductPageDetail

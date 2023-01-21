import { useState } from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'

const AddProductInSingleProductPageDetail = () => {
  const { addProductToCartInItsDetailPage } = useAppContext()
  const [numberOfItem, setNumberOfItem] = useState(1)

  const buttonHandler = () => {
    addProductToCartInItsDetailPage(numberOfItem)
  }

  return (
    <div className='d-flex'>
      <input
        className='form-control text-center ps-4 me-3'
        type='number'
        value={numberOfItem}
        min='1'
        max='15'
        style={{ maxWidth: '5rem' }}
        onChange={(e) => setNumberOfItem(e.target.value)}
      />
      <Link
        to='../../cart'
        className='btn btn-primary flex-shrink-0'
        onClick={buttonHandler}
      >
        Add to cart
      </Link>
    </div>
  )
}
export default AddProductInSingleProductPageDetail

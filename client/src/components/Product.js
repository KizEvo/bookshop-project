import { useState } from 'react'
import { TbEdit } from 'react-icons/tb'
import { AiOutlineDelete } from 'react-icons/ai'
import { useAppContext } from '../context/appContext'
const Product = ({
  name,
  author,
  price,
  description,
  category,
  image,
  _id,
}) => {
  const [readMore, setReadMore] = useState(false)
  const { showEditModal, toggleDeleteModal, setProductId } = useAppContext()
  const id = _id
  const txtLimit = 25
  return (
    <>
      <div className='mx-auto mt-2'>
        <div className='card' style={{ width: '18rem' }}>
          <TbEdit
            className='edit-btn'
            data-bs-toggle='tooltip'
            title='Edit product'
            onClick={() => {
              setProductId(id)
              showEditModal()
            }}
          />
          <AiOutlineDelete
            className='delete-btn'
            data-bs-toggle='tooltip'
            title='Delete product'
            onClick={() => {
              setProductId(id)
              toggleDeleteModal()
            }}
          />
          <img src={image} className='card-img-top' alt='product' />
          <div className='card-body'>
            <h5 className='card-title'>{price} $</h5>
            <h5 className='card-title'>Title: {name}</h5>
            <p className='card-text'>
              <li>Genre: {category}</li>
              <li>Author: {author}</li>
              <li>
                Description:{' '}
                {readMore ? description : description.substring(0, txtLimit)}
                {description.length > txtLimit && (
                  <span
                    onClick={() => setReadMore(!readMore)}
                    className='read-more'
                  >
                    {' '}
                    {readMore ? 'hide' : '...more'}
                  </span>
                )}
              </li>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Product

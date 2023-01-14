import { useState } from 'react'
import { TbEdit } from 'react-icons/tb'
import { AiOutlineDelete } from 'react-icons/ai'
import { useAppContext } from '../context/appContext'
const Product = ({ name, author, price, description, image, _id }) => {
  const [readMore, setReadMore] = useState(false)
  const { showEditModal, toggleDeleteModal, setProductId } = useAppContext()
  const id = _id
  const txtLimit = 25
  return (
    <>
      <div
        className='d-flex flex-column justify-content-start border border-1 rounded-2 my-3'
        style={{ width: '12rem', position: 'relative' }}
      >
        <img
          src={image}
          className='card-img-top hover-cursor-pointer rounded-top flex-fill'
          alt='product'
        />
        <div className='d-flex justify-content-around p-2 bg-primary'>
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
        </div>

        <div className='m-2 justify-self-end'>
          <p className='card-text-info fw-bold'>{name}</p>
          <p className='card-text-info'>Author: {author}</p>
          <p className='fw-bold fs-6 p-0 mb-0 mt-1'>{price}$</p>
          <p className='card-text-info'>
            {' '}
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
          </p>
        </div>
      </div>
    </>
  )
}
export default Product

import { FiSearch } from 'react-icons/fi'

const SingleFeaturedProduct = (props) => {
  return (
    <div>
      <div className='img-overlay' id={`featured-products-${props.name}`}>
        <FiSearch />
        <img
          src={props.image}
          alt='featured products'
          className='card-img-top rounded'
        />
      </div>
      <label
        htmlFor={`featured-products-${props.name}`}
        className='d-flex justify-content-between mt-3'
      >
        <p>{props.name}</p>
        <p className='text-success fw-bold'>${props.price}</p>
      </label>
    </div>
  )
}
export default SingleFeaturedProduct

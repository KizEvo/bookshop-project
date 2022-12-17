const ProductUser = ({ _id, name, price, author, image }) => {
  const clickHandler = () => {
    console.log(_id)
  }

  return (
    <>
      <div
        className='d-flex flex-column justify-content-between border border-1 rounded-2'
        style={{ width: '12rem' }}
      >
        <img
          src={image}
          className='card-img-top hover-cursor-pointer rounded-top flex-fill'
          alt={`${name}`}
          onClick={clickHandler}
        />
        <div className='hover-cursor-pointer m-2' onClick={clickHandler}>
          <p className='card-text-info'>{name}</p>
          <p className='card-text-info'>Author: {author}</p>
          <p className='fw-bold fs-6 p-0 mb-0 mt-1'>{price}$</p>
        </div>
        <button className='btn btn-primary'>Add to cart</button>
      </div>
    </>
  )
}
export default ProductUser

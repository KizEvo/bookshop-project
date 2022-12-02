const ProductUser = ({ _id, name, price, author, image }) => {
  return (
    <div className='card' style={{ width: '12rem' }}>
      <img src={image} className='card-img-top' alt={`${name}`} />
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <h5 className='card-title'>{price}$</h5>
        <p className='card-text'>Author: {author}</p>
      </div>
      <button className='btn btn-primary'>Add to cart</button>
    </div>
  )
}
export default ProductUser

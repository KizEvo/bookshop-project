import { useAppContext } from '../context/appContext'

const SingleProductDetail = () => {
  const { product } = useAppContext()

  return (
    <div className='d-flex justify-content-center p-5 gap-5'>
      <img
        src={product.image}
        alt={product.name}
        className='me-5 single-product-image-detail'
      />
      <article>
        <h3>{product.name}</h3>
        <div>
          <p>${product.price}</p>
          <p>{product.author}</p>
          <p>{product.category}</p>
          <p>{product.description}</p>
        </div>
      </article>
    </div>
  )
}
export default SingleProductDetail

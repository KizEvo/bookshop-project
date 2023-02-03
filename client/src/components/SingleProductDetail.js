import { useAppContext } from '../context/appContext'
import AddProductInSingleProductPageDetail from './AddProductInSingleProductPageDetail'

const SingleProductDetail = () => {
  const { product } = useAppContext()

  return (
    <div className='container d-flex flex-column align-items-center justify-content-center gap-5 flex-md-row justify-content-md-around'>
      <img
        className='product-img-detail'
        src={product.image}
        alt={product.name}
      />
      <div className='align-self-md-start'>
        <h1 className='display-5 fw-bolder mt-3 mt-md-0'>{product.name}</h1>
        <div className='fs-5'>
          by <span className='fw-bold'>{product.author}</span>
        </div>
        <div
          className='fs-5 my-3 border rounded-pill p-2 px-3'
          style={{ width: 'fit-content' }}
        >
          {product.category}
        </div>
        <div className='fs-5 mb-4'>${product.price}</div>
        <p className='lead' style={{ maxWidth: '20rem' }}>
          {product.description}
        </p>
        <AddProductInSingleProductPageDetail />
      </div>
    </div>
  )
}
export default SingleProductDetail

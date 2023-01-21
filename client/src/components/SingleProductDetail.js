import { useAppContext } from '../context/appContext'
import AddProductInSingleProductPageDetail from './AddProductInSingleProductPageDetail'

const SingleProductDetail = () => {
  const { product } = useAppContext()

  return (
    <div className='d-flex justify-content-center py-4 px-3 gap-5'>
      <div className='container px-4 px-lg-5'>
        <div className='row gx-4 gx-lg-5 align-items-center'>
          <div className='col-md-6'>
            <img
              className='product-img-detail'
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className='col-md-6'>
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
            <p className='lead'>{product.description}</p>
            <AddProductInSingleProductPageDetail />
          </div>
        </div>
      </div>
    </div>
  )
}
export default SingleProductDetail

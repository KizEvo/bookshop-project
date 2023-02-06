import Loading from './Loading'
import ProductUser from './ProductUser'
import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import PaginationBtn from './PaginationBtn'

const ProductDisplay = () => {
  const {
    isFetchingProduct,
    fetchProduct,
    products,
    search,
    numberOfPages,
    page,
    isLoading,
  } = useAppContext()

  useEffect(() => {
    const abortController = new AbortController()
    fetchProduct(abortController)
    return () => {
      abortController.abort()
    }
  }, [search, page])

  if (isFetchingProduct) {
    return <Loading pageLoading={isFetchingProduct} />
  }

  return (
    <div className='mt-3'>
      <div className='product-container-display-user gap-4'>
        {products.map((product) => {
          return <ProductUser key={product._id} {...product} />
        })}
      </div>
      {numberOfPages > 1 && <PaginationBtn />}
      {products.length === 0 && isFetchingProduct === false && (
        <h3 className='text-center'>No product available at the moment</h3>
      )}
    </div>
  )
}
export default ProductDisplay

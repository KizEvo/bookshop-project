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
      <div className='text-center'>
        {products.length === 0 && isFetchingProduct === false && (
          <h4>No product available at the moment</h4>
        )}
      </div>
      {numberOfPages > 1 && <PaginationBtn />}
      {numberOfPages === 0 && (
        <h3 className='text-center'>No books match your search</h3>
      )}
    </div>
  )
}
export default ProductDisplay

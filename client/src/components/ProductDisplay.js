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
    isProductUpdated,
    search,
    numberOfPages,
    page,
  } = useAppContext()

  useEffect(() => {
    const abortController = new AbortController()
    fetchProduct(abortController)
    return () => {
      abortController.abort()
    }
  }, [isProductUpdated, search, page])

  if (isFetchingProduct) {
    return <Loading pageLoading={isFetchingProduct} />
  }

  return (
    <div className='mt-3'>
      <div className='product-container product-container-display-user gap-4'>
        {products.map((product, index) => {
          return <ProductUser key={index} {...product} />
        })}
      </div>
      {numberOfPages > 1 && <PaginationBtn />}
      {numberOfPages === 0 && <h3 className='text-center'>No books match your search</h3>}
    </div>
  )
}
export default ProductDisplay

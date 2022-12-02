import Product from './Product'
import Loading from './Loading'
import Modal from './Modal'
import DeleteModal from './DeleteModal'
import PaginationBtn from './PaginationBtn'
import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
const ProductContainer = () => {
  const {
    isFetchingProduct,
    fetchProduct,
    products,
    showModal,
    showDeleteModal,
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
    <>
      {showModal && <Modal />}
      {showDeleteModal && <DeleteModal />}
      <section className='container mt-4'>
        <h3>Number of products: {products.length}</h3>
        <div className='product-container mt-5'>
          {products.map((product, index) => {
            return <Product key={index} {...product} />
          })}
        </div>
        {numberOfPages > 1 && <PaginationBtn />}
      </section>
    </>
  )
}
export default ProductContainer

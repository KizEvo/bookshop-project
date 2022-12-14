import SearchFormUser from './SearchFormUser'
import ProductDisplay from './ProductDisplay'
import SmallFilterForm from './SmallFilterForm'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useAppContext } from '../context/appContext'

const ProductContainerUser = () => {
  const { totalProducts } = useAppContext()

  return (
    <div className='product-container-user'>
      <div className='form-background p-2'>
        <SearchFormUser />
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <p className='total-products my-2'>{totalProducts} Products</p>
          <AiOutlineShoppingCart className='icon my-2' />
        </div>
        <hr className='d-md-none w-25 flex-grow-1' />
        <hr className='d-none d-md-block w-100' />
        <SmallFilterForm />
      </div>
      <ProductDisplay />
    </div>
  )
}
export default ProductContainerUser

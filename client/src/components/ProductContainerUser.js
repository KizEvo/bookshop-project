import SearchFormUser from './SearchFormUser'
import ProductDisplay from './ProductDisplay'
import SmallFilterForm from './SmallFilterForm'
import { ImBooks } from 'react-icons/im'
import { useAppContext } from '../context/appContext'

const ProductContainerUser = () => {
  const { totalProducts } = useAppContext()

  return (
    <div className='product-container-user'>
      <div className='form-background p-2'>
        <SearchFormUser />
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center gap-2'>
          <p className='total-products my-2'>{totalProducts}</p>
          <p className='total-products my-2'>items</p>
          <ImBooks className='icon my-2 me-0' />
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

import SearchFormUser from './SearchFormUser'
import ProductDisplay from './ProductDisplay'
import SmallFilterForm from './SmallFilterForm'

const ProductContainerUser = () => {
  return (
    <div className='product-container-user'>
      <div className='form-background p-2'>
        <SearchFormUser />
      </div>
      <SmallFilterForm />
      <ProductDisplay />
    </div>
  )
}
export default ProductContainerUser

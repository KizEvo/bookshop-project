import SearchFormUser from './SearchFormUser'
import ProductDisplay from './ProductDisplay'

const ProductContainerUser = () => {
  return (
    <div className='product-container-user'>
      <div className='form-background p-2'>
        <SearchFormUser />
      </div>
      <ProductDisplay />
    </div>
  )
}
export default ProductContainerUser

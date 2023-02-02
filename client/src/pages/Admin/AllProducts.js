import { ProductContainer, SearchFormAllProductsAdmin } from '../../components'

const AllProducts = () => {
  return (
    <div className='d-flex flex-column'>
      <SearchFormAllProductsAdmin />
      <ProductContainer />
    </div>
  )
}
export default AllProducts

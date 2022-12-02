import { ProductContainer, SearchFormAdmin } from '../../components'

const GetAllProducts = () => {
  return (
      <div className='d-flex flex-column'>
        <SearchFormAdmin />
        <ProductContainer />
      </div>
  )
}
export default GetAllProducts

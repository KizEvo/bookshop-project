import { FilterForm, ProductContainerUser } from '../components'

const Products = () => {
  return (
    <section className='container pt-5'>
      <div className='product-page'>
          <FilterForm />
          <ProductContainerUser />
      </div>
    </section>
  )
}
export default Products

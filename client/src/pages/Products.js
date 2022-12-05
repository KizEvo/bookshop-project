import { BigFilterForm, ProductContainerUser } from '../components'

const Products = () => {
  return (
    <section className='container pt-5'>
      <div className='product-page'>
        <BigFilterForm />
        <ProductContainerUser />
      </div>
    </section>
  )
}
export default Products

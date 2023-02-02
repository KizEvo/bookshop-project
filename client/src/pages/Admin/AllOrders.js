import {
  AllOrdersContainerAdmin,
  SearchFormSingleOrderAdmin,
} from '../../components'

const AllOrders = () => {
  return (
    <section className='d-flex flex-column'>
      <SearchFormSingleOrderAdmin />
      <AllOrdersContainerAdmin />
    </section>
  )
}
export default AllOrders

import ScrollablePriceRange from './ScrollablePriceRange'

const BigFilterForm = () => {
  return (
    <div className='d-none d-md-block'>
      <div className='d-flex flex-column justify-content-between product-filter-container'>
        <ScrollablePriceRange />
        <div>
          <hr />
          <h5 className='fw-bolder'>Genres</h5>
        </div>
        <div>
          <hr />
          <h5 className='fw-bolder'>Welcome,</h5>
          <p>*user here*</p>
        </div>
      </div>
    </div>
  )
}
export default BigFilterForm

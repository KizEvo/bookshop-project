const ScrollablePriceRange = (props) => {
  const { queriesState, setQueriesState } = props

  const handlePriceChange = (e) => {
    setQueriesState({ ...queriesState, price: e.target.value })
  }

  return (
    <div>
      <h5 className='fw-bolder'>Price</h5>
      <label
        htmlFor='product-user-range'
        className='form-range d-grid justify-content-start fs-5 text-bold'
      >
        <div>${queriesState.price}</div>
      </label>
      <input
        type='range'
        className='form-range align-self-start'
        min='0'
        max='200'
        name='price'
        onChange={handlePriceChange}
        id='product-user-range'
      ></input>
    </div>
  )
}
export default ScrollablePriceRange

const ScrollablePriceRange = (props) => {
  const { queriesState, setQueriesState } = props

  const handlePriceChange = (e) => {
    setQueriesState({ ...queriesState, price: e.target.value })
  }

  return (
    <div>
      <h5 className='fw-bolder'>Price range</h5>
      <label htmlFor='product-user-range' className='form-range w-75 m-3'>
        <div>0$ to {queriesState.price}$</div>
      </label>
      <input
        type='range'
        className='form-range w-75'
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

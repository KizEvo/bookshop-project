import Form from 'react-bootstrap/Form'

const SmallFilterFormPriceInput = (props) => {
  const { queriesState, setQueriesState } = props

  const handlePriceChange = (e) => {
    setQueriesState({ ...queriesState, price: e.target.value })
  }
  
  return (
    <div className='py-2'>
      <h6>Price range</h6>
      <div className='d-flex align-items-center fs-6'>
        <Form.Group>
          <Form.Label>Min value</Form.Label>
          <Form.Control
            className='w-25'
            type='text'
            placeholder='0'
            disabled
            readOnly
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Max value</Form.Label>
          <Form.Control
            type='number'
            name='price'
            value={queriesState.price}
            onChange={handlePriceChange}
            min='0'
          />
        </Form.Group>
      </div>
    </div>
  )
}
export default SmallFilterFormPriceInput

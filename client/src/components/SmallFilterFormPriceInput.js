import Form from 'react-bootstrap/Form'

const SmallFilterFormPriceInput = (props) => {
  const { maxPrice, handleMaxPriceChange } = props
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
          <Form.Label>Min value</Form.Label>
          <Form.Control
            type='number'
            name='maxPrice'
            value={maxPrice}
            onChange={handleMaxPriceChange}
            min='0'
          />
        </Form.Group>
      </div>
    </div>
  )
}
export default SmallFilterFormPriceInput

const ProductDetailInOrder = (props) => {
  return (
    <div className='border rounded p-3 flex-shrink'>
      <p>
        <span className='h6'>Name: </span>
        {props.name}
      </p>
      <p className='mb-0'>
        <span className='h6'>Quantity: </span>
        {props.quantity}
      </p>
    </div>
  )
}
export default ProductDetailInOrder

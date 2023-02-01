const FeaturedProductsSection = () => {
  return (
    <section
      className='d-flex flex-column align-items-center'
      style={{ backgroundColor: '#f1f5f8' }}
    >
      <h2>Featured Products</h2>
      <div className='d-flex gap-3'>
        <div className='border p-2'>SingleProduct</div>
        <div className='border p-2'>SingleProduct</div>
        <div className='border p-2'>SingleProduct</div>
      </div>
    </section>
  )
}
export default FeaturedProductsSection

import { useNavigate } from 'react-router-dom'
import featuredProduct from '../utils/featuredProducts'
import SingleFeaturedProduct from './SingleFeaturedProduct'

const FeaturedProductsSection = () => {
  const navigate = useNavigate()

  const buttonHandler = () => {
    navigate('/products')
  }

  return (
    <section style={{ backgroundColor: '#f1f5f8' }}>
      <div className='container d-flex flex-column align-items-center py-5 gap-5'>
        <h2 className='mb-4'>
          Featured Products
          <div className='p-1 bg-primary'></div>
        </h2>
        <div className='d-flex flex-column flex-lg-row gap-5'>
          {featuredProduct.map((product) => {
            return (
              <div key={product._id}>
                <SingleFeaturedProduct
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                />
              </div>
            )
          })}
        </div>
        <button className='btn btn-primary' onClick={buttonHandler}>
          ALL PRODUCTS
        </button>
      </div>
    </section>
  )
}
export default FeaturedProductsSection

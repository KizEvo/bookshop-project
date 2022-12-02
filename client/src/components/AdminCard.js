import { useAppContext } from '../context/appContext'

const widthStyle = { width: '18rem' }

const AdminCard = () => {
  const { product } = useAppContext()
  const { name, description, image, price, category, author } = product
  return (
    <section>
      <div className='container mt-2'>
        <div className='d-flex justify-content-center'>
          <div className='card' style={widthStyle}>
            <img src={image} className='card-img-top' alt='product' />
            <div className='card-body'>
              <h5 className='card-title'>{price} $</h5>
              <h5 className='card-title'>Title: {name}</h5>
              <p className='card-text'>
                <li>Genre: {category}</li>
                <li>Author: {author}</li>
                <li>Description: {description}</li>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default AdminCard

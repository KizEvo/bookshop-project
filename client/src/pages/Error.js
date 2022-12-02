import notFoundImage from '../assets/not-found.png'
import { Link } from 'react-router-dom'

const viewHeightStyle = { height: '65vh' }

const Error = () => {
  return (
    <div className='container'>
      <div
        className='d-flex justify-content-center align-items-center'
        style={viewHeightStyle}
      >
        <img
          src={notFoundImage}
          alt='not found image'
          className='img-fluid w-75'
        />
      </div>
      <div className='text-center'>
        <h3 className='mb-3'>
          Oops, the page you're looking for doesn't exist
        </h3>
        <Link to='/' className='btn btn-primary'>
          Return Home
        </Link>
      </div>
    </div>
  )
}
export default Error

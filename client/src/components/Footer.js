import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
  FaTwitch,
} from 'react-icons/fa'
import logo from '../assets/book-logo.png'

const Footer = () => {
  return (
    <footer className='mt-3 p-4 bg-success bg-opacity-25'>
      <div className='d-md-flex container gap-5'>
        <div className='w-75'>
          <div className='footer-logo'>
            <div className='d-flex align-items-start'>
              <img src={logo} alt='bookstore' />
              <h3>BookShop</h3>
            </div>
            <p className='mb-0 mt-2'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi,
              harum placeat. Possimus, ipsum sit. Perferendis incidunt quaerat
              eos iste assumenda consectetur quia laudantium voluptatem
              quibusdam soluta quasi, dolores, ab accusamus?
            </p>
          </div>
          <div className='icon footer-icons'>
            <FaFacebookSquare />
            <FaTwitterSquare />
            <FaYoutubeSquare />
            <FaTwitch />
          </div>
        </div>
        <div className='d-md-flex justify-content-between vw-100 gap-5'>
          <div>
            <h5 className='mt-2 mb-4 '>Product</h5>
            <div className='d-flex flex-column footer-links'>
              <a href='/products'>eBook</a>
              <a href='/products'>Hardcover Books</a>
              <a href='/products'>Children's Books</a>
              <a href='/products'>Miniature Books</a>
              <a href='/products'>Trade Paperbacks</a>
            </div>
          </div>
          <div>
            <h5 className='mt-2 mb-4'>Useful links</h5>
            <div className='d-flex flex-column footer-links'>
              <a href='/about'>About us</a>
              <a href='/'>Services</a>
              <a href='/'>Blog</a>
              <a href='/'>FAQ</a>
              <a href='/'>Contact us</a>
            </div>
          </div>
          <div>
            <h5 className='mt-2 mb-4'>Address</h5>
            <p className='m-0'>187 Wentworth,</p>
            <p className='m-0'>Street Freehold</p>
            <p className='m-0'>NJ 07728</p>
          </div>
        </div>
      </div>
      <div className='text-center'>
        <h6 className='m-0 p-2'>All rights reserved by @Bookshop 2022</h6>
      </div>
    </footer>
  )
}
export default Footer

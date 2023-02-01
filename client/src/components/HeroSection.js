import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { FcReadingEbook } from 'react-icons/fc'
import heroSvg from '../assets/hero-svg-home.svg'

const HeroSection = () => {
  return (
    <section className='full-screen d-flex justify-content-center justify-content-md-around hero-home-page'>
      <div className='d-flex flex-column gap-5 align-items-center justify-content-around'>
        <h4 className='mb-0'>
          Explore Your Favorite Books <FcReadingEbook />
        </h4>
        <div className='heading-home-page d-flex flex-column align-items-start'>
          <h1>Get Your New</h1>
          <div className='d-flex align-items-start flex-sm-row flex-column'>
            <div className='d-flex align-items-center me-3'>
              <h1 className='b-text-rotate border rounded-circle px-3 py-0'>
                B
              </h1>
              <span>ook</span>
            </div>
            <span>With The</span>
          </div>
          <h1>Best Price</h1>
        </div>
        <div className='d-flex mt-4 align-self-sm-stretch'>
          <button
            type='button'
            className='btn btn-primary flex-sm-fill d-sm-flex justify-content-sm-between align-items-sm-center shadow'
            style={{ height: '4rem' }}
          >
            <span className='h4 mb-0 rounded bg-light text-primary py-2 px-3'>
              Go to shop
            </span>
            <BsFillArrowRightCircleFill className='icon d-none d-sm-block' />
          </button>
        </div>
      </div>
      <img src={heroSvg} alt='hero' className='h-100 d-xl-block d-none' />
    </section>
  )
}
export default HeroSection

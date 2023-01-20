import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SingleProductDetail } from '../components/index'
import { useAppContext } from '../context/appContext'

const SingleProductInfoPage = () => {
  const { fetchSingleProduct } = useAppContext()

  const params = useLocation()
  const productId = params.pathname.split('/')[2]

  useEffect(() => {
    const abortController = new AbortController()
    fetchSingleProduct(abortController, productId)
    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <section className=''>
      <SingleProductDetail />
    </section>
  )
}
export default SingleProductInfoPage

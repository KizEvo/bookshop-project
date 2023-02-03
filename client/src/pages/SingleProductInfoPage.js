import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SingleProductDetail } from '../components/index'
import { useAppContext } from '../context/appContext'

const SingleProductInfoPage = () => {
  const { fetchSingleProduct, alertType } = useAppContext()
  const navigate = useNavigate()
  const params = useLocation()

  const productId = params.pathname.split('/')[2]

  if (alertType === 'danger') {
    navigate('/')
  }

  useEffect(() => {
    const abortController = new AbortController()
    fetchSingleProduct(abortController, productId)
    return () => {
      abortController.abort()
    }
  }, [productId])

  return (
    <section className='h-100 py-5'>
      <SingleProductDetail />
    </section>
  )
}
export default SingleProductInfoPage

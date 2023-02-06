import { CreditCardForm } from '../components'

const Checkout = () => {
  return (
    <section className='full-screen'>
      <div className='checkout-background-img'></div>
      <div className='container d-flex flex-column justify-content-center align-items-sm-center h-75'>
        <CreditCardForm />
      </div>
    </section>
  )
}
export default Checkout

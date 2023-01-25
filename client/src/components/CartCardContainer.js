import React from 'react'
import { useAppContext } from '../context/appContext'
import CartCard from './CartCard'

const CartCardContainer = () => {
  const { productsInCart } = useAppContext()

  return (
    <>
      {productsInCart.map((product) => {
        return (
          <React.Fragment key={product.id}>
            <CartCard
              id={product.id}
              name={product.name}
              quantity={product.quantity}
              price={product.price}
              image={product.image}
            />
          </React.Fragment>
        )
      })}
    </>
  )
}
export default CartCardContainer

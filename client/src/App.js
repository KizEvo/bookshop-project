import './App.css'
import {
  About,
  Cart,
  Error,
  Home,
  Products,
  Register,
  User,
  SharedLayout,
  VerifyEmail,
  ProtectedRoute,
  ProtectedRouteAdmin,
  ForgotPassword,
  VerifyResetPassword,
  Dashboard,
  SharedLayoutAdmin,
  GetAllProducts,
  CreateProduct,
  SingleProductInfoPage,
  Checkout,
} from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppContext } from './context/appContext'
import { Loading } from './components'

function App() {
  const { pageLoading } = useAppContext()
  if (pageLoading) {
    return <Loading pageLoading />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:id' element={<SingleProductInfoPage />} />
          <Route path='cart' element={<Cart />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          {/* USER ROUTE */}
          <Route
            path='user'
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path='user/reset-password'
            element={
              <ProtectedRoute protectRoute='reset-password'>
                <VerifyResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='user/verify-email'
            element={
              <ProtectedRoute protectRoute='verify-email'>
                <VerifyEmail />
              </ProtectedRoute>
            }
          />
          <Route
            path='cart/checkout'
            element={
              <ProtectedRoute protectRoute='checkout'>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* ADMIN ROUTE */}
        <Route
          path='/admin'
          element={
            <ProtectedRouteAdmin>
              <SharedLayoutAdmin />
            </ProtectedRouteAdmin>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='products' element={<GetAllProducts />} />
          <Route path='create-product' element={<CreateProduct />} />
        </Route>
        {/* ERROR PAGE */}
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
